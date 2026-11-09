#!/usr/bin/env python3
"""
Curate and copy top real installation photos and video assets from
/Users/sergejzatovka/Documents/фотки душ/ChatExport_Душевые кабины и зеркала от Влада
into public/portfolio/ and public/videos/
"""

import os
import shutil
import sys

SOURCE_ROOT = "/Users/sergejzatovka/Documents/фотки душ/ChatExport_Душевые кабины и зеркала от Влада"
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TARGET_PORTFOLIO = os.path.join(PROJECT_ROOT, "public", "portfolio")
TARGET_VIDEOS = os.path.join(PROJECT_ROOT, "public", "videos")

PHOTOS_MAP = {
    # Corner 90° cabins (8 photos)
    "photo_154_0.jpg": "corner_01.jpg",
    "photo_146_0.jpg": "corner_02.jpg",
    "photo_8_0.jpg": "corner_03.jpg",
    "photo_57_0.jpg": "corner_04.jpg",
    "photo_317_0.jpg": "corner_05.jpg",
    "photo_315_0.jpg": "corner_06.jpg",
    "photo_85_0.jpg": "corner_07.jpg",
    "photo_186_0.jpg": "corner_08.jpg",

    # Walk-in partitions (8 photos)
    "photo_95_0.jpg": "walkin_01.jpg",
    "photo_254_0.jpg": "walkin_02.jpg",
    "photo_83_0.jpg": "walkin_03.jpg",
    "photo_109_0.jpg": "walkin_04.jpg",
    "photo_163_0.jpg": "walkin_05.jpg",
    "photo_279_0.jpg": "walkin_06.jpg",
    "photo_2_0.jpg": "walkin_07.jpg",
    "photo_120_0.jpg": "walkin_08.jpg",

    # Sliding systems (8 photos)
    "photo_29_0.jpg": "sliding_01.jpg",
    "photo_98_0.jpg": "sliding_02.jpg",
    "photo_78_0.jpg": "sliding_03.jpg",
    "photo_47_0.jpg": "sliding_04.jpg",
    "photo_238_0.jpg": "sliding_05.jpg",
    "photo_307_0.jpg": "sliding_06.jpg",
    "photo_14_0.jpg": "sliding_07.jpg",
    "photo_115_0.jpg": "sliding_08.jpg",

    # Niche swing doors (8 photos)
    "photo_153_0.jpg": "niche_01.jpg",
    "photo_53_0.jpg": "niche_02.jpg",
    "photo_184_0.jpg": "niche_03.jpg",
    "photo_218_0.jpg": "niche_04.jpg",
    "photo_242_0.jpg": "niche_05.jpg",
    "photo_298_0.jpg": "niche_06.jpg",
    "photo_320_0.jpg": "niche_07.jpg",
    "photo_103_0.jpg": "niche_08.jpg",

    # Bath screens (6 photos)
    "photo_25_0.jpg": "bath_01.jpg",
    "photo_37_0.jpg": "bath_02.jpg",
    "photo_137_0.jpg": "bath_03.jpg",
    "photo_173_0.jpg": "bath_04.jpg",
    "photo_225_0.jpg": "bath_05.jpg",
    "photo_305_0.jpg": "bath_06.jpg",

    # Pentagonal / Trapezoid 135° (4 photos)
    "photo_35_0.jpg": "trapezoid_01.jpg",
    "photo_104_0.jpg": "trapezoid_02.jpg",
    "photo_181_0.jpg": "trapezoid_03.jpg",
    "photo_125_0.jpg": "trapezoid_04.jpg",

    # LED mirrors (6 photos)
    "photo_131_0.jpg": "mirror_01.jpg",
    "photo_165_0.jpg": "mirror_02.jpg",
    "photo_281_0.jpg": "mirror_03.jpg",
    "photo_290_0.jpg": "mirror_04.jpg",
    "photo_300_0.jpg": "mirror_05.jpg",
    "photo_107_0.jpg": "mirror_06.jpg",

    # Loft / Balustrades / Architecture (6 photos)
    "photo_250_0.jpg": "loft_01.jpg",
    "photo_62_0.jpg": "loft_02.jpg",
    "photo_10_0.jpg": "loft_03.jpg",
    "photo_196_0.jpg": "loft_04.jpg",
    "photo_112_0.jpg": "loft_05.jpg",
    "photo_245_0.jpg": "loft_06.jpg",

    # Specific details & Master portrait
    "photo_79_0.jpg": "detail_roller.jpg",
    "photo_149_0.jpg": "detail_stabilizer.jpg",
    "photo_60_0.jpg": "detail_aquastop.jpg",
    "photo_230_0.jpg": "boheme_hardware.jpg",
    "photo_139_0.jpg": "master_vlad.jpg",
}

EXTRA_COPIES = {
    # Hero high-impact image
    "photo_154_0.jpg": "hero_optiwhite_gold.jpg",
}

VIDEOS_MAP = {
    "171_file_171_0.mp4": "sliding_bath_demo.mp4",
    "204_file_204_0.mp4": "estriado_gold_demo.mp4",
}

THUMBS_MAP = {
    "thumb_171_0.jpg": "sliding_bath_thumb.jpg",
    "thumb_204_0.jpg": "estriado_gold_thumb.jpg",
}

def main():
    print(f"Project root: {PROJECT_ROOT}")
    print(f"Source root: {SOURCE_ROOT}")
    os.makedirs(TARGET_PORTFOLIO, exist_ok=True)
    os.makedirs(TARGET_VIDEOS, exist_ok=True)

    src_photos = os.path.join(SOURCE_ROOT, "photos")
    src_videos = os.path.join(SOURCE_ROOT, "video_files")
    src_thumbs = os.path.join(SOURCE_ROOT, "thumbs")

    copied_photos = 0
    for src_name, target_name in PHOTOS_MAP.items():
        src_path = os.path.join(src_photos, src_name)
        dst_path = os.path.join(TARGET_PORTFOLIO, target_name)
        if not os.path.exists(src_path):
            print(f"Warning: source file missing: {src_path}", file=sys.stderr)
            continue
        shutil.copy2(src_path, dst_path)
        copied_photos += 1

    for src_name, target_name in EXTRA_COPIES.items():
        src_path = os.path.join(src_photos, src_name)
        dst_path = os.path.join(TARGET_PORTFOLIO, target_name)
        if os.path.exists(src_path):
            shutil.copy2(src_path, dst_path)

    copied_videos = 0
    for src_name, target_name in VIDEOS_MAP.items():
        src_path = os.path.join(src_videos, src_name)
        dst_path = os.path.join(TARGET_VIDEOS, target_name)
        if os.path.exists(src_path):
            shutil.copy2(src_path, dst_path)
            copied_videos += 1

    for src_name, target_name in THUMBS_MAP.items():
        src_path = os.path.join(src_thumbs, src_name)
        dst_path = os.path.join(TARGET_VIDEOS, target_name)
        if os.path.exists(src_path):
            shutil.copy2(src_path, dst_path)

    print(f"Successfully copied {copied_photos} portfolio photos and {copied_videos} video assets.")

if __name__ == "__main__":
    main()
