// Datos de cada landing de marca (/lab/partequipos/<slug>). Para
// sumar una marca: su entrada aquí, su foto y su logo en
// public/partequipos/marcas/<slug>/ y una página como la de case/.
import { MODELOS_CASE } from "./modelos-case";
import { MODELOS_DYNAPAC } from "./modelos-dynapac";
import { MODELOS_HITACHI } from "./modelos-hitachi";
import { MODELOS_YANMAR } from "./modelos-yanmar";

export type Marca = {
  slug: string;
  nombre: string;
  /** Título del hero. */
  titulo: string;
  presentacion: string;
  /** Color de la marca: pinta la mitad inferior de la banda del hero. */
  acento: string;
  /** Texto sobre el acento (botón «Ver ficha»); negro si no se indica. */
  acentoTinta?: string;
  fondo: string;
  /** Encuadre de la foto de fondo (object-position). */
  fondoPosicion?: string;
  logo: { src: string; ancho: number; alto: number };
  /** Tipos de máquina de la línea, en el orden de la cinta. */
  tipos: TipoMaquina[];
  /** Líneas de texto debajo de la cinta de tipos. */
  cierreLinea: string[];  /** Mascota de la marca (grabado). Opcional: no todas tienen una. */
  mascota?: Mascota;
};

export type Mascota = {
  nombre: string;
  /** Proporción ancho / alto del grabado. */
  proporcion: number;
  /** Máscara de las líneas: para fondos claros, se pinta de tinta. */
  tinta: string;
  /** Máscara de las zonas claras: para fondos oscuros, da el grabado tal
      cual sobre negro. Solo la tienen los grabados (el águila de Case); los
      símbolos planos usan `tinta` en todas partes. */
  papel?: string;
  /** Datos de las propuestas de historia y cierre (solo Case). */
  desde?: string;
  historia?: string;
  respaldo?: string;
};

export type TipoMaquina = {
  /** Ancla de su sección en la página (#tipo-<id>). */
  id: string;
  nombre: string;
  /** Nombre en una palabra para la píldora de navegación, cuando el nombre
      no cabe; si falta, el nombre. */
  corto?: string;
  /** Render recortado (PNG con fondo transparente) para la cinta. */
  imagen: string;
  /** Página de la categoría en el sitio de Partequipos. */
  categoria: string;
  modelos: Modelo[];
};

export type Modelo = {
  nombre: string;
  imagen: string;
  datos: { icono: "peso" | "potencia" | "motor"; etiqueta: string; valor: string }[];
  /** Ficha del equipo en el sitio de Partequipos. */
  ficha: string;
};

const TIPOS_CASE = "/partequipos/marcas/case/tipos";
const LINEA_CASE =
  "https://partequipos.vercel.app/maquinaria-pesada/maquinaria-pesada-nueva/marcas/case-construction";

const tipoCase = (id: string, nombre: string, render: string, categoria: string): TipoMaquina => ({
  id,
  nombre,
  imagen: `${TIPOS_CASE}/${render}.png`,
  categoria: `${LINEA_CASE}/${categoria}/`,
  modelos: MODELOS_CASE[id],
});

const LINEAS = "https://partequipos.vercel.app/maquinaria-pesada/maquinaria-pesada-nueva/marcas";

// Tipo de máquina de cualquier marca: id (ancla y llave de sus modelos),
// nombre, render recortado para la cinta y ruta de su categoría en el sitio.
const tipo = (
  modelos: Record<string, Modelo[]>,
  id: string,
  nombre: string,
  imagen: string,
  categoria: string,
  corto?: string,
): TipoMaquina => ({ id, nombre, corto, imagen, categoria: `${LINEAS}/${categoria}/`, modelos: modelos[id] });

const CIERRE = [
  "Tecnología de punta, bajo consumo, máxima productividad y respaldo oficial.",
  "Cobertura nacional, servicio técnico, repuestos originales y financiación flexible.",
];

