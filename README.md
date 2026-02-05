# BeMind Power

Web en Astro: landing, soporte, ES/EN.

## Desarrollo

```bash
npm install
npm run dev
```

Servidor en `http://localhost:4321`. Build:

```bash
npm run build
npm run preview
```

Salida en `./dist/`. Deploy en Cloudflare Pages (`wrangler.toml`).

## Diseño

`/home` replica el frame "1" de `home1.pen`: izquierda título/CTA/badges, derecha slider, glow azul, OPTIFutura/Neometric.

## Estructura

- `public/` — estáticos; logos en `public/images/logos/`
- `src/pages/` — `index`, `home`, `soporte`
- `src/components/` — header, hero, slider, fondos
- `src/stores/` — idioma y menú (Nanostores)
- `src/styles/global.css` — Tailwind y globales

Astro 5, Tailwind 4, i18next, Nanostores.
