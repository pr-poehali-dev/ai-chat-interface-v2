import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";

interface Message {
  id: number;
  role: "user" | "ai";
  content: string;
  time: string;
}

const QUICK_COMMANDS = [
  { icon: "🎨", label: "Генерация изображения", cmd: "/image" },
  { icon: "🎬", label: "Генерация видео", cmd: "/video" },
  { icon: "✍️", label: "Написать текст", cmd: "/text" },
  { icon: "🎵", label: "Создать музыку", cmd: "/music" },
  { icon: "💡", label: "Анализ данных", cmd: "/analyze" },
  { icon: "🔮", label: "Код и скрипты", cmd: "/code" },
];

const AI_RESPONSES = [
  "Анализирую запрос... Обрабатываю нейронные паттерны. Ответ сгенерирован на основе 1.7 триллиона параметров модели NEXUS-7.",
  "Задача принята. Активирую модуль глубокого обучения. Результат готов — синтезировал оптимальное решение из 847 возможных вариантов.",
  "Запрос обработан. Используя квантовые алгоритмы предсказания, предлагаю следующее решение с точностью 98.7%.",
  "Инициирую протокол генерации. Согласно данным обучающей выборки, наилучший ответ: задача успешно декомпозирована и решена.",
];

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "ai",
      content: "NEXUS AI онлайн. Системы инициализированы. Готов к взаимодействию. Используйте быстрые команды ниже или введите запрос вручную.",
      time: "09:41"
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const now = new Date().toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" });

    setMessages((prev) => [...prev, { id: Date.now(), role: "user", content: text, time: now }]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const response = AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)];
      setMessages((prev) => [...prev, { id: Date.now() + 1, role: "ai", content: response, time: now }]);
    }, 1500 + Math.random() * 1000);
  };

  return (
    <div className="flex h-screen" style={{ paddingTop: "56px" }}>
      {/* Sidebar — archive of chats (desktop) */}
      <aside
        className="hidden lg:flex flex-col w-64 shrink-0"
        style={{ background: "rgba(5,10,15,0.8)", borderRight: "1px solid rgba(0,255,255,0.1)" }}
      >
        <div className="p-4 border-b" style={{ borderColor: "rgba(0,255,255,0.1)" }}>
          <span className="font-orbitron text-xs tracking-widest" style={{ color: "#00ffff" }}>RECENT SESSIONS</span>
        </div>
        {["Дизайн логотипа", "Анализ рынка", "Написание кода", "Генерация идей"].map((chat, i) => (
          <button
            key={i}
            className="flex items-start gap-3 px-4 py-3 text-left transition-all duration-200 hover:bg-white/5"
            style={{ borderBottom: "1px solid rgba(0,255,255,0.05)" }}
          >
            <div className="w-1 h-4 mt-0.5 shrink-0" style={{ background: i === 0 ? "#00ffff" : "#2a4a5a", boxShadow: i === 0 ? "0 0 6px #00ffff" : "none" }} />
            <div>
              <p className="text-xs font-rajdhani" style={{ color: i === 0 ? "#a0f4f4" : "#4a7a7a" }}>{chat}</p>
              <p className="text-xs font-mono-plex opacity-50" style={{ color: "#4a7a7a" }}>{i === 0 ? "Активен" : `${i * 2}ч назад`}</p>
            </div>
          </button>
        ))}
        <div className="mt-auto p-4">
          <button
            className="w-full py-2 text-xs font-orbitron tracking-widest transition-all duration-200"
            style={{ border: "1px solid rgba(0,255,255,0.2)", color: "#4a7a7a" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#00ffff"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(0,255,255,0.5)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#4a7a7a"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(0,255,255,0.2)"; }}
          >
            + НОВЫЙ ЧАТ
          </button>
        </div>
      </aside>

      {/* Chat area */}
      <div className="flex-1 flex flex-col">
        {/* Chat header */}
        <div
          className="flex items-center justify-between px-6 py-3 shrink-0"
          style={{ background: "rgba(5,10,15,0.6)", borderBottom: "1px solid rgba(0,255,255,0.1)" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 flex items-center justify-center animate-float"
              style={{ border: "1px solid #00ffff", background: "rgba(0,255,255,0.05)", boxShadow: "0 0 12px rgba(0,255,255,0.3)" }}
            >
              <Icon name="Bot" size={14} style={{ color: "#00ffff" } as React.CSSProperties} />
            </div>
            <div>
              <p className="font-orbitron text-xs font-bold tracking-widest" style={{ color: "#00ffff" }}>NEXUS-7 NEURAL ENGINE</p>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full animate-pulse-slow" style={{ background: "#00ff88", boxShadow: "0 0 6px #00ff88" }} />
                <span className="font-mono-plex text-xs" style={{ color: "#4a7a7a" }}>ONLINE · 1.7T параметров</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 transition-all duration-200 hover:opacity-70" style={{ color: "#4a7a7a" }}>
              <Icon name="Settings" size={14} />
            </button>
            <button className="p-2 transition-all duration-200 hover:opacity-70" style={{ color: "#4a7a7a" }}>
              <Icon name="MoreVertical" size={14} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 animate-fade-in-up ${msg.role === "user" ? "flex-row-reverse" : ""}`}
            >
              {/* Avatar */}
              <div
                className="w-8 h-8 shrink-0 flex items-center justify-center text-xs font-orbitron font-bold"
                style={
                  msg.role === "ai"
                    ? { border: "1px solid #00ffff", background: "rgba(0,255,255,0.08)", color: "#00ffff" }
                    : { border: "1px solid #bf00ff", background: "rgba(191,0,255,0.08)", color: "#bf00ff" }
                }
              >
                {msg.role === "ai" ? "AI" : "U"}
              </div>
              {/* Bubble */}
              <div className={`max-w-[75%] ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col gap-1`}>
                <div
                  className="px-4 py-3 text-sm font-rajdhani leading-relaxed"
                  style={
                    msg.role === "ai"
                      ? {
                          background: "rgba(0,255,255,0.04)",
                          border: "1px solid rgba(0,255,255,0.15)",
                          color: "#c0f0f0",
                          boxShadow: "0 0 20px rgba(0,255,255,0.04)"
                        }
                      : {
                          background: "rgba(191,0,255,0.08)",
                          border: "1px solid rgba(191,0,255,0.25)",
                          color: "#e0c0ff"
                        }
                  }
                >
                  {msg.content}
                </div>
                <span className="font-mono-plex text-xs px-1" style={{ color: "#2a4a5a" }}>{msg.time}</span>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex gap-3 animate-fade-in-up">
              <div
                className="w-8 h-8 shrink-0 flex items-center justify-center text-xs font-orbitron font-bold"
                style={{ border: "1px solid #00ffff", background: "rgba(0,255,255,0.08)", color: "#00ffff" }}
              >
                AI
              </div>
              <div
                className="px-4 py-3"
                style={{ background: "rgba(0,255,255,0.04)", border: "1px solid rgba(0,255,255,0.15)" }}
              >
                <div className="flex items-center gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full animate-pulse-slow"
                      style={{ background: "#00ffff", animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                  <span className="font-mono-plex text-xs ml-2" style={{ color: "#4a7a7a" }}>генерирую ответ...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Quick commands */}
        <div
          className="px-4 md:px-8 py-3 shrink-0"
          style={{ borderTop: "1px solid rgba(0,255,255,0.08)" }}
        >
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {QUICK_COMMANDS.map((cmd) => (
              <button
                key={cmd.cmd}
                onClick={() => sendMessage(cmd.cmd + " — " + cmd.label)}
                className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 text-xs font-rajdhani whitespace-nowrap transition-all duration-200"
                style={{
                  background: "rgba(0,255,255,0.04)",
                  border: "1px solid rgba(0,255,255,0.15)",
                  color: "#7ababa"
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#00ffff"; (e.currentTarget as HTMLButtonElement).style.color = "#00ffff"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(0,255,255,0.15)"; (e.currentTarget as HTMLButtonElement).style.color = "#7ababa"; }}
              >
                <span>{cmd.icon}</span>
                {cmd.label}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div
          className="px-4 md:px-8 py-4 shrink-0"
          style={{ background: "rgba(5,10,15,0.6)", borderTop: "1px solid rgba(0,255,255,0.1)" }}
        >
          <div className="relative flex items-end gap-3">
            <div
              className="flex-1 relative"
              style={{ border: "1px solid rgba(0,255,255,0.2)", background: "rgba(0,255,255,0.02)" }}
            >
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); } }}
                placeholder="Введите запрос или используйте /команду..."
                rows={1}
                className="w-full px-4 py-3 pr-12 text-sm font-rajdhani outline-none resize-none"
                style={{
                  background: "transparent",
                  color: "#a0f4f4",
                  caretColor: "#00ffff",
                  maxHeight: "120px"
                }}
                onFocus={(e) => { (e.target.parentElement as HTMLDivElement).style.borderColor = "#00ffff"; (e.target.parentElement as HTMLDivElement).style.boxShadow = "0 0 15px rgba(0,255,255,0.1)"; }}
                onBlur={(e) => { (e.target.parentElement as HTMLDivElement).style.borderColor = "rgba(0,255,255,0.2)"; (e.target.parentElement as HTMLDivElement).style.boxShadow = "none"; }}
              />
              <span className="absolute right-3 bottom-3 font-mono-plex text-xs" style={{ color: "#2a4a5a" }}>⏎</span>
            </div>
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || isTyping}
              className="flex items-center justify-center w-12 h-12 shrink-0 transition-all duration-200"
              style={{
                background: input.trim() ? "rgba(0,255,255,0.1)" : "rgba(0,255,255,0.03)",
                border: "1px solid",
                borderColor: input.trim() ? "#00ffff" : "rgba(0,255,255,0.15)",
                color: input.trim() ? "#00ffff" : "#2a4a5a",
                boxShadow: input.trim() ? "0 0 15px rgba(0,255,255,0.2)" : "none"
              }}
            >
              <Icon name="Send" size={16} />
            </button>
          </div>
          <p className="font-mono-plex text-xs mt-2 text-center" style={{ color: "#2a4a5a" }}>
            NEXUS AI · Enter для отправки · Shift+Enter для новой строки
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
