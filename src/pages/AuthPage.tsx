import { useState } from "react";
import Icon from "@/components/ui/icon";

interface AuthPageProps {
  onLogin: (user: { name: string; email: string }) => void;
}

const AuthPage = ({ onLogin }: AuthPageProps) => {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin({ name: name || email.split("@")[0], email });
    }, 1500);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden grid-bg"
      style={{ background: "var(--dark-bg)" }}
    >
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-10 animate-pulse-slow"
          style={{ background: "radial-gradient(circle, #00ffff, transparent)", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-8 animate-pulse-slow delay-300"
          style={{ background: "radial-gradient(circle, #bf00ff, transparent)", top: "20%", right: "10%" }}
        />
        <div
          className="absolute left-0 right-0 h-px opacity-15 animate-scanline"
          style={{ background: "linear-gradient(90deg, transparent, #00ffff, transparent)" }}
        />
        {/* Data streams */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0 w-px opacity-20 animate-data-stream"
            style={{
              left: `${10 + i * 12}%`,
              height: "100%",
              background: "linear-gradient(to bottom, transparent, #00ffff, transparent)",
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i * 0.4}s`
            }}
          />
        ))}
      </div>

      {/* Corner decorations */}
      <div className="absolute top-6 left-6 pointer-events-none">
        <div className="w-8 h-8 border-t-2 border-l-2" style={{ borderColor: "#00ffff" }} />
      </div>
      <div className="absolute top-6 right-6 pointer-events-none">
        <div className="w-8 h-8 border-t-2 border-r-2" style={{ borderColor: "#00ffff" }} />
      </div>
      <div className="absolute bottom-6 left-6 pointer-events-none">
        <div className="w-8 h-8 border-b-2 border-l-2" style={{ borderColor: "#bf00ff" }} />
      </div>
      <div className="absolute bottom-6 right-6 pointer-events-none">
        <div className="w-8 h-8 border-b-2 border-r-2" style={{ borderColor: "#bf00ff" }} />
      </div>

      {/* Logo */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 flex items-center justify-center animate-glow-pulse"
            style={{ border: "1px solid #00ffff", background: "rgba(0,255,255,0.08)" }}
          >
            <span className="font-orbitron font-bold text-sm" style={{ color: "#00ffff" }}>N</span>
          </div>
          <span className="font-orbitron font-bold tracking-widest text-lg" style={{ color: "#00ffff" }}>
            NEXUS <span style={{ color: "#bf00ff" }}>AI</span>
          </span>
        </div>
      </div>

      {/* Auth card */}
      <div
        className="relative w-full max-w-md mx-4 p-8 animate-fade-in-up"
        style={{
          background: "rgba(8,13,20,0.95)",
          border: "1px solid rgba(0,255,255,0.2)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 0 40px rgba(0,255,255,0.08), inset 0 0 40px rgba(0,255,255,0.02)"
        }}
      >
        {/* Corner accents on card */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l" style={{ borderColor: "#00ffff" }} />
        <div className="absolute top-0 right-0 w-4 h-4 border-t border-r" style={{ borderColor: "#00ffff" }} />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l" style={{ borderColor: "#bf00ff" }} />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r" style={{ borderColor: "#bf00ff" }} />

        {/* Header */}
        <div className="text-center mb-8">
          <div className="font-mono-plex text-xs tracking-widest mb-2 opacity-50" style={{ color: "#00ffff" }}>
            SYSTEM ACCESS TERMINAL
          </div>
          <h1 className="font-orbitron font-bold text-2xl tracking-wider" style={{ color: "#e0ffff" }}>
            {mode === "login" ? "АВТОРИЗАЦИЯ" : "РЕГИСТРАЦИЯ"}
          </h1>
          <div className="flex items-center gap-2 justify-center mt-2">
            <div className="h-px flex-1" style={{ background: "rgba(0,255,255,0.2)" }} />
            <span className="font-mono-plex text-xs" style={{ color: "#00ffff" }}>■</span>
            <div className="h-px flex-1" style={{ background: "rgba(0,255,255,0.2)" }} />
          </div>
        </div>

        {/* Mode toggle */}
        <div className="flex mb-6" style={{ border: "1px solid rgba(0,255,255,0.15)" }}>
          {(["login", "register"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className="flex-1 py-2 text-xs font-orbitron tracking-widest transition-all duration-300"
              style={
                mode === m
                  ? { background: "rgba(0,255,255,0.12)", color: "#00ffff", borderBottom: "2px solid #00ffff" }
                  : { color: "#4a7a7a" }
              }
            >
              {m === "login" ? "ВХОД" : "НОВЫЙ АККАУНТ"}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "register" && (
            <div className="animate-fade-in-up">
              <label className="block font-mono-plex text-xs mb-1.5 tracking-wider" style={{ color: "#00ffff" }}>
                ИМЯ ПОЛЬЗОВАТЕЛЯ
              </label>
              <div className="relative">
                <Icon name="User" size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#00ffff" } as React.CSSProperties} />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="NEXUS_USER"
                  className="w-full pl-9 pr-4 py-3 text-sm font-mono-plex outline-none transition-all duration-300"
                  style={{
                    background: "rgba(0,255,255,0.03)",
                    border: "1px solid rgba(0,255,255,0.2)",
                    color: "#a0f4f4",
                    caretColor: "#00ffff"
                  }}
                  onFocus={(e) => { e.target.style.borderColor = "#00ffff"; e.target.style.boxShadow = "0 0 15px rgba(0,255,255,0.15)"; }}
                  onBlur={(e) => { e.target.style.borderColor = "rgba(0,255,255,0.2)"; e.target.style.boxShadow = "none"; }}
                />
              </div>
            </div>
          )}

          <div>
            <label className="block font-mono-plex text-xs mb-1.5 tracking-wider" style={{ color: "#00ffff" }}>
              EMAIL / ID
            </label>
            <div className="relative">
              <Icon name="Mail" size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#00ffff" } as React.CSSProperties} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@nexus.ai"
                required
                className="w-full pl-9 pr-4 py-3 text-sm font-mono-plex outline-none transition-all duration-300"
                style={{
                  background: "rgba(0,255,255,0.03)",
                  border: "1px solid rgba(0,255,255,0.2)",
                  color: "#a0f4f4",
                  caretColor: "#00ffff"
                }}
                onFocus={(e) => { e.target.style.borderColor = "#00ffff"; e.target.style.boxShadow = "0 0 15px rgba(0,255,255,0.15)"; }}
                onBlur={(e) => { e.target.style.borderColor = "rgba(0,255,255,0.2)"; e.target.style.boxShadow = "none"; }}
              />
            </div>
          </div>

          <div>
            <label className="block font-mono-plex text-xs mb-1.5 tracking-wider" style={{ color: "#00ffff" }}>
              ПАРОЛЬ / КЛЮЧ
            </label>
            <div className="relative">
              <Icon name="Lock" size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#00ffff" } as React.CSSProperties} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full pl-9 pr-4 py-3 text-sm font-mono-plex outline-none transition-all duration-300"
                style={{
                  background: "rgba(0,255,255,0.03)",
                  border: "1px solid rgba(0,255,255,0.2)",
                  color: "#a0f4f4",
                  caretColor: "#00ffff"
                }}
                onFocus={(e) => { e.target.style.borderColor = "#00ffff"; e.target.style.boxShadow = "0 0 15px rgba(0,255,255,0.15)"; }}
                onBlur={(e) => { e.target.style.borderColor = "rgba(0,255,255,0.2)"; e.target.style.boxShadow = "none"; }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 mt-2 font-orbitron font-bold tracking-widest text-sm transition-all duration-300 relative overflow-hidden"
            style={{
              background: loading ? "rgba(0,255,255,0.05)" : "rgba(0,255,255,0.08)",
              border: "1px solid #00ffff",
              color: "#00ffff",
              boxShadow: "0 0 20px rgba(0,255,255,0.2)"
            }}
            onMouseEnter={(e) => { if (!loading) { (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,255,255,0.15)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 35px rgba(0,255,255,0.4)"; } }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,255,255,0.08)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 20px rgba(0,255,255,0.2)"; }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
                ИНИЦИАЛИЗАЦИЯ...
              </span>
            ) : (
              <span>{mode === "login" ? "ВОЙТИ В СИСТЕМУ" : "СОЗДАТЬ АККАУНТ"}</span>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="font-mono-plex text-xs" style={{ color: "#4a7a7a" }}>
            {mode === "login" ? "Нет аккаунта?" : "Уже есть аккаунт?"}{" "}
            <button
              onClick={() => setMode(mode === "login" ? "register" : "login")}
              className="transition-colors duration-200 hover:underline"
              style={{ color: "#bf00ff" }}
            >
              {mode === "login" ? "Зарегистрироваться" : "Войти"}
            </button>
          </p>
        </div>

        <div className="mt-6 pt-4 flex items-center justify-center gap-4" style={{ borderTop: "1px solid rgba(0,255,255,0.08)" }}>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#00ff88", boxShadow: "0 0 6px #00ff88" }} />
            <span className="font-mono-plex text-xs" style={{ color: "#4a7a7a" }}>SECURE</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#00ffff", boxShadow: "0 0 6px #00ffff" }} />
            <span className="font-mono-plex text-xs" style={{ color: "#4a7a7a" }}>ENCRYPTED</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#bf00ff", boxShadow: "0 0 6px #bf00ff" }} />
            <span className="font-mono-plex text-xs" style={{ color: "#4a7a7a" }}>AI-READY</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
