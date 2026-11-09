import type { FichaModelo } from "./FichaModeloRepuestos";

// Datos de las fichas de repuestos por modelo, tomados de sus páginas en el
// sitio de Partequipos (textos, migas, categorías y otros modelos). Cada
// marca lleva su color (la franja de «Otros modelos», el mismo del sitio) y un
// panel claro para las tarjetas de categoría: tintes muy suaves de la marca,
// sobre los que las fotos de fondo blanco se funden.
const SITIO = "https://partequipos.vercel.app";
const REPUESTOS = `${SITIO}/repuestos-maquinaria-pesada-colombia`;
const MARCAS = `${REPUESTOS}/repuestos-maquinaria-pesada-marcas`;
const CATEGORIA = `${REPUESTOS}/categoria-repuestos-para-maquinaria-pesada`;
const FOTO = "/partequipos/repuestos/ficha";
const COTIZAR = `${SITIO}/contactanos/`;

// Categorías de repuestos: nombre y foto por la ruta de su página.
const CATEGORIAS: Record<string, { nombre: string; foto: string }> = {
  "tren-de-rodaje-para-maquinaria-pesada": {
    nombre: "Tren de Rodaje",
    foto: "tren-de-rodaje",
  },
  "filtracion-para-maquinaria-pesada": {
    nombre: "Filtración",
    foto: "filtracion",
  },
  "herramienta-de-corte-gets-para-maquinaria-pesada": {
    nombre: "Baldes y Herramienta de Corte",
    foto: "corte",
  },
  "lubricantes-para-maquinaria-pesada": {
    nombre: "Lubricantes",
    foto: "lubricantes",
  },
  "llantas-y-rines-para-maquinaria-pesada": {
    nombre: "Llantas y Rines",
    foto: "llantas",
  },
  "miscelaneos-para-maquinaria-pesada": {
    nombre: "Misceláneos",
    foto: "miscelaneos",
  },
  "componentes-mayores-para-maquinaria-pesada": {
    nombre: "Componentes Mayores",
    foto: "componentes",
  },
  "motor-diesel-para-maquinaria-pesada": {
    nombre: "Repuestos Motor Diesel",
    foto: "motor",
  },
  "transmision-para-maquinaria-pesada": {
    nombre: "Transmisión",
    foto: "transmision",
  },
  "componentes-hidraulicos-para-maquinaria-pesada": {
    nombre: "Hidráulicos",
    foto: "hidraulicos",
  },
};

const categorias = (rutas: string[]) =>
  rutas.map((r) => ({
    nombre: CATEGORIAS[r].nombre,
    imagen: `${FOTO}/${CATEGORIAS[r].foto}.webp`,
    href: `${CATEGORIA}/${r}/`,
  }));

const TODAS = Object.keys(CATEGORIAS);

const migasBase = [
  { texto: "Inicio", href: `${SITIO}/` },
  { texto: "Repuestos", href: `${REPUESTOS}/` },
  { texto: "Marcas", href: `${MARCAS}/` },
];

// CASE CONSTRUCTION · Excavadora CX350B
const CASE = `${MARCAS}/repuestos-para-maquinaria-pesada-case-construction`;
const CASE_CARGADOR = `${CASE}/repuestos-para-maquinaria-pesada-cargador-frontal-case-construction`;
const CASE_EXCAVADORA = `${CASE_CARGADOR}/repuestos-para-maquinaria-pesada-excavadora-case-construction`;

