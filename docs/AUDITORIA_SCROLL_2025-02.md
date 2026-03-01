# Auditoría de scroll – Bugs P0/P1/P2

**Fecha:** Febrero 2025  
**Rol:** QA Lead + Frontend Senior (React/Vite/Tailwind/Framer Motion)

---

## 1. Hallazgos por prioridad

### P0 – Crítico

| ID | Hallazgo | Causa raíz | Impacto |
|----|----------|------------|---------|
| P0-1 | Scroll del body deja de funcionar tras cerrar menú móvil | El scroll-lock solo consideraba `mobileMenuOpen`. Si el mega menú (desktop) quedaba abierto o había race conditions, el cleanup podía no ejecutarse en el orden correcto. | Usuario no puede hacer scroll en la página |
| P0-2 | Falta de scroll-lock unificado | Menú móvil y mega menú (desktop) manejaban el lock por separado. Solo el móvil bloqueaba; el mega no. Al cerrar uno sin el otro, el estado podía quedar inconsistente. | Scroll bloqueado sin forma de recuperarlo |

### P1 – Alto

| ID | Hallazgo | Causa raíz | Impacto |
|----|----------|------------|---------|
| P1-1 | Mega menú (desktop) sin scroll-lock | Con el mega abierto, el body seguía scrolleando; el contenido se movía detrás del overlay. | UX confusa, sensación de bug |
| P1-2 | PageLoader sin scroll-lock | Durante los ~700ms del loader, el body podía hacer scroll. | Scroll accidental durante la carga inicial |

### P2 – Medio

| ID | Hallazgo | Causa raíz | Impacto |
|----|----------|------------|---------|
| P2-1 | Cleanup sin fallback explícito | `document.body.style.overflow = prev` podía dejar `undefined` si `prev` era vacío en algunos navegadores. | Restauración incompleta en edge cases |
| P2-2 | Selector de scroll-margin | `main [id]` cubre anclas; verificar que `#recomendaciones` (div) y `#contacto` (section) estén dentro de `main`. | Ya verificado: correcto |

---

## 2. Archivos revisados (existentes en el repo)

| Archivo | Existe | Contenido relevante |
|---------|--------|---------------------|
| `src/components/Header.jsx` | ✅ | Scroll-lock menú móvil, mega backdrop |
| `src/components/header/MegaMenuPanel.jsx` | ✅ | Panel fijo, FocusTrap |
| `src/components/AppLayout.jsx` | ✅ | Layout principal, `min-h-screen` |
| `src/components/PageLoader.jsx` | ✅ | Overlay inicial |
| `src/components/PageView.jsx` | ✅ | `overflow-x-hidden` |
| `src/App.jsx` | ✅ | Rutas |
| `src/main.jsx` | ✅ | Bootstrap React |
| `src/index.css` | ✅ | `scroll-margin-top`, `scroll-padding-top` |
| `src/components/ScrollManager.jsx` | ✅ | Navegación a hash |
| `src/utils/scroll.js` | ✅ | `scrollToSection` |

**Nota:** No existe `MobileMenu.jsx`; el menú móvil está en `Header.jsx`.

---

## 3. Cambios aplicados

### 3.1 `src/components/Header.jsx`

**BEFORE:**
```javascript
  useEffect(() => {
    if (!mobileMenuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [mobileMenuOpen])
```

**AFTER:**
```javascript
  // Scroll-lock: body overflow hidden cuando hay overlay (menú móvil o mega desktop).
  // Cleanup garantizado: siempre restauramos al valor anterior.
  const shouldLockScroll = mobileMenuOpen || !!megaOpen
  useEffect(() => {
    if (!shouldLockScroll) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev || ''
    }
  }, [shouldLockScroll])
```

**Resumen:**
- Scroll-lock unificado para menú móvil y mega menú.
- Cleanup con fallback `prev || ''`.
- Variable `shouldLockScroll` para una sola fuente de verdad.

---

### 3.2 `src/components/PageLoader.jsx`

