import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { questions } from "@/data/quiz";
import { allProfessions, fieldLabels, schools } from "@/data/schools";
import type { Profession } from "@/data/schools";

export const Route = createFileRoute("/quiz")({
  component: QuizPage,
  head: () => ({
    meta: [
      { title: "Career quiz — what should you study in Estonia?" },
      { name: "description", content: "Answer 6 short questions and get matched with Estonian schools and professions." },
    ],
  }),
});

type Field = Profession["field"];

function QuizPage() {
  const [answers, setAnswers] = useState<(number | null)[]>(() => questions.map(() => null));
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  const scores = useMemo(() => {
    const s: Record<Field, number> = { tech: 0, health: 0, business: 0, arts: 0, science: 0, social: 0, trades: 0, service: 0 };
    answers.forEach((a, i) => {
      if (a == null) return;
      const opt = questions[i].options[a];
      Object.entries(opt.weights).forEach(([f, w]) => {
        s[f as Field] += w ?? 0;
      });
    });
    return s;
  }, [answers]);

  const ranked = useMemo(
    () =>
      (Object.entries(scores) as [Field, number][])
        .sort((a, b) => b[1] - a[1])
        .filter(([, v]) => v > 0),
    [scores]
  );

  const topField = ranked[0]?.[0];
  const matchedProfessions = useMemo(
    () => (topField ? allProfessions.filter((p) => p.field === topField) : []),
    [topField]
  );
  const secondField = ranked[1]?.[0];
  const alsoConsider = useMemo(
    () => (secondField ? allProfessions.filter((p) => p.field === secondField).slice(0, 3) : []),
    [secondField]
  );

  function pick(i: number) {
    const next = [...answers];
    next[step] = i;
    setAnswers(next);
    setTimeout(() => {
      if (step < questions.length - 1) setStep(step + 1);
      else setDone(true);
    }, 180);
  }

  function reset() {
    setAnswers(questions.map(() => null));
    setStep(0);
    setDone(false);
  }

  if (done) {
    const totalScore = ranked.reduce((acc, [, v]) => acc + v, 0) || 1;
    return (
      <div className="mx-auto max-w-4xl px-6 py-12">
        <p className="text-sm text-brand uppercase tracking-wider">Your result</p>
        <h1 className="text-4xl font-bold mt-2">
          You'd thrive in <span className="text-brand">{topField ? fieldLabels[topField] : "—"}</span>
        </h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">
          Based on your answers, here's how your interests are distributed and which Estonian programs match best.
        </p>

        <div className="mt-8 space-y-2">
          {ranked.map(([f, v]) => (
            <div key={f}>
              <div className="flex justify-between text-sm mb-1">
                <span>{fieldLabels[f]}</span>
                <span className="text-muted-foreground">{Math.round((v / totalScore) * 100)}%</span>
              </div>
              <div className="h-2 rounded-full bg-secondary overflow-hidden">
                <div
                  className="h-full bg-brand"
                  style={{ width: `${Math.round((v / totalScore) * 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold mt-12 mb-4">Programs that match you</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {matchedProfessions.map((p) => {
            const school = schools.find((s) => s.id === p.schoolId)!;
            return (
              <Link
                key={p.id}
                to="/school/$schoolId"
                params={{ schoolId: school.id }}
                className="block rounded-xl border border-border p-5 bg-card hover:border-brand transition-colors"
              >
                <p className="text-xs uppercase tracking-wider text-brand">{fieldLabels[p.field]}</p>
                <h3 className="text-lg font-semibold mt-1">{p.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">at {school.name} · {school.city}</p>
                <p className="text-sm mt-2">{p.description}</p>
                {school.acceptsAfter9 && (
                  <span className="inline-block mt-3 text-xs px-2 py-1 rounded-full bg-accent-2/30">Accepts after 9th grade</span>
                )}
              </Link>
            );
          })}
        </div>

        {alsoConsider.length > 0 && (
          <>
            <h2 className="text-xl font-bold mt-12 mb-4">Also worth considering</h2>
            <div className="grid gap-3 md:grid-cols-3">
              {alsoConsider.map((p) => {
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

        <div className="mt-12 flex gap-3">
          <button onClick={reset} className="rounded-md border border-border px-4 py-2 text-sm hover:border-brand">
            Retake quiz
          </button>
          <Link to="/" className="rounded-md bg-brand text-brand-foreground px-4 py-2 text-sm font-medium">
            Browse all schools
          </Link>
        </div>
      </div>
    );
  }

  const q = questions[step];
  const progress = ((step) / questions.length) * 100;

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <div className="flex justify-between text-sm text-muted-foreground mb-2">
        <span>Question {step + 1} of {questions.length}</span>
        <button onClick={reset} className="hover:text-brand">Reset</button>
      </div>
      <div className="h-1.5 rounded-full bg-secondary overflow-hidden mb-10">
        <div className="h-full bg-brand transition-all" style={{ width: `${progress}%` }} />
      </div>

      <h1 className="text-3xl font-bold leading-snug">{q.question}</h1>
      <div className="mt-8 grid gap-3">
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => pick(i)}
            className={`text-left rounded-xl border p-4 transition-all hover:border-brand hover:shadow-[var(--shadow-card)] ${
              answers[step] === i ? "border-brand bg-secondary" : "border-border bg-card"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {step > 0 && (
        <button onClick={() => setStep(step - 1)} className="mt-6 text-sm text-muted-foreground hover:text-brand">
          ← Previous question
        </button>
      )}
    </div>
  );
}