export const FICHA_CX350B: FichaModelo = {
  marca: {
    nombre: "Case Construction",
    logo: { src: "/partequipos/marcas/case/logo.png", ancho: 299, alto: 100 },
    color: "#f2a900",
    tintaAcento: "#100f0f",
    logoCompacto: {
      src: "/partequipos/repuestos/marcas/case.webp",
      ancho: 228,
      alto: 69,
    },
    panel: ["#fdf9f2", "#f8eedb"],
    luz: "rgb(255 255 255 / 0.6)",
  },
  tipo: "Excavadora",
  modelo: "CX350B",
  linea:
    "Mantén tu Excavadora CASE CONSTRUCTION CX350B en condiciones óptimas con nuestros repuestos originales y de alta calidad.",
  migas: [
    ...migasBase,
    { texto: "Case Construction", href: `${CASE}/` },
    { texto: "Cargador Frontal", href: `${CASE_CARGADOR}/` },
    { texto: "Excavadora", href: `${CASE_EXCAVADORA}/` },
    { texto: "Excavadora CASE CONSTRUCTION CX350B" },
  ],
  cotizar: COTIZAR,
  whatsapp:
    "https://wa.me/573176707071?text=Hola%2C+busco+Repuestos+para+Excavadora+Case+Construction+CX350B.",
  categorias: categorias(TODAS),
  otros: [
    {
      modelo: "CX210B",
      nombreCompleto: "Excavadora CASE CONSTRUCTION CX210B",
      href: `${CASE_EXCAVADORA}/repuestos-excavadora-case-construction-cx210b/`,
    },
    {
      modelo: "CX220C",
      nombreCompleto: "Excavadora CASE CONSTRUCTION CX220C",
      href: `${CASE_EXCAVADORA}/repuestos-excavadora-case-construction-cx220c/`,
    },
    {
      modelo: "CX350C",
      nombreCompleto: "Excavadora CASE CONSTRUCTION CX350C",
      href: `${CASE_EXCAVADORA}/repuestos-excavadora-case-construction-cx350c/`,
    },
  ],
};

// YANMAR · Miniexcavadora ViO80-1 (en el sitio tiene 4 categorías)
const YANMAR = `${MARCAS}/repuestos-para-maquinaria-pesada-yanmar`;
const YANMAR_MINI = `${YANMAR}/repuestos-para-maquinaria-pesada-miniexcavadora-yanmar`;

export const FICHA_VIO80: FichaModelo = {
  marca: {
    nombre: "Yanmar",
    logo: { src: "/partequipos/marcas/yanmar/logo.png", ancho: 299, alto: 100 },
    logoCompacto: {
      src: "/partequipos/repuestos/marcas/yanmar.webp",
      ancho: 275,
      alto: 34,
    },
    logoCompactoAncho: "6.75rem",
    color: "#ed2c43",
    panel: ["#fffafa", "#fbecee"],
    luz: "rgb(255 255 255 / 0.65)",
  },
  tipo: "Miniexcavadora",
  modelo: "VIO80-1",
  linea:
    "Mantén tu Miniexcavadora YANMAR VIO80-1 en condiciones óptimas con nuestros repuestos originales y de alta calidad.",
  migas: [
    ...migasBase,
    { texto: "Yanmar", href: `${YANMAR}/` },
    { texto: "Miniexcavadora", href: `${YANMAR_MINI}/` },
    { texto: "Miniexcavadora YANMAR VIO80-1" },
  ],
  cotizar: COTIZAR,
  whatsapp:
    "https://wa.me/573176707071?text=Hola%2C+busco+Repuestos+para+Miniexcavadora+Yanmar+VIO80-1.",
  categorias: categorias([
    "tren-de-rodaje-para-maquinaria-pesada",
    "filtracion-para-maquinaria-pesada",
    "herramienta-de-corte-gets-para-maquinaria-pesada",
    "lubricantes-para-maquinaria-pesada",
  ]),
  otros: [
    {
      modelo: "VIO17-6B",
      nombreCompleto: "Miniexcavadora YANMAR VIO17-6B",
      href: `${YANMAR_MINI}/repuestos-miniexcavadora-yanmar-vio17-6b/`,
    },
    {
      modelo: "VIO35-6B",
      nombreCompleto: "Miniexcavadora YANMAR VIO35-6B",
      href: `${YANMAR_MINI}/repuestos-miniexcavadora-yanmar-vio35-6b/`,
    },
    {
      modelo: "VIO45-6B",
      nombreCompleto: "Miniexcavadora YANMAR VIO45-6B",
      href: `${YANMAR_MINI}/repuestos-miniexcavadora-yanmar-vio45-6b/`,
    },
    {
      modelo: "VIO50-6B",
      nombreCompleto: "Miniexcavadora YANMAR VIO50-6B",
      href: `${YANMAR_MINI}/repuestos-miniexcavadora-yanmar-vio50-6b/`,
    },
    {
      modelo: "VIO55-6B",
      nombreCompleto: "Miniexcavadora YANMAR VIO55-6B",
      href: `${YANMAR_MINI}/repuestos-miniexcavadora-yanmar-vio55-6b/`,
    },
  ],
};

