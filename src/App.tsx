import { useState } from "react"

function AcervinhoLogo({ size = 32 }: { size?: number }) {
  const id = "logo-grad-" + size
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4F46E5" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
      </defs>
      <circle cx="16" cy="16" r="14" stroke={`url(#${id})`} strokeWidth="3" fill="none" />
      <circle cx="16" cy="16" r="8" fill={`url(#${id})`} />
      <circle cx="16" cy="16" r="3.5" fill="white" />
    </svg>
  )
}

function AcervinhoInlineO({ size = 52 }: { size?: number }) {
  return (
    <svg width={size * 0.72} height={size} viewBox="0 0 37 52" fill="none" style={{ display: "inline", verticalAlign: "middle", marginBottom: 4 }}>
      <defs>
        <linearGradient id="o-grad" x1="0" y1="0" x2="37" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4F46E5" />
          <stop offset="60%" stopColor="#EC4899" />
          <stop offset="100%" stopColor="#F43F5E" />
        </linearGradient>
      </defs>
      <circle cx="18.5" cy="26" r="16" stroke="url(#o-grad)" strokeWidth="3.5" fill="none" />
      <circle cx="18.5" cy="26" r="9" fill="url(#o-grad)" />
      <circle cx="18.5" cy="26" r="3.8" fill="white" />
    </svg>
  )
}

function SendIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m22 2-7 20-4-9-9-4 20-7z" />
    </svg>
  )
}

function ChatIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}

function BellIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  )
}

function SettingsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
      <path d="M12 2v2m0 16v2M2 12h2m16 0h2" />
    </svg>
  )
}

function LogoutIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16,17 21,12 16,7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  )
}

function SparkleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="2">
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
    </svg>
  )
}

const actionCards = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="1.8">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    bg: "#FFF7ED",
    title: "Tire duvidas",
    desc: "Perguntas sobre sistemas e processos da empresa",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="1.8">
        <polygon points="13,2 3,14 12,14 11,22 21,10 12,10" />
      </svg>
    ),
    bg: "#FEF2F2",
    title: "Abra Incidentes",
    desc: "Reporte problemas e abra tickets no Jira",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="1.8">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14,2 14,8 20,8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10,9 9,9 8,9" />
      </svg>
    ),
    bg: "#EFF6FF",
    title: "Gere documentacao",
    desc: "Crie documentacao tecnica ou de produto",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="1.8">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
    ),
    bg: "#F5F3FF",
    title: "Consulte solucoes",
    desc: "Encontre solucoes em incidentes ja resolvidos",
  },
]

const chatHistory = [
  { id: 1, label: "Como criar um projeto no Jira?" },
  { id: 2, label: "Documentacao de API REST" },
  { id: 3, label: "Abrir incidente critico" },
]

