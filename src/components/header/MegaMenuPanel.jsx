import { Link } from 'react-router-dom'
import FocusTrap from 'focus-trap-react'

export default function MegaMenuPanel({
  items,
  title,
  scrolled,
  returnFocusRef,
  onHashClick,
  onClose,
  onMouseEnter,
  onMouseLeave,
}) {
  const isDark = scrolled

  // Verificamos si los items vienen con la nueva estructura de categorías (Pilares)
  const isCategorized = items?.length > 0 && items[0]?.category !== undefined
  const allItems = isCategorized ? items.flatMap((cat) => cat.items ?? []) : (items ?? [])
  const hasCategories = isCategorized && items.some((cat) => cat.items?.length)

  // Padding-top alinea el panel con el borde inferior del header (usa --header-height del Header)
  return (
    <div
      className="fixed inset-x-0 top-0 left-0 right-0 z-[102] pb-8 isolate"
      style={{
        paddingTop: 'calc(var(--header-height, 5.5rem) + env(safe-area-inset-top))',
        transform: 'translateZ(0)',
        WebkitTransform: 'translateZ(0)',
        WebkitOverflowScrolling: 'touch',
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <FocusTrap
        active
        focusTrapOptions={{
          escapeDeactivates: true,
          returnFocusOnDeactivate: true,
          setReturnFocus: () => returnFocusRef?.current ?? false,
          onDeactivate: onClose,
          allowOutsideClick: true,
        }}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-label={title}
          className={`shadow-lg pointer-events-auto ${isDark ? 'bg-navy' : 'bg-white'} border-b ${isDark ? 'border-white/10' : 'border-gray-200'} transition-colors duration-150`}
        >
          <div className="max-w-[72rem] mx-auto px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between border-b pb-4 mb-6 border-gray-200/20">
              <p className={`text-sm font-bold uppercase tracking-widest ${isDark ? 'text-primary-light' : 'text-primary'}`}>
                {title}
              </p>
              <button
                onClick={onClose}
                className={`p-2 rounded-md transition-colors ${isDark ? 'text-gray-400 hover:text-white hover:bg-white/10' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'}`}
                aria-label="Cerrar menú"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {hasCategories ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
                {items.map((group) => (
                  <div key={group.category} className="flex flex-col">
                    <p className={`text-xs font-bold uppercase tracking-wider mb-4 border-l-2 pl-3 ${isDark ? 'text-white border-primary-light' : 'text-gray-900 border-primary'}`}>
                      {group.category}
                    </p>
                    <ul className="space-y-3 pl-3">
                      {group.items.map((item) => (
                        <li key={item.id ?? item.href ?? item.label}>
                          {item.path ? (
                            <Link
                              to={item.href}
                              onClick={onClose}
                              className={`block text-sm transition-colors duration-200 ${
                                isDark ? 'text-gray-300 hover:text-primary-light' : 'text-gray-600 hover:text-primary font-medium'
                              }`}
                            >
                              {item.label}
                            </Link>
                          ) : (
                            <a
                              href={item.href}
                              onClick={onHashClick}
                              className={`block text-sm transition-colors duration-200 ${
                                isDark ? 'text-gray-300 hover:text-primary-light' : 'text-gray-600 hover:text-primary font-medium'
                              }`}
                            >
                              {item.label}
                            </a>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {allItems.map((item) => {
                  const displayText = item.displayLabel ?? item.label
                  return item.path ? (
                    <Link
                      key={item.id ?? item.href ?? item.label}
                      to={item.href}
                      onClick={onClose}
                      className={`block ${isDark ? 'text-white hover:text-primary-light' : 'text-gray-800 hover:text-primary'}`}
                    >
                      <span className="font-semibold text-sm">{displayText}</span>
                      {item.desc && (
                        <span className={`text-xs block mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {item.desc}
                        </span>
                      )}
                    </Link>
                  ) : (
                    <a
                      key={item.id ?? item.href ?? item.label}
                      href={item.href}
                      onClick={onHashClick}
                      className={`block ${isDark ? 'text-white hover:text-primary-light' : 'text-gray-800 hover:text-primary'}`}
                    >
                      <span className="font-semibold text-sm">{displayText}</span>
                      {item.desc && (
                        <span className={`text-xs block mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {item.desc}
                        </span>
                      )}
                    </a>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </FocusTrap>
    </div>
  )
}
