"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;

    root.style.scrollBehavior = "auto";
    window.scrollTo({ left: 0, top: 0, behavior: "auto" });

    requestAnimationFrame(() => {
      root.style.scrollBehavior = previousScrollBehavior;
    });
  }, [pathname]);

  return null;
}
