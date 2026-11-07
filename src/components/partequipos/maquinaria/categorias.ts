// Categorías de maquinaria usada. Cada una es un botón que lleva a su página
// en el sitio de Partequipos.
export type Categoria = {
  id: string;
  nombre: string;
  imagen: string;
  href: string;
};

const USADA = "https://partequipos.vercel.app/maquinaria-pesada/maquinaria-pesada-usada";

export const CATEGORIAS: Categoria[] = [
  {
    id: "excavadoras",
    nombre: "Excavadoras",
    imagen: "/partequipos/maq-hitachi-zx210.png",
    href: `${USADA}/excavadoras/`,
  },
  {
    id: "otros",
    nombre: "Otros",
    imagen: "/partequipos/maq-case.png",
    href: `${USADA}/otros/`,
  },
  {
    id: "aditamentos",
    nombre: "Aditamentos",
    // balde recortado de la foto de la ZX210, a la espera de fotos propias
    imagen: "/partequipos/aditamento-balde.png",
    href: `${USADA}/aditamentos/`,
  },
];
