import { useEffect, useState } from "react";
import { useLevel, type Level } from "@/lib/level";

/** Modaal mis küsib kasutajalt haridustaseme esimesel külastusel. */
export function LevelGate() {
  const [level, setLevel] = useLevel();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Ootame, et useLevel jõuaks lugeda localStorage'i.
    const t = setTimeout(() => {
      if (level === null) setOpen(true);
    }, 50);
    return () => clearTimeout(t);
  }, [level]);

  if (!open || level !== null) return null;

  function pick(l: Level) {
    setLevel(l);
    setOpen(false);
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-lg rounded-2xl bg-card border border-border shadow-2xl p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-brand">Tere tulemast</p>
        <h2 className="text-2xl md:text-3xl font-bold mt-2">Mis on sinu praegune haridustase?</h2>
        <p className="text-sm text-muted-foreground mt-2">
          Selle põhjal näitame sulle õigeid koole — kas kutsekoolid ja gümnaasiumid (pärast 9. klassi) või ülikoolid ja rakenduskõrgkoolid.
        </p>

        <div className="mt-6 grid gap-3">
          <button
            onClick={() => pick("after9")}
            className="text-left rounded-xl border border-border p-5 hover:border-brand hover:bg-secondary transition-all"
          >
            <p className="font-semibold text-base">Lõpetan / lõpetasin 9. klassi</p>
            <p className="text-sm text-muted-foreground mt-1">Näitame sulle kutsekoole ja gümnaasiume.</p>
          </button>
          <button
            onClick={() => pick("higher")}
            className="text-left rounded-xl border border-border p-5 hover:border-brand hover:bg-secondary transition-all"
          >
            <p className="font-semibold text-base">Lõpetan / lõpetasin gümnaasiumi (või midagi muud)</p>
            <p className="text-sm text-muted-foreground mt-1">Näitame sulle ülikoole ja rakenduskõrgkoole.</p>
          </button>
        </div>

        <p className="text-xs text-muted-foreground mt-6">
          Saad valikut hiljem päises muuta.
        </p>
      </div>
    </div>
  );
}
