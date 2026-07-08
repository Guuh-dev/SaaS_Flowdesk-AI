import { useEffect } from "react";
import { Route, Switch, Router as WouterRouter } from "wouter";
import { Sidebar } from "@/components/layout/Sidebar";
import { BottomNav } from "@/components/layout/BottomNav";
import Dashboard from "@/pages/Dashboard";
import Inbox from "@/pages/Inbox";
import Leads from "@/pages/Leads";
import Automacoes from "@/pages/Automacoes";

function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
      <h1 className="text-4xl font-bold tracking-tight mb-2 text-foreground">404</h1>
      <p className="text-muted-foreground">Página não encontrada</p>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/inbox" component={Inbox} />
      <Route path="/leads" component={Leads} />
      <Route path="/automacoes" component={Automacoes} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Force dark mode on mount
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <div className="min-h-[100dvh] w-full bg-background text-foreground flex text-sm">
        {/* Desktop sidebar */}
        <Sidebar />
        {/* Page content — on mobile full width, on desktop offset by sidebar */}
        <main className="flex-1 min-w-0 md:ml-[220px] pb-16 md:pb-0">
          <Router />
        </main>
        {/* Mobile bottom nav */}
        <BottomNav />
      </div>
    </WouterRouter>
  );
}

export default App;
