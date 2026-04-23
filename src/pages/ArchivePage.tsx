import { useState } from "react";
import Icon from "@/components/ui/icon";

const CHATS = [
  { id: 1, title: "Генерация логотипа для стартапа", date: "23.04.2026", msgs: 14, type: "image", preview: "Создай минималистичный логотип для tech-компании..." },
  { id: 2, title: "Анализ рынка криптовалют", date: "22.04.2026", msgs: 28, type: "analyze", preview: "Проведи глубокий анализ текущего состояния рынка..." },
  { id: 3, title: "Написание маркетинговых текстов", date: "22.04.2026", msgs: 9, type: "text", preview: "Напиши продающий текст для landing page..." },
  { id: 4, title: "Создание музыкальной темы", date: "21.04.2026", msgs: 6, type: "music", preview: "Создай атмосферную электронную музыку в стиле synthwave..." },
  { id: 5, title: "Python скрипт парсинга данных", date: "20.04.2026", msgs: 31, type: "code", preview: "Напиши эффективный скрипт для парсинга веб-сайтов..." },
  { id: 6, title: "Генерация видео-арта", date: "19.04.2026", msgs: 5, type: "video", preview: "/video создай абстрактную анимацию с неоновыми частицами..." },
  { id: 7, title: "Стратегия развития бизнеса", date: "18.04.2026", msgs: 22, type: "analyze", preview: "Помоги разработать стратегию масштабирования..." },
  { id: 8, title: "Дизайн персонажа игры", date: "17.04.2026", msgs: 18, type: "image", preview: "/image создай концепт-арт персонажа RPG..." },
];

const TYPE_CONFIG: Record<string, { color: string; icon: string; label: string }> = {
  image: { color: "#00ffff", icon: "Image", label: "IMAGE" },
  video: { color: "#bf00ff", icon: "Video", label: "VIDEO" },
  text: { color: "#00ff88", icon: "FileText", label: "TEXT" },
  music: { color: "#ff00aa", icon: "Music", label: "MUSIC" },
  code: { color: "#ffaa00", icon: "Code", label: "CODE" },
  analyze: { color: "#00aaff", icon: "BarChart2", label: "DATA" },
};

