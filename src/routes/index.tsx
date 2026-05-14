import { createFileRoute, Link } from "@tanstack/react-router";
import { schools, typeLabels } from "@/data/schools";
import { gymnasiums } from "@/data/gymnasiums";
import { useLevel } from "@/lib/level";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "ÕpiEesti — Eesti koolid ja ametid pärast 9. klassi" },
      { name: "description", content: "Vaata Eesti ülikoolid, rakenduskõrgkoolid, gümnaasiumid ja kutsekoolid ning kõik nende erialad." },
    ],
  }),
});

type Filter = "all" | "university" | "applied" | "vocational";

function HomePage() {
  const [level, setLevel] = useLevel();
  const [filter, setFilter] = useState<Filter>("all");
  const [q, setQ] = useState("");

  // Schools shown depend on level: after9 → vocational; higher → university+applied.
  const baseSchools = !level
    ? schools
    : level === "after9"
      ? schools.filter((s) => s.acceptsAfter9)
      : schools.filter((s) => !s.acceptsAfter9);

  const filtered = baseSchools.filter((s) => {
    if (filter !== "all" && s.type !== filter) return false;
    if (q && !`${s.name} ${s.city} ${s.professions.map((p) => p.name).join(" ")}`.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  const filteredGyms = level === "after9"
    ? gymnasiums.filter((g) => !q || `${g.name} ${g.city}`.toLowerCase().includes(q.toLowerCase()))
    : [];

  const heroTitle = level === "after9"
    ? "Pärast 9. klassi: kutsekoolid ja gümnaasiumid"
    : level === "higher"
      ? "Pärast keskharidust: ülikoolid ja rakenduskõrgkoolid"
      : "Leia oma tulevane kool";

  const filterOptions: [Filter, string][] = level === "after9"
    ? [["all", "Kõik kutsekoolid"], ["vocational", "Kutsekoolid"]]
    : level === "higher"
      ? [["all", "Kõik kõrgkoolid"], ["university", "Ülikoolid"], ["applied", "Rakenduskõrgkoolid"]]
      : [["all", "Kõik"], ["university", "Ülikoolid"], ["applied", "Rakenduskõrgkoolid"], ["vocational", "Kutsekoolid"]];

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-90" style={{ background: "var(--gradient-hero)" }} />
        <div className="mx-auto max-w-6xl px-6 py-24 text-brand-foreground">
          <p className="uppercase tracking-[0.2em] text-xs opacity-80 mb-4">Eesti · sinu haridustee</p>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight max-w-3xl">
            {heroTitle} <span className="opacity-80">— ja eriala, mis sulle sobib.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg opacity-90">
            {level === "after9"
              ? "Kõik Eesti kutsekoolid ja gümnaasiumid, kuhu saad pärast 9. klassi õppima minna, ning lühike test, mis ütleb, mida õppida."
              : level === "higher"
                ? "Kõik Eesti ülikoolid ja rakenduskõrgkoolid, nende erialad ning karjääritest, mis aitab valida õige suuna."
                : "Kõik Eesti koolid ja ametid ühes kohas. Tee karjääritest ja leia, mis sulle sobib."}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/quiz" className="inline-flex items-center rounded-md bg-background text-foreground px-5 py-3 font-semibold shadow-[var(--shadow-card)] hover:translate-y-[-1px] transition-transform">
              Tee karjääritest →
            </Link>
            <a href="#schools" className="inline-flex items-center rounded-md border border-white/30 px-5 py-3 font-semibold hover:bg-white/10 transition-colors">
              Vaata koole
            </a>
          </div>
          <div className="mt-10 flex gap-8 text-sm opacity-80">
            <div><span className="text-2xl font-bold block">{baseSchools.length}</span>kooli</div>
            <div><span className="text-2xl font-bold block">{baseSchools.reduce((a, s) => a + s.professions.length, 0)}</span>eriala</div>
            {level === "after9" && (
              <div><span className="text-2xl font-bold block">{gymnasiums.length}</span>gümnaasiumi</div>
            )}
          </div>
        </div>
      </section>

      <section id="schools" className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-wrap gap-3 items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">
            {level === "after9" ? "Kutsekoolid" : level === "higher" ? "Kõrgkoolid" : "Eesti koolid"}
          </h2>
          <div className="flex items-center gap-3">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Otsi kooli või eriala…"
              className="px-4 py-2 rounded-md border border-border bg-background text-sm w-72 max-w-full focus:outline-none focus:ring-2 focus:ring-brand"
            />
          </div>
        </div>

        {filterOptions.length > 1 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {filterOptions.map(([key, label]) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`px-4 py-2 rounded-full text-sm border transition-colors ${
                  filter === key ? "bg-brand text-brand-foreground border-brand" : "border-border hover:border-brand"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        )}

        <div className="grid gap-5 md:grid-cols-2">
          {filtered.map((s) => (
            <Link
              key={s.id}
              to="/school/$schoolId"
              params={{ schoolId: s.id }}
              className="group block rounded-xl border border-border p-6 bg-card hover:shadow-[var(--shadow-card)] hover:border-brand transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">{s.city}</p>
                  <h3 className="text-xl font-semibold mt-1 group-hover:text-brand transition-colors">{s.name}</h3>
                </div>
                {s.acceptsAfter9 && (
                  <span className="text-xs bg-accent-2/30 text-foreground px-2 py-1 rounded-full whitespace-nowrap">Pärast 9. kl</span>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-3">{s.description}</p>
              <p className="text-xs mt-4 text-foreground/70">
                {s.professions.length} eriala · {typeLabels[s.type]}
              </p>
            </Link>
          ))}
          {filtered.length === 0 && (
            <p className="text-muted-foreground col-span-full text-center py-12">Ühtegi kooli ei leitud.</p>
          )}
        </div>

        {level === "after9" && filteredGyms.length > 0 && (
          <div className="mt-16">
            <div className="flex items-end justify-between mb-2">
              <h2 className="text-3xl font-bold">Gümnaasiumid</h2>
              <p className="text-sm text-muted-foreground">{filteredGyms.length} kooli</p>
            </div>
            <p className="text-muted-foreground mb-6">Kui soovid akadeemilist keskharidust enne ülikooli — siit valikust leiad Eesti tugevamad gümnaasiumid.</p>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredGyms.map((g) => (
                <a
                  key={g.id}
                  href={g.website}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-xl border border-border p-5 bg-card hover:border-brand hover:shadow-[var(--shadow-card)] transition-all"
                >
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">{g.city}</p>
                  <h3 className="text-base font-semibold mt-1">{g.name}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{g.description}</p>
                  <p className="text-xs text-brand mt-3">Koduleht ↗</p>
                </a>
              ))}
            </div>
          </div>
        )}

        {level && (
          <div className="mt-16 text-center text-sm text-muted-foreground">
            <button onClick={() => setLevel(level === "after9" ? "higher" : "after9")} className="underline hover:text-brand">
              Muuda haridustase
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
