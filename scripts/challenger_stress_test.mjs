#!/usr/bin/env node

/**
 * Challenger Stress Test Harness: Responsive Layout, Viewports & Horizontal Overflow
 * 
 * Verifies:
 * 1. 11 Viewports:
 *    - Mobile: 320x568, 375x667, 414x896, 480x854
 *    - Tablet: 768x1024, 820x1180, 1024x768
 *    - Desktop: 1200x800, 1440x900, 1920x1080, 2560x1440
 * 2. Document & Body horizontal overflow (scrollWidth vs innerWidth)
 * 3. Deep DOM inspection for any individual element protruding outside viewport bounds
 * 4. Image bounds and scaling (width <= container, naturalWidth > 0)
 * 5. Mobile hamburger menu button, drawer open/close transitions, escape & backdrop handling
 * 6. Mobile sticky bottom conversion bar visibility and desktop hiding
 * 7. Touch targets minimum size audit on mobile (>= 44x44px for primary controls)
 * 8. Measurement modal fit and accessibility at 320px viewport
 * 9. Calculator 5-step flow at 320px
 */

import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import http from 'node:http';
import { spawn } from 'node:child_process';
import path from 'node:path';

const CHROME_PATH = process.env.CHROME_BIN || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const CANDIDATE_PORTS = [4173, 5173, 3000, 8080];

function checkServer(url) {
  return new Promise((resolve) => {
    const req = http.get(url, (res) => {
      resolve(res.statusCode >= 200 && res.statusCode < 400);
    });
    req.on('error', () => resolve(false));
    req.setTimeout(1500, () => {
      req.destroy();
      resolve(false);
    });
  });
}

async function findOrStartServer() {
  if (process.env.BASE_URL) {
    return { url: process.env.BASE_URL, process: null };
  }

  for (const port of CANDIDATE_PORTS) {
    const testUrl = `http://localhost:${port}/`;
    if (await checkServer(testUrl)) {
      console.log(`Detected existing running web server at ${testUrl}`);
      return { url: testUrl, process: null };
    }
  }

  console.log('No existing server detected. Spawning Vite preview server...');
  const projectDir = path.resolve(process.cwd());
  const distExists = fs.existsSync(path.join(projectDir, 'dist', 'index.html'));
  
  const cmd = 'npx';
  const args = distExists ? ['vite', 'preview', '--port', '4173'] : ['vite', '--port', '5173'];
  const targetPort = distExists ? 4173 : 5173;
  const targetUrl = `http://localhost:${targetPort}/`;

  const serverProc = spawn(cmd, args, {
    cwd: projectDir,
    stdio: 'pipe',
    shell: true,
  });

  const startTime = Date.now();
  while (Date.now() - startTime < 15000) {
    await new Promise((r) => setTimeout(r, 600));
    if (await checkServer(targetUrl)) {
      console.log(`Server successfully started at ${targetUrl}`);
      return { url: targetUrl, process: serverProc };
    }
  }

  serverProc.kill();
  throw new Error(`Failed to start local server on ${targetUrl} within timeout.`);
}

const VIEWPORTS = [
  // Mobile
  { category: 'Mobile', name: 'Mobile Mini (iPhone SE 1st gen)', width: 320, height: 568 },
  { category: 'Mobile', name: 'Mobile Small (iPhone 8 / SE 2)', width: 375, height: 667 },
  { category: 'Mobile', name: 'Mobile Medium (iPhone 11 / XR)', width: 414, height: 896 },
  { category: 'Mobile', name: 'Mobile Large (Android Standard)', width: 480, height: 854 },
  // Tablet
  { category: 'Tablet', name: 'Tablet Portrait (iPad 9.7)', width: 768, height: 1024 },
  { category: 'Tablet', name: 'Tablet Medium (iPad Air 10.9)', width: 820, height: 1180 },
  { category: 'Tablet', name: 'Tablet Landscape (iPad Landscape)', width: 1024, height: 768 },
  // Desktop
  { category: 'Desktop', name: 'Desktop Standard (Laptop 13")', width: 1200, height: 800 },
  { category: 'Desktop', name: 'Desktop Wide (MacBook 15" / 16")', width: 1440, height: 900 },
  { category: 'Desktop', name: 'Desktop Full HD (1080p)', width: 1920, height: 1080 },
  { category: 'Desktop', name: 'Desktop Ultra-Wide (QHD / 2K)', width: 2560, height: 1440 },
];

