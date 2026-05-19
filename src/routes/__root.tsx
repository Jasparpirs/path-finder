import { Link, Outlet } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRootRouteWithContext, HeadContent } from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { LevelGate } from "@/components/LevelGate";
import { useLevel, levelLabel } from "@/lib/level";

function Header() {
  const [level, , reset] = useLevel();
  return (
    <header className="border-b border-border/60 bg-background/80 backdrop-blur sticky top-0 z-40">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between gap-4">
        <Link to="/" className="font-bold text-lg tracking-tight">
          <span className="text-brand">Õpi</span>Eesti
        </Link>
        <nav className="flex items-center gap-4 md:gap-6 text-sm">
          <Link to="/" activeOptions={{ exact: true }} activeProps={{ className: "text-brand font-semibold" }} className="hover:text-brand transition-colors">
            Koolid
          </Link>
          <Link to="/quiz" activeProps={{ className: "text-brand font-semibold" }} className="hover:text-brand transition-colors">
            Karjääritest
          </Link>
          <Link to="/about" activeProps={{ className: "text-brand font-semibold" }} className="hover:text-brand transition-colors">
            Meist
          </Link>
          {level && (
            <button
              onClick={reset}
              title="Muuda haridustase"
              className="hidden sm:inline text-xs px-3 py-1.5 rounded-full border border-border hover:border-brand text-muted-foreground hover:text-brand transition-colors"
            >
              {levelLabel[level]} ↻
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/60 mt-20">
      <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-muted-foreground flex flex-wrap gap-4 justify-between">
        <p>© ÕpiEesti — leia oma haridustee Eestis.</p>
        <p>Koondab Eesti koolid, programmid ja karjääritesti ühte kohta.</p>
      </div>
    </footer>
  );
}

function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <LevelGate />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "ÕpiEesti — Eesti koolid ja karjääritest pärast 9. klassi" },
      { name: "description", content: "Avasta Eesti ülikoole, rakenduskõrgkoole ja kutsekoole. Vaata ametid ja tee test, mis sulle sobib." },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  component: RootComponent,
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold">404</h1>
        <Link to="/" className="text-brand mt-4 inline-block">Tagasi avalehele</Link>
      </div>
    </div>
  ),
});

function RootShell({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <>
        <HeadContent />
        <RootLayout />
      </>
    </QueryClientProvider>
  );
}
