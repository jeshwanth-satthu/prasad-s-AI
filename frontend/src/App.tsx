import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastProvider } from "./components/Toast";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { Landing } from "./pages/Landing";
import { Dashboard } from "./pages/Dashboard";
import { Research } from "./pages/Research";
import { ScriptStudio } from "./pages/ScriptStudio";
import { Ideas } from "./pages/Ideas";
import { Comments } from "./pages/Comments";
import { Shorts } from "./pages/Shorts";
import { HistoryPage } from "./pages/HistoryPage";
import { SettingsPage } from "./pages/SettingsPage";

function AppLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 min-w-0">
        <Header onMenu={() => setSidebarOpen(true)} />
        {children}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/app" element={<AppLayout><Dashboard /></AppLayout>} />
          <Route path="/app/research" element={<AppLayout><Research /></AppLayout>} />
          <Route path="/app/script-studio" element={<AppLayout><ScriptStudio /></AppLayout>} />
          <Route path="/app/ideas" element={<AppLayout><Ideas /></AppLayout>} />
          <Route path="/app/comments" element={<AppLayout><Comments /></AppLayout>} />
          <Route path="/app/shorts" element={<AppLayout><Shorts /></AppLayout>} />
          <Route path="/app/history" element={<AppLayout><HistoryPage /></AppLayout>} />
          <Route path="/app/settings" element={<AppLayout><SettingsPage /></AppLayout>} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}
