// Fuente única de las marcas que atendemos. La usan el carrusel del hero, el
// carrusel de soporte y la sección de maquinaria nueva, para que las tres no
// se desincronicen al agregar o quitar una marca.
export type Brand = {
  name: string;
  /** Versión para fondo OSCURO (el texto del logo va en blanco hueso). */
  logo: string;
  /**
   * Versión para fondo CLARO. Solo la necesitan las marcas cuyo logo tiene
   * texto oscuro, que al recolorearlo para fondo oscuro desaparecería sobre
   * blanco. Las marcas monocromas en rojo sirven en ambos fondos.
   */
  logoOnLight?: string;
  /** Tipo de equipo por el que el fabricante es conocido. */
  line: string;
  /** Se ofrece como equipo nuevo. */
  isNew?: boolean;
  /** Foto para la tarjeta de equipo nuevo. */
  image?: string;
  /** La foto es prestada de otra marca, a la espera de la propia. */
  imageIsPlaceholder?: boolean;
  /** Máquina recortada con fondo transparente, para la composición de cartel. */
  cutout?: string;
  /** El recorte mira al lado contrario que el resto; se voltea para alinear
      la serie. */
  cutoutFlip?: boolean;
  /** Slug de la ficha del equipo en /maquinaria/[slug]. */
  equipo?: string;
};

export const BRANDS: Brand[] = [
  {
    name: "Caterpillar",
    logo: "/partequipos/brands/caterpillar.svg",
    logoOnLight: "/partequipos/brands/caterpillar-on-light.svg",
    line: "Excavadoras y cargadores",
  },
  {
    name: "Hitachi",
    equipo: "excavadora-hitachi-zx75us-7",
    logo: "/partequipos/brands/hitachi.svg",
    line: "Excavadoras hidráulicas",
    isNew: true,
    image: "/partequipos/card-hitachi.jpg",
    cutout: "/partequipos/maq-hitachi.png",
  },
  {
    name: "Case",
    equipo: "bulldozer-case-1150m",
    logo: "/partequipos/brands/case.svg",
    logoOnLight: "/partequipos/brands/case-on-light.svg",
    line: "Retroexcavadoras y cargadores",
    isNew: true,
    image: "/partequipos/card-case.jpg",
    cutout: "/partequipos/maq-case.png",
  },
  {
    name: "Yanmar",
    equipo: "miniexcavadora-yanmar-vio80",
    logo: "/partequipos/brands/yanmar.svg",
    line: "Miniexcavadoras y motores",
    isNew: true,
    image: "/partequipos/card-yanmar.jpg",
    cutout: "/partequipos/maq-yanmar.png",
  },
  {
    name: "Dynapac",
    equipo: "compactador-dynapac-ca1500d",
    logo: "/partequipos/brands/dynapac.svg",
    line: "Compactación y pavimentación",
    isNew: true,
    image: "/partequipos/card-dynapac.jpg",
    cutout: "/partequipos/maq-dynapac.png",
  },
  {
    name: "LiuGong",
    equipo: "excavadora-liugong-933f",
    logo: "/partequipos/brands/liugong.svg",
    logoOnLight: "/partequipos/brands/liugong-on-light.svg",
    line: "Cargadores y excavadoras",
    isNew: true,
    // prestada: falta card-liugong.jpg
    image: "/partequipos/card-case.jpg",
    imageIsPlaceholder: true,
    cutout: "/partequipos/maq-liugong.webp",
    cutoutFlip: true,
  },
];

export const NEW_MACHINERY_BRANDS = BRANDS.filter((b) => b.isNew);
