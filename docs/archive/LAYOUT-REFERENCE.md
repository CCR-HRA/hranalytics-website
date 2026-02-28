# Layout: Header + Main + Recomendaciones

Referencia del JSX y clases Tailwind/CSS para detectar errores de espaciado.

---

## 1. HEADER (`Header.jsx`)

### Estructura JSX
```
<header> [fixed, z-50]
  └── <div> container mx-auto px-4
        ├── <div> flex justify-between
        │     ├── <a> logo
        │     ├── <nav> [desktop, hidden xl]
        │     │     ├── <ul> nav links
        │     │     └── social icons
        │     └── <button> hamburger [mobile, xl:hidden]
        └── <motion.nav> [mobile menu, xl:hidden]
              └── <ul> nav links + social
```

### Clases principales

| Elemento | Clases |
|---------|--------|
| **header** | `fixed top-0 left-0 right-0 z-50 transition-all duration-500` |
| Header scrolled | `bg-gray-900/80 backdrop-blur-xl py-3 shadow-professional border-b border-white/5` |
| Header inicial | `bg-transparent py-5` |
| **Wrapper** | `container mx-auto px-4` |
| **Logo** | `h-12 md:h-14 object-contain` |
| **Nav desktop** | `hidden xl:flex items-center gap-8` |
| **Nav links** | `flex items-center gap-6` |
| **Link activo** | `text-primary-light bg-white/10` (scrolled) o `text-primary bg-primary/10` (top) |
| **Indicador activo** | `absolute -bottom-1 left-2 right-2 h-0.5 bg-primary rounded-full` |
| **Social** | `flex items-center gap-4 pl-6 border-l border-gray-600` |
| **Mobile menu** | `xl:hidden mt-4 pb-4 bg-gray-900/95 backdrop-blur-md rounded-xl -mx-2 px-4` |

### Altura efectiva
- Sin scroll: `py-5` ≈ 80px total (2.5rem × 2)
- Con scroll: `py-3` ≈ 48px total (1.5rem × 2)

---

## 2. CONTENEDOR MAIN (`App.jsx`)

### Estructura JSX
```
<div> [root app]
  ├── SkipLink
  ├── PageLoader
  ├── ScrollProgress
  ├── <Header />
  ├── <main id="main-content">
  │     ├── Hero
  │     ├── TrustBar
  │     ├── ValuePropositionSection
  │     ├── HRAnalyticsSection
  │     └── <Suspense>
  │           ├── EnfoqueSection
  │           ├── ServicesSection
  │           ├── SuccessCasesSection
  │           ├── ClientsSection
  │           ├── RecommendationsSection  ← #recomendaciones
  │           ├── AboutSection
  │           ├── CTASection
  │           ├── ContactForm
  │           ├── FAQSection
  │           └── Footer
  ├── WhatsAppButton
  └── BackToTop
```

### Clases principales

| Elemento | Clases |
|----------|--------|
| **Root div** | `flex flex-col min-h-screen bg-white` |
| **main** | `flex flex-col flex-1` |
| **Suspense fallback** | `null` (sin wrapper visible) |

### Estilos globales que afectan a main
```css
/* index.css */
main [id] {
  scroll-margin-top: 6rem;
  scroll-margin-bottom: 2rem;
}
main [id] { scroll-snap-align: start; }  /* @media 769px+ */

html { scroll-padding-top: 6.5rem; }
```

---

## 3. SECCIÓN RECOMENDACIONES (`RecommendationsSection.jsx`)

### Estructura JSX
```
<section id="recomendaciones">
  ├── div [bg gradiente] absolute inset-0
  ├── div [blur decorativo] absolute
  ├── div [blur decorativo] absolute
  └── <div> container
        ├── motion.div [header: título + descripción]
        ├── div [carrusel + controles + filtros]
        └── motion.p [contador]
```

### Clases principales

| Elemento | Clases | Valor |
|----------|--------|-------|
| **section** | `relative pt-section lg:pt-section-lg mb-section lg:mb-section-lg overflow-hidden` | pt: 1.5rem→2rem, mb: 1.5rem→2rem |
| **Bg gradiente** | `absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50` | |
| **Container** | `container mx-auto px-4 max-w-5xl relative z-10` | max-width: 64rem |
| **Header bloque** | `text-center mb-6` | margin-bottom: 1.5rem |
| **Eyebrow** | `text-primary text-[11px] font-medium tracking-[0.2em] uppercase mb-4` | |
| **Título** | `text-3xl md:text-4xl font-bold text-gray-900 tracking-tight` | |
| **Línea** | `w-20 h-0.5 bg-primary mx-auto mt-4` | margin-top: 1rem |
| **Descripción** | `text-gray-700 text-sm md:text-base mt-4 max-w-2xl mx-auto leading-relaxed` | margin-top: 1rem |
| **Carrusel wrapper** | `max-w-2xl mx-auto relative` | max-width: 42rem |
| **Tarjeta testimonio** | `absolute inset-0 bg-white ... rounded-xl shadow-soft border border-gray-100 border-l-4 border-l-primary` | min-h: 320px |
| **Controles** | `flex items-center justify-center gap-8 mt-5` | margin-top: 1.25rem |
| **Filtros** | `flex flex-wrap justify-center gap-2 mt-5` | margin-top: 1.25rem |
| **Contador** | `text-center text-gray-400 text-xs ... mt-4 mb-8` | mt: 1rem, mb: 2rem |

### Valores de espaciado (tailwind.config.js)
```js
spacing: {
  'section': '1.5rem',   // 24px
  'section-lg': '2rem',  // 32px
}
```

### Orden visual del espaciado (de arriba a abajo)
1. `pt-section` (1.5rem) – espacio desde la sección anterior
2. Header: `mb-6` (1.5rem) – entre título y carrusel
3. Carrusel → controles: `mt-5` (1.25rem)
4. Controles → filtros: `mt-5` (1.25rem)
5. Filtros → contador: `mt-4` (1rem)
6. Contador: `mb-8` (2rem)
7. `mb-section` (1.5rem) – espacio hasta la siguiente sección

---

## 4. Reset global (`index.css`)

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
}
```

---

## 5. Posibles fuentes de espacios no deseados

| Origen | Ubicación | Qué revisar |
|--------|-----------|-------------|
| Header fixed | No ocupa flujo, el main empieza debajo del Hero | Hero tiene `min-h-screen` |
| scroll-padding-top | html | 6.5rem al hacer scroll a #recomendaciones |
| scroll-margin | main [id] | 6rem top, 2rem bottom por sección |
| pt-section + mb anterior | Entre secciones | pt 1.5rem + mb 1.5rem del bloque anterior = 3rem |
| Suspense | No añade wrapper con gap | fallback es null |
| Container | mx-auto px-4 | Solo centrado y padding horizontal |
