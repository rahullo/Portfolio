"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const CustomCursor = dynamic(() => import("./CustomCursor"), {
  ssr: false,
});
const CommandPalette = dynamic(() => import("./CommandPalette"), {
  ssr: false,
});

export default function GlobalEffects() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <CustomCursor />
      <CommandPalette />
    </>
  );
}
