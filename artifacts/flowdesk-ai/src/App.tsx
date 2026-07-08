import { useEffect } from "react";
import { Route, Switch, Router as WouterRouter } from "wouter";
import { Sidebar } from "@/components/layout/Sidebar";
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
        <Sidebar />
        <main className="ml-[220px] flex-1 min-w-0">
          <Router />
        </main>
      </div>
    </WouterRouter>
  );
}

export default App;
