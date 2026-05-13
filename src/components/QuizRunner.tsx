import { useState } from "react";
import { questions } from "@/data/quiz";
import { computeScores, rankFields } from "@/lib/quiz-engine";
import type { Field } from "@/data/schools";

interface Props {
  /** Restrict suggestions to these fields (e.g. only fields offered by a school). */
  fieldFilter?: Field[];
  /** What to render at the end. */
  renderResult: (ranked: [Field, number][]) => React.ReactNode;
  /** Callback when user resets. */
  onReset?: () => void;
}

export function QuizRunner({ fieldFilter, renderResult, onReset }: Props) {
  const [answers, setAnswers] = useState<(number | null)[]>(() => questions.map(() => null));
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  function pick(i: number) {
    const next = [...answers];
    next[step] = i;
    setAnswers(next);
    setTimeout(() => {
      if (step < questions.length - 1) setStep(step + 1);
      else setDone(true);
    }, 160);
  }

  function reset() {
    setAnswers(questions.map(() => null));
    setStep(0);
    setDone(false);
    onReset?.();
  }

  if (done) {
    let ranked = rankFields(computeScores(answers));
    if (fieldFilter) ranked = ranked.filter(([f]) => fieldFilter.includes(f));
    return (
      <div>
        {renderResult(ranked)}
        <button onClick={reset} className="mt-8 rounded-md border border-border px-4 py-2 text-sm hover:border-brand">
          Tee test uuesti
        </button>
      </div>
    );
  }

  const q = questions[step];
  const progress = (step / questions.length) * 100;

  return (
    <div>
      <div className="flex justify-between text-sm text-muted-foreground mb-2">
        <span>Küsimus {step + 1} / {questions.length}</span>
        <button onClick={reset} className="hover:text-brand">Lähtesta</button>
      </div>
      <div className="h-1.5 rounded-full bg-secondary overflow-hidden mb-10">
        <div className="h-full bg-brand transition-all" style={{ width: `${progress}%` }} />
      </div>

      <h2 className="text-2xl md:text-3xl font-bold leading-snug">{q.question}</h2>
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
          ← Eelmine küsimus
        </button>
      )}
    </div>
  );
}