const ArchivePage = () => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<number | null>(null);

  const filtered = CHATS.filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.preview.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen px-4 md:px-8 py-8">
      {/* Header */}
      <div className="mb-8 animate-fade-in-up">
        <div className="font-mono-plex text-xs tracking-widest mb-2" style={{ color: "#4a7a7a" }}>
          SESSION ARCHIVE / DIALOG VAULT
        </div>
        <h1 className="font-orbitron font-bold text-2xl md:text-3xl tracking-wider" style={{ color: "#e0ffff" }}>
          АРХИВ <span className="neon-text-cyan">СЕССИЙ</span>
        </h1>
        <p className="font-rajdhani text-sm mt-2" style={{ color: "#4a7a7a" }}>
          {CHATS.length} сохранённых диалогов · 133 сообщения
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-6 animate-fade-in-up delay-100">
        <Icon name="Search" size={14} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "#00ffff" } as React.CSSProperties} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Поиск в архиве..."
          className="w-full pl-10 pr-4 py-3 font-rajdhani text-sm outline-none transition-all duration-300"
          style={{
            background: "rgba(0,255,255,0.03)",
            border: "1px solid rgba(0,255,255,0.2)",
            color: "#a0f4f4",
            caretColor: "#00ffff"
          }}
          onFocus={(e) => { e.target.style.borderColor = "#00ffff"; e.target.style.boxShadow = "0 0 15px rgba(0,255,255,0.08)"; }}
          onBlur={(e) => { e.target.style.borderColor = "rgba(0,255,255,0.2)"; e.target.style.boxShadow = "none"; }}
        />
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-8 animate-fade-in-up delay-200">
        {Object.entries(TYPE_CONFIG).map(([type, cfg]) => {
          const count = CHATS.filter((c) => c.type === type).length;
          return (
            <div
              key={type}
              className="p-3 text-center transition-all duration-200 cursor-pointer"
              style={{ border: "1px solid rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.2)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = cfg.color + "44"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.06)"; }}
            >
              <Icon name={cfg.icon} size={16} className="mx-auto mb-1" style={{ color: cfg.color } as React.CSSProperties} />
              <div className="font-orbitron text-lg font-bold" style={{ color: cfg.color }}>{count}</div>
              <div className="font-mono-plex text-xs" style={{ color: "#2a4a5a" }}>{cfg.label}</div>
            </div>
          );
        })}
      </div>

      {/* Chat list */}
      <div className="space-y-2 animate-fade-in-up delay-300">
        {filtered.map((chat, i) => {
          const cfg = TYPE_CONFIG[chat.type];
          return (
            <div
              key={chat.id}
              onClick={() => setSelected(selected === chat.id ? null : chat.id)}
              className="relative cursor-pointer transition-all duration-200 group"
              style={{
                border: "1px solid",
                borderColor: selected === chat.id ? cfg.color + "44" : "rgba(0,255,255,0.08)",
                background: selected === chat.id ? "rgba(0,255,255,0.03)" : "rgba(5,10,15,0.5)",
                animationDelay: `${i * 0.05}s`
              }}
              onMouseEnter={(e) => {
                if (selected !== chat.id) (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(0,255,255,0.2)";
              }}
              onMouseLeave={(e) => {
                if (selected !== chat.id) (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(0,255,255,0.08)";
              }}
            >
              <div className="flex items-center gap-4 px-4 py-3">
                {/* Type indicator */}
                <div
                  className="w-8 h-8 shrink-0 flex items-center justify-center"
                  style={{ border: "1px solid", borderColor: cfg.color + "44", background: cfg.color + "11" }}
                >
                  <Icon name={cfg.icon} size={14} style={{ color: cfg.color } as React.CSSProperties} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="font-rajdhani font-semibold text-sm truncate" style={{ color: "#c0f0f0" }}>
                      {chat.title}
                    </h3>
                    <span
                      className="shrink-0 px-1.5 py-0.5 font-orbitron text-xs"
                      style={{ background: cfg.color + "18", color: cfg.color, border: "1px solid " + cfg.color + "33" }}
                    >
                      {cfg.label}
                    </span>
                  </div>
                  <p className="font-mono-plex text-xs truncate" style={{ color: "#3a6a6a" }}>
                    {chat.preview}
                  </p>
                </div>

                {/* Meta */}
                <div className="shrink-0 text-right hidden sm:block">
                  <p className="font-mono-plex text-xs" style={{ color: "#3a6a6a" }}>{chat.date}</p>
                  <p className="font-mono-plex text-xs mt-0.5" style={{ color: "#2a4a5a" }}>{chat.msgs} msgs</p>
                </div>

                <Icon
                  name="ChevronDown"
                  size={14}
                  className="shrink-0 transition-transform duration-200"
                  style={{ color: "#3a6a6a", transform: selected === chat.id ? "rotate(180deg)" : "rotate(0deg)" } as React.CSSProperties}
                />
              </div>

              {/* Expanded */}
              {selected === chat.id && (
                <div
                  className="px-4 pb-4 pt-0 animate-fade-in-up"
                  style={{ borderTop: "1px solid rgba(0,255,255,0.06)" }}
                >
                  <p className="font-rajdhani text-sm mb-4 mt-3" style={{ color: "#7ababa" }}>
                    {chat.preview}
                  </p>
                  <div className="flex items-center gap-3">
                    <button
                      className="flex items-center gap-2 px-4 py-2 text-xs font-orbitron tracking-wider transition-all duration-200"
                      style={{ border: "1px solid rgba(0,255,255,0.3)", color: "#00ffff" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,255,255,0.08)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
                    >
                      <Icon name="MessageSquare" size={12} />
                      ПРОДОЛЖИТЬ
                    </button>
                    <button
                      className="flex items-center gap-2 px-4 py-2 text-xs font-orbitron tracking-wider transition-all duration-200"
                      style={{ border: "1px solid rgba(255,50,50,0.3)", color: "#ff5050" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,50,50,0.06)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
                    >
                      <Icon name="Trash2" size={12} />
                      УДАЛИТЬ
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 animate-fade-in-up">
          <Icon name="Search" size={32} className="mx-auto mb-4 opacity-20" style={{ color: "#00ffff" } as React.CSSProperties} />
          <p className="font-orbitron text-sm" style={{ color: "#3a6a6a" }}>ЗАПИСЕЙ НЕ НАЙДЕНО</p>
          <p className="font-mono-plex text-xs mt-1" style={{ color: "#2a4a5a" }}>Попробуйте изменить запрос</p>
        </div>
      )}
    </div>
  );
};

export default ArchivePage;
