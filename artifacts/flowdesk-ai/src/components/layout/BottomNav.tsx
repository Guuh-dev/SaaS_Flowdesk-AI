import { Link, useLocation } from "wouter";
import { LayoutDashboard, MessageSquare, Users, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/inbox", label: "Inbox", icon: MessageSquare, badge: 6 },
  { href: "/leads", label: "Leads", icon: Users },
  { href: "/automacoes", label: "Automações", icon: Zap },
];

export function BottomNav() {
  const [location] = useLocation();

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border flex items-stretch"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      {links.map((link) => {
        const isActive = location === link.href;
        const Icon = link.icon;
        return (
          <Link
            key={link.href}
            href={link.href}
            className="flex-1"
            data-testid={`bottom-nav-${link.label.toLowerCase()}`}
          >
            <div
              className={cn(
                "flex flex-col items-center justify-center gap-1 py-3 transition-colors relative",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {link.badge && (
                  <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-primary text-primary-foreground text-[8px] font-bold flex items-center justify-center rounded-full">
                    {link.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-medium leading-none">{link.label}</span>
              {isActive && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-b-full" />
              )}
            </div>
          </Link>
        );
      })}
    </nav>
  );
}
