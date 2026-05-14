import { useEffect, useState } from "react";

export type Level = "after9" | "higher";

const KEY = "opieesti.level";

export function getStoredLevel(): Level | null {
  if (typeof window === "undefined") return null;
  const v = window.localStorage.getItem(KEY);
  return v === "after9" || v === "higher" ? v : null;
}

export function setStoredLevel(l: Level) {
  window.localStorage.setItem(KEY, l);
  window.dispatchEvent(new CustomEvent("opieesti-level-change"));
}

export function clearStoredLevel() {
  window.localStorage.removeItem(KEY);
  window.dispatchEvent(new CustomEvent("opieesti-level-change"));
}

/** React hook — current level (null = not chosen yet). */
export function useLevel(): [Level | null, (l: Level) => void, () => void] {
  const [level, setLevel] = useState<Level | null>(null);

  useEffect(() => {
    setLevel(getStoredLevel());
    const onChange = () => setLevel(getStoredLevel());
    window.addEventListener("opieesti-level-change", onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener("opieesti-level-change", onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  return [
    level,
    (l: Level) => { setStoredLevel(l); setLevel(l); },
    () => { clearStoredLevel(); setLevel(null); },
  ];
}

export const levelLabel: Record<Level, string> = {
  after9: "Lõpetan 9. klassi",
  higher: "Lõpetan gümnaasiumi / kõrgem haridus",
};