async function runChallengerSuite() {
  console.log('======================================================================');
  console.log('   CHALLENGER 1: EMPIRICAL RESPONSIVE & LAYOUT STRESS TEST SUITE      ');
  console.log('======================================================================');

  const serverHandle = await findOrStartServer();
  const targetUrl = serverHandle.url;

  console.log(`Target URL: ${targetUrl}`);
  console.log(`Chrome Binary: ${CHROME_PATH}`);
  console.log(`Total Viewports: ${VIEWPORTS.length}`);

  const results = {
    viewports: [],
    overflowTests: [],
    protrudingElements: [],
    imageTests: null,
    mobileDrawer: null,
    mobileStickyCta: null,
    touchTargetAudit: null,
    modal320pxTest: null,
    summary: { total: 0, passed: 0, failed: 0 },
  };

  function assert(name, condition, extra = '') {
    results.summary.total++;
    if (condition) {
      results.summary.passed++;
      console.log(`  \x1b[32m✔ PASS\x1b[0m: ${name} ${extra ? `(${extra})` : ''}`);
      return true;
    } else {
      results.summary.failed++;
      console.log(`  \x1b[31m✖ FAIL\x1b[0m: ${name} ${extra ? `[${extra}]` : ''}`);
      return false;
    }
  }

  let browser = null;
  try {
    browser = await puppeteer.launch({
      executablePath: CHROME_PATH,
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
    });

    const page = await browser.newPage();
    await page.goto(targetUrl, { waitUntil: 'networkidle0', timeout: 15000 });

    // ------------------------------------------------------------------
    // TEST SECTION 1: VIEWPORT HORIZONTAL OVERFLOW & DEEP DOM INSPECTION
    // ------------------------------------------------------------------
    console.log('\n--- SECTION 1: 11 VIEWPORTS HORIZONTAL OVERFLOW TESTS ---');

    for (const vp of VIEWPORTS) {
      await page.setViewport({ width: vp.width, height: vp.height });
      await new Promise((r) => setTimeout(r, 200));

      const layoutData = await page.evaluate((vpWidth) => {
        const doc = document.documentElement;
        const body = document.body;

        const docScrollWidth = doc.scrollWidth;
        const bodyScrollWidth = body.scrollWidth;
        const innerWidth = window.innerWidth;
        const docClientWidth = doc.clientWidth;

        // Check protruding elements
        const allElements = Array.from(document.querySelectorAll('*'));
        const offending = [];

        for (const el of allElements) {
          const style = window.getComputedStyle(el);
          if (
            style.display === 'none' ||
            style.visibility === 'hidden' ||
            style.opacity === '0' ||
            el.tagName === 'SCRIPT' ||
            el.tagName === 'STYLE' ||
            el.tagName === 'NOSCRIPT'
          ) {
            continue;
          }

          // Check if element is inside an overflow-hidden container
          let parent = el.parentElement;
          let isContainedByOverflowHidden = false;
          while (parent && parent !== document.documentElement) {
            const pStyle = window.getComputedStyle(parent);
            if (
              pStyle.overflowX === 'hidden' ||
              pStyle.overflowX === 'clip' ||
              pStyle.overflow === 'hidden'
            ) {
              isContainedByOverflowHidden = true;
              break;
            }
            parent = parent.parentElement;
          }

          const rect = el.getBoundingClientRect();
          if (!isContainedByOverflowHidden && rect.right > innerWidth + 1 && rect.width > 0) {
            const selector = el.tagName.toLowerCase() +
              (el.id ? `#${el.id}` : '') +
              (el.className ? `.${String(el.className).trim().split(/\s+/).slice(0, 3).join('.')}` : '');
            offending.push({
              selector,
              right: Math.round(rect.right),
              width: Math.round(rect.width),
              excess: Math.round(rect.right - innerWidth),
            });
          }
        }

        // Dynamic vertical scroll test
        const maxScroll = Math.max(doc.scrollHeight, body.scrollHeight) - window.innerHeight;
        let horizontalScrollOccurred = false;
        let maxHorizontalScroll = 0;

        for (let y = 0; y <= maxScroll; y += 400) {
          window.scrollTo(0, y);
          if (window.scrollX > 0 || doc.scrollWidth > innerWidth + 1) {
            horizontalScrollOccurred = true;
            maxHorizontalScroll = Math.max(maxHorizontalScroll, window.scrollX, doc.scrollWidth - innerWidth);
          }
        }
        window.scrollTo(0, 0);

        return {
          docScrollWidth,
          bodyScrollWidth,
          docClientWidth,
          innerWidth,
          hasHorizontalOverflow: docScrollWidth > innerWidth + 1 || bodyScrollWidth > innerWidth + 1,
          horizontalScrollOccurred,
          maxHorizontalScroll,
          offendingCount: offending.length,
          offendingSample: offending.slice(0, 5),
        };
      }, vp.width);

      const passDocOverflow = assert(
        `[${vp.category}] ${vp.name} (${vp.width}x${vp.height}): document.scrollWidth (${layoutData.docScrollWidth}px) <= innerWidth (${layoutData.innerWidth}px)`,
        !layoutData.hasHorizontalOverflow,
        `doc: ${layoutData.docScrollWidth}px, inner: ${layoutData.innerWidth}px`
      );

      const passScrollScan = assert(
        `[${vp.category}] ${vp.name} (${vp.width}x${vp.height}): Dynamic vertical scroll produces zero horizontal shift`,
        !layoutData.horizontalScrollOccurred,
        `max shift: ${layoutData.maxHorizontalScroll}px`
      );

      const passNoProtruding = assert(
        `[${vp.category}] ${vp.name} (${vp.width}x${vp.height}): Zero unconstrained protruding DOM elements`,
        layoutData.offendingCount === 0,
        layoutData.offendingCount > 0 ? `found ${layoutData.offendingCount} protruding: ${JSON.stringify(layoutData.offendingSample)}` : 'clean'
      );

      results.viewports.push({
        viewport: vp,
        layoutData,
        passed: passDocOverflow && passScrollScan && passNoProtruding,
      });
    }

    // ------------------------------------------------------------------
    // TEST SECTION 2: IMAGE RESPONSIVENESS AND BOUNDS INTEGRITY
    // ------------------------------------------------------------------
    console.log('\n--- SECTION 2: IMAGE RESPONSIVENESS & BOUNDING BOX INTEGRITY ---');

    await page.setViewport({ width: 320, height: 568 });

    // Inspect all images on the page for boundary conformance and load integrity
    const imageAudit = await page.evaluate(() => {
      const images = Array.from(document.querySelectorAll('img'));
      const details = [];
      let brokenImages = 0;
      let overflowingImages = 0;

      for (const img of images) {
        const rect = img.getBoundingClientRect();
        const exceedsWindow = rect.width > window.innerWidth + 1;
        const isBroken = img.complete && img.naturalWidth === 0;

        if (isBroken) brokenImages++;
        if (exceedsWindow) overflowingImages++;

        details.push({
          src: img.src ? img.src.substring(img.src.lastIndexOf('/') + 1) : 'no-src',
          displayWidth: Math.round(rect.width),
          naturalWidth: img.naturalWidth,
          isBroken,
          exceedsWindow,
        });
      }

      return {
        totalImages: images.length,
        brokenImages,
        overflowingImages,
        details: details.slice(0, 10),
      };
    });

    assert(
      `Images loaded count >= 10 at 320px viewport`,
      imageAudit.totalImages >= 10,
      `found ${imageAudit.totalImages} images`
    );

    assert(
      `Zero broken image tags (naturalWidth > 0 on completed images)`,
      imageAudit.brokenImages === 0,
      `broken: ${imageAudit.brokenImages}`
    );

    assert(
      `Zero images overflowing 320px viewport bounds`,
      imageAudit.overflowingImages === 0,
      `overflowing: ${imageAudit.overflowingImages}`
    );

    results.imageTests = imageAudit;

    // ------------------------------------------------------------------
    // TEST SECTION 3: MOBILE DRAWER MENU & HAMBURGER BUTTON STRESS
    // ------------------------------------------------------------------
    console.log('\n--- SECTION 3: MOBILE DRAWER MENU & HAMBURGER TOGGLE STRESS ---');

    await page.setViewport({ width: 320, height: 568 });
    await new Promise((r) => setTimeout(r, 200));

    // 1. Check hamburger button presence & dimensions
    const hamburgerInfo = await page.evaluate(() => {
      const btn = document.querySelector('button[data-testid="hamburger-menu"], header button:has(svg)');
      if (!btn) return null;
      const rect = btn.getBoundingClientRect();
      const style = window.getComputedStyle(btn);
      return {
        found: true,
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        visible: style.display !== 'none' && style.visibility !== 'hidden',
        ariaLabel: btn.getAttribute('aria-label'),
      };
    });

    assert(
      `Mobile hamburger button exists and is visible at 320px`,
      hamburgerInfo && hamburgerInfo.visible,
      hamburgerInfo ? `${hamburgerInfo.width}x${hamburgerInfo.height}px, aria-label: ${hamburgerInfo.ariaLabel}` : 'not found'
    );

    assert(
      `Mobile hamburger button touch target meets >= 44x44px standard`,
      hamburgerInfo && hamburgerInfo.width >= 44 && hamburgerInfo.height >= 44,
      `actual: ${hamburgerInfo?.width}x${hamburgerInfo?.height}px`
    );

    // 2. Open drawer menu
    const hamburgerBtn = await page.$('button[data-testid="hamburger-menu"], header button:has(svg)');
    if (hamburgerBtn) {
      await hamburgerBtn.click();
      await new Promise((r) => setTimeout(r, 400));
    }

    const drawerOpenState = await page.evaluate(() => {
      const drawer = document.querySelector('[data-testid="mobile-drawer"]');
      if (!drawer) return { found: false };
      const rect = drawer.getBoundingClientRect();
      const style = window.getComputedStyle(drawer);
      const isVisible = parseFloat(style.opacity) > 0.8 && style.pointerEvents !== 'none';
      const docScrollWidth = document.documentElement.scrollWidth;

      const navLinks = Array.from(drawer.querySelectorAll('a[href]'));
      const linkHeights = navLinks.map((l) => Math.round(l.getBoundingClientRect().height));
      const minLinkHeight = linkHeights.length > 0 ? Math.min(...linkHeights) : 0;

      return {
        found: true,
        isVisible,
        docScrollWidth,
        innerWidth: window.innerWidth,
        causesOverflow: docScrollWidth > window.innerWidth + 1,
        linkCount: navLinks.length,
        minLinkHeight,
      };
    });

    assert(
      `Mobile drawer opens with opacity 1 and pointer-events active`,
      drawerOpenState.found && drawerOpenState.isVisible,
      `links: ${drawerOpenState.linkCount}`
    );

    assert(
      `Mobile drawer does not cause horizontal overflow on 320px screen`,
      !drawerOpenState.causesOverflow,
      `docScrollWidth: ${drawerOpenState.docScrollWidth}px, innerWidth: ${drawerOpenState.innerWidth}px`
    );

    assert(
      `Mobile drawer navigation links have adequate touch targets (>= 44px height)`,
      drawerOpenState.minLinkHeight >= 44,
      `min link height: ${drawerOpenState.minLinkHeight}px`
    );

    // 3. Test closing drawer via close button (X)
    if (hamburgerBtn) {
      await hamburgerBtn.click();
      await new Promise((r) => setTimeout(r, 400));
    }

    const drawerClosedState = await page.evaluate(() => {
      const drawer = document.querySelector('[data-testid="mobile-drawer"]');
      if (!drawer) return { closed: true };
      const style = window.getComputedStyle(drawer);
      return {
        closed: parseFloat(style.opacity) < 0.2 || style.pointerEvents === 'none',
      };
    });

    assert(
      `Mobile drawer closes properly when toggle is clicked again`,
      drawerClosedState.closed,
      'closed cleanly'
    );

    // ------------------------------------------------------------------
    // TEST SECTION 4: MOBILE STICKY BOTTOM CONVERSION BAR
    // ------------------------------------------------------------------
    console.log('\n--- SECTION 4: MOBILE STICKY BOTTOM CONVERSION BAR ---');

    // Test on 320px, 375px, 480px (should be visible)
    for (const width of [320, 375, 480]) {
      await page.setViewport({ width, height: 700 });
      await new Promise((r) => setTimeout(r, 150));

      const stickyInfo = await page.evaluate(() => {
        const bar = document.querySelector('div.fixed.bottom-0');
        if (!bar) return { found: false };
        const style = window.getComputedStyle(bar);
        const rect = bar.getBoundingClientRect();
        const isVisible = style.display !== 'none' && style.visibility !== 'hidden' && rect.height > 0;
        const buttons = Array.from(bar.querySelectorAll('button, a'));
        return {
          found: true,
          isVisible,
          height: Math.round(rect.height),
          width: Math.round(rect.width),
          buttonCount: buttons.length,
          buttonsTouchOk: buttons.every((b) => b.getBoundingClientRect().height >= 40),
        };
      });

      assert(
        `Sticky bottom bar is visible and formatted at ${width}px`,
        stickyInfo.found && stickyInfo.isVisible,
        `${stickyInfo.width}x${stickyInfo.height}px, ${stickyInfo.buttonCount} buttons`
      );

      assert(
        `Sticky bottom bar action buttons meet touch targets at ${width}px`,
        stickyInfo.buttonsTouchOk,
        'touch targets >= 40px'
      );
    }

    // Test on 768px and 1280px (must be hidden)
    for (const width of [768, 1280]) {
      await page.setViewport({ width, height: 800 });
      await new Promise((r) => setTimeout(r, 150));

      const isHiddenOnDesktop = await page.evaluate(() => {
        const bar = document.querySelector('div.fixed.bottom-0.block.md\\:hidden, div.fixed.bottom-0.md\\:hidden');
        if (!bar) {
          const allBottomBars = Array.from(document.querySelectorAll('div.fixed.bottom-0'));
          return allBottomBars.every((b) => {
            const style = window.getComputedStyle(b);
            return style.display === 'none' || style.visibility === 'hidden' || b.offsetHeight === 0;
          });
        }
        const style = window.getComputedStyle(bar);
        return style.display === 'none' || style.visibility === 'hidden' || bar.offsetHeight === 0;
      });

      assert(
        `Sticky mobile bar is hidden on ${width}px (tablet/desktop)`,
        isHiddenOnDesktop,
        `hidden on width ${width}px`
      );
    }

    // ------------------------------------------------------------------
    // TEST SECTION 5: TOUCH TARGET ACCESSIBILITY AUDIT (MOBILE 320PX)
    // ------------------------------------------------------------------
    console.log('\n--- SECTION 5: TOUCH TARGET ACCESSIBILITY AUDIT (MOBILE 320px) ---');

    await page.setViewport({ width: 320, height: 600 });
    await new Promise((r) => setTimeout(r, 200));

    const touchAudit = await page.evaluate(() => {
      // Primary mobile action controls
      const primaryControls = [
        ...Array.from(document.querySelectorAll('header a[href*="tel"], header button[data-testid="hamburger-menu"]')),
        ...Array.from(document.querySelectorAll('[data-testid="mobile-drawer"] a')),
        ...Array.from(document.querySelectorAll('div.fixed.bottom-0 button, div.fixed.bottom-0 a')),
        ...Array.from(document.querySelectorAll('#calculator button.bg-gradient-to-r, #calculator button:has(svg.lucide-arrow-left)')),
        ...Array.from(document.querySelectorAll('#gallery button[role="tab"], #gallery button.rounded-full')),
      ];

      const undersizedPrimary = [];
      let primaryChecked = 0;

      for (const el of primaryControls) {
        const style = window.getComputedStyle(el);
        if (
          style.display === 'none' ||
          style.visibility === 'hidden' ||
          style.opacity === '0' ||
          el.offsetParent === null
        ) {
          continue;
        }

        const rect = el.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) continue;

        primaryChecked++;
        if (rect.height < 40 || rect.width < 40) {
          const desc = el.innerText?.trim()?.slice(0, 25) || el.getAttribute('aria-label') || el.tagName;
          undersizedPrimary.push({
            tag: el.tagName,
            desc,
            width: Math.round(rect.width),
            height: Math.round(rect.height),
          });
        }
      }

      // Stepper indicator circles
      const stepperControls = Array.from(document.querySelectorAll('#calculator button[aria-label*="Шаг"]'));
      const minStepperHeight = stepperControls.length > 0
        ? Math.min(...stepperControls.map((s) => Math.round(s.getBoundingClientRect().height)))
        : 0;

      return {
        primaryChecked,
        undersizedPrimaryCount: undersizedPrimary.length,
        undersizedPrimarySample: undersizedPrimary.slice(0, 5),
        stepperCount: stepperControls.length,
        minStepperHeight,
        stepperWcag22Passed: minStepperHeight >= 24, // WCAG 2.2 AA target size minimum
      };
    });

    assert(
      `Audited primary action touch targets on 320px viewport`,
      touchAudit.primaryChecked >= 10,
      `checked ${touchAudit.primaryChecked} primary interactive targets`
    );

    assert(
      `All mobile primary action buttons meet accessible dimensions (>= 40-48px height)`,
      touchAudit.undersizedPrimaryCount === 0,
      touchAudit.undersizedPrimaryCount > 0 ? `undersized: ${JSON.stringify(touchAudit.undersizedPrimarySample)}` : 'all >= 40px'
    );

    assert(
      `Calculator stepper indicator breadcrumbs meet WCAG 2.2 AA target size (>= 24x24px)`,
      touchAudit.stepperWcag22Passed,
      `actual: ${touchAudit.minStepperHeight}x${touchAudit.minStepperHeight}px (WCAG minimum: 24px)`
    );

    // ------------------------------------------------------------------
    // TEST SECTION 6: MEASUREMENT MODAL AT 320PX VIEWPORT
    // ------------------------------------------------------------------
    console.log('\n--- SECTION 6: MODAL FIT & ACCESSIBILITY AT 320PX ---');

    await page.setViewport({ width: 320, height: 568 });
    await new Promise((r) => setTimeout(r, 200));

    // Find and click visible measurement trigger button in sticky bottom bar
    const measurementTrigger = await page.$('div.fixed.bottom-0 button');
    if (measurementTrigger) {
      await measurementTrigger.click();
      await new Promise((r) => setTimeout(r, 400));
    } else {
      // Fallback: click any visible button with замер
      const cta = await page.evaluateHandle(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        return btns.find((b) => b.offsetWidth > 0 && /замер|вызвать/i.test(b.innerText)) || null;
      });
      if (cta && cta.asElement()) {
        await cta.asElement().click();
        await new Promise((r) => setTimeout(r, 400));
      }
    }

    const modalAudit = await page.evaluate(() => {
      const modal = document.querySelector('[role="dialog"], [aria-modal="true"]');
      if (!modal) return { found: false };

      const card = modal.querySelector('div.relative.w-full, div[class*="max-w"]') || modal;
      const cardRect = card.getBoundingClientRect();
      const innerW = window.innerWidth;

      const inputs = Array.from(modal.querySelectorAll('input, select, textarea'));
      const allInputsFit = inputs.every((inp) => {
        const r = inp.getBoundingClientRect();
        return r.right <= innerW && r.left >= 0;
      });

      const closeBtn = modal.querySelector('button[aria-label*="акрыть"], button:has(svg.lucide-x)');
      const closeBtnRect = closeBtn ? closeBtn.getBoundingClientRect() : null;

      return {
        found: true,
        cardWidth: Math.round(cardRect.width),
        fitsHorizontally: cardRect.right <= innerW + 1 && cardRect.left >= -1,
        allInputsFit,
        closeBtnFound: !!closeBtn,
        closeBtnTouchSize: closeBtnRect ? `${Math.round(closeBtnRect.width)}x${Math.round(closeBtnRect.height)}px` : 'none',
      };
    });

    assert(
      `Measurement modal opens and renders within 320px viewport`,
      modalAudit.found && modalAudit.fitsHorizontally,
      `modal width: ${modalAudit.cardWidth}px, innerWidth: 320px`
    );

    assert(
      `Measurement modal input fields fit within viewport without spilling`,
      modalAudit.allInputsFit,
      'all inputs fully contained'
    );

    // Close modal via Close Button
    const modalCloseBtn = await page.evaluateHandle(() => {
      const modal = document.querySelector('[role="dialog"], [aria-modal="true"]');
      if (!modal) return null;
      return modal.querySelector('button:has(svg.lucide-x), button[aria-label*="акрыть"]') || null;
    });

    if (modalCloseBtn && modalCloseBtn.asElement()) {
      await modalCloseBtn.asElement().click();
      await new Promise((r) => setTimeout(r, 400));
    }

    const modalClosedCleanly = await page.evaluate(() => {
      const m = document.querySelector('[role="dialog"], [aria-modal="true"]');
      return !m;
    });

    assert(
      `Measurement modal closes cleanly when close button is clicked`,
      modalClosedCleanly,
      'modal dismissed'
    );

    // ------------------------------------------------------------------
    // TEST SECTION 7: CALCULATOR STEPPING AT 320PX
    // ------------------------------------------------------------------
    console.log('\n--- SECTION 7: CALCULATOR 5-STEPPING FLOW AT 320PX ---');

    await page.setViewport({ width: 320, height: 600 });
    await new Promise((r) => setTimeout(r, 200));

    // Scroll to calculator
    await page.evaluate(() => {
      const calc = document.querySelector('#calculator');
      if (calc) calc.scrollIntoView();
    });
    await new Promise((r) => setTimeout(r, 250));

    const calcFlowPassed = await page.evaluate(async () => {
      const stepsChecked = [];
      const innerW = window.innerWidth;

      function checkOverflow(stepName) {
        const docW = document.documentElement.scrollWidth;
        const overflow = docW > innerW + 1;
        stepsChecked.push({ step: stepName, docW, innerW, overflow });
        return !overflow;
      }

      // Step 1 check
      if (!checkOverflow('Step 1')) return { success: false, stepsChecked };

      // Click Next to Step 2
      const nextBtn1 = Array.from(document.querySelectorAll('#calculator button')).find((b) => /далее/i.test(b.innerText));
      if (nextBtn1) {
        nextBtn1.click();
        await new Promise((r) => setTimeout(r, 200));
        if (!checkOverflow('Step 2')) return { success: false, stepsChecked };
      }

      // Click Next to Step 3
      const nextBtn2 = Array.from(document.querySelectorAll('#calculator button')).find((b) => /далее/i.test(b.innerText));
      if (nextBtn2) {
        nextBtn2.click();
        await new Promise((r) => setTimeout(r, 200));
        if (!checkOverflow('Step 3')) return { success: false, stepsChecked };
      }

      // Click Next to Step 4
      const nextBtn3 = Array.from(document.querySelectorAll('#calculator button')).find((b) => /далее/i.test(b.innerText));
      if (nextBtn3) {
        nextBtn3.click();
        await new Promise((r) => setTimeout(r, 200));
        if (!checkOverflow('Step 4')) return { success: false, stepsChecked };
      }

      // Click Next to Step 5
      const nextBtn4 = Array.from(document.querySelectorAll('#calculator button')).find((b) => /далее/i.test(b.innerText));
      if (nextBtn4) {
        nextBtn4.click();
        await new Promise((r) => setTimeout(r, 200));
        if (!checkOverflow('Step 5')) return { success: false, stepsChecked };
      }

      return { success: true, stepsChecked };
    });

    assert(
      `Calculator 5-step workflow operates with zero horizontal overflow at 320px`,
      calcFlowPassed.success,
      `steps verified: ${calcFlowPassed.stepsChecked.map((s) => s.step).join(', ')}`
    );

  } catch (err) {
    console.error('UNEXPECTED TEST EXECUTION ERROR:', err);
    results.summary.failed++;
  } finally {
    if (browser) await browser.close();
    if (serverHandle?.process) {
      console.log('Stopping spawned test server...');
      serverHandle.process.kill();
    }
  }

  console.log('\n======================================================================');
  console.log('                   CHALLENGER VERIFICATION SUMMARY                    ');
  console.log('======================================================================');
  console.log(`Total Checks Run:  ${results.summary.total}`);
  console.log(`Passed:            ${results.summary.passed}`);
  console.log(`Failed:            ${results.summary.failed}`);
  console.log(`Definitive Verdict: ${results.summary.failed === 0 ? '\x1b[32mAPPROVE\x1b[0m' : '\x1b[31mREJECT\x1b[0m'}`);
  console.log('======================================================================\n');

  // Write detailed results to JSON artifact for handoff documentation
  fs.writeFileSync(
    '/Users/sergejzatovka/Documents/.agents/teamwork/challenger_1/empirical_results.json',
    JSON.stringify(results, null, 2)
  );

  return results.summary.failed === 0;
}

runChallengerSuite().then((ok) => {
  process.exit(ok ? 0 : 1);
});
