# BeMind Power — sitio web

Sitio corporativo de BeMind Power en Astro. Incluye la landing principal, página de soporte e internacionalización (ES/EN).

## Cómo correr el proyecto

Desde la raíz del proyecto:

```bash
npm install
npm run dev
```

El servidor de desarrollo queda en `http://localhost:4321`.

Para generar la build de producción:

```bash
npm run build
npm run preview
```

La salida va a `./dist/`. El deploy está configurado para Cloudflare Pages (`wrangler.toml`).

## Diseño

La página `/home` sigue el layout del frame **"1"** del archivo Pencil `home1.pen` (1728×1117): columna izquierda con título, subtítulo, botón "Ver Más" y badges; zona derecha con el slider de características; glow azul 910px; tipografía OPTIFutura/Neometric.

## Estructura

- `public/` — estáticos (imágenes, fuentes, favicons). Los logos están en `public/images/logos/`.
- `src/pages/` — rutas: `index.astro` (bienvenida), `home.astro` (landing), `soporte.astro`.
- `src/components/` — cabeceras, hero, slider de features, fondos, etc.
- `src/stores/` — estado global (idioma, menú) con Nanostores.
- `src/styles/global.css` — estilos globales y Tailwind.

## Stack

Astro 5, Tailwind CSS 4, i18next para los textos, Nanostores para el estado.