export default function App() {
  const [query, setQuery] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeNav, setActiveNav] = useState<string | null>(null)

  function handleSend() {
    if (!query.trim()) return
    setQuery("")
  }

  return (
    <div className="flex h-screen bg-white overflow-hidden font-sans">
      <aside
        className="flex flex-col border-r border-gray-100 bg-white transition-all duration-300"
        style={{ width: sidebarOpen ? 220 : 0, minWidth: sidebarOpen ? 220 : 0, overflow: "hidden" }}
      >
        <div className="flex items-center gap-2 px-5 pt-6 pb-2">
          <AcervinhoLogo size={26} />
          <div>
            <span className="font-bold text-gray-900 text-sm tracking-tight">Acervinho</span>
            <p className="text-[10px] text-gray-400 leading-tight">Seu especialista em<br />Jira e Confluence</p>
          </div>
        </div>

        <div className="mt-4 px-3">
          <button
            onClick={() => setActiveNav("chat")}
            className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors"
          >
            <ChatIcon />
            <span>Conversar</span>
          </button>
        </div>

        <div className="mt-5 px-4 flex-1 overflow-y-auto">
          <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-2 font-semibold">Recentes</p>
          {chatHistory.map((c) => (
            <button
              key={c.id}
              className="flex items-center gap-2 w-full px-2 py-1.5 rounded-md text-xs text-gray-600 hover:bg-gray-50 text-left transition-colors truncate"
            >
              <ChatIcon size={13} />
              <span className="truncate">{c.label}</span>
            </button>
          ))}
        </div>

        <div className="px-4 pb-5 flex flex-col gap-1 border-t border-gray-100 pt-3 mt-2">
          <button className="flex items-center gap-2 px-2 py-2 rounded-md text-xs text-gray-500 hover:bg-gray-50 transition-colors">
            <SettingsIcon />
            <span>Configuracoes</span>
          </button>
          <button className="flex items-center gap-2 px-2 py-2 rounded-md text-xs text-gray-500 hover:bg-gray-50 transition-colors">
            <LogoutIcon />
            <span>Sair</span>
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between px-6 py-3 border-b border-gray-100 bg-white">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors"
            aria-label="Toggle sidebar"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-lg text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors relative">
              <BellIcon />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-500" />
            </button>
            <div className="flex items-center gap-2 pl-1">
              <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-semibold shadow-sm">
                UT
              </div>
              <span className="text-sm text-gray-700 font-medium hidden sm:block">Usuario Teste</span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto flex flex-col items-center justify-center px-6 py-10">
          <div className="flex flex-col items-center mb-8">
            <div className="flex items-center mb-1">
              <h1 className="text-5xl font-black tracking-tight leading-none" style={{ backgroundImage: "linear-gradient(90deg, #4F46E5 0%, #EC4899 60%, #F43F5E 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Acervinh
              </h1>
              <AcervinhoInlineO size={52} />
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="block w-8 h-px bg-red-400" />
              <p className="text-sm text-gray-500 font-medium">Seu especialista em Jira e Confluence</p>
              <span className="block w-8 h-px bg-red-400" />
            </div>
          </div>

          <div className="w-full max-w-xl mb-8">
            <div
              className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-md focus-within:border-indigo-400 transition-all"
              style={{ boxShadow: "0 4px 24px rgba(99,102,241,0.10)" }}
            >
              <SparkleIcon />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Como posso ajudar voce hoje?"
                className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
              />
              <button
                onClick={handleSend}
                className="flex items-center justify-center w-9 h-9 rounded-xl text-white transition-all hover:opacity-90 active:scale-95"
                style={{ background: "linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)" }}
              >
                <SendIcon />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-2xl mb-10">
            {actionCards.map((card) => (
              <button
                key={card.title}
                className="flex flex-col items-start gap-2 p-4 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all text-left group"
                style={{ backgroundColor: card.bg }}
              >
                <div className="mb-0.5">{card.icon}</div>
                <span className="text-sm font-semibold text-gray-800 leading-tight">{card.title}</span>
                <p className="text-xs text-gray-500 leading-snug">{card.desc}</p>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-5 mb-6">
            <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
              <svg width="18" height="18" viewBox="0 0 32 32" fill="none">
                <rect width="32" height="32" rx="6" fill="#0052CC" />
                <path d="M16 6L6 16l5 5 5-5 5 5 5-5-10-10z" fill="white" opacity="0.7" />
                <path d="M16 16l-5 5 5 5 5-5-5-5z" fill="white" />
              </svg>
              Jira
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
              <svg width="18" height="18" viewBox="0 0 32 32" fill="none">
                <rect width="32" height="32" rx="6" fill="#0052CC" />
                <path d="M5 22c4-6 10-10 22-10" stroke="white" strokeWidth="3" strokeLinecap="round" />
                <path d="M27 10c-4 6-10 10-22 10" stroke="#6BA3FF" strokeWidth="3" strokeLinecap="round" />
              </svg>
              Confluence
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
              <svg width="18" height="18" viewBox="0 0 32 32" fill="none">
                <rect width="32" height="32" rx="6" fill="#7C3AED" />
                <circle cx="16" cy="16" r="6" stroke="white" strokeWidth="2" />
                <path d="M16 10V8M16 24v-2M10 16H8M24 16h-2" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <circle cx="16" cy="16" r="2" fill="white" />
              </svg>
              Inteligencia Artificial
            </div>
          </div>

          <p className="text-[11px] text-gray-400 text-center max-w-md">
            O Acervinho utiliza a integracao com Jira e Confluence para fornecer informacoes seguras e atualizadas.
          </p>
        </main>
      </div>
    </div>
  )
}
