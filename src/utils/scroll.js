/**
 * Scroll hasta la sección por id o hash.
 * Usa scrollIntoView para que el navegador respete scroll-margin-top del CSS (header fijo).
 * Si el elemento no existe (ej: estamos en otra página), retorna false para que el caller navegue.
 *
 * @param {string} hashOrId - '#contacto' o 'contacto'
 * @param {object} [options]
 * @param {boolean} [options.smooth] - scroll suave (por defecto: true salvo prefers-reduced-motion)
 */
export function scrollToSection(hashOrId, options = {}) {
  if (!hashOrId) return false

  let id = hashOrId.replace(/^#/, '').trim()
  if (!id) return false
  try {
    id = decodeURIComponent(id)
  } catch {
    // id queda con el valor ya asignado si decodeURIComponent falla
  }

  const el = document.getElementById(id)
  if (!el) return false

  const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false
  const smooth = options.smooth ?? !prefersReduced

  el.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' })
  return true
}
