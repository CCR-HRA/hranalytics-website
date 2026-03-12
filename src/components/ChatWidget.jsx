import { useState, useRef, useEffect } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { Bot, X, Send, Loader2, CheckCircle, ArrowRight } from 'lucide-react'
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import { GOOGLE_CLIENT_ID } from '../config'

const API = 'http://127.0.0.1:8000'

// Valida formato de email
const isValidEmail = (str) => {
  const re = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/
  return re.test((str || '').trim())
}

export default function ChatWidget() {
  const [isOpen, setIsOpen]         = useState(false)
  const [hasEntered, setHasEntered] = useState(false)
  const [gateNombre, setGateNombre] = useState('')
  const [gateEmail, setGateEmail]   = useState('')
  const [gateError, setGateError]   = useState('')
  const [messages, setMessages]     = useState([
    { role: 'assistant', content: '¿En qué puedo ayudarte hoy?' },
  ])
  const [input, setInput]           = useState('')
  const [isLoading, setIsLoading]   = useState(false)
  const [leadSent, setLeadSent]     = useState(false)
  const messagesEndRef = useRef(null)
  const prevOpenRef    = useRef(isOpen)

  useEffect(() => {
    if (isOpen) messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isOpen, hasEntered])

  // Actualizar lead con historial de conversación al cerrar el chat
  useEffect(() => {
    const wasOpen = prevOpenRef.current
    prevOpenRef.current = isOpen
    if (wasOpen && !isOpen && hasEntered && gateEmail.trim()) {
      const hist = buildHistorial(messages)
      if (hist.length > 0) {
        fetch(`${API}/api/actualizar-lead`, {
          method:  'PUT',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify({ email: gateEmail.trim(), historial: hist }),
        }).catch(() => {})
      }
    }
  }, [isOpen, hasEntered, gateEmail, messages])

  const buildHistorial = (msgs) =>
    msgs.slice(1).map(({ role, content }) => ({ role, content }))

  // ── Registrar lead en backend ─────────────────────────────────────────
  const registrarLead = async (nombre, email, historial) => {
    try {
      await fetch(`${API}/api/registrar-lead`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          nombre,
          email,
          empresa: '',
          historial,
        }),
      })
    } catch {
      // Silencioso — no interrumpe la conversación
    }
  }

  // ── Actualizar lead con historial (resumen, intención) ──────────────────
  const actualizarLead = (email, historial) => {
    if (!email?.trim() || !historial?.length) return
    fetch(`${API}/api/actualizar-lead`, {
      method:  'PUT',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ email: email.trim(), historial }),
    }).catch(() => {})
  }

  // ── Entrada social (Google) ───────────────────────────────────────────
  const handleGoogleSuccess = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential)
      const nombre = decoded.name?.trim() || decoded.given_name || ''
      const email = decoded.email?.trim() || ''
      if (!email) return
      setGateNombre(nombre)
      setGateEmail(email)
      setGateError('')
      setHasEntered(true)
      setLeadSent(true)
      registrarLead(nombre, email, [])
    } catch {
      setGateError('No se pudo completar el acceso con Google')
    }
  }

  // ── Entrada manual (gate al estilo McKinsey) ─────────────────────────
  const handleGateSubmit = (e) => {
    e?.preventDefault()
    const nombre = gateNombre.trim()
    const email = gateEmail.trim()
    if (!nombre) {
      setGateError('Ingresa tu nombre para continuar')
      return
    }
    if (!email) {
      setGateError('Ingresa tu correo para continuar')
      return
    }
    if (!isValidEmail(email)) {
      setGateError('Correo no válido')
      return
    }
    setGateError('')
    setHasEntered(true)
    setLeadSent(true)
    registrarLead(nombre, email, [])
  }

  // ── Enviar mensaje ────────────────────────────────────────────────────
  const handleSend = async (e) => {
    e?.preventDefault()
    if (!input.trim() || isLoading) return

    const userText = input.trim()
    const updatedMessages = [...messages, { role: 'user', content: userText }]
    setInput('')
    setMessages(updatedMessages)
    setIsLoading(true)

    try {
      const res = await fetch(`${API}/api/chat`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          texto:     userText,
          historial: buildHistorial(updatedMessages),
        }),
      })

      if (!res.ok) throw new Error('Error de conexión')
      const data = await res.json()

      if (data.respuesta) {
        const fullMsgs = [...messages, { role: 'user', content: userText }, { role: 'assistant', content: data.respuesta }]
        setMessages((prev) => [...prev, { role: 'assistant', content: data.respuesta }])
        actualizarLead(gateEmail, buildHistorial(fullMsgs))
      } else {
        throw new Error(data.error || 'Sin respuesta')
      }
    } catch {
      const errorMsg = 'Disculpa, hubo un problema de conexión. Intenta de nuevo o agenda directamente: [Agenda aquí](https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1tbFTjj45U1H-aZpJmNHzp8crnmTA4QJA9OlBsGuMzrR5KkOuXna8VmJHHgID5ayvE1ZBilVkQ)'
      const fullMsgs = [...messages, { role: 'user', content: userText }, { role: 'assistant', content: errorMsg }]
      setMessages((prev) => [...prev, { role: 'assistant', content: errorMsg }])
      actualizarLead(gateEmail, buildHistorial(fullMsgs))
    } finally {
      setIsLoading(false)
    }
  }

  // ── Render: negrita, links markdown, bullets ──────────────────────────
  const renderContent = (text) => {
    const parseInline = (str) => {
      const parts = str.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g)
      return parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**'))
          return <strong key={i} className="font-semibold text-gray-900">{part.slice(2, -2)}</strong>
        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
        if (link)
          return (
            <a key={i} href={link[2]} target="_blank" rel="noopener noreferrer"
              className="text-primary underline underline-offset-2 hover:text-navy transition-colors">
              {link[1]}
            </a>
          )
        return <span key={i}>{part}</span>
      })
    }
    return text.split('\n').map((line, idx) => {
      if (!line.trim()) return <div key={idx} className="h-1.5" />
      const hash = line.match(/^(#\d+)\s+(.+)/)
      if (hash)
        return (
          <div key={idx} className="flex gap-2 mt-1.5">
            <span className="text-primary font-bold text-xs mt-0.5 flex-shrink-0">{hash[1]}</span>
            <span className="text-sm leading-relaxed">{parseInline(hash[2])}</span>
          </div>
        )
      return <p key={idx} className="text-sm leading-relaxed tracking-tight">{parseInline(line)}</p>
    })
  }

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-4 w-[350px] sm:w-[400px] h-[520px] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-navy via-navy-light to-navy p-4 flex items-center justify-between text-white flex-shrink-0 shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center flex-shrink-0 ring-1 ring-white/20">
                  <Bot className="w-5 h-5" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">¿Hablamos?</h3>
                  <p className="text-xs text-white/80">HR Analytics</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors p-1"
                aria-label="Cerrar chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {!hasEntered ? (
              /* ── GATE: Entrada al estilo McKinsey ───────────────────────── */
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                <p className="text-gray-700 text-sm mb-6 leading-relaxed">
                  Ingresa tu nombre y correo para explorar la experiencia
                </p>
                <form onSubmit={handleGateSubmit} className="w-full max-w-[280px] space-y-3">
                  <input
                    type="text"
                    value={gateNombre}
                    onChange={(e) => { setGateNombre(e.target.value); setGateError('') }}
                    placeholder="Tu nombre"
                    className={`w-full rounded-xl border-2 bg-gray-50/50 px-4 py-3 text-sm focus:outline-none transition-colors ${gateError ? 'border-red-300' : 'border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20'}`}
                    autoComplete="name"
                  />
                  <div className={`flex items-center gap-2 rounded-xl border-2 bg-gray-50/50 transition-colors ${gateError ? 'border-red-300' : 'border-gray-200 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20'}`}>
                    <input
                      type="email"
                      value={gateEmail}
                      onChange={(e) => { setGateEmail(e.target.value); setGateError('') }}
                      placeholder="tu@empresa.com"
                      className="flex-1 bg-transparent px-4 py-3 text-sm focus:outline-none"
                      autoComplete="email"
                    />
                    <button
                      type="submit"
                      className="p-2.5 text-primary hover:bg-primary/10 rounded-r-lg transition-colors"
                      aria-label="Continuar"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                  {gateError && (
                    <p className="text-red-500 text-xs mt-2">{gateError}</p>
                  )}

                  {GOOGLE_CLIENT_ID && (
                    <>
                      <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                          <span className="w-full border-t border-gray-200" />
                        </div>
                        <p className="relative flex justify-center">
                          <span className="bg-white px-3 text-gray-500 text-xs font-medium">o continúa con</span>
                        </p>
                      </div>
                      <div className="flex justify-center w-full">
                        <div className="w-full max-w-[280px] overflow-hidden rounded-xl ring-2 ring-gray-200 ring-offset-0 hover:ring-primary/30 transition-all">
                          <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={() => setGateError('No se pudo acceder con Google')}
                            theme="outline"
                            size="large"
                            text="continue_with"
                            shape="rectangular"
                          />
                        </div>
                      </div>
                    </>
                  )}
                </form>
              </div>
            ) : (
              /* ── CHAT ─────────────────────────────────────────────────── */
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-slate-50 to-slate-100">
                  {messages.map((msg, idx) => (
                    <div key={idx} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      {msg.role === 'assistant' && (
                        <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5 ring-1 ring-primary/10">
                          <Bot className="w-4 h-4 text-primary" strokeWidth={2} />
                        </div>
                      )}
                      <div
                        className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed ${
                          msg.role === 'user'
                            ? 'bg-primary text-white rounded-br-md shadow-md'
                            : 'bg-white text-gray-700 rounded-bl-md shadow-soft border border-gray-100'
                        }`}
                      >
                        {msg.role === 'assistant' ? renderContent(msg.content) : msg.content}
                      </div>
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex gap-2 justify-start">
                      <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5 ring-1 ring-primary/10">
                        <Bot className="w-4 h-4 text-primary" strokeWidth={2} />
                      </div>
                      <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-bl-md shadow-soft flex items-center gap-2.5 text-gray-500 text-sm">
                        <Loader2 className="w-4 h-4 animate-spin text-primary flex-shrink-0" />
                        <span>Pensando...</span>
                      </div>
                    </div>
                  )}

                  {leadSent && (
                    <div className="flex justify-start">
                      <div className="flex items-center gap-2 bg-green-50 border border-green-100 text-green-700 text-xs px-3 py-2 rounded-full">
                        <CheckCircle className="w-3.5 h-3.5" />
                        Contacto registrado
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                <div className="p-4 bg-white border-t border-gray-100 flex-shrink-0">
                  <form onSubmit={handleSend} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Escribe aquí..."
                      className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                      disabled={isLoading}
                    />
                    <button
                      type="submit"
                      disabled={!input.trim() || isLoading}
                      className="bg-primary text-white p-2.5 rounded-xl hover:bg-navy transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </>
            )}
          </m.div>
        )}
      </AnimatePresence>

      <m.button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
          isOpen
            ? 'bg-navy text-white scale-90 shadow-xl'
            : 'bg-gradient-to-br from-primary to-primary-dark text-white shadow-lg hover:shadow-xl hover:scale-105'
        }`}
        aria-label="Abrir asistente"
        whileHover={!isOpen ? { scale: 1.05 } : {}}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Bot className="w-6 h-6" strokeWidth={2} />}
      </m.button>
    </div>
  )
}
