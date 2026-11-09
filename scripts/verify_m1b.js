#!/usr/bin/env node
import { spawnSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const tsScript = path.join(__dirname, 'verify_m1b.ts');

const result = spawnSync('node', ['--experimental-strip-types', tsScript], {
  stdio: 'inherit',
});

process.exit(result.status ?? 0);
