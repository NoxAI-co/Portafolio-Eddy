// Categorías del listado de maquinaria usada. `tipos` son los valores de
// `Equipo.tipo` que entran en cada una, así el filtro sale del inventario y no
// de una lista paralela que se desincronice. "Otros" no lista tipos: recoge
// todo lo que no cae en ninguna otra categoría.
export type Categoria = {
  id: string;
  nombre: string;
  tipos?: string[];
  imagen: string;
  /** Lo que se busca, para el mensaje vacío y el texto de WhatsApp. */
  busqueda: string;
};

export const CATEGORIAS: Categoria[] = [
  {
    id: "excavadoras",
    nombre: "Excavadoras",
    tipos: ["Excavadora", "Miniexcavadora"],
    imagen: "/partequipos/maq-hitachi-zx210.png",
    busqueda: "excavadoras usadas",
  },
  {
    id: "otros",
    nombre: "Otros",
    imagen: "/partequipos/maq-case.png",
    busqueda: "otros equipos usados",
  },
  {
    id: "aditamentos",
    nombre: "Aditamentos",
    tipos: ["Aditamento"],
    // balde recortado de la foto de la ZX210, a la espera de fotos propias
    imagen: "/partequipos/aditamento-balde.png",
    busqueda: "aditamentos usados",
  },
];

const TIPOS_CON_CATEGORIA = CATEGORIAS.flatMap((c) => c.tipos ?? []);

export function entraEn(categoria: Categoria, tipo: string) {
  return categoria.tipos
    ? categoria.tipos.includes(tipo)
    : !TIPOS_CON_CATEGORIA.includes(tipo);
}
