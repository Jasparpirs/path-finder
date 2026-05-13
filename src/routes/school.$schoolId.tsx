import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { schools, fieldLabels, type Profession } from "@/data/schools";

export const Route = createFileRoute("/school/$schoolId")({
  component: SchoolPage,
  loader: ({ params }) => {
    const school = schools.find((s) => s.id === params.schoolId);
    if (!school) throw notFound();
    return { school };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.school.name} — professions` : "School" },
      { name: "description", content: loaderData?.school.description ?? "" },
    ],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h1 className="text-3xl font-bold">School not found</h1>
      <Link to="/" className="text-brand mt-4 inline-block">Back to all schools</Link>
    </div>
  ),
});

function SchoolPage() {
  const { school } = Route.useLoaderData();

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <Link to="/" className="text-sm text-muted-foreground hover:text-brand">← All schools</Link>
      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">{school.city}</p>
          <h1 className="text-4xl font-bold mt-1">{school.name}</h1>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl">{school.description}</p>
          <div className="mt-3 flex gap-2 flex-wrap">
            <span className="text-xs px-2 py-1 rounded-full bg-secondary">
              {school.type === "vocational" ? "Vocational" : school.type === "applied" ? "Applied university" : "University"}
            </span>
            {school.acceptsAfter9 && (
              <span className="text-xs px-2 py-1 rounded-full bg-accent-2/30">Accepts after 9th grade</span>
            )}
          </div>
        </div>
        <a
          href={school.website}
          target="_blank"
          rel="noreferrer"
          className="rounded-md bg-brand text-brand-foreground px-4 py-2 text-sm font-medium hover:opacity-90"
        >
          Official website ↗
        </a>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-6">Professions you can study</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {school.professions.map((p: Profession) => (
          <div key={p.id} className="rounded-xl border border-border p-5 bg-card hover:border-brand transition-colors">
            <p className="text-xs uppercase tracking-wider text-brand">{fieldLabels[p.field]}</p>
            <h3 className="text-lg font-semibold mt-1">{p.name}</h3>
            <p className="text-sm text-muted-foreground mt-2">{p.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-xl p-6 border border-border bg-secondary/50">
        <h3 className="font-semibold text-lg">Not sure if this fits you?</h3>
        <p className="text-sm text-muted-foreground mt-1">Take a 6-question quiz and get a personalised recommendation.</p>
        <Link to="/quiz" className="mt-4 inline-flex rounded-md bg-brand text-brand-foreground px-4 py-2 text-sm font-medium">
          Start the quiz →
        </Link>
      </div>
    </div>
  );
}
