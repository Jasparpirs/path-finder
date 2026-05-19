import { createFileRoute, Link } from "@tanstack/react-router";
import { QuizRunner } from "@/components/QuizRunner";
import { allProfessions, fieldLabels, schools, type Field } from "@/data/schools";

export const Route = createFileRoute("/quiz")({
  component: QuizPage,
  head: () => ({
    meta: [
      { title: "Karjääritest — mida õppida Eestis?" },
      { name: "description", content: "Vasta 15 küsimusele ja leiame sulle sobivad Eesti koolid ja erialad." },
    ],
  }),
});

function QuizPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <p className="text-sm text-brand uppercase tracking-wider">Karjääritest</p>
      <h1 className="text-4xl font-bold mt-2 mb-2">Mida sa võiksid õppida?</h1>
      <p className="text-muted-foreground mb-10">15 lühikest küsimust. Tulemus on individualiseeritud Eesti koolide ja erialade järgi.</p>

      <QuizRunner renderResult={(ranked) => <GlobalResult ranked={ranked} />} />
    </div>
  );
}

function GlobalResult({ ranked }: { ranked: [Field, number][] }) {
  const top = ranked[0]?.[0];
  const second = ranked[1]?.[0];
  const total = ranked.reduce((a, [, v]) => a + v, 0) || 1;

  const topProfs = top ? allProfessions.filter((p) => p.field === top).slice(0, 6) : [];
  const secondProfs = second ? allProfessions.filter((p) => p.field === second).slice(0, 4) : [];

  return (
    <div>
      <p className="text-sm text-brand uppercase tracking-wider">Sinu tulemus</p>
      <h2 className="text-3xl font-bold mt-1">
        Sulle sobib <span className="text-brand">{top ? fieldLabels[top] : "—"}</span>
      </h2>
      <p className="mt-3 text-muted-foreground">Allpool näed, kuidas sinu vastused jagunesid valdkondade vahel ning millised Eesti programmid sulle sobivad.</p>

      <div className="mt-8 space-y-2">
        {ranked.slice(0, 8).map(([f, v]) => (
          <div key={f}>
            <div className="flex justify-between text-sm mb-1">
              <span>{fieldLabels[f]}</span>
              <span className="text-muted-foreground">{Math.round((v / total) * 100)}%</span>
            </div>
            <div className="h-2 rounded-full bg-secondary overflow-hidden">
              <div className="h-full bg-brand" style={{ width: `${Math.round((v / total) * 100)}%` }} />
            </div>
          </div>
        ))}
      </div>

      <h3 className="text-xl font-bold mt-12 mb-4">Sulle sobivad erialad</h3>
      <div className="grid gap-4 md:grid-cols-2">
        {topProfs.map((p) => {
          const school = schools.find((s) => s.id === p.schoolId)!;
          return (
            <Link
              key={p.id}
              to="/school/$schoolId"
              params={{ schoolId: school.id }}
              className="block rounded-xl border border-border p-5 bg-card hover:border-brand transition-colors"
            >
              <p className="text-xs uppercase tracking-wider text-brand">{fieldLabels[p.field]}</p>
              <h4 className="text-lg font-semibold mt-1">{p.name}</h4>
              <p className="text-sm text-muted-foreground mt-1">{school.name} · {school.city}</p>
              <p className="text-sm mt-2">{p.description}</p>
              {school.acceptsAfter9 && (
                <span className="inline-block mt-3 text-xs px-2 py-1 rounded-full bg-accent-2/30">Pärast 9. klassi</span>
              )}
            </Link>
          );
        })}
      </div>

      {secondProfs.length > 0 && (
        <>
          <h3 className="text-lg font-bold mt-10 mb-3">Tasub kaaluda ka</h3>
          <div className="grid gap-3 md:grid-cols-2">
            {secondProfs.map((p) => {
              const school = schools.find((s) => s.id === p.schoolId)!;
              return (
                <Link
                  key={p.id}
                  to="/school/$schoolId"
                  params={{ schoolId: school.id }}
                  className="block rounded-lg border border-border p-4 bg-card hover:border-brand transition-colors text-sm"
                >
                  <p className="font-medium">{p.name}</p>
                  <p className="text-muted-foreground text-xs mt-1">{school.name}</p>
                </Link>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
