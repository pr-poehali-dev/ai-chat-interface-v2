import { useState } from "react";
import Icon from "@/components/ui/icon";

interface ProfilePageProps {
  user: { name: string; email: string } | null;
  onLogout: () => void;
}

const STATS = [
  { label: "ДИАЛОГОВ", value: "147", icon: "MessageSquare", color: "#00ffff" },
  { label: "ИЗОБРАЖЕНИЙ", value: "89", icon: "Image", color: "#bf00ff" },
  { label: "ВИДЕО", value: "23", icon: "Video", color: "#ff00aa" },
  { label: "ТОКЕНОВ", value: "2.4M", icon: "Zap", color: "#00ff88" },
];

const PLAN_FEATURES = [
  { text: "Безлимитные диалоги с AI", active: true },
  { text: "Генерация изображений HD", active: true },
  { text: "Генерация видео 4K", active: false },
  { text: "Приоритетная очередь GPU", active: false },
  { text: "API доступ", active: false },
];

const ProfilePage = ({ user, onLogout }: ProfilePageProps) => {
  const [notifications, setNotifications] = useState(true);
  const [darkHud, setDarkHud] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [activeTab, setActiveTab] = useState<"stats" | "settings" | "plan">("stats");

  return (
    <div className="min-h-screen px-4 md:px-8 py-8 max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8 animate-fade-in-up">
        <div className="font-mono-plex text-xs tracking-widest mb-2" style={{ color: "#4a7a7a" }}>
          USER PROFILE / CONTROL CENTER
        </div>
        <h1 className="font-orbitron font-bold text-2xl md:text-3xl tracking-wider" style={{ color: "#e0ffff" }}>
          ПРОФИЛЬ <span className="neon-text-cyan">NEXUS</span>
        </h1>
      </div>

      {/* Profile card */}
      <div
        className="relative p-6 mb-6 animate-fade-in-up delay-100"
        style={{ background: "rgba(8,13,20,0.9)", border: "1px solid rgba(0,255,255,0.15)" }}
      >
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l" style={{ borderColor: "#00ffff" }} />
        <div className="absolute top-0 right-0 w-4 h-4 border-t border-r" style={{ borderColor: "#00ffff" }} />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l" style={{ borderColor: "#bf00ff" }} />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r" style={{ borderColor: "#bf00ff" }} />

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div
              className="w-20 h-20 flex items-center justify-center animate-glow-pulse font-orbitron font-bold text-2xl"
              style={{
                border: "2px solid #00ffff",
                background: "rgba(0,255,255,0.06)",
                color: "#00ffff",
                boxShadow: "0 0 30px rgba(0,255,255,0.15)"
              }}
            >
              {(user?.name || "U").charAt(0).toUpperCase()}
            </div>
            <div
              className="absolute -bottom-1 -right-1 w-5 h-5 flex items-center justify-center"
              style={{ background: "#00ff88", border: "2px solid var(--dark-bg)" }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse-slow" />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 text-center sm:text-left">
            <h2 className="font-orbitron font-bold text-xl mb-1" style={{ color: "#e0ffff" }}>
              {user?.name || "NEXUS USER"}
            </h2>
            <p className="font-mono-plex text-sm mb-2" style={{ color: "#4a7a7a" }}>{user?.email || "user@nexus.ai"}</p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span
                className="px-3 py-1 font-orbitron text-xs tracking-wider"
                style={{ border: "1px solid rgba(0,255,255,0.3)", color: "#00ffff", background: "rgba(0,255,255,0.06)" }}
              >
                ◆ NEXUS PRO
              </span>
              <span
                className="px-3 py-1 font-orbitron text-xs tracking-wider"
                style={{ border: "1px solid rgba(0,255,136,0.3)", color: "#00ff88", background: "rgba(0,255,136,0.06)" }}
              >
                ● ONLINE
              </span>
              <span className="font-mono-plex text-xs" style={{ color: "#2a4a5a" }}>
                С апреля 2026
              </span>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 text-xs font-orbitron tracking-wider transition-all duration-200 shrink-0"
            style={{ border: "1px solid rgba(255,50,50,0.3)", color: "#ff5050" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,50,50,0.08)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
          >
            <Icon name="LogOut" size={12} />
            ВЫЙТИ
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div
        className="flex mb-6 animate-fade-in-up delay-200"
        style={{ border: "1px solid rgba(0,255,255,0.15)" }}
      >
        {(["stats", "settings", "plan"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="flex-1 py-3 text-xs font-orbitron tracking-widest transition-all duration-200"
            style={
              activeTab === tab
                ? { background: "rgba(0,255,255,0.1)", color: "#00ffff", borderBottom: "2px solid #00ffff" }
                : { color: "#4a7a7a" }
            }
          >
            {tab === "stats" ? "СТАТИСТИКА" : tab === "settings" ? "НАСТРОЙКИ" : "ТАРИФ"}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "stats" && (
        <div className="animate-fade-in-up">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="p-4 text-center"
                style={{ border: "1px solid rgba(255,255,255,0.06)", background: "rgba(5,10,15,0.8)" }}
              >
                <Icon name={stat.icon} size={20} className="mx-auto mb-2" style={{ color: stat.color } as React.CSSProperties} />
                <div className="font-orbitron font-bold text-xl" style={{ color: stat.color }}>{stat.value}</div>
                <div className="font-mono-plex text-xs mt-1" style={{ color: "#2a4a5a" }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Usage bar */}
          <div
            className="p-5"
            style={{ border: "1px solid rgba(0,255,255,0.1)", background: "rgba(5,10,15,0.6)" }}
          >
            <div className="flex justify-between items-center mb-3">
              <span className="font-orbitron text-xs tracking-wider" style={{ color: "#a0f4f4" }}>ИСПОЛЬЗОВАНИЕ ТОКЕНОВ</span>
              <span className="font-mono-plex text-xs" style={{ color: "#00ffff" }}>2.4M / 10M</span>
            </div>
            <div className="h-2 w-full rounded-none overflow-hidden" style={{ background: "rgba(0,255,255,0.08)" }}>
              <div
                className="h-full animate-fade-in-up"
                style={{ width: "24%", background: "linear-gradient(90deg, #00ffff, #bf00ff)", boxShadow: "0 0 10px rgba(0,255,255,0.5)", transition: "width 1s ease" }}
              />
            </div>
            <p className="font-mono-plex text-xs mt-2" style={{ color: "#2a4a5a" }}>24% использовано · обновление через 7 дней</p>
          </div>
        </div>
      )}

      {activeTab === "settings" && (
        <div className="space-y-3 animate-fade-in-up">
          {[
            { label: "Уведомления", desc: "Push-уведомления о завершении задач", value: notifications, set: setNotifications },
            { label: "Тёмный HUD", desc: "Тёмная тема интерфейса", value: darkHud, set: setDarkHud },
            { label: "Авто-сохранение", desc: "Автоматически сохранять диалоги", value: autoSave, set: setAutoSave },
          ].map((setting) => (
            <div
              key={setting.label}
              className="flex items-center justify-between p-4 transition-all duration-200"
              style={{ border: "1px solid rgba(0,255,255,0.08)", background: "rgba(5,10,15,0.6)" }}
            >
              <div>
                <p className="font-rajdhani font-semibold text-sm" style={{ color: "#c0f0f0" }}>{setting.label}</p>
                <p className="font-mono-plex text-xs" style={{ color: "#3a6a6a" }}>{setting.desc}</p>
              </div>
              <button
                onClick={() => setting.set(!setting.value)}
                className="w-12 h-6 relative transition-all duration-300"
                style={{
                  background: setting.value ? "rgba(0,255,255,0.15)" : "rgba(0,255,255,0.04)",
                  border: "1px solid",
                  borderColor: setting.value ? "#00ffff" : "rgba(0,255,255,0.2)",
                  boxShadow: setting.value ? "0 0 10px rgba(0,255,255,0.3)" : "none"
                }}
              >
                <div
                  className="absolute top-0.5 w-4 h-4 transition-all duration-300"
                  style={{
                    background: setting.value ? "#00ffff" : "#3a6a6a",
                    left: setting.value ? "calc(100% - 18px)" : "2px",
                    boxShadow: setting.value ? "0 0 8px #00ffff" : "none"
                  }}
                />
              </button>
            </div>
          ))}

          <div className="mt-6">
            <button
              className="w-full py-3 font-orbitron tracking-widest text-xs transition-all duration-200"
              style={{ border: "1px solid rgba(255,50,50,0.3)", color: "#ff5050" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,50,50,0.06)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
            >
              УДАЛИТЬ АККАУНТ
            </button>
          </div>
        </div>
      )}

      {activeTab === "plan" && (
        <div className="animate-fade-in-up">
          <div
            className="p-6 mb-4 relative"
            style={{ border: "1px solid rgba(191,0,255,0.3)", background: "rgba(191,0,255,0.04)" }}
          >
            <div className="absolute top-4 right-4">
              <span
                className="font-orbitron text-xs px-2 py-1"
                style={{ background: "rgba(191,0,255,0.2)", color: "#bf00ff", border: "1px solid rgba(191,0,255,0.4)" }}
              >
                ТЕКУЩИЙ
              </span>
            </div>
            <h3 className="font-orbitron font-bold text-xl mb-1" style={{ color: "#bf00ff" }}>NEXUS PRO</h3>
            <p className="font-mono-plex text-xs mb-4" style={{ color: "#4a7a7a" }}>990 ₽ / месяц</p>
            <div className="space-y-2">
              {PLAN_FEATURES.map((f) => (
                <div key={f.text} className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 flex items-center justify-center shrink-0"
                    style={{ color: f.active ? "#00ff88" : "#2a4a5a" }}
                  >
                    <Icon name={f.active ? "Check" : "X"} size={12} />
                  </div>
                  <span className="font-rajdhani text-sm" style={{ color: f.active ? "#a0f4f4" : "#3a6a6a" }}>
                    {f.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            className="w-full py-3.5 font-orbitron font-bold tracking-widest text-sm transition-all duration-300"
            style={{
              background: "rgba(0,255,255,0.08)",
              border: "1px solid #00ffff",
              color: "#00ffff",
              boxShadow: "0 0 20px rgba(0,255,255,0.15)"
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 35px rgba(0,255,255,0.35)"; (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,255,255,0.14)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 20px rgba(0,255,255,0.15)"; (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,255,255,0.08)"; }}
          >
            UPGRADE → NEXUS ULTRA
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
