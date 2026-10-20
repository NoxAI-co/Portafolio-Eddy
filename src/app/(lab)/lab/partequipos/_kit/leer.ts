import { readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import cfg from "./secciones.json";

// Lee en el servidor (en el build) el código de cada sección y la lista de
// imágenes que usa, para que el panel de desarrollo los muestre tal cual están
// en src/components/partequipos.
const COMP = join(process.cwd(), "src/components/partequipos");
const ASSET = /\/partequipos\/[A-Za-z0-9_./-]+\.(?:png|jpe?g|webp|svg)/g;

export type ArchivoKit = { ruta: string; codigo: string };
export type SeccionKit = {
  id: string;
  nombre: string;
  descripcion: string;
  uso: string;
  dependencias: string[];
  archivos: ArchivoKit[];
  assets: { ruta: string; bytes: number }[];
  zipBytes: number;
};

const tamano = (ruta: string) => {
  try {
    return statSync(join(process.cwd(), ruta)).size;
  } catch {
    return 0;
  }
};

// mismo recorte que scripts/build-partequipos-kit.mjs
export function leerEstilos() {
  return (
    `/* Partequipos: tokens y animaciones para Tailwind v4.\n   Pégalo en tu CSS global, debajo de @import "tailwindcss". */\n` +
    readFileSync(join(process.cwd(), cfg.estilos), "utf8")
      .replace(/\/\* Fuente de public[\s\S]*?\*\/\n/, "")
      .replace(/^@import "tailwindcss".*\n/m, "")
      .replace(/^@source .*\n/gm, "")
      .replace(/^\n+/, "")
  );
}

export function leerSecciones(): SeccionKit[] {
  return cfg.secciones.map((s) => {
    const archivos = s.archivos.map((ruta) => ({
      ruta: `src/components/partequipos/${ruta}`,
      codigo: readFileSync(join(COMP, ruta), "utf8"),
    }));
    const rutas = Array.from(new Set(archivos.flatMap((a) => a.codigo.match(ASSET) ?? []))).sort();
    return {
      ...s,
      archivos,
      assets: rutas.map((ruta) => ({ ruta, bytes: tamano(join("public", ruta)) })),
      zipBytes: tamano(`public/partequipos/kit/${s.id}.zip`),
    };
  });
}

export const zipCompletoBytes = () => tamano("public/partequipos/kit/todo.zip");