// HITACHI LANDCROS · Excavadora ZX210-5G (25 modelos más, con su serie)
const HITACHI = `${MARCAS}/repuestos-para-maquinaria-pesada-hitachi`;
const HITACHI_EXCAVADORA = `${HITACHI}/repuestos-para-maquinaria-pesada-excavadora-hitachi`;

export const FICHA_ZX210: FichaModelo = {
  marca: {
    nombre: "Hitachi LANDCROS",
    logo: {
      src: "/partequipos/repuestos/marcas/hitachi-landcros.webp",
      ancho: 640,
      alto: 313,
    },
    color: "#fc661c",
    panel: ["#fffaf6", "#fdebdd"],
    luz: "rgb(255 255 255 / 0.65)",
  },
  tipo: "Excavadora",
  modelo: "ZX210-5G",
  // en el sitio dice «ZX200-5G»: aquí va el modelo de la ficha
  linea:
    "Mantén tu excavadora Hitachi LANDCROS ZX210-5G en condiciones óptimas con nuestros repuestos originales y de alta calidad.",
  migas: [
    ...migasBase,
    { texto: "Hitachi LANDCROS", href: `${HITACHI}/` },
    { texto: "Excavadora", href: `${HITACHI_EXCAVADORA}/` },
    { texto: "Excavadora Hitachi LANDCROS ZX210-5G" },
  ],
  cotizar: COTIZAR,
  whatsapp:
    "https://wa.me/573176707071?text=Hola%2C+busco+Repuestos+para+Excavadora+Hitachi+LANDCROS+ZX210-5G.",
  categorias: categorias(TODAS),
  otros: [
    {
      modelo: "EX100",
      detalle: "Serie EX",
      nombreCompleto: "Excavadora Hitachi LANDCROS EX100",
      href: `${HITACHI_EXCAVADORA}/repuestos-excavadora-hitachi-ex100/`,
    },
    {
      modelo: "EX100-3",
      detalle: "Serie EX",
      nombreCompleto: "Excavadora Hitachi LANDCROS EX100-3",
      href: `${HITACHI_EXCAVADORA}/repuestos-excavadora-hitachi-ex100-3/`,
    },
    {
      modelo: "EX120-2",
      detalle: "Serie EX",
      nombreCompleto: "Excavadora Hitachi LANDCROS EX120-2",
      href: `${HITACHI_EXCAVADORA}/repuestos-excavadora-hitachi-ex120-2/`,
    },
    {
      modelo: "EX120-3",
      detalle: "Serie EX",
      nombreCompleto: "Excavadora Hitachi LANDCROS EX120-3",
      href: `${HITACHI_EXCAVADORA}/repuestos-excavadora-hitachi-ex120-3/`,
    },
    {
      modelo: "EX160-5",
      detalle: "Serie EX",
      nombreCompleto: "Excavadora Hitachi LANDCROS EX160-5",
      href: `${HITACHI_EXCAVADORA}/repuestos-excavadora-hitachi-ex160-5/`,
    },
    {
      modelo: "EX200",
      detalle: "Serie EX",
      nombreCompleto: "Excavadora Hitachi LANDCROS EX200",
      href: `${HITACHI_EXCAVADORA}/repuestos-excavadora-hitachi-ex200/`,
    },
    {
      modelo: "EX200-2",
      detalle: "Serie EX",
      nombreCompleto: "Excavadora Hitachi LANDCROS EX200-2",
      href: `${HITACHI_EXCAVADORA}/repuestos-excavadora-hitachi-ex200-2/`,
    },
    {
      modelo: "EX200-3",
      detalle: "Serie EX",
      nombreCompleto: "Excavadora Hitachi LANDCROS EX200-3",
      href: `${HITACHI_EXCAVADORA}/repuestos-excavadora-hitachi-ex200-3/`,
    },
    {
      modelo: "EX200-5",
      detalle: "Serie EX",
      nombreCompleto: "Excavadora Hitachi LANDCROS EX200-5",
      href: `${HITACHI_EXCAVADORA}/repuestos-excavadora-hitachi-ex200-5/`,
    },
    {
      modelo: "EX230-5",
      detalle: "Serie EX",
      nombreCompleto: "Excavadora Hitachi LANDCROS EX230-5",
      href: `${HITACHI_EXCAVADORA}/repuestos-excavadora-hitachi-ex230-5/`,
    },
    {
      modelo: "EX270-5",
      detalle: "Serie EX",
      nombreCompleto: "Excavadora Hitachi LANDCROS EX270-5",
      href: `${HITACHI_EXCAVADORA}/repuestos-excavadora-hitachi-ex270-5/`,
    },
    {
      modelo: "ZX120-3",
      detalle: "Serie ZAXIS",
      nombreCompleto: "Excavadora Hitachi LANDCROS ZX120-3",
      href: `${HITACHI_EXCAVADORA}/repuestos-excavadora-hitachi-zx120-3/`,
    },
    {
      modelo: "ZX120/ ZX130LCN",
      detalle: "Serie ZAXIS",
      nombreCompleto: "Excavadora Hitachi LANDCROS ZX120/ ZX130LCN",
      href: `${HITACHI_EXCAVADORA}/repuestos-excavadora-hitachi-zx120-zx130lcn/`,
    },
    {
      modelo: "ZX200",
      detalle: "Serie ZAXIS",
      nombreCompleto: "Excavadora Hitachi LANDCROS ZX200",
      href: `${HITACHI_EXCAVADORA}/repuestos-excavadora-hitachi-zx-200/`,
    },
    {
      modelo: "ZX200-3",
      detalle: "Serie ZAXIS",
      nombreCompleto: "Excavadora Hitachi LANDCROS ZX200-3",
      href: `${HITACHI_EXCAVADORA}/repuestos-excavadora-hitachi-zx200-3/`,
    },
    {
      modelo: "ZX200-5G",
      detalle: "Serie ZAXIS",
      nombreCompleto: "Excavadora Hitachi LANDCROS ZX200-5G",
      href: `${HITACHI_EXCAVADORA}/repuestos-excavadora-hitachi-zx200-5g/`,
    },
    {
      modelo: "ZX220LC",
      detalle: "Serie ZAXIS",
      nombreCompleto: "Excavadora Hitachi LANDCROS ZX220LC",
      href: `${HITACHI_EXCAVADORA}/repuestos-excavadora-hitachi-zx220lc/`,
    },
    {
      modelo: "ZX270LC",
      detalle: "Serie ZAXIS",
      nombreCompleto: "Excavadora Hitachi LANDCROS ZX270LC",
      href: `${HITACHI_EXCAVADORA}/repuestos-excavadora-hitachi-zx270lc/`,
    },
    {
      modelo: "ZX270LC-3",
      detalle: "Serie ZAXIS",
      nombreCompleto: "Excavadora Hitachi LANDCROS ZX270LC-3",
      href: `${HITACHI_EXCAVADORA}/repuestos-excavadora-hitachi-zx270lc-3/`,
    },
    {
      modelo: "ZX330LC",
      detalle: "Serie ZAXIS",
      nombreCompleto: "Excavadora Hitachi LANDCROS ZX330LC",
      href: `${HITACHI_EXCAVADORA}/repuestos-excavadora-hitachi-zx330lc/`,
    },
    {
      modelo: "ZX350LC-3",
      detalle: "Serie ZAXIS",
      nombreCompleto: "Excavadora Hitachi LANDCROS ZX350LC-3",
      href: `${HITACHI_EXCAVADORA}/repuestos-excavadora-hitachi-zx350lc-3/`,
    },
    {
      modelo: "ZX350LC-5",
      detalle: "Serie ZAXIS",
      nombreCompleto: "Excavadora Hitachi LANDCROS ZX350LC-5",
      href: `${HITACHI_EXCAVADORA}/repuestos-excavadora-hitachi-zx350lc-5/`,
    },
    {
      modelo: "ZX450LC",
      detalle: "Serie ZAXIS",
      nombreCompleto: "Excavadora Hitachi LANDCROS ZX450LC",
      href: `${HITACHI_EXCAVADORA}/repuestos-excavadora-hitachi-zx450lc/`,
    },
    {
      modelo: "ZX450LC-3",
      detalle: "Serie ZAXIS",
      nombreCompleto: "Excavadora Hitachi LANDCROS ZX450LC-3",
      href: `${HITACHI_EXCAVADORA}/repuestos-excavadora-hitachi-zx450lc-3/`,
    },
    {
      modelo: "ZX450LC-5",
      detalle: "Serie ZAXIS",
      nombreCompleto: "Excavadora Hitachi LANDCROS ZX450LC-5",
      href: `${HITACHI_EXCAVADORA}/repuestos-excavadora-hitachi-zx450lc-5/`,
    },
  ],
};
