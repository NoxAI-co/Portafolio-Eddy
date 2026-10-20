// Catálogo de equipos con ficha propia. Por ahora es un arreglo local; cuando
// el inventario venga del ERP, esta forma es el contrato que debe cumplir.
export type Equipo = {
  slug: string;
  marca: string;
  modelo: string;
  tipo: string;
  condicion: "nueva" | "usada";
  // Los equipos nuevos no traen año, serial ni peso confirmados hasta que se
  // cotizan; la ficha solo muestra los datos que existan.
  /** Toneladas. */
  peso?: number;
  anio?: number;
  serial?: string;
  horas: number;
  /** Ciudad o región donde está el equipo. Sin dato se muestra "Colombia". */
  ubicacion?: string;
  /** Frase de categoría que abre la descripción, en negrita. */
  linea: string;
  resumen: string;
  /** Párrafos de la descripción de la máquina, bajo la ficha. */
  descripcion?: string[];
  /** Observaciones puntuales del equipo (estado, accesorios, entrega). */
  comentarios?: string[];
  fotos: { src: string; alt: string; ancho: number; alto: number }[];
  /** Foto que solo se usa desenfocada como ambiente de la ficha. Hace falta
      cuando la primera foto es un recorte: desenfocado deja manchas sueltas. */
  ambiente?: string;
};

