"use client";

import Image from "next/image";
import { useTheme } from "@/components/ThemeProvider";
import { useEffect, useState } from "react";
import type { DecorativeSlot, DecorativeImage } from "@/lib/themes";

interface Props {
  slot: DecorativeSlot;
  width: number;
  height: number;
  className?: string;
}

export default function ThemedDecorativeImage({ slot, width, height, className }: Props) {
  const { themeId } = useTheme();
  const [image, setImage] = useState<DecorativeImage | null>(null);

  useEffect(() => {
    import("@/lib/themes").then((m) => {
      setImage(m.getThemeConfig(themeId).decorativeImages[slot]);
    });
  }, [themeId, slot]);

  if (!image) return null;

  return (
    <Image
      src={image.src}
      alt={image.alt}
      width={width}
      height={height}
      className={className}
    />
  );
}
