import { useState } from "react";
import Icon from "@/components/ui/icon";

const GALLERY_ITEMS = [
  {
    id: 1,
    type: "image",
    src: "https://cdn.poehali.dev/projects/1f055f91-d967-4578-b969-a5c8ed36935a/files/a50937be-af03-4184-86af-4a466b7125e5.jpg",
    title: "Киберпанк-город",
    prompt: "/image неоновый город будущего",
    date: "23.04.2026",
    tags: ["city", "neon", "cyber"]
  },
  {
    id: 2,
    type: "image",
    src: "https://cdn.poehali.dev/projects/1f055f91-d967-4578-b969-a5c8ed36935a/files/f661aef6-9395-4131-9547-af349597e766.jpg",
    title: "Цифровой ландшафт",
    prompt: "/image абстрактный цифровой мир",
    date: "22.04.2026",
    tags: ["abstract", "digital", "art"]
  },
  {
    id: 3,
    type: "image",
    src: "https://cdn.poehali.dev/projects/1f055f91-d967-4578-b969-a5c8ed36935a/files/d056604a-d8e5-4059-880c-90bbad95eee3.jpg",
    title: "ИИ-андроид",
    prompt: "/image портрет киберпанк андроида",
    date: "21.04.2026",
    tags: ["android", "ai", "portrait"]
  },
  {
    id: 4,
    type: "video",
    src: "",
    title: "Анимация частиц",
    prompt: "/video анимация нейронных частиц",
    date: "20.04.2026",
    tags: ["particles", "animation", "neural"]
  },
  {
    id: 5,
    type: "image",
    src: "https://cdn.poehali.dev/projects/1f055f91-d967-4578-b969-a5c8ed36935a/files/a50937be-af03-4184-86af-4a466b7125e5.jpg",
    title: "Неоновый закат",
    prompt: "/image закат в стиле synthwave",
    date: "19.04.2026",
    tags: ["sunset", "synthwave", "neon"]
  },
  {
    id: 6,
    type: "video",
    src: "",
    title: "Квантовый поток",
    prompt: "/video квантовые потоки данных",
    date: "18.04.2026",
    tags: ["quantum", "data", "flow"]
  },
];