export const EQUIPOS: Equipo[] = [
  {
    slug: "excavadora-hitachi-zx75us-7",
    marca: "Hitachi",
    modelo: "ZX75US-7",
    tipo: "Excavadora",
    condicion: "usada",
    peso: 1.7,
    anio: 2021,
    serial: "X6007",
    horas: 394,
    linea: "Venta de miniexcavadoras usadas certificadas en Colombia.",
    resumen:
      "Expertos en venta de excavadoras usadas en Colombia con inspección técnica y disponibilidad inmediata.",
    comentarios: ["Este equipo viene con línea húmeda."],
    fotos: [
      {
        src: "/partequipos/equipos/hitachi-zx75us-7-obra.jpg",
        alt: "Excavadora Hitachi ZX75US-7 cargando tierra en obra",
        ancho: 780,
        alto: 455,
      },
      // prestadas de la sección de marcas, a la espera de las fotos del equipo
      {
        src: "/partequipos/card-hitachi.jpg",
        alt: "Brazo y cucharón de una excavadora Hitachi",
        ancho: 1024,
        alto: 1024,
      },
      {
        src: "/partequipos/maq-hitachi.png",
        alt: "Excavadora Hitachi vista de perfil",
        ancho: 1448,
        alto: 1086,
      },
    ],
  },
  // Equipos nuevos de la sección de inicio. El modelo es el que se lee en la
  // foto de cada marca.
  {
    slug: "bulldozer-case-1150m",
    // obra de Case como ambiente, a la espera de fotos propias del equipo
    ambiente: "/partequipos/card-case.jpg",
    marca: "Case",
    modelo: "1150M",
    tipo: "Bulldozer",
    condicion: "nueva",
    horas: 0,
    linea: "Bulldozer de orugas para movimiento de tierra y nivelación.",
    resumen:
      "Consulta disponibilidad, plazos de entrega y condiciones para tu operación.",
    fotos: [
      {
        src: "/partequipos/maq-case.png",
        alt: "Bulldozer Case 1150M con hoja frontal",
        ancho: 1448,
        alto: 1086,
      },
    ],
  },
  {
    slug: "miniexcavadora-yanmar-vio80",
    marca: "Yanmar",
    modelo: "ViO80",
    tipo: "Miniexcavadora",
    condicion: "usada",
    // datos de ejemplo: reemplazar por los del equipo real al publicarlo
    peso: 8.2,
    anio: 2020,
    serial: "V8021457",
    horas: 3250,
    linea: "Miniexcavadora usada de giro compacto para obra urbana y espacios reducidos.",
    resumen:
      "Lista para trabajar en vías, redes y obras donde el espacio es limitado.",
    descripcion: [
      "La ViO80 es la miniexcavadora de giro cero de Yanmar: la cola de la superestructura no sobresale de las orugas al girar, así que trabaja pegada a muros, andenes y tráfico sin riesgo de golpear.",
      "Con 8,2 toneladas es la más grande de la línea compacta. Tiene fuerza para excavación de redes, zanjas y cargue de volquetas, y cabe en un camión cama baja estándar para moverla entre obras.",
      "Cabina cerrada, hoja niveladora delantera y línea auxiliar para martillo hidráulico.",
    ],
    comentarios: [
      "Mantenimiento de 250 horas al día, con historial en taller Partequipos.",
      "Tren de rodaje al 70 %, orugas de caucho recién cambiadas.",
      "Incluye balde de 60 cm y acople rápido mecánico.",
      "Pintura con desgaste normal de uso en la hoja y el brazo.",
    ],
    fotos: [
      {
        src: "/partequipos/card-yanmar.jpg",
        alt: "Miniexcavadora Yanmar ViO80 en obra",
        ancho: 1024,
        alto: 1024,
      },
      {
        src: "/partequipos/maq-yanmar.png",
        alt: "Miniexcavadora Yanmar ViO80 vista de perfil",
        ancho: 1536,
        alto: 1024,
      },
      // fotos de ejemplo de Unsplash para probar la galería con más fotos
      {
        src: "https://images.unsplash.com/photo-1628645419184-26a1f2757340?w=1600&q=80",
        alt: "Excavadora sobre roca junto al agua (foto de ejemplo)",
        ancho: 1600,
        alto: 1067,
      },
      {
        src: "https://images.unsplash.com/photo-1649807479468-40011b31ee09?w=1600&q=80",
        alt: "Excavadora en una ladera con cielo despejado (foto de ejemplo)",
        ancho: 1600,
        alto: 1067,
      },
      {
        src: "https://images.unsplash.com/photo-1622082679766-c5912d9416eb?w=1600&q=80",
        alt: "Excavadora trabajando sobre suelo de tierra (foto de ejemplo)",
        ancho: 1600,
        alto: 1067,
      },
      {
        src: "https://images.unsplash.com/photo-1680463990599-9d318aaecf71?w=1600&q=80",
        alt: "Excavadora dentro de un tajo abierto (foto de ejemplo)",
        ancho: 1600,
        alto: 1067,
      },
      {
        src: "https://images.unsplash.com/photo-1610477865545-37711c53144d?w=1600&q=80",
        alt: "Excavadora sobre vía de concreto (foto de ejemplo)",
        ancho: 1600,
        alto: 1067,
      },
      {
        src: "https://images.unsplash.com/photo-1583024011792-b165975b52f5?w=1600&q=80",
        alt: "Excavadora sobre arena en obra (foto de ejemplo)",
        ancho: 1600,
        alto: 1067,
      },
      {
        src: "https://images.unsplash.com/photo-1580901369227-308f6f40bdeb?w=1600&q=80",
        alt: "Excavadora en terreno rocoso (foto de ejemplo)",
        ancho: 1600,
        alto: 1067,
      },
      {
        src: "https://images.unsplash.com/photo-1646297970360-94c9f6d8903c?w=1600&q=80",
        alt: "Excavadora estacionada en camino destapado (foto de ejemplo)",
        ancho: 1600,
        alto: 1067,
      },
    ],
  },
  {
    slug: "compactador-dynapac-ca1500d",
    marca: "Dynapac",
    modelo: "CA1500D",
    tipo: "Compactador",
    condicion: "nueva",
    horas: 0,
    linea: "Compactador de suelos de un solo tambor para vías y rellenos.",
    resumen:
      "Consulta disponibilidad, plazos de entrega y condiciones para tu operación.",
    fotos: [
      {
        src: "/partequipos/card-dynapac.jpg",
        alt: "Compactador Dynapac CA1500D en patio",
        ancho: 800,
        alto: 600,
      },
      {
        src: "/partequipos/maq-dynapac.png",
        alt: "Compactador Dynapac CA1500D vista lateral",
        ancho: 1536,
        alto: 1024,
      },
    ],
  },
  {
    slug: "excavadora-liugong-933f",
    // obra de Case como ambiente, a la espera de fotos propias del equipo
    ambiente: "/partequipos/card-case.jpg",
    marca: "LiuGong",
    modelo: "933F",
    tipo: "Excavadora",
    condicion: "nueva",
    horas: 0,
    linea: "Excavadora hidráulica sobre orugas para producción pesada.",
    resumen:
      "Consulta disponibilidad, plazos de entrega y condiciones para tu operación.",
    fotos: [
      {
        src: "/partequipos/maq-liugong.webp",
        alt: "Excavadora LiuGong 933F vista de perfil",
        ancho: 1546,
        alto: 1200,
      },
    ],
  },
  // Excavadoras usadas del listado de maquinaria pesada. Datos de ejemplo
  // tomados del diseño: reemplazar por los del inventario real al publicarlas.
  ...(
    [
      { slug: "excavadora-hitachi-zx210lc", modelo: "ZX210LC", anio: 2018, horas: 6320, serial: "ZX210LC-1832" },
      { slug: "excavadora-hitachi-zx200", modelo: "ZX200", anio: 2019, horas: 5100, serial: "ZX200-1947" },
      { slug: "excavadora-hitachi-zx210", modelo: "ZX210", anio: 2017, horas: 7850, serial: "ZX210-1712" },
    ] as const
  ).map(
    (e): Equipo => ({
      ...e,
      marca: "Hitachi",
      tipo: "Excavadora",
      condicion: "usada",
      peso: 21,
      ubicacion: "Colombia",
      linea: "Excavadora hidráulica usada de 20 toneladas para obra civil y movimiento de tierra.",
      resumen:
        "Equipo usado con inspección técnica y disponibilidad inmediata en Colombia.",
      // ambiente prestado: el recorte desenfocado deja manchas sueltas
      ambiente: "/partequipos/card-hitachi.jpg",
      fotos: [
        {
          src: "/partequipos/maq-hitachi-zx210.png",
          alt: `Excavadora Hitachi ${e.modelo} vista de perfil`,
          ancho: 1920,
          alto: 1344,
        },
      ],
    }),
  ),
];

export function getEquipo(slug: string) {
  return EQUIPOS.find((e) => e.slug === slug);
}

/** Foto recortada con fondo transparente: se muestra entera sobre la
    superficie cálida, no a sangre. */
export function esRecorte(src: string) {
  return /\.(png|webp)$/.test(src);
}

export const formatoNumero = new Intl.NumberFormat("es-CO");
