# QA Mega Menú Servicios - Feb 2025

## Problema reportado

Los servicios del mega menú "aparecen y desaparecen rápidamente" después de cargar cada sección.

## Diagnóstico

### Causas identificadas

1. **Gap entre trigger y panel**: Al mover el mouse del enlace "Servicios" al panel, se cruza una zona muerta que dispara `onMouseLeave` y programa el cierre.
2. **Race condition con timer**: Múltiples timers o cierre tras desmontaje.
3. **AnimatePresence sin mode**: Posible solapamiento de instancias.
4. **Posicionamiento fijo**: `top-[3rem]` no se ajusta a la altura variable del header.

## Fixes aplicados

1. **Timer con protección de desmontaje** (`Header.jsx`): `isMountedRef` evita `setMegaOpen(null)` tras desmontar. Delay aumentado a 450ms.
2. **AnimatePresence mode="wait"** (`Header.jsx`): Evita múltiples paneles visibles durante transiciones.
3. **Puente**: Posición `top-[3.25rem]` + `pt-2` para máxima solapación con header sin bloquear nav.

## Pendientes (si persiste)

- ~~Medir altura del header con ref~~ — **Aplicado (feb 2026):** `Header` usa `headerRef` + `ResizeObserver` y actualiza `--header-height` en px; `MegaMenuPanel` y backdrop usan `var(--header-height)`.
- ~~Overlay invisible que extienda desde `top: 0`~~ — Aplicado (MegaMenuPanel usa overlay desde `top: 0`).
- Reducir dependencia de FocusTrap si interfiere con eventos (solo si se observan problemas).