export const MARCAS: Marca[] = [
  {
    slug: "case",
    nombre: "Case Construction",
    titulo: "Maquinaria Case Construction",
    presentacion:
      "CASE Construction tiene una línea completa de máquinas de construcción de alta tecnología y robustez para el aumento de su productividad.",
    acento: "#f2a900",
    fondo: "/partequipos/marcas/case/fondo.jpg",
    fondoPosicion: "50% 50%",
    logo: { src: "/partequipos/marcas/case/logo.png", ancho: 299, alto: 100 },
    tipos: [
      tipoCase("bulldozers", "Bulldozer", "bulldozer", "bulldozer"),
      tipoCase("cargadores", "Cargador", "cargador", "cargadores"),
      tipoCase("excavadoras", "Excavadora", "excavadora", "excavadoras"),
      tipoCase("minicargadores", "Minicargador", "minicargador", "minicargadores-case"),
      tipoCase("motoniveladoras", "Motoniveladora", "motoniveladora", "motoniveladoras-case"),
      tipoCase("retrocargadoras", "Retrocargadora", "retrocargadora", "retrocargadoras"),
      tipoCase("vibrocompactadores", "Vibrocompactador", "vibrocompactador", "vibrocompactador-case-sv208"),
    ],
    cierreLinea: [
      "Tecnología de punta, bajo consumo, máxima productividad y respaldo oficial.",
      "Cobertura nacional, servicio técnico, repuestos originales y financiación flexible.",
    ],
    mascota: {
      nombre: "Old Abe",
      proporcion: 1400 / 993,
      tinta: "/partequipos/marcas/case/mascota-tinta.webp",
      papel: "/partequipos/marcas/case/mascota-papel.webp",
      desde: "1842",
      historia:
        "Old Abe, el águila calva que acompañó al 8.º Regimiento de Wisconsin, es el emblema de CASE desde 1865. Más de siglo y medio después sigue en cada máquina como sello de fuerza y confianza.",
      respaldo: "Respaldo oficial CASE en Colombia",
    },
  },
  {
    slug: "hitachi",
    nombre: "Hitachi",
    titulo: "Maquinaria Hitachi",
    presentacion:
      "La experiencia en la industria de la construcción, las excavadoras Hitachi son conocidas por su rendimiento excepcional.",
    acento: "#fc661c",
    fondo: "/partequipos/marcas/hitachi/fondo.jpg",
    logo: { src: "/partequipos/marcas/hitachi/logo.png", ancho: 587, alto: 330 },
    tipos: [
      tipo(MODELOS_HITACHI, "excavadoras", "Excavadora", "/partequipos/maq-hitachi-zx210.png", "hitachi/excavadoras-hitachi"),
    ],
    cierreLinea: CIERRE,
    mascota: {
      nombre: "Ojo Hitachi",
      proporcion: 1,
      tinta: "/partequipos/marcas/hitachi/mascota-tinta.webp",
    },
  },
  {
    slug: "yanmar",
    nombre: "Yanmar",
    titulo: "Maquinaria Yanmar",
    presentacion:
      "Yanmar es la referencia del sector en rendimiento, capacidad y fiabilidad. Son modelos capaces de abordar todas las tareas.",
    acento: "#ed1c24",
    fondo: "/partequipos/marcas/yanmar/fondo.jpg",
    logo: { src: "/partequipos/marcas/yanmar/logo.png", ancho: 299, alto: 100 },
    tipos: [
      tipo(MODELOS_YANMAR, "miniexcavadoras", "Miniexcavadora", "/partequipos/maq-yanmar.png", "yanmar/miniexcavadoras"),
    ],
    cierreLinea: CIERRE,
    mascota: {
      nombre: "Libélula Yanmar",
      proporcion: 1400 / 702,
      tinta: "/partequipos/marcas/yanmar/mascota-tinta.webp",
    },
  },
  {
    slug: "dynapac",
    nombre: "Dynapac",
    titulo: "Maquinaria Dynapac",
    presentacion:
      "Equipos nuevos Dynapac, reconocidos por su tecnología, eficiencia y alto rendimiento en aplicaciones de compactación, pavimentación y construcción de infraestructura vial.",
    acento: "#bf2e1a",
    acentoTinta: "#ffffff",
    fondo: "/partequipos/marcas/dynapac/fondo.jpg",
    logo: { src: "/partequipos/marcas/dynapac/logo.png", ancho: 262, alto: 43 },
    tipos: [
      tipo(MODELOS_DYNAPAC, "doble-rodillo", "Compactador de doble rodillo", "/partequipos/marcas/dynapac/tipos/doble-rodillo.png", "dynapac/compactador-doble-rodillo-dynapac", "Rodillo"),
      tipo(MODELOS_DYNAPAC, "llantas", "Compactador de llantas", "/partequipos/marcas/dynapac/tipos/llantas.png", "dynapac/compactador-de-llantas-dynapac", "Neumático"),
      tipo(MODELOS_DYNAPAC, "suelo", "Compactador de suelo", "/partequipos/marcas/dynapac/tipos/suelo.png", "dynapac/compactador-de-suelo-dynapac", "Suelo"),
      tipo(MODELOS_DYNAPAC, "pavimentadoras", "Pavimentadora", "/partequipos/marcas/dynapac/tipos/pavimentadora.png", "dynapac/pavimentadoras-dynapac"),
      tipo(MODELOS_DYNAPAC, "reglas", "Regla vibratoria", "/partequipos/marcas/dynapac/tipos/regla.png", "dynapac/reglas-dynapac", "Regla"),
    ],
    cierreLinea: CIERRE,
    mascota: {
      nombre: "Rinoceronte Dynapac",
      proporcion: 1184 / 961,
      tinta: "/partequipos/marcas/dynapac/mascota-tinta.webp",
    },
  },
];

export const getMarca = (slug: string) => MARCAS.find((m) => m.slug === slug);
