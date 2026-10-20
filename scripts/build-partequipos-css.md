# CSS del lab de Partequipos

`/lab/partequipos` usa Tailwind v4 y el resto del portafolio Tailwind v3. Para
que no choquen, el CSS del lab se compila aparte y se sirve ya listo desde
`public/partequipos/partequipos.css`, cargado con `<link>` en su propio layout
raíz (`src/app/(lab)/layout.tsx`).

Después de cambiar clases en `src/components/partequipos/**` o en las páginas
del lab, regenera el CSS:

```bash
node scripts/build-partequipos-css.mjs ../Documents/Proyectos/partequipos-landing
```

El argumento es cualquier proyecto con `@tailwindcss/postcss` v4 instalado.

# Kit para desarrollo

El botón «Kit para desarrollo» de `/lab/partequipos` muestra el código de cada
sección (leído en el build desde `src/components/partequipos`) y ofrece los
`.zip` de `public/partequipos/kit/`. Las secciones y sus archivos se definen en
`src/app/(lab)/lab/partequipos/_kit/secciones.json`. Después de cambiar un
componente o una imagen, regenera los zip:

```bash
node scripts/build-partequipos-kit.mjs
```
