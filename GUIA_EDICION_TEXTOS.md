# Guía de Edición de Textos - Página de Inicio

## 📝 Cómo Editar los Textos de la Página de Inicio

Para editar los textos de la página de inicio (`/`), tienes dos opciones:

### Opción 1: Editar desde `index.astro` (Recomendado)

Abre el archivo `src/pages/index.astro` y pasa los textos personalizados al componente `WelcomeHero`:

```astro
---
import Layout from '../layouts/Layout.astro';
import HomeHeader from '../components/HomeHeader.astro';
import WelcomeHero from '../components/WelcomeHero.astro';
---

<Layout title="BeMind Power - Bienvenida" description="..." bodyClass="welcome-page">
  <HomeHeader />
  <WelcomeHero 
    welcomeText="Te damos la Bienvenida"
    mainTitle="A una experiencia sin precedentes"
    description="Aquí no solo tienes una app. Tienes tu red sin complicaciones: escribe, compra, paga, explora y transforma tu día… con la claridad de Be Mind Power."
  />
</Layout>
```

### Opción 2: Editar los Valores por Defecto

Si prefieres cambiar los textos de forma permanente, edita estos archivos:

#### "Te damos la Bienvenida"
Archivo: `src/components/hero/HeroWelcomeTitle.astro`
```astro
const { text = "Te damos la Bienvenida" } = Astro.props;
```

#### "A una experiencia sin precedentes"
Archivo: `src/components/hero/HeroTitle.astro`
```astro
const { text = "A una experiencia sin precedentes" } = Astro.props;
```

#### Descripción
Archivo: `src/components/hero/HeroDescription.astro`
```astro
const { text = "Aquí no solo tienes una app..." } = Astro.props;
```

## 📱 Tamaños Implementados

### Textos
- **"Te damos la Bienvenida"**: 48px desktop → 24px móvil
- **"A una experiencia sin precedentes"**: 40px desktop → 20px móvil
- **Descripción**: 24px desktop → 16px móvil

### Botones
- **Desktop**: 240px × 72px
- **Tablet**: 220px × 65px
- **Móvil**: 200px × 58px

### Teléfono
- **Desktop**: 650px (52vw)
- **Tablet**: 560px (50vw)
- **Móvil**: 450px (60vw)
- **Móvil pequeño**: 360px (70vw)

## 🎨 Estructura Visual en Móviles

Según la imagen de referencia proporcionada, la estructura en móviles es:

1. Logo "BeMind Power" (arriba)
2. "Te damos la Bienvenida" (título grande, uppercase)
3. "A una experiencia sin precedentes" (subtítulo con borde/highlight)
4. Descripción del texto
5. Botones de tiendas (apilados verticalmente)
6. Teléfono (grande, ocupando el espacio inferior)

Todos los elementos están centrados y optimizados para una mejor legibilidad en pantallas pequeñas.