const GalleryPage = () => {
  const [filter, setFilter] = useState<"all" | "image" | "video">("all");
  const [selected, setSelected] = useState<typeof GALLERY_ITEMS[0] | null>(null);

  const filtered = GALLERY_ITEMS.filter((i) => filter === "all" || i.type === filter);

  return (
    <div className="min-h-screen px-4 md:px-8 py-8">
      {/* Header */}
      <div className="mb-8 animate-fade-in-up">
        <div className="font-mono-plex text-xs tracking-widest mb-2" style={{ color: "#4a7a7a" }}>
          CONTENT GENERATION / MEDIA VAULT
        </div>
        <h1 className="font-orbitron font-bold text-2xl md:text-3xl tracking-wider" style={{ color: "#e0ffff" }}>
          ГАЛЕРЕЯ <span className="neon-text-cyan">NEXUS</span>
        </h1>
        <p className="font-rajdhani text-sm mt-2" style={{ color: "#4a7a7a" }}>
          Сгенерированные изображения и видео · {GALLERY_ITEMS.length} объектов
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 animate-fade-in-up delay-100">
        <div className="flex items-center gap-1" style={{ border: "1px solid rgba(0,255,255,0.15)" }}>
          {(["all", "image", "video"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-4 py-2 text-xs font-orbitron tracking-wider transition-all duration-200"
              style={
                filter === f
                  ? { background: "rgba(0,255,255,0.12)", color: "#00ffff", borderRight: "1px solid rgba(0,255,255,0.15)" }
                  : { color: "#4a7a7a" }
              }
            >
              {f === "all" ? "ВСЕ" : f === "image" ? "📸 ФОТО" : "🎬 ВИДЕО"}
            </button>
          ))}
        </div>

        <button
          className="flex items-center gap-2 px-5 py-2 text-xs font-orbitron tracking-wider transition-all duration-300"
          style={{ background: "rgba(191,0,255,0.08)", border: "1px solid rgba(191,0,255,0.4)", color: "#bf00ff" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(191,0,255,0.15)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 20px rgba(191,0,255,0.3)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(191,0,255,0.08)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "none"; }}
        >
          <Icon name="Sparkles" size={12} />
          ГЕНЕРИРОВАТЬ
        </button>
      </div>

      {/* Quick command chips */}
      <div className="flex flex-wrap gap-2 mb-8 animate-fade-in-up delay-200">
        {["/image пейзаж", "/image портрет", "/video анимация", "/image арт", "/video кинематограф"].map((cmd) => (
          <button
            key={cmd}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono-plex transition-all duration-200"
            style={{ background: "rgba(0,255,255,0.03)", border: "1px solid rgba(0,255,255,0.1)", color: "#4a7a7a" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#00ffff"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(0,255,255,0.4)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#4a7a7a"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(0,255,255,0.1)"; }}
          >
            <span className="text-xs">⚡</span>
            {cmd}
          </button>
        ))}
      </div>

      {/* Gallery grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in-up delay-300">
        {filtered.map((item, i) => (
          <div
            key={item.id}
            onClick={() => setSelected(item)}
            className="group cursor-pointer animate-fade-in-up relative overflow-hidden"
            style={{
              border: "1px solid rgba(0,255,255,0.1)",
              animationDelay: `${i * 0.08}s`,
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(0,255,255,0.4)";
              (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 25px rgba(0,255,255,0.1)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(0,255,255,0.1)";
              (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
            }}
          >
            {/* Image/Video preview */}
            <div className="relative aspect-video overflow-hidden" style={{ background: "rgba(0,255,255,0.03)" }}>
              {item.type === "image" && item.src ? (
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center">
                  <div
                    className="w-12 h-12 flex items-center justify-center animate-float"
                    style={{ border: "1px solid rgba(0,255,255,0.3)", color: "#00ffff" }}
                  >
                    <Icon name={item.type === "video" ? "Video" : "Image"} size={20} />
                  </div>
                  <span className="font-mono-plex text-xs mt-2" style={{ color: "#2a4a5a" }}>
                    {item.type === "video" ? "VIDEO" : "LOADING"}
                  </span>
                </div>
              )}
              {/* Overlay on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                style={{ background: "rgba(0,10,20,0.7)" }}
              >
                <div
                  className="flex items-center gap-2 px-3 py-2"
                  style={{ border: "1px solid #00ffff", color: "#00ffff" }}
                >
                  <Icon name="Expand" size={14} />
                  <span className="font-orbitron text-xs tracking-wider">ОТКРЫТЬ</span>
                </div>
              </div>
              {/* Type badge */}
              <div
                className="absolute top-2 left-2 px-2 py-0.5 font-orbitron text-xs tracking-widest"
                style={
                  item.type === "video"
                    ? { background: "rgba(191,0,255,0.8)", color: "#fff", border: "1px solid #bf00ff" }
                    : { background: "rgba(0,255,255,0.15)", color: "#00ffff", border: "1px solid rgba(0,255,255,0.4)" }
                }
              >
                {item.type === "video" ? "VIDEO" : "IMG"}
              </div>
            </div>

            {/* Info */}
            <div className="p-3" style={{ background: "rgba(5,10,15,0.8)" }}>
              <h3 className="font-rajdhani font-semibold text-sm mb-1" style={{ color: "#c0f0f0" }}>{item.title}</h3>
              <p className="font-mono-plex text-xs mb-2 opacity-60 truncate" style={{ color: "#7ababa" }}>{item.prompt}</p>
              <div className="flex items-center justify-between">
                <div className="flex gap-1 flex-wrap">
                  {item.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-1.5 py-0.5 font-mono-plex text-xs"
                      style={{ background: "rgba(0,255,255,0.06)", border: "1px solid rgba(0,255,255,0.1)", color: "#4a7a7a" }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <span className="font-mono-plex text-xs" style={{ color: "#2a4a5a" }}>{item.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,5,10,0.95)", backdropFilter: "blur(10px)" }}
          onClick={() => setSelected(null)}
        >
          <div
            className="relative w-full max-w-3xl animate-scale-in"
            style={{ border: "1px solid rgba(0,255,255,0.3)", background: "rgba(5,10,15,0.9)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 z-10 p-2 transition-all duration-200"
              style={{ border: "1px solid rgba(0,255,255,0.3)", color: "#00ffff" }}
              onClick={() => setSelected(null)}
            >
              <Icon name="X" size={14} />
            </button>
            {selected.src ? (
              <img src={selected.src} alt={selected.title} className="w-full" />
            ) : (
              <div className="w-full aspect-video flex items-center justify-center" style={{ background: "rgba(0,255,255,0.02)" }}>
                <Icon name="Video" size={40} style={{ color: "#00ffff" } as React.CSSProperties} />
              </div>
            )}
            <div className="p-5">
              <h2 className="font-orbitron font-bold text-lg mb-1" style={{ color: "#00ffff" }}>{selected.title}</h2>
              <p className="font-mono-plex text-sm mb-3" style={{ color: "#4a7a7a" }}>{selected.prompt}</p>
              <div className="flex items-center gap-3">
                <button
                  className="flex items-center gap-2 px-4 py-2 text-xs font-orbitron tracking-wider transition-all duration-200"
                  style={{ border: "1px solid rgba(0,255,255,0.3)", color: "#00ffff" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,255,255,0.1)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
                >
                  <Icon name="Download" size={12} />
                  СКАЧАТЬ
                </button>
                <button
                  className="flex items-center gap-2 px-4 py-2 text-xs font-orbitron tracking-wider transition-all duration-200"
                  style={{ border: "1px solid rgba(191,0,255,0.3)", color: "#bf00ff" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(191,0,255,0.1)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
                >
                  <Icon name="Share2" size={12} />
                  ПОДЕЛИТЬСЯ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
