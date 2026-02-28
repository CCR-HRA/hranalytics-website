/**
 * Catálogo de servicios derivado de extendedServices (fuente única).
 * Proporciona getMegaMenuData(), getServicesByPillar() y servicesBySlug
 * para el mega menú, la grilla por pilar y las páginas de detalle.
 */
import { extendedServices } from './extendedServices'

const PILLAR_ORDER = ['estrategia', 'analitica', 'compensaciones', 'desarrollo']

export const PILLAR_LABELS = {
  estrategia: 'I. Estrategia de Personas',
  analitica: 'II. Analítica y Datos',
  compensaciones: 'III. Compensaciones y Estructura',
  desarrollo: 'IV. Desarrollo y Automatización',
}

/** slug → servicio completo */
export const servicesBySlug = Object.fromEntries(
  extendedServices.map((s) => [s.slug, s])
)

/**
 * Estructura para el mega menú del Header: categorías con items { id, label, href, path }.
 */
export function getMegaMenuData() {
  const byPillar = new Map()
  for (const s of extendedServices) {
    const key = s.pillarKey || 'desarrollo'
    if (!byPillar.has(key)) byPillar.set(key, [])
    byPillar.get(key).push(s)
  }
  return PILLAR_ORDER.map((pillarKey) => {
    const services = (byPillar.get(pillarKey) ?? []).sort(
      (a, b) => (a.order ?? 0) - (b.order ?? 0)
    )
    return {
      category: PILLAR_LABELS[pillarKey] ?? pillarKey,
      items: services.map((s) => ({
        id: s.id,
        label: s.title,
        href: `/servicios/${s.slug}`,
        path: `/servicios/${s.slug}`,
      })),
    }
  })
}

/**
 * Servicios agrupados por pilar para la grilla (ServicesSection).
 * Retorna [{ pillarKey, category, services }] con servicios completos ordenados por order.
 */
export function getServicesByPillar() {
  const byPillar = new Map()
  for (const s of extendedServices) {
    const key = s.pillarKey || 'desarrollo'
    if (!byPillar.has(key)) byPillar.set(key, [])
    byPillar.get(key).push(s)
  }
  return PILLAR_ORDER.map((pillarKey) => {
    const services = (byPillar.get(pillarKey) ?? []).sort(
      (a, b) => (a.order ?? 0) - (b.order ?? 0)
    )
    return {
      pillarKey,
      category: PILLAR_LABELS[pillarKey] ?? pillarKey,
      services,
    }
  })
}

/** Id de ancla por pillarKey (para scroll en ServicesSection) */
export const PILAR_IDS = {
  estrategia: 'pilar-estrategia-personas',
  analitica: 'pilar-analitica-datos',
  compensaciones: 'pilar-compensaciones-estructura',
  desarrollo: 'pilar-desarrollo-automatizacion',
}
