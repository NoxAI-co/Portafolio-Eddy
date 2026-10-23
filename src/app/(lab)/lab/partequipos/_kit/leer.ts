import { readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { getMarca, type Marca } from "@/components/partequipos/marca/marcas";
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
  /** Selector del elemento al que lleva «Ver en la página». */
  destino?: string;
  archivos: ArchivoKit[];
  assets: { ruta: string; bytes: number }[];
  zipBytes: number;
};

type Config = {
  id: string;
  nombre: string;
  descripcion: string;
  uso: string;
  dependencias: string[];
  destino?: string;
  archivos: string[];
  imagenes?: string[];
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

// Imágenes de una marca por tipo (fondo, logo, renders de la cinta, fotos de
// los modelos, mascota). Las secciones del kit de marca dicen cuáles llevan,
// así cada kit trae solo las de su marca. Igual en el script de los zip.
export function imagenesMarca(marca: Marca, tipos: string[]) {
  const de: Record<string, string[]> = {
    fondo: [marca.fondo],
    logo: [marca.logo.src],
    tipos: marca.tipos.map((t) => t.imagen),
    modelos: marca.tipos.flatMap((t) => t.modelos.map((m) => m.imagen)),
    mascota: marca.mascota ? [marca.mascota.tinta, marca.mascota.papel ?? ""].filter(Boolean) : [],
  };
  return Array.from(new Set(tipos.flatMap((t) => de[t] ?? []))).sort();
}

function armar(s: Config, carpeta: string, imagenes?: (s: Config) => string[]): SeccionKit {
  const archivos = s.archivos.map((ruta) => ({
    ruta: `src/components/partequipos/${ruta}`,
    codigo: readFileSync(join(COMP, ruta), "utf8"),
  }));
  const rutas = imagenes
    ? imagenes(s)
    : Array.from(new Set(archivos.flatMap((a) => a.codigo.match(ASSET) ?? []))).sort();
  return {
    id: s.id,
    nombre: s.nombre,
    descripcion: s.descripcion,
    uso: s.uso,
    dependencias: s.dependencias,
    destino: s.destino,
    archivos,
    assets: rutas.map((ruta) => ({ ruta, bytes: tamano(join("public", ruta)) })),
    zipBytes: tamano(`public${carpeta}/${s.id}.zip`),
  };
}

export const leerSecciones = (): SeccionKit[] => cfg.secciones.map((s) => armar(s, "/partequipos/kit"));

export const zipCompletoBytes = (carpeta = "/partequipos/kit") => tamano(`public${carpeta}/todo.zip`);

// Kit de una landing de marca: las mismas secciones para todas, con el uso
// apuntando a la marca y solo sus imágenes.
export const carpetaKitMarca = (slug: string) => `/partequipos/kit/marcas/${slug}`;

export function leerSeccionesMarca(slug: string): SeccionKit[] {
  const marca = getMarca(slug)!;
  return cfg.marca.secciones.map((s) =>
    armar({ ...s, uso: s.uso.replace("<slug>", slug) }, carpetaKitMarca(slug), (x) =>
      imagenesMarca(marca, x.imagenes ?? []),
    ),
  );
}
