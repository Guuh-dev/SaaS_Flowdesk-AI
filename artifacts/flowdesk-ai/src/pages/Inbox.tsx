import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Send, Sparkles, Phone, Globe, Edit2, Check, ArrowLeft } from "lucide-react";
import { conversations } from "@/data/mock";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type MobileView = "list" | "chat";

export default function Inbox() {
  const [selectedId, setSelectedId] = useState(conversations[0].id);
  const [message, setMessage] = useState("");
  const [mobileView, setMobileView] = useState<MobileView>("list");

  const selectedConv = conversations.find(c => c.id === selectedId) || conversations[0];

  const handleSelectConversation = (id: string) => {
    setSelectedId(id);
    setMobileView("chat");
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'WhatsApp': return <Phone className="w-3 h-3" />;
      case 'Instagram': return <div className="w-3 h-3 rounded-md border-current border-[1.5px] flex items-center justify-center"><div className="w-1 h-1 rounded-full bg-current" /></div>;
      case 'Site': return <Globe className="w-3 h-3" />;
      default: return null;
    }
  };

  return (
    <div className="h-[100dvh] flex overflow-hidden bg-background">

      {/* ── LEFT PANEL (conversation list) ── */}
      {/* On mobile: full-screen when mobileView === "list" */}
      <div
        className={cn(
          "border-r flex flex-col bg-card shrink-0 transition-all duration-300",
          // Desktop: always visible fixed width
          "md:w-[280px] md:flex",
          // Mobile: full width when list view, hidden when chat view
          mobileView === "list" ? "flex w-full" : "hidden"
        )}
      >
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold mb-4">Inbox</h2>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Buscar conversas..." className="pl-9 bg-background h-10 text-sm" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          {conversations.map((conv) => {
            const isSelected = conv.id === selectedId;
            return (
              <div
                key={conv.id}
                onClick={() => handleSelectConversation(conv.id)}
                data-testid={`conversation-item-${conv.id}`}
                className={cn(
                  "p-4 border-b border-border/50 cursor-pointer transition-all flex items-start gap-3 relative",
                  isSelected ? "bg-accent/50 md:bg-accent/50" : "hover:bg-accent/30",
                  // On mobile, selected isn't visually different in list view
                )}
              >
                {isSelected && (
                  <motion.div
                    layoutId="inbox-active"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-primary hidden md:block"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <div className="relative shrink-0">
                  <div className="w-11 h-11 rounded-full bg-secondary flex items-center justify-center font-bold text-sm border border-border">
                    {conv.avatar}
                  </div>
                  {conv.unread > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-card">
                      {conv.unread}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-sm truncate pr-2">{conv.name}</span>
                    <span className="text-xs text-muted-foreground whitespace-nowrap shrink-0">{conv.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate mb-2">{conv.lastMessage}</p>
                  <div className="flex flex-wrap gap-1">
                    {conv.tag && (
                      <Badge
                        variant={conv.tag === 'Urgente' ? 'destructive' : 'default'}
                        className="text-[10px] h-5 px-2 py-0"
                      >
                        {conv.tag}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── CENTER + RIGHT PANELS wrapper ── */}
      {/* On mobile: full-screen when mobileView === "chat" */}
      <div
        className={cn(
          "flex flex-1 min-w-0 overflow-hidden",
          mobileView === "chat" ? "flex w-full" : "hidden md:flex"
        )}
      >
        {/* CENTER — chat */}
        <div className="flex-1 flex flex-col min-w-0 relative">
          {/* Chat header */}
          <header className="h-[60px] md:h-[72px] border-b flex items-center px-4 justify-between bg-card shrink-0 z-10 shadow-sm gap-3">
            {/* Back button (mobile only) */}
            <button
              className="md:hidden text-muted-foreground hover:text-foreground p-1.5 -ml-1 rounded-md transition-colors shrink-0"
              onClick={() => setMobileView("list")}
              data-testid="button-back-to-list"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center font-bold text-sm shrink-0">
                {selectedConv.avatar}
              </div>
              <div className="min-w-0">
                <h2 className="font-bold text-sm md:text-base leading-tight truncate">{selectedConv.name}</h2>
                <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                  <span className="flex items-center gap-1">
                    {getSourceIcon(selectedConv.source)}
                    {selectedConv.source}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                  <span>Online hoje às 14:32</span>
                </div>
                {/* Mobile: compact subtitle */}
                <div className="md:hidden flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                  {getSourceIcon(selectedConv.source)}
                  <span>{selectedConv.source}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <div className="flex items-center gap-1.5 bg-secondary/50 px-2.5 py-1.5 rounded-full border border-border/50">
                <span className="text-xs font-medium text-muted-foreground hidden sm:inline">Score:</span>
                <span className={cn("text-sm font-bold", selectedConv.score >= 80 ? "text-primary" : "text-foreground")}>
                  {selectedConv.score}
                </span>
              </div>
            </div>
          </header>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6 bg-[#0f1117]">
            <AnimatePresence mode="popLayout">
              {selectedConv.messages.map((msg) => {
                const isMe = msg.sender === 'me';
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn("flex w-full", isMe ? "justify-end" : "justify-start")}
                  >
                    <div className={cn("flex flex-col max-w-[85%] md:max-w-[70%]", isMe ? "items-end" : "items-start")}>
                      <div
                        className={cn(
                          "px-4 py-2.5 rounded-2xl text-sm shadow-sm leading-relaxed",
                          isMe
                            ? "bg-primary text-primary-foreground rounded-br-sm"
                            : "bg-card text-card-foreground border border-border rounded-bl-sm"
                        )}
                      >
                        {msg.text}
                      </div>
                      <span className="text-[10px] text-muted-foreground mt-1 mx-1">{msg.time}</span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Input bar */}
          <div className="p-3 md:p-4 bg-card border-t shrink-0">
            <div className="flex items-end gap-2">
              <button className="shrink-0 p-2 text-primary hover:bg-primary/10 rounded-md transition-colors">
                <Sparkles className="w-4 h-4" />
              </button>
              <textarea
                placeholder="Digite sua mensagem..."
                className="flex-1 bg-background border rounded-lg px-3 py-2.5 text-sm min-h-[44px] max-h-[120px] resize-none focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-muted-foreground"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                data-testid="textarea-message"
              />
              <Button size="icon" className="shrink-0 h-[44px] w-[44px] rounded-lg" disabled={!message} data-testid="button-send">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL — AI sidebar (hidden on mobile) */}
        <div className="hidden lg:flex w-[280px] xl:w-[300px] border-l flex-col bg-card shrink-0">
          <div className="p-4 border-b flex items-center gap-2 text-primary">
            <Sparkles className="w-4 h-4" />
            <h3 className="font-bold text-sm">FlowDesk Intelligence</h3>
          </div>

          <div className="p-4 space-y-5 overflow-y-auto flex-1">
            {/* AI Suggestion */}
            <div className="space-y-3">
              <h4 className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Sugestão de Resposta</h4>
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 shadow-inner">
                <p className="text-sm text-foreground/90 leading-relaxed italic">
                  "Olá {selectedConv.name.split(' ')[0]}! Nossos prazos de entrega variam de 3 a 7 dias úteis dependendo da sua região. Para São Paulo e Grande SP, geralmente entregamos em 3 dias. Posso verificar a disponibilidade específica para o seu CEP?"
                </p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="flex-1 h-8 text-xs gap-1.5 shadow-[0_0_10px_rgba(37,99,235,0.2)]">
                  <Check className="w-3.5 h-3.5" />
                  Usar
                </Button>
                <Button size="sm" variant="outline" className="flex-1 h-8 text-xs gap-1.5">
                  <Edit2 className="w-3.5 h-3.5" />
                  Editar
                </Button>
              </div>
            </div>

            <div className="h-px bg-border" />

            {/* Score */}
            <div className="space-y-4">
              <h4 className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Análise de Intenção</h4>

              <div className="bg-background rounded-lg border p-4 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/5" />
                <div className="relative z-10 flex flex-col items-center">
                  <span className="text-4xl font-bold tracking-tighter text-primary mb-1">{selectedConv.score}</span>
                  <span className="text-xs font-medium text-foreground">Probabilidade de conversão</span>
                  <div className="w-full h-1.5 bg-secondary rounded-full mt-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedConv.score}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className={cn(
                        "h-full rounded-full",
                        selectedConv.score >= 80 ? "bg-primary" : selectedConv.score >= 50 ? "bg-yellow-500" : "bg-destructive"
                      )}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs text-muted-foreground">Contexto Detectado:</span>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-[10px] bg-secondary/50 font-normal">Pergunta sobre prazo</Badge>
                  <Badge variant="secondary" className="text-[10px] bg-secondary/50 font-normal">Região: SP</Badge>
                  {selectedConv.score > 80 && (
                    <Badge variant="secondary" className="text-[10px] bg-emerald-500/10 text-emerald-500 border-emerald-500/20 font-normal">
                      Alta intenção
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
