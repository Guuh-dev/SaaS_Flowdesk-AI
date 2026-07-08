import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, MoreHorizontal, MessageSquare, Phone, Globe, DollarSign } from "lucide-react";
import { leads } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const COLUMNS = [
  { id: 'novo', title: 'Novo' },
  { id: 'contatado', title: 'Contatado' },
  { id: 'qualificado', title: 'Qualificado' },
  { id: 'proposta', title: 'Proposta Enviada' },
  { id: 'fechado', title: 'Fechado' },
];

export default function Leads() {
  const [board, setBoard] = useState(leads);
  const [draggedId, setDraggedId] = useState<string | null>(null);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 0
    }).format(val);
  };

  const getScoreColor = (score: number) => {
    if (score >= 75) return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
    if (score >= 50) return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
    return "bg-destructive/10 text-destructive border-destructive/20";
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'WhatsApp': return <Phone className="w-3 h-3 text-emerald-500" />;
      case 'Instagram': return <div className="w-3 h-3 rounded-md border-purple-500 text-purple-500 border-[1.5px] flex items-center justify-center"><div className="w-1 h-1 rounded-full bg-purple-500" /></div>;
      case 'Site': return <Globe className="w-3 h-3 text-blue-500" />;
      default: return null;
    }
  };

  const handleDragStart = (e: React.DragEvent, leadId: string, sourceCol: string) => {
    e.dataTransfer.setData('leadId', leadId);
    e.dataTransfer.setData('sourceCol', sourceCol);
    setDraggedId(leadId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetCol: string) => {
    e.preventDefault();
    const leadId = e.dataTransfer.getData('leadId');
    const sourceCol = e.dataTransfer.getData('sourceCol');
    setDraggedId(null);

    if (sourceCol === targetCol) return;

    const lead = board[sourceCol as keyof typeof board].find(l => l.id === leadId);
    if (!lead) return;

    setBoard(prev => ({
      ...prev,
      [sourceCol]: prev[sourceCol as keyof typeof board].filter(l => l.id !== leadId),
      [targetCol]: [lead, ...prev[targetCol as keyof typeof board]]
    }));
  };

  return (
    <div className="h-[100dvh] flex flex-col p-6 space-y-6">
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestão de Leads</h1>
          <p className="text-sm text-muted-foreground mt-1">Acompanhe e movimente suas oportunidades de negócio.</p>
        </div>
        <Button className="gap-2 shadow-[0_0_15px_rgba(37,99,235,0.3)]">
          <Plus className="w-4 h-4" />
          Novo Lead
        </Button>
      </div>

      <div className="flex-1 flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
        {COLUMNS.map((col) => {
          const colLeads = board[col.id as keyof typeof board];
          const totalValue = colLeads.reduce((acc, curr) => acc + curr.value, 0);

          return (
            <div
              key={col.id}
              className="flex-shrink-0 w-[300px] flex flex-col bg-card/50 rounded-xl border"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, col.id)}
            >
              <div className="p-4 border-b flex items-center justify-between shrink-0 bg-card rounded-t-xl">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-sm">{col.title}</h3>
                    <Badge variant="secondary" className="px-1.5 h-5 text-[10px]">{colLeads.length}</Badge>
                  </div>
                  <p className="text-xs font-medium text-muted-foreground mt-1">
                    {formatCurrency(totalValue)}
                  </p>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex-1 p-3 space-y-3 overflow-y-auto custom-scrollbar min-h-[150px]">
                <AnimatePresence>
                  {colLeads.map((lead) => (
                    <div
                      key={lead.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, lead.id, col.id)}
                      onDragEnd={() => setDraggedId(null)}
                    >
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className={cn(
                        "bg-background border rounded-lg p-4 cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow relative group",
                        draggedId === lead.id ? "opacity-50" : "opacity-100"
                      )}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold shrink-0">
                            {lead.name.split(' ').map(n => n[0]).join('').substring(0,2)}
                          </div>
                          <div>
                            <h4 className="font-medium text-sm leading-tight group-hover:text-primary transition-colors">{lead.name}</h4>
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
                              {getSourceIcon(lead.source)}
                              <span>{lead.source}</span>
                            </div>
                          </div>
                        </div>
                        <Badge variant="outline" className={cn("text-[10px] px-1.5 h-5 font-bold border", getScoreColor(lead.score))}>
                          {lead.score}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-border/50">
                        <div className="flex items-center text-muted-foreground">
                          <DollarSign className="w-3.5 h-3.5 mr-1" />
                          <span className="text-sm font-semibold text-foreground/90">{formatCurrency(lead.value)}</span>
                        </div>
                        <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity">
                          <MessageSquare className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </motion.div>
                    </div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
