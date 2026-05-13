import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About — ÕpiEesti" },
      { name: "description", content: "About ÕpiEesti — a guide to Estonian schools and professions after 9th grade." },
    ],
  }),
});

function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-4xl font-bold">About ÕpiEesti</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        After 9th grade in Estonia, students choose between <strong>gymnasium</strong> (academic upper secondary), <strong>vocational school</strong> (kutsekool — direct path to a profession), or later <strong>university</strong> / applied university.
      </p>
      <p className="mt-4">
        ÕpiEesti gathers the main public schools, the professions they offer, and a short quiz to help you find a direction. The quiz scores your interests across 8 fields and points you to matching programs.
      </p>
      <h2 className="text-2xl font-bold mt-10">How the quiz works</h2>
      <ul className="mt-3 list-disc pl-6 space-y-1 text-muted-foreground">
        <li>6 multiple-choice questions about hobbies, subjects and goals</li>
        <li>Each option carries weights across fields like tech, health, arts, trades…</li>
        <li>Top-scoring field decides which professions you see first</li>
      </ul>
      <Link to="/quiz" className="mt-8 inline-flex rounded-md bg-brand text-brand-foreground px-5 py-3 font-semibold">
        Try the quiz →
      </Link>
    </div>
  );
}
