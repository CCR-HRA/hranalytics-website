/**
 * Casos y filtros del dashboard derivados desde content.js (successCases).
 * Una sola fuente de verdad: editar casos solo en content.js.
 * Todos los labels y mensajes están en español.
 */

import { successCases } from './content'

const CLIENT_PROBLEM_TO_FILTRO = {
  rotacion: 'tengo-alta-rotacion',
  planificacion: 'necesito-proyectar-dotacion',
  capacitacion: 'capacitacion-sin-impacto',
  estrategia: 'equipo-no-alineado',
  decisiones: 'diagnostico-area',
  incentivos: 'incentivos-no-funcionan',
}

export const filtros = [
  { id: 'todos', label: 'Todos' },
  { id: 'tengo-alta-rotacion', label: 'Tengo alta rotación' },
  { id: 'necesito-proyectar-dotacion', label: 'Necesito proyectar mi dotación' },
  { id: 'capacitacion-sin-impacto', label: 'Mi capacitación no genera impacto' },
  { id: 'equipo-no-alineado', label: 'Mi equipo no está alineado' },
  { id: 'diagnostico-area', label: 'Necesito diagnóstico de mi área' },
  { id: 'incentivos-no-funcionan', label: 'Mis incentivos no motivan' },
]

/**
 * Construye el array de casos para el dashboard desde successCases.
 * Solo incluye ítems que tengan filtro de dashboard (clientProblemId mapeado).
 */
function buildCasos() {
  const items = successCases.items.filter(
    (item) => item.clientProblemId && CLIENT_PROBLEM_TO_FILTRO[item.clientProblemId]
  )

  return items.map((item, index) => {
    const filtro = CLIENT_PROBLEM_TO_FILTRO[item.clientProblemId]
    const metricas = (item.metrics || []).map((m) => ({
      valor: m.value,
      etiqueta: m.label,
    }))
    const metricaPrincipal = metricas[0]
      ? { valor: metricas[0].valor, etiqueta: metricas[0].etiqueta }
      : null

    let categoriaPill = null
    if (item.badgeLabels?.primary) {
      const p = item.badgeLabels.primary
      categoriaPill = [p.es || p.en, p.en && p.es !== p.en ? p.en : null].filter(Boolean).join('\n')
    }

    return {
      id: item.id,
      contentId: item.id,
      numero: String(index + 1).padStart(2, '0'),
      categoria: item.service,
      categoriaPill: categoriaPill || undefined,
      filtro,
      titulo: item.title,
      contexto: item.context,
      desafio: item.context,
      solucion: item.solution,
      solucionIntro: item.solutionIntro,
      solucionPoints: item.solutionPoints,
      metricaPrincipal,
      metricas,
    }
  })
}

export const casos = buildCasos()
