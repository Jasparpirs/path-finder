import { createFileRoute, Link } from "@tanstack/react-router";
import { schools } from "@/data/schools";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "ÕpiEesti — Schools & professions in Estonia after 9th grade" },
      { name: "description", content: "Browse Estonian universities, applied universities and vocational schools. Find every profession they offer." },
    ],
  }),
});

type Filter = "all" | "university" | "applied" | "vocational" | "after9";

function HomePage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [q, setQ] = useState("");

  const filtered = schools.filter((s) => {
    if (filter === "after9" && !s.acceptsAfter9) return false;
    if (filter !== "all" && filter !== "after9" && s.type !== filter) return false;
    if (q && !`${s.name} ${s.city} ${s.professions.map((p) => p.name).join(" ")}`.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-90" style={{ background: "var(--gradient-hero)" }} />
        <div className="mx-auto max-w-6xl px-6 py-24 text-brand-foreground">
          <p className="uppercase tracking-[0.2em] text-xs opacity-80 mb-4">Estonia · After 9th grade</p>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight max-w-3xl">
            Find your future school <span className="opacity-80">— and the profession that fits you.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg opacity-90">
            Every university and vocational school in Estonia, every profession they teach, and a short quiz that tells you what to study.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/quiz" className="inline-flex items-center rounded-md bg-background text-foreground px-5 py-3 font-semibold shadow-[var(--shadow-card)] hover:translate-y-[-1px] transition-transform">
              Take the career quiz →
            </Link>
            <a href="#schools" className="inline-flex items-center rounded-md border border-white/30 px-5 py-3 font-semibold hover:bg-white/10 transition-colors">
              Browse schools
            </a>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section id="schools" className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-wrap gap-3 items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Schools in Estonia</h2>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search school or profession…"
            className="px-4 py-2 rounded-md border border-border bg-background text-sm w-72 max-w-full focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>
        <div className="flex flex-wrap gap-2 mb-8">
          {([
            ["all", "All"],
            ["university", "Universities"],
            ["applied", "Applied universities"],
            ["vocational", "Vocational (kutsekool)"],
            ["after9", "Accepts after 9th grade"],
          ] as [Filter, string][]).map(([key, label]) => (
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
                  <span className="text-xs bg-accent-2/30 text-foreground px-2 py-1 rounded-full whitespace-nowrap">After 9th</span>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-3">{s.description}</p>
              <p className="text-xs mt-4 text-foreground/70">
                {s.professions.length} professions · {s.type === "vocational" ? "Vocational school" : s.type === "applied" ? "Applied university" : "University"}
              </p>
            </Link>
          ))}
          {filtered.length === 0 && (
            <p className="text-muted-foreground col-span-full text-center py-12">No schools match.</p>
          )}
        </div>
      </section>
    </div>
  );
}
