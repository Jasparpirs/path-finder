import { Link, Outlet } from "@tanstack/react-router";

function Header() {
  return (
    <header className="border-b border-border/60 bg-background/80 backdrop-blur sticky top-0 z-40">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <Link to="/" className="font-bold text-lg tracking-tight">
          <span className="text-brand">Õpi</span>Eesti
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link to="/" activeOptions={{ exact: true }} activeProps={{ className: "text-brand font-semibold" }} className="hover:text-brand transition-colors">
            Schools
          </Link>
          <Link to="/quiz" activeProps={{ className: "text-brand font-semibold" }} className="hover:text-brand transition-colors">
            Career Quiz
          </Link>
          <Link to="/about" activeProps={{ className: "text-brand font-semibold" }} className="hover:text-brand transition-colors">
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/60 mt-20">
      <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-muted-foreground flex flex-wrap gap-4 justify-between">
        <p>© ÕpiEesti — explore your future in Estonian education.</p>
        <p>Curated info on universities & vocational schools.</p>
      </div>
    </footer>
  );
}

function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRootRouteWithContext, HeadContent, Scripts } from "@tanstack/react-router";
import appCss from "../styles.css?url";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "ÕpiEesti — Estonian schools & career quiz after 9th grade" },
      { name: "description", content: "Discover Estonian universities and vocational schools after 9th grade. Browse professions and take a quiz to find what fits you." },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold">404</h1>
        <Link to="/" className="text-brand mt-4 inline-block">Back home</Link>
      </div>
    </div>
  ),
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <RootLayout />
    </QueryClientProvider>
  );
}
