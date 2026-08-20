import { useState, useRef, useEffect } from "react"
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
  const [results, setResults] = useState<Array<{ id?: number; title?: string; content?: string; score?: number }>>([])
  const [assistant, setAssistant] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  async function handleSend() {
    // clear pending debounce so manual send takes precedence
    if (debounceRef.current) {
      clearTimeout(debounceRef.current as any)
      debounceRef.current = null
    }

    if (!query.trim()) return
    setLoading(true)
    setError(null)
    try {
      const backendUrl = (typeof window !== 'undefined' && window.location.hostname === 'localhost') ? 'http://localhost:4000' : ''
      const res = await fetch(`${backendUrl}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, topK: 5 }),
      })
      if (!res.ok) throw new Error(`Busca falhou: ${res.status}`)
      const data = await res.json()
      // chat returns { answer, sources }
      setResults(Array.isArray(data.sources) ? data.sources.map((s:any) => ({ id: s.id, title: s.title, content: s.snippet })) : [])
      // also set assistant text in a simple way
      setAssistant(data.answer ?? '')
    } catch (err: any) {
      setError(err?.message ?? String(err))
      setResults([])
      setAssistant('')
    } finally {
      setLoading(false)
    }
  }

  // Debounced auto-search as the user types
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current as any)
      debounceRef.current = null
    }

    if (!query.trim()) {
      setResults([])
      setLoading(false)
      return
    }

    debounceRef.current = setTimeout(() => {
      handleSend()
    }, 600)

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current as any)
        debounceRef.current = null
      }
    }
  }, [query])

  return (
    <>
      <style>{`
        :root {
          --bg: #f3f1f4;
          --panel: rgba(255,255,255,0.25);
          --nav-bg: #ecf1ff;
          --text-900: #1b315f;
          --text-700: #4661ad;
          --text-500: #5a6ca1;
          --line: rgba(98, 107, 156, 0.18);
          --purple: #755ef1;
          --pink: #f36ca5;
          --sky: #66d6ff;
          --blue: #2c5df7;
          --shadow: 0 16px 26px rgba(91, 98, 140, 0.12);
        }

        * { box-sizing: border-box; }
        html, body, #root {
          margin: 0;
          min-height: 100%;
          width: 100%;
        }

        body {
          background: var(--bg);
          color: var(--text-900);
          font-family: Inter, "Segoe UI", sans-serif;
          -webkit-font-smoothing: antialiased;
          text-rendering: optimizeLegibility;
        }

        button, input {
          font: inherit;
        }

        .app-shell {
          display: grid;
          grid-template-columns: minmax(220px, 290px) minmax(0, 1fr);
          min-height: 100vh;
          width: 100%;
          background: var(--bg);
        }

        .sidebar {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 28px 22px 18px;
          border-right: 1px solid var(--line);
          background: rgba(255,255,255,0.16);
        }

        .sidebar-top {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .sidebar-spacer {
          flex: 1;
        }

        .brand-row {
          display: flex;
          align-items: center;
          gap: 12px;
          min-height: 42px;
          position: relative;
        }

        .brand-mark {
          position: relative;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          object-fit: contain;
          flex-shrink: 0;
          box-shadow: 0 10px 16px rgba(116, 103, 214, 0.18);
        }

        .brand-caption {
          max-width: 220px;
          color: var(--text-700);
          font-size: clamp(0.78rem, 0.9vw, 0.95rem);
          line-height: 1.35;
          letter-spacing: -0.04em;
          margin: 0;
        }

        .brand-text {
          font-size: clamp(1.05rem, 1.15vw, 1.35rem);
          letter-spacing: -0.06em;
          font-weight: 800;
          color: var(--text-900);
        }

        .nav-button,
        .mini-button {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 10px;
          width: 100%;
          border: 0;
          background: transparent;
          color: var(--text-700);
          padding: 12px 10px;
          border-radius: 14px;
          cursor: pointer;
          transition: background 0.18s ease, transform 0.18s ease;
        }

        .nav-button {
          background: var(--nav-bg);
          color: #475cc0;
          font-size: 1.05rem;
          font-weight: 700;
          box-shadow: inset 0 0 0 1px rgba(80, 97, 169, 0.04);
          justify-content: center;
          margin-top: 12px;
        }

        .nav-button:hover,
        .mini-button:hover {
          transform: translateY(-1px);
        }

        .sidebar-footer {
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding-top: 16px;
          border-top: 1px solid var(--line);
        }

        .mini-button {
          font-size: 0.76rem;
          font-weight: 600;
          color: var(--text-700);
          letter-spacing: -0.02em;
        }

        .main-panel {
          display: flex;
          flex-direction: column;
          min-width: 0;
          padding: 18px clamp(18px, 3vw, 40px) 20px;
        }

        .user-bar {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          min-height: 36px;
          width: 100%;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--text-900);
          font-weight: 700;
          letter-spacing: -0.03em;
        }

        .user-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #62d6ff 0%, #8668f7 50%, #f26fa9 100%);
          color: white;
          font-size: 0.7rem;
          font-weight: 800;
          box-shadow: inset 0 6px 10px rgba(255,255,255,0.4), 0 10px 18px rgba(117, 111, 209, 0.15);
        }

        .status-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: linear-gradient(135deg, #49d785, #adf0bd);
          border: 2px solid rgba(255,255,255,0.9);
          box-shadow: 0 0 0 3px rgba(73, 215, 133, 0.16);
        }

        .hero-wrap {
          width: min(100%, 1040px);
          margin: 0 auto;
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding-top: 8px;
          gap: 0;
        }

        .mascot-scene {
          position: relative;
          width: min(100%, 540px);
          height: clamp(200px, 28vw, 300px);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 10px 0 0;
        }

        .hero-logo {
          display: block;
          width: min(100%, 240px);
          height: auto;
          background: transparent;
          border-radius: 0;
          box-shadow: none;
          filter: none;
        }

        .brand-title {
          margin: 0;
          display: inline-block;
          white-space: nowrap;
          padding-right: 0.08em;
          font-size: clamp(2.4rem, 4vw, 4.6rem);
          line-height: 0.86;
          letter-spacing: -0.065em;
          font-weight: 900;
          background: linear-gradient(90deg, #2f58ef 0%, #5a7afe 20%, #7b5ae9 44%, #e77ab3 74%, #f26c9d 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .hero-subtitle {
          margin: 18px 0 0;
          font-size: clamp(0.98rem, 1.25vw, 1.32rem);
          letter-spacing: -0.04em;
          font-weight: 600;
          color: var(--text-700);
        }

        .hero-copy {
          margin: 12px 0 0;
          color: rgba(75, 91, 150, 0.8);
          font-size: clamp(0.8rem, 0.88vw, 0.96rem);
          line-height: 1.5;
          letter-spacing: -0.02em;
        }

        .quick-actions {
          width: min(100%, 880px);
          margin-top: 24px;
          display: grid;
          grid-template-columns: repeat(4, minmax(160px, 1fr));
          gap: 14px;
        }

        .action-card {
          min-height: 126px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          gap: 12px;
          text-align: center;
          padding: 16px 14px;
          border-radius: 14px;
          background: var(--card-color, rgba(255,255,255,0.12));
          border: 1px solid rgba(130, 140, 190, 0.08);
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.08);
          transition: transform 0.12s ease, box-shadow 0.12s ease;
        }

        .action-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 20px rgba(80, 90, 150, 0.06);
        }

        .action-icon {
          width: 44px;
          height: 44px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          background: rgba(255,255,255,0.7);
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.5);
          margin: 0 0 8px 0;
        }

        .action-copy {
          display: flex;
          flex-direction: column;
          gap: 6px;
          min-width: 0;
          align-items: center;
          width: auto;
        }

        .action-title {
          font-size: 0.84rem;
          line-height: 1.18;
          letter-spacing: -0.03em;
          color: var(--text-900);
          font-weight: 700;
          white-space: pre-line;
        }

        .action-subtitle {
          font-size: 0.64rem;
          line-height: 1.35;
          letter-spacing: -0.018em;
          color: rgba(69, 82, 125, 0.8);
          white-space: pre-line;
        }

        .tag-row {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 18px;
          margin-top: 16px;
          flex-wrap: wrap;
        }

        .tag-item {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.68rem;
          font-weight: 700;
          color: var(--text-900);
          letter-spacing: -0.03em;
        }

        .tag-icon {
          width: 16px;
          height: 16px;
          border-radius: 6px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 0.56rem;
          font-weight: 800;
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.4);
        }

        .composer {
          width: min(100%, 820px);
          margin: 24px auto 0;
          padding: 8px 14px 8px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          border-radius: 999px;
          border: 2px solid rgba(238, 90, 166, 0.85);
          background: rgba(255,255,255,0.04);
          box-shadow: 0 8px 18px rgba(150, 112, 224, 0.08);
          min-height: 56px;
        }

        .composer-mark {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 18px;
          height: 18px;
          color: #4a63d7;
          font-weight: 700;
          font-size: 1.12rem;
          flex-shrink: 0;
        }

        .composer input {
          flex: 1;
          min-width: 0;
          border: 0;
          background: transparent;
          outline: none;
          color: var(--text-900);
          font-size: 0.92rem;
          text-align: left;
          margin-right: 8px;
        }

        .composer input:focus {
          outline: none;
        }

        .composer input::placeholder {
          color: rgba(80, 94, 146, 0.7);
        }

        .composer-button {
          width: 42px;
          height: 42px;
          border: 0;
          border-radius: 50%;
          display: grid;
          place-items: center;
          background: linear-gradient(135deg, #ff5aa9 0%, #7f62ef 100%);
          color: white;
          box-shadow: 0 10px 18px rgba(128, 96, 230, 0.18);
          cursor: pointer;
        }

        .legal {
          margin-top: 16px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          max-width: 760px;
          text-align: center;
          color: rgba(73, 90, 149, 0.74);
          font-size: 0.8rem;
          letter-spacing: -0.02em;
          line-height: 1.4;
        }

        .legal-badge {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(77, 92, 152, 0.42);
          font-size: 0.7rem;
          line-height: 1;
        }

        @media (max-width: 980px) {
          /* Tablet and small desktop: 2 columns for actions, narrower center column */
          .quick-actions {
            grid-template-columns: repeat(2, minmax(160px, 1fr));
            width: min(100%, 720px);
            gap: 14px;
          }

          .composer {
            width: min(100%, 680px);
          }

          .brand-title {
            font-size: clamp(2.2rem, 3.6vw, 3.6rem);
          }
        }

        @media (max-width: 860px) {
          .app-shell {
            grid-template-columns: 1fr;
          }

          .sidebar {
            border-right: none;
            border-bottom: 1px solid var(--line);
            padding: 20px 18px 16px;
          }

          .sidebar-top {
            gap: 14px;
          }

          .nav-button {
            justify-content: center;
          }

          .main-panel {
            padding-top: 14px;
          }

          .user-bar {
            justify-content: center;
          }

          /* stack actions in a single column on narrow tablets */
          .quick-actions {
            grid-template-columns: 1fr;
            width: 100%;
          }

          .composer {
            width: calc(100% - 36px);
          }
        }

        @media (max-width: 560px) {
          .brand-row {
            justify-content: center;
          }

          .brand-caption {
            max-width: 100%;
            text-align: center;
          }

          .nav-button,
          .mini-button {
            justify-content: center;
          }

          .hero-wrap {
            padding-top: 4px;
          }

          .quick-actions {
            grid-template-columns: 1fr;
          }

          .composer {
            padding-left: 12px;
            width: calc(100% - 30px);
            min-height: 54px;
          }

          .brand-title {
            font-size: clamp(1.6rem, 6vw, 2.6rem);
            line-height: 0.96;
          }

          .action-card {
            min-height: 120px;
            padding: 12px 12px;
          }

          .legal {
            font-size: 0.78rem;
          }
        }

        /* Force desktop mode overrides when user enables the toggle */
        .app-shell.force-desktop {
          grid-template-columns: minmax(220px, 290px) minmax(0, 1fr) !important;
        }

        .app-shell.force-desktop .sidebar {
          border-right: 1px solid var(--line);
          border-bottom: none;
          padding: 28px 22px 18px;
        }

        .app-shell.force-desktop .quick-actions {
          grid-template-columns: repeat(4, minmax(160px, 1fr));
          width: min(100%, 880px);
          gap: 14px;
        }

        .app-shell.force-desktop .composer {
          width: min(100%, 820px) !important;
          margin: 24px auto 0;
        }

        .app-shell.force-desktop .brand-title {
          font-size: clamp(2.4rem, 4vw, 4.6rem);
        }

        .app-shell.force-desktop .action-card {
          align-items: center;
          text-align: center;
        }

        .mini-button.active {
          background: var(--nav-bg);
          color: #475cc0;
          font-weight: 700;
        }
      `}</style>

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
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleSend(); } }}
                placeholder="Digite sua dúvida ou solicitação..."
                aria-label="Digite sua dúvida ou solicitação"
              />
              <button className="composer-button" type="button" aria-label="Enviar mensagem" onClick={handleSend}>
                <SendIcon />
              </button>
            </div>

            {error && <div className="search-error" style={{ marginTop: 12, color: 'crimson' }}>Erro: {error}</div>}
            {loading && <div className="search-loading" style={{ marginTop: 12 }}>Procurando...</div>}
            {assistant && (
              <div className="assistant-answer" style={{ marginTop: 12, maxWidth: 820, marginLeft: 'auto', marginRight: 'auto', padding: 12, background: '#fff', borderRadius: 8, boxShadow: '0 8px 16px rgba(0,0,0,0.06)' }}>
                <div style={{ fontWeight: 700, color: '#1b315f', marginBottom: 8 }}>Acervinho</div>
                <pre style={{ whiteSpace: 'pre-wrap', margin: 0, color: '#2b3a74' }}>{assistant}</pre>
              </div>
            )}

            {results.length > 0 && (
              <div className="search-results" style={{ marginTop: 12, maxWidth: 820, marginLeft: 'auto', marginRight: 'auto', padding: 12, background: '#fff', borderRadius: 8, boxShadow: '0 8px 16px rgba(0,0,0,0.06)' }}>
                {results.map((r, idx) => (
                  <div key={r.id ?? idx} className="result-item" style={{ padding: '10px 12px', borderBottom: idx < results.length - 1 ? '1px solid #eee' : 'none' }}>
                    <div className="result-title" style={{ fontWeight: 700, color: '#1b315f' }}>{r.title ?? 'Resultado'}</div>
                    <div className="result-snippet" style={{ marginTop: 6, color: '#5a6ca1', fontSize: '0.95rem' }}>{r.content ? (r.content.length > 300 ? r.content.slice(0, 300) + '...' : r.content) : ''}</div>
                  </div>
                ))}
              </div>
            )}

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

