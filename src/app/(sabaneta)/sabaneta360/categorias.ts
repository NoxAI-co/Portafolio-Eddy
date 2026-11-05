// Las categorías del inventario, tal como las define la app
// (assets/patrimonio/catalogo.json). El ícono de cada una es el que la app usa
// para representarla (`symbol` en HeritageFamily, heritage_record.dart).

export type Categoria = {
  nombre: string;
  texto: string;
  icono: number;
};

export const CATEGORIAS: Categoria[] = [
  {
    nombre: "Edificaciones religiosas",
    texto: "Templos y capillas, con su historia y su arquitectura.",
    icono: 1,
  },
  {
    nombre: "Bienes inmuebles",
    texto: "Casas y edificios que guardan la memoria del pueblo.",
    icono: 8,
  },
  {
    nombre: "Monumentos y esculturas",
    texto: "Bustos y esculturas en el espacio público.",
    icono: 11,
  },
  {
    nombre: "Rutas naturales",
    texto: "Caminos y cerros para recorrer a pie.",
    icono: 24,
  },
  {
    nombre: "Museos y memoria",
    texto: "Salas que conservan las colecciones del municipio.",
    icono: 25,
  },
  {
    nombre: "Festividades",
    texto: "Las fiestas que reúnen a Sabaneta cada año.",
    icono: 31,
  },
  {
    nombre: "Gastronomía",
    texto: "Lo que se cocina aquí desde siempre.",
    icono: 36,
  },
  {
    nombre: "Oficios y saberes",
    texto: "La gente y los oficios que hacen la vida del pueblo.",
    icono: 44,
  },
];
