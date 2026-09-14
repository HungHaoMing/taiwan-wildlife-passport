#!/usr/bin/env python3
"""Convert black-on-white stamp images into transparent PNG overlays."""

from __future__ import annotations

import argparse
from pathlib import Path

import cv2
import numpy as np


def remove_white_background(
    source: Path,
    destination: Path,
    transparent_from: int = 246,
    opaque_until: int = 32,
) -> None:
    """Keep dark ink opaque and map the white paper smoothly to transparency."""
    image = cv2.imread(str(source), cv2.IMREAD_GRAYSCALE)
    if image is None:
        raise ValueError(f"Could not read image: {source}")
    if not 0 <= opaque_until < transparent_from <= 255:
        raise ValueError("Thresholds must satisfy 0 <= opaque_until < transparent_from <= 255")

    gray = image.astype(np.float32)
    alpha = (transparent_from - gray) * (255.0 / (transparent_from - opaque_until))
    alpha = np.clip(alpha, 0, 255).astype(np.uint8)

    # Store neutral black RGB beneath the alpha channel to avoid pale JPEG halos.
    black = np.zeros_like(image)
    output = cv2.merge((black, black, black, alpha))
    destination.parent.mkdir(parents=True, exist_ok=True)
    if not cv2.imwrite(str(destination), output):
        raise OSError(f"Could not write image: {destination}")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("images", nargs="+", type=Path, help="Black-on-white JPG/PNG images")
    parser.add_argument("--suffix", default="-transparent", help="Output filename suffix")
    parser.add_argument("--transparent-from", type=int, default=246)
    parser.add_argument("--opaque-until", type=int, default=32)
    args = parser.parse_args()

    for source in args.images:
        destination = source.with_name(f"{source.stem}{args.suffix}.png")
        remove_white_background(
            source,
            destination,
            transparent_from=args.transparent_from,
            opaque_until=args.opaque_until,
        )
        print(destination)


if __name__ == "__main__":
    main()
