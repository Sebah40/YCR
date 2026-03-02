"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isStPatrick, setIsStPatrick] = useState(false);

  useEffect(() => {
    setIsStPatrick(document.documentElement.getAttribute("data-theme") === "st-patrick");
  }, []);

  function toggle() {
    const next = !isStPatrick;
    if (next) {
      document.documentElement.setAttribute("data-theme", "st-patrick");
      localStorage.setItem("ycr-theme", "st-patrick");
    } else {
      document.documentElement.removeAttribute("data-theme");
      localStorage.removeItem("ycr-theme");
    }
    setIsStPatrick(next);
  }

  return (
    <button
      onClick={toggle}
      aria-label={isStPatrick ? "Disable St. Patrick's theme" : "Enable St. Patrick's theme"}
      className="rounded-full p-2 text-xl transition-transform hover:scale-110"
      title={isStPatrick ? "Back to normal" : "St. Patrick's Day mode!"}
    >
      {isStPatrick ? "🐕" : "☘️"}
    </button>
  );
}
