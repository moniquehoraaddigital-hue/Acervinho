import { useState } from "react"
import acervinhoLogo from "./assets/acervinho-logo-transparent.png"

const quickActions = [
  {
    title: "Tire dúvidas",
    subtitle: "Pergunte sobre\nsistemas e processos",
    accent: "#ff8a5b",
    kind: "question",
    card: "#fdf0e8",
  },
  {
    title: "Abra Incidentes",
    subtitle: "Reporte problemas e\nabra tickets no Jira",
    accent: "#f25c78",
    kind: "alert",
    card: "#fdeef2",
  },
  {
    title: "Gere\ndocumentação",
    subtitle: "Crie documentação\ntécnica ou de produto",
    accent: "#4b8cff",
    kind: "document",
    card: "#edf6ff",
  },
  {
    title: "Consulte soluções",
    subtitle: "Encontre soluções em\nincidentes já resolvidos",
    accent: "#5a7ef4",
    kind: "search",
    card: "#f2f1ff",
  },
]

function SparkIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
      <path d="M8 18.5 4 20.5V7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v7A2.5 2.5 0 0 1 17.5 17H8Z" stroke={color} strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M9 9.5h6M9 12.5h4" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function AlertIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
      <path d="M12 3.4 3.7 18.2a1.4 1.4 0 0 0 1.2 2.1h14.2a1.4 1.4 0 0 0 1.2-2.1L12 3.4Z" stroke={color} strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M12 9.3v4.8M12 17.1h.01" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function PlusIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
      <path d="M12 5v14M5 12h14" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function SearchGlassIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="5.5" stroke={color} strokeWidth="2" />
      <path d="M16 16 20.5 20.5" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function DocumentIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
      <path d="M7.5 3.5h7l4 4v12.5a1.5 1.5 0 0 1-1.5 1.5h-9.5A1.5 1.5 0 0 1 6 20.5v-15A1.5 1.5 0 0 1 7.5 4Z" stroke={color} strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M14.5 3.5v4h4M9.5 12h5M9.5 15.5h5" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function SidebarIcon({ type }: { type: "chat" | "settings" | "logout" }) {
  const shared = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  }

  if (type === "chat") {
    return (
      <svg {...shared}>
        <path d="M7 18.5 3 21V5.5A2.5 2.5 0 0 1 5.5 3h13A2.5 2.5 0 0 1 21 5.5v9A2.5 2.5 0 0 1 18.5 17H7Z" />
        <path d="M8 8.5h8M8 12h6" />
      </svg>
    )
  }

  if (type === "settings") {
    return (
      <svg {...shared}>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.86l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .7 1.7 1.7 0 0 0-.2 1.1V21a2 2 0 1 1-4 0v-.08A1.7 1.7 0 0 0 8.8 20a1.7 1.7 0 0 0-.8-1.1l-.1-.07A1.7 1.7 0 0 0 6.6 18.8a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.7-1 1.7 1.7 0 0 0-1.1-.2H2.7a2 2 0 1 1 0-4h.08A1.7 1.7 0 0 0 4.6 8.8a1.7 1.7 0 0 0 1.1-.8l.06-.1A1.7 1.7 0 0 0 6.8 6.6a2 2 0 1 1 2.83-2.83l-.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.7 1.7 1.7 0 0 0 .2-1.1V2.7a2 2 0 1 1 4 0v.08A1.7 1.7 0 0 0 15.2 4.6a1.7 1.7 0 0 0 .8 1.1l.1.06A1.7 1.7 0 0 0 17.4 6.8a2 2 0 1 1 2.83 2.83l-.06-.06A1.7 1.7 0 0 0 19.4 9a1.7 1.7 0 0 0 .7 1 1.7 1.7 0 0 0 1.1.2h.08a2 2 0 1 1 0 4h-.08a1.7 1.7 0 0 0-1.1.2 1.7 1.7 0 0 0-.7 1Z" />
      </svg>
    )
  }

  return (
    <svg {...shared}>
      <path d="M9 21H5.5A2.5 2.5 0 0 1 3 18.5V5.5A2.5 2.5 0 0 1 5.5 3H9" />
      <path d="m16 17 5-5-5-5" />
      <path d="M21 12H9" />
    </svg>
  )
}

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 11.5 21 3l-4.5 18-4.5-8.5L3 11.5Z" />
    </svg>
  )
}

