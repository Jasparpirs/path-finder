import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { schools, fieldLabels, typeLabels, type Profession, type Field, type School } from "@/data/schools";
import { useState } from "react";
import { QuizRunner } from "@/components/QuizRunner";

export const Route = createFileRoute("/school/$schoolId")({
  component: SchoolPage,
  loader: ({ params }) => {
    const school = schools.find((s) => s.id === params.schoolId);
    if (!school) throw notFound();
    return { school };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.school.name} — erialad` : "Kool" },
      { name: "description", content: loaderData?.school.description ?? "" },
    ],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h1 className="text-3xl font-bold">Kooli ei leitud</h1>
      <Link to="/" className="text-brand mt-4 inline-block">Tagasi koolide juurde</Link>
    </div>
  ),
});

function SchoolPage() {
  const { school } = Route.useLoaderData() as { school: School };
  const [showQuiz, setShowQuiz] = useState(false);

  const byField: Partial<Record<Field, Profession[]>> = {};
  school.professions.forEach((p) => {
    (byField[p.field] ??= []).push(p);
  });
  const schoolFields: Field[] = Array.from(new Set(school.professions.map((p) => p.field)));

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <Link to="/" className="text-sm text-muted-foreground hover:text-brand">← Kõik koolid</Link>
      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">{school.city}</p>
          <h1 className="text-4xl font-bold mt-1">{school.name}</h1>
          <p className="mt-3 text-lg text-muted-foreground">{school.description}</p>
          <div className="mt-3 flex gap-2 flex-wrap">
            <span className="text-xs px-2 py-1 rounded-full bg-secondary">{typeLabels[school.type]}</span>
            {school.acceptsAfter9 && (
              <span className="text-xs px-2 py-1 rounded-full bg-accent-2/30">Võtab vastu pärast 9. klassi</span>
            )}
          </div>
        </div>
        <a
          href={school.website}
          target="_blank"
          rel="noreferrer"
          className="rounded-md bg-brand text-brand-foreground px-4 py-2 text-sm font-medium hover:opacity-90"
        >
          Kooli koduleht ↗
        </a>
      </div>

      {/* Help me choose CTA */}
      <div className="mt-10 rounded-2xl border border-brand/40 bg-gradient-to-br from-secondary to-background p-6 md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold">Ei tea, milline eriala valida?</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Vasta {12} küsimusele ja leiame just selle kooli erialade hulgast sulle parima.
            </p>
          </div>
          <button
            onClick={() => setShowQuiz((v) => !v)}
            className="rounded-md bg-brand text-brand-foreground px-5 py-3 text-sm font-semibold hover:opacity-90"
          >
            {showQuiz ? "Sulge test" : "Aita mul valida →"}
          </button>
        </div>

        {showQuiz && (
          <div className="mt-8 rounded-xl bg-background border border-border p-6">
            <QuizRunner
              fieldFilter={schoolFields}
              renderResult={(ranked) => <SchoolQuizResult ranked={ranked} school={school} />}
            />
          </div>
        )}
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-6">Erialad selles koolis</h2>
      <div className="space-y-8">
        {schoolFields.map((f) => (
          <div key={f}>
            <h3 className="text-sm uppercase tracking-wider text-brand mb-3">{fieldLabels[f]}</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {byField[f]!.map((p) => (
                <div key={p.id} className="rounded-xl border border-border p-5 bg-card hover:border-brand transition-colors">
                  <h4 className="text-lg font-semibold">{p.name}</h4>
                  <p className="text-sm text-muted-foreground mt-2">{p.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SchoolQuizResult({
  ranked,
  school,
}: {
  ranked: [Field, number][];
  school: School;
}) {
  const topField = ranked[0]?.[0];
  const matches = topField ? school.professions.filter((p) => p.field === topField) : [];
  const second = ranked[1]?.[0];
  const alsoMatches = second ? school.professions.filter((p) => p.field === second).slice(0, 3) : [];

  return (
    <div>
      <p className="text-sm text-brand uppercase tracking-wider">Sinu tulemus</p>
      <h3 className="text-2xl font-bold mt-1">
        {school.name} sobivaim valdkond sinu jaoks: {" "}
        <span className="text-brand">{topField ? fieldLabels[topField] : "—"}</span>
      </h3>

      {matches.length > 0 ? (
        <>
          <p className="mt-4 text-sm text-muted-foreground">Need erialad selles koolis sobivad sulle kõige paremini:</p>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {matches.map((p) => (
              <div key={p.id} className="rounded-lg border border-brand/40 bg-secondary/40 p-4">
                <p className="font-semibold">{p.name}</p>
                <p className="text-sm text-muted-foreground mt-1">{p.description}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="mt-4 text-sm text-muted-foreground">Selle kooli erialad ei kattu sinu profiiliga — proovi üldist karjääritesti.</p>
      )}

      {alsoMatches.length > 0 && (
        <>
          <p className="mt-6 text-sm font-medium">Tasub kaaluda ka:</p>
          <ul className="mt-2 grid gap-2 md:grid-cols-3 text-sm">
            {alsoMatches.map((p) => (
              <li key={p.id} className="rounded-md border border-border p-3">
                <p className="font-medium">{p.name}</p>
                <p className="text-xs text-muted-foreground">{fieldLabels[p.field]}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

// Type helper so TS is happy with school param type above
type SchoolT = (typeof schools)[number];
function useSchool(): SchoolT { return schools[0]; }
