"use client";

import Image from "next/image";
import { useTheme } from "@/components/ThemeProvider";
import { useEffect, useState } from "react";
import type { SeasonalImage } from "@/lib/themes";

export default function SeasonalImages() {
  const { themeId } = useTheme();
  const [images, setImages] = useState<SeasonalImage[]>([]);

  useEffect(() => {
    import("@/lib/themes").then((m) => {
      setImages(m.getThemeConfig(themeId).seasonalImages);
    });
  }, [themeId]);

  if (images.length === 0) return null;

  return (
    <section className="bg-white py-10">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-6 px-6">
        {images.map((img) => (
          <Image
            key={img.src}
            src={img.src}
            alt={img.alt}
            width={img.width}
            height={img.height}
            className="h-auto w-28 sm:w-36"
          />
        ))}
      </div>
    </section>
  );
}