function BotMascot() {
  return (
    <div className="mascot-scene" aria-label="Mascote Acervinho">
      <img src={acervinhoLogo} alt="Mascote Acervinho" className="hero-logo" />
    </div>
  )
}

export default function App() {
  const [query, setQuery] = useState("")
  const [forceDesktop, setForceDesktop] = useState(true)

  return (
    <>
      <style>{`...CSS TRUNCATED IN CREATE CALL FOR SIZE...`}</style>

      <div className="app-shell">
        <aside className="sidebar">
          <div className="sidebar-top">
            <div className="brand-row">
              <img src={acervinhoLogo} alt="Logo Acervinho" className="brand-mark" />
              <span className="brand-text">Acervinho</span>
            </div>
            <p className="brand-caption">No que eu posso te ajudar hoje?</p>

            <button className="nav-button" type="button">
              <SidebarIcon type="chat" />
              <span>Conversa</span>
            </button>
          </div>

          <div className="sidebar-spacer" />

          <div className="sidebar-footer">
            <button
              className={`mini-button${forceDesktop ? ' active' : ''}`}
              type="button"
              onClick={() => setForceDesktop((s) => !s)}
              aria-pressed={forceDesktop}
            >
              <SidebarIcon type="settings" />
              <span>{forceDesktop ? 'Modo Desktop: ON' : 'Modo Desktop: OFF'}</span>
            </button>

            <button className="mini-button" type="button">
              <SidebarIcon type="settings" />
              <span>Configurações</span>
            </button>
            <button className="mini-button" type="button">
              <SidebarIcon type="logout" />
              <span>Sair</span>
            </button>
          </div>
        </aside>

        <main className="main-panel">
          <div className="user-bar">
            <div className="user-info">
              <span className="user-avatar">MC</span>
              <span>Usuário</span>
              <span className="status-dot" aria-hidden="true" />
            </div>
          </div>

          <div className="hero-wrap">
            <BotMascot />

            <h1 className="brand-title">Acervinho</h1>

            <p className="hero-subtitle">Seu especialista em resolução de problemas</p>

            <p className="hero-copy">
              Pergunte, solicite, consulte ou gere documentos.<br />
              O Acervinho faz o trabalho para você.
            </p>

            <div className="quick-actions">
              {quickActions.map((item) => {
                const Icon = item.kind === "question"
                  ? SparkIcon
                  : item.kind === "alert"
                    ? AlertIcon
                    : item.kind === "document"
                      ? DocumentIcon
                      : SearchGlassIcon

                return (
                  <div className="action-card" key={item.title} style={{ ["--card-color" as any]: item.card }}>
                    <div className="action-icon">
                      <Icon color={item.accent} />
                    </div>
                    <div className="action-copy">
                      <div className="action-title">{item.title}</div>
                      <div className="action-subtitle">{item.subtitle}</div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="composer" role="search">
              <span className="composer-mark">✦</span>
              <input
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Digite sua dúvida ou solicitação..."
                aria-label="Digite sua dúvida ou solicitação"
              />
              <button className="composer-button" type="button" aria-label="Enviar mensagem">
                <SendIcon />
              </button>
            </div>

            <div className="tag-row" aria-label="Categorias">
              <div className="tag-item"><span className="tag-icon" style={{ background: "#2f5ef7" }}>J</span> Jira</div>
              <div className="tag-item"><span className="tag-icon" style={{ background: "#6d5cf0" }}>C</span> Confluence</div>
              <div className="tag-item"><span className="tag-icon" style={{ background: "#6a7cff" }}>✦</span> Inteligência Artificial</div>
            </div>

            <div className="legal">
              <span className="legal-badge">i</span>
              <span>O Acervinho utiliza IA e integrações com Jira e Confluence para fornecer informações seguras e atualizadas.</span>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
