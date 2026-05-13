import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "Meist — ÕpiEesti" },
      { name: "description", content: "ÕpiEesti — juhend Eesti koolide ja ametite valikuks pärast 9. klassi." },
    ],
  }),
});

function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-4xl font-bold">Meist</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Pärast 9. klassi peab Eesti õpilane valima — <strong>gümnaasium</strong> (akadeemiline keskharidus), <strong>kutsekool</strong> (otse erialale) või hiljem <strong>ülikool</strong> / rakenduskõrgkool.
      </p>
      <p className="mt-4">
        ÕpiEesti koondab kõik suuremad Eesti riiklikud ja era-koolid, ametid, mida nad õpetavad, ning karjääritesti, mis aitab leida suuna. Test hindab sinu huvisid 12 valdkonna alusel ja näitab konkreetsed sobivad programmid.
      </p>
      <h2 className="text-2xl font-bold mt-10">Kuidas test töötab</h2>
      <ul className="mt-3 list-disc pl-6 space-y-1 text-muted-foreground">
        <li>12 valikvastustega küsimust hobide, ainete ja eesmärkide kohta</li>
        <li>Iga vastus annab punkte erinevatesse valdkondadesse (tehnoloogia, tervis, käsitöö jne)</li>
        <li>Kõrgeima skooriga valdkond määrab, milliseid erialasid sulle soovitatakse</li>
        <li>Kooli lehel saab teha sama testi ainult selle kooli erialade põhjal — vajuta "Aita mul valida"</li>
      </ul>
      <Link to="/quiz" className="mt-8 inline-flex rounded-md bg-brand text-brand-foreground px-5 py-3 font-semibold">
        Tee karjääritest →
      </Link>
    </div>
  );
}
