// Compila scripts/partequipos.css con Tailwind v4 y deja el resultado en
// public/partequipos/partequipos.css. El portafolio usa Tailwind v3, así que el
// compilador v4 se toma de un proyecto que lo tenga instalado (por defecto el
// de partequipos-landing). Uso:
//   node scripts/build-partequipos-css.mjs [ruta-a-proyecto-con-tailwind-v4]
import { createRequire } from "node:module";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const v4 = resolve(process.argv[2] ?? "../Documents/Proyectos/partequipos-landing");
const require = createRequire(resolve(v4, "package.json"));
const postcss = require("postcss");
const tailwind = require("@tailwindcss/postcss");

const from = resolve("scripts/partequipos.css");
const out = resolve("public/partequipos/partequipos.css");
// el @import "tailwindcss" se resolvería al v3 del portafolio: se apunta al v4
const tw4 = resolve(require.resolve("tailwindcss/package.json"), "../index.css");
const css = readFileSync(from, "utf8").replace('@import "tailwindcss"', `@import "${tw4}"`);
const res = await postcss([tailwind({ base: resolve("."), optimize: { minify: true } })]).process(css, { from, to: out });
writeFileSync(out, res.css);
console.log("ok", out, (res.css.length / 1024).toFixed(1) + " KB");
