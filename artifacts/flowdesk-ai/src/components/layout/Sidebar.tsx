import { Link, useLocation } from "wouter";
import { LayoutDashboard, MessageSquare, Users, Zap, Crown, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function Sidebar() {
  const [location] = useLocation();

  const links = [
    { href: "/", label: "Dashboard", icon: LayoutDashboard },
    { href: "/inbox", label: "Inbox", icon: MessageSquare, badge: 6 },
    { href: "/leads", label: "Leads", icon: Users },
    { href: "/automacoes", label: "Automações", icon: Zap },
  ];

  return (
    <aside className="hidden md:flex fixed top-0 left-0 bottom-0 w-[220px] bg-card border-r flex-col z-10">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2" data-testid="link-home">
          <div className="bg-primary/20 p-1.5 rounded-md flex items-center justify-center">
            <Zap className="w-5 h-5 text-primary fill-primary" />
          </div>
          <span className="font-bold text-lg tracking-tight">
            FlowDesk <span className="text-primary font-bold">AI</span>
          </span>
        </Link>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {links.map((link) => {
          const isActive = location === link.href;
          return (
            <Link key={link.href} href={link.href} data-testid={`link-${link.label.toLowerCase()}`}>
              <div className="relative group">
                <div
                  className={cn(
                    "flex items-center justify-between px-3 py-2 rounded-md transition-colors cursor-pointer text-sm font-medium",
                    isActive
                      ? "text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  )}
                >
                  <div className="flex items-center gap-3 relative z-10">
                    <link.icon className={cn("w-4 h-4", isActive ? "text-primary-foreground" : "")} />
                    {link.label}
                  </div>
                  {link.badge && (
                    <span
                      className={cn(
                        "relative z-10 px-1.5 py-0.5 rounded text-[10px] font-bold leading-none",
                        isActive
                          ? "bg-primary-foreground/20 text-primary-foreground"
                          : "bg-primary/20 text-primary"
                      )}
                    >
                      {link.badge}
                    </span>
                  )}
                </div>
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-0 bg-primary rounded-md shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border/50 space-y-4">
        <div className="px-3 py-2 bg-primary/10 border border-primary/20 rounded-md flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Crown className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold text-primary">Plano Pro</span>
          </div>
        </div>

        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-xs font-bold border border-border">
              MC
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium leading-none">Mateus Costa</span>
              <span className="text-xs text-muted-foreground mt-1">Proprietário</span>
            </div>
          </div>
          <button className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md hover:bg-accent">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
