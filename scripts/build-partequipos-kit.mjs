// Arma los .zip que descarga el panel «Kit para desarrollo» de /lab/partequipos
// y de cada landing de marca: uno por sección (su código, sus imágenes y los
// estilos) y uno con todo. Cada zip respeta las rutas del proyecto
// (src/components/partequipos/..., public/partequipos/...) para copiarlo tal
// cual. Los de marca van en public/partequipos/kit/marcas/<slug>/. Uso:
//   node --no-warnings scripts/build-partequipos-kit.mjs
import { execFileSync } from "node:child_process";
import { registerHooks } from "node:module";
import { pathToFileURL } from "node:url";
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { tmpdir } from "node:os";

const raiz = resolve(".");
const cfg = JSON.parse(readFileSync("src/app/(lab)/lab/partequipos/_kit/secciones.json", "utf8"));
const comp = "src/components/partequipos";
const salida = resolve("public/partequipos/kit");
const ASSET = /\/partequipos\/[A-Za-z0-9_./-]+\.(?:png|jpe?g|webp|svg)/g;

const assetsDe = (archivos) => {
  const set = new Set();
  for (const a of archivos) for (const m of readFileSync(join(comp, a), "utf8").match(ASSET) ?? []) set.add(m);
  return [...set].sort();
};

// Los estilos del lab sin el @import ni las @source propias de este proyecto:
// se pegan en el CSS global de Tailwind v4 del otro proyecto, debajo de su
// @import "tailwindcss".
export const estilosKit = () =>
  `/* Partequipos: tokens y animaciones para Tailwind v4.
   Pégalo en tu CSS global, debajo de @import "tailwindcss". */
` +
  readFileSync(cfg.estilos, "utf8")
    .replace(/\/\* Fuente de public[\s\S]*?\*\/\n/, "")
    .replace(/^@import "tailwindcss".*\n/m, "")
    .replace(/^@source .*\n/gm, "")
    .replace(/^\n+/, "");

const leeme = (titulo, secciones) => `# ${titulo}

Componentes de Partequipos para Next.js (App Router) + React + Tailwind CSS v4.

## Cómo usarlo

1. Copia \`src/components/partequipos/\` y \`public/partequipos/\` a tu proyecto
   con las mismas rutas (el código busca las imágenes en \`/partequipos/...\`).
2. Pega \`estilos/partequipos.css\` en tu CSS global, debajo de
   \`@import "tailwindcss"\`: trae los tokens de color (\`bg-brand\`,
   \`text-on-bar\`...) y las animaciones.
3. Instala las dependencias: ${[...new Set(secciones.flatMap((s) => s.dependencias))].filter((d) => !d.startsWith("next/")).map((d) => `\`${d}\``).join(", ") || "ninguna extra"}.
4. Fuente: Inter (\`next/font/google\`) en el contenedor de la página.

## Secciones

${secciones.map((s) => `- **${s.nombre}**: ${s.descripcion}\n  Uso: \`${s.uso}\``).join("\n")}
`;

// Los datos de las marcas están en TypeScript con imports sin extensión: se
// importan tal cual (Node quita los tipos) resolviendo "./x" como "./x.ts".
registerHooks({
  resolve(spec, ctx, next) {
    try {
      return next(spec, ctx);
    } catch (e) {
      if (spec.startsWith(".")) return next(`${spec}.ts`, ctx);
      throw e;
    }
  },
});
const { MARCAS } = await import(pathToFileURL(join(raiz, comp, "marca/marcas.ts")).href);

// mismo reparto que imagenesMarca en _kit/leer.ts
const imagenesMarca = (marca, tipos) => {
  const de = {
    fondo: [marca.fondo],
    logo: [marca.logo.src],
    tipos: marca.tipos.map((t) => t.imagen),
    modelos: marca.tipos.flatMap((t) => t.modelos.map((m) => m.imagen)),
    mascota: marca.mascota ? [marca.mascota.tinta, marca.mascota.papel].filter(Boolean) : [],
  };
  return [...new Set(tipos.flatMap((t) => de[t] ?? []))].sort();
};

// nombre del zip, secciones, carpeta de salida, título del LEEME y, para las
// marcas, cómo elegir las imágenes de cada sección
const armar = (nombre, secciones, destino = salida, titulo, imagenes) => {
  const tmp = join(tmpdir(), `kit-${nombre}-${Date.now()}`);
  const archivos = [...new Set(secciones.flatMap((s) => s.archivos))];
  for (const a of archivos) {
    mkdirSync(dirname(join(tmp, comp, a)), { recursive: true });
    cpSync(join(comp, a), join(tmp, comp, a));
  }
  const rutas = imagenes ? [...new Set(secciones.flatMap(imagenes))].sort() : assetsDe(archivos);
  for (const p of rutas) {
    const src = join("public", p);
    if (!existsSync(src)) { console.warn("falta", src); continue; }
    mkdirSync(dirname(join(tmp, "public", p)), { recursive: true });
    cpSync(src, join(tmp, "public", p));
  }
  mkdirSync(join(tmp, "estilos"), { recursive: true });
  writeFileSync(join(tmp, "estilos/partequipos.css"), estilosKit());
  writeFileSync(
    join(tmp, "LEEME.md"),
    leeme(titulo ?? (nombre === "todo" ? "Partequipos: kit completo" : `Partequipos: ${secciones[0].nombre}`), secciones),
  );
  mkdirSync(destino, { recursive: true });
  const zip = join(destino, `${nombre}.zip`);
  rmSync(zip, { force: true });
  execFileSync("zip", ["-qr", zip, "."], { cwd: tmp });
  rmSync(tmp, { recursive: true, force: true });
  console.log("ok", zip.replace(raiz + "/", ""));
};

// si la sección lista sus imágenes (assets), van solo esas; si no, las que
// nombran sus archivos (los datos de marca nombran las de todas las marcas)
const imagenes = (s) => s.assets ?? assetsDe(s.archivos);

mkdirSync(salida, { recursive: true });
for (const s of cfg.secciones) armar(s.id, [s], salida, undefined, imagenes);
armar("todo", cfg.secciones, salida, undefined, imagenes);

// páginas sueltas: cada una con su kit en kit/<grupo>/
for (const grupo of ["aliadas", "excavadoras"]) {
  const destino = join(salida, grupo);
  for (const s of cfg[grupo].secciones) armar(s.id, [s], destino, undefined, imagenes);
  armar("todo", cfg[grupo].secciones, destino, `Partequipos: ${cfg[grupo].secciones[0].nombre}`, imagenes);
}

for (const marca of MARCAS) {
  const destino = join(salida, "marcas", marca.slug);
  const secciones = cfg.marca.secciones.map((s) => ({ ...s, uso: s.uso.replace("<slug>", marca.slug) }));
  const imagenes = (s) => imagenesMarca(marca, s.imagenes ?? []);
  // la sección «Landing completa» se llama todo: su zip es el kit completo
  for (const s of secciones)
    armar(s.id, s.id === "todo" ? secciones : [s], destino, `Partequipos · ${marca.nombre}: ${s.id === "todo" ? "kit completo" : s.nombre}`, imagenes);
}
