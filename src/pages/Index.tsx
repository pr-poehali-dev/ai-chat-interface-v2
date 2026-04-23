import { useState } from "react";
import AuthPage from "./AuthPage";
import ChatPage from "./ChatPage";
import GalleryPage from "./GalleryPage";
import ProfilePage from "./ProfilePage";
import ArchivePage from "./ArchivePage";
import Icon from "@/components/ui/icon";

type Page = "auth" | "chat" | "gallery" | "profile" | "archive";

interface User {
  name: string;
  email: string;
}

const Index = () => {
  const [currentPage, setCurrentPage] = useState<Page>("auth");
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (userData: User) => {
    setUser(userData);
    setCurrentPage("chat");
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage("auth");
  };

  if (currentPage === "auth") {
    return <AuthPage onLogin={handleLogin} />;
  }

  const navItems = [
    { id: "chat", icon: "MessageSquare", label: "NEXUS CHAT" },
    { id: "gallery", icon: "Image", label: "GALLERY" },
    { id: "archive", icon: "Archive", label: "ARCHIVE" },
    { id: "profile", icon: "User", label: "PROFILE" },
  ] as const;

  return (
    <div className="min-h-screen grid-bg scanline-bg" style={{ background: "var(--dark-bg)" }}>
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute w-96 h-96 rounded-full opacity-10 animate-pulse-slow"
          style={{ background: "radial-gradient(circle, #00ffff, transparent)", top: "-10%", left: "-10%" }}
        />
        <div
          className="absolute w-80 h-80 rounded-full opacity-10 animate-pulse-slow delay-500"
          style={{ background: "radial-gradient(circle, #bf00ff, transparent)", bottom: "10%", right: "5%" }}
        />
        <div
          className="absolute left-0 right-0 h-px opacity-20 animate-scanline pointer-events-none"
          style={{ background: "linear-gradient(90deg, transparent, #00ffff, transparent)", top: 0 }}
        />
      </div>

      {/* Top nav */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3"
        style={{ background: "rgba(5,10,15,0.9)", borderBottom: "1px solid rgba(0,255,255,0.15)", backdropFilter: "blur(20px)" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 flex items-center justify-center animate-glow-pulse"
            style={{ border: "1px solid #00ffff", background: "rgba(0,255,255,0.1)" }}
          >
            <span className="text-xs font-orbitron font-bold" style={{ color: "#00ffff" }}>N</span>
          </div>
          <span className="font-orbitron font-bold tracking-widest text-sm" style={{ color: "#00ffff" }}>
            NEXUS <span style={{ color: "#bf00ff" }}>AI</span>
          </span>
          <span className="font-mono-plex text-xs opacity-40 hidden md:block" style={{ color: "#00ffff" }}>
            v2.4.1_ALPHA
          </span>
        </div>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id as Page)}
              className="flex items-center gap-2 px-4 py-2 text-xs font-orbitron tracking-widest transition-all duration-300"
              style={
                currentPage === item.id
                  ? { color: "#00ffff", borderBottom: "1px solid #00ffff", textShadow: "0 0 8px #00ffff" }
                  : { color: "#4a7a7a" }
              }
            >
              <Icon name={item.icon} size={12} />
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div
            className="hidden md:flex items-center gap-2 px-3 py-1.5 text-xs"
            style={{ border: "1px solid rgba(0,255,255,0.2)", color: "#a0f4f4" }}
          >
            <div className="w-1.5 h-1.5 rounded-full animate-pulse-slow" style={{ background: "#00ff88" }} />
            <span className="font-mono-plex">{user?.name || "USER"}</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-orbitron tracking-wider transition-all duration-300"
            style={{ border: "1px solid rgba(255,0,100,0.4)", color: "#ff6688" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,0,100,0.1)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
          >
            <Icon name="LogOut" size={11} />
            EXIT
          </button>
        </div>
      </nav>

      {/* Mobile bottom nav */}
      <div
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around px-4 py-3"
        style={{ background: "rgba(5,10,15,0.95)", borderTop: "1px solid rgba(0,255,255,0.15)", backdropFilter: "blur(20px)" }}
      >
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentPage(item.id as Page)}
            className="flex flex-col items-center gap-1 px-3 py-1 transition-all duration-300"
            style={currentPage === item.id ? { color: "#00ffff", textShadow: "0 0 8px #00ffff" } : { color: "#4a7a7a" }}
          >
            <Icon name={item.icon} size={18} />
            <span className="text-[9px] font-orbitron tracking-wider">{item.label.split(" ")[0]}</span>
          </button>
        ))}
      </div>

      <main className="pt-14 pb-16 md:pb-0 min-h-screen">
        {currentPage === "chat" && <ChatPage />}
        {currentPage === "gallery" && <GalleryPage />}
        {currentPage === "archive" && <ArchivePage />}
        {currentPage === "profile" && <ProfilePage user={user} onLogout={handleLogout} />}
      </main>
    </div>
  );
};

export default Index;
