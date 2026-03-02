"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function StPatrickBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const check = () =>
      setVisible(document.documentElement.getAttribute("data-theme") === "st-patrick");

    check();

    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  if (!visible) return null;

  return (
    <div className="bg-gradient-to-r from-green-700 via-emerald-600 to-green-700 px-4 py-2 text-center text-sm font-semibold text-white">
      <span className="inline-flex items-center gap-2">
        <Image
          src="/images/scraped/images/holidays/st-patrick/chi-4-leaf-clover.png"
          alt=""
          width={28}
          height={28}
          className="h-7 w-7"
        />
        Happy St. Patrick&apos;s Day from Yankee Chihuahua Rescue!
        <Image
          src="/images/scraped/images/holidays/st-patrick/chi-st-patrick-glasses.png"
          alt=""
          width={28}
          height={28}
          className="h-7 w-7"
        />
      </span>
    </div>
  );
}
