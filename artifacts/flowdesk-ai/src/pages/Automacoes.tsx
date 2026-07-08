import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, MessageSquare, Clock, AlertTriangle, Target, BarChart2, Bell, Plus, Play } from "lucide-react";
import { automations } from "@/data/mock";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CATEGORIES = ["Todos", "Resposta", "Follow-up", "Classificação", "Score", "Alerta", "Relatório"];

export default function Automacoes() {
  const [activeTab, setActiveTab] = useState("Todos");
  const [autos, setAutos] = useState(automations);

  const totalExecutions = autos.reduce((acc, curr) => acc + curr.executions, 0);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Resposta': return <MessageSquare className="w-5 h-5 text-blue-500" />;
      case 'Follow-up': return <Clock className="w-5 h-5 text-purple-500" />;
      case 'Classificação': return <Target className="w-5 h-5 text-emerald-500" />;
      case 'Score': return <Zap className="w-5 h-5 text-yellow-500" />;
      case 'Alerta': return <Bell className="w-5 h-5 text-destructive" />;
      case 'Relatório': return <BarChart2 className="w-5 h-5 text-indigo-500" />;
      default: return <Zap className="w-5 h-5 text-primary" />;
    }
  };

  const filteredAutos = activeTab === "Todos" ? autos : autos.filter(a => a.category === activeTab);

  const toggleAuto = (id: string) => {
    setAutos(autos.map(a => a.id === id ? { ...a, enabled: !a.enabled } : a));
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Automações</h1>
          <p className="text-sm text-primary flex items-center gap-1.5 mt-2 font-medium">
            <Play className="w-4 h-4 fill-primary text-primary" />
            {totalExecutions} execuções esta semana
          </p>
        </div>
        <Button className="shadow-[0_0_15px_rgba(37,99,235,0.3)]">
          <Plus className="w-4 h-4 mr-2" />
          Criar Nova
        </Button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap",
              activeTab === cat 
                ? "bg-primary text-primary-foreground" 
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredAutos.map((auto, i) => (
          <motion.div
            key={auto.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className={cn(
              "overflow-hidden transition-all duration-300 relative border-l-4",
              auto.enabled ? "border-l-emerald-500 border-border bg-card" : "border-l-muted border-border/50 bg-card/50 opacity-75 grayscale-[0.2]"
            )}>
              <CardContent className="p-6 flex items-center justify-between gap-6">
                
                <div className="flex items-center gap-6 flex-1 min-w-0">
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm",
                    auto.enabled ? "bg-background border" : "bg-muted border-border/50"
                  )}>
                    {getCategoryIcon(auto.category)}
                  </div>
                  
                  <div className="min-w-0">
                    <h3 className={cn("text-base font-semibold truncate", auto.enabled ? "text-foreground" : "text-muted-foreground")}>
                      {auto.name}
                    </h3>
                    <p className="text-sm text-muted-foreground truncate mt-1">
                      {auto.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6 shrink-0">
                  <div className="text-right">
                    <div className="text-sm font-bold text-foreground">{auto.executions}</div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">vezes</div>
                  </div>
                  <div className="h-10 w-px bg-border hidden sm:block" />
                  <Switch
                    checked={auto.enabled}
                    onCheckedChange={() => toggleAuto(auto.id)}
                    data-testid={`switch-${auto.id}`}
                  />
                </div>

              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
