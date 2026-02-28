# Datos del proyecto

- **content.js** — Textos y estructura por sección (hero, footer columns, legal, etc.). Fuente única de copy para la UI.
- **extendedServices.js** — Catálogo completo de 14 servicios (id, pillarKey, order, slug, title, image, why, methodology, etc.). Fuente única de verdad: cada servicio define su pilar y orden.
- **servicesCatalog.js** — Deriva de extendedServices: `getMegaMenuData()`, `getServicesByPillar()`, `servicesBySlug`. Usado por Header (mega menú), ServicesSection (grilla por pilar) y ServiceDetailPage.
- **header/constants.js** — Solo enlaces de navegación y sociales; el mega menú de servicios se obtiene de `servicesCatalog.getMegaMenuData()`.
- **services.json** — Legacy: no se importa en el código. Se mantiene como respaldo; la relación id↔imagen es coherente con extendedServices (ids 1–6 → s1–s6).