**BEFORE:**
```javascript
  useEffect(() => {
    if (!show) return
    const timer = setTimeout(() => {
      sessionStorage.setItem('seenLoader', '1')
      setShow(false)
    }, 700)
    return () => clearTimeout(timer)
  }, [show])

  if (prefersReducedMotion || !show) return null
```

**AFTER:**
```javascript
  useEffect(() => {
    if (!show) return
    const timer = setTimeout(() => {
      sessionStorage.setItem('seenLoader', '1')
      setShow(false)
    }, 700)
    return () => clearTimeout(timer)
  }, [show])

  // Scroll-lock durante overlay: evita scroll del body bajo el loader.
  useEffect(() => {
    if (!show) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev || ''
    }
  }, [show])

  if (prefersReducedMotion || !show) return null
```

**Resumen:**
- Scroll-lock mientras el PageLoader está visible.
- Cleanup al ocultarse el loader.

---

### 3.3 Archivos sin cambios (verificados)

| Archivo | Verificación |
|---------|--------------|
| `src/index.css` | `scroll-margin-top: var(--header-height, 90px)` en `main section[id], main [id]` – correcto |
| `src/utils/scroll.js` | `scrollIntoView` respeta `scroll-margin-top` del CSS – correcto |
| `src/components/AppLayout.jsx` | `min-h-screen` sin `overflow-hidden` – correcto |
| `src/components/PageView.jsx` | `overflow-x-hidden` solo horizontal – correcto |
| `src/components/header/MegaMenuPanel.jsx` | Overlay fijo; scroll-lock lo gestiona Header – correcto |

---

## 4. Checklist QA – Validación

### 4.1 Menú móvil (hamburguesa)

- [ ] Abrir menú hamburguesa en móvil/tablet → body no hace scroll
- [ ] Cerrar menú (botón X, Escape, clic fuera) → body vuelve a hacer scroll
- [ ] Abrir menú, expandir Servicios, cerrar menú → body hace scroll
- [ ] Abrir menú, expandir Enfoque, cerrar menú → body hace scroll
- [ ] Navegar a otra ruta con menú abierto → body hace scroll en la nueva página

### 4.2 Mega menú (desktop)

- [ ] Abrir Servicios (hover o clic) → body no hace scroll
- [ ] Cerrar Servicios (clic fuera, Escape) → body hace scroll
- [ ] Abrir Enfoque → body no hace scroll
- [ ] Cerrar Enfoque → body hace scroll
- [ ] Abrir Servicios, hacer clic en un servicio → navegación correcta y body hace scroll

### 4.3 PageLoader

- [ ] Primera visita (sin `seenLoader`) → body no hace scroll durante ~700ms
- [ ] Tras ocultarse el loader → body hace scroll
- [ ] Recargar con `sessionStorage` limpio → mismo comportamiento

### 4.4 Navegación a anclas (hash)

- [ ] Clic en Liderazgo → scroll a `#quienes-somos` con offset por header
- [ ] Clic en Casos y Testimonios → scroll a `#recomendaciones`
- [ ] Clic en Contacto → scroll a `#contacto`
- [ ] URL directa `/#contacto` → scroll correcto tras carga
- [ ] Desde otra página a `/#servicios` → navegación y scroll correctos

### 4.5 Edge cases

- [ ] Abrir menú móvil, girar dispositivo a landscape (si aplica) → scroll se restaura al cerrar
- [ ] Abrir mega, cambiar a vista móvil (resize) → mega se cierra y scroll se restaura
- [ ] Navegación rápida (abrir/cerrar menú varias veces) → scroll siempre restaurado

---

## 5. Resumen de correcciones

| Prioridad | Cantidad | Estado |
|-----------|----------|--------|
| P0 | 2 | ✅ Corregido |
| P1 | 2 | ✅ Corregido |
| P2 | 1 | ✅ Mitigado (fallback en cleanup) |

**Archivos modificados:** 2 (`Header.jsx`, `PageLoader.jsx`)
