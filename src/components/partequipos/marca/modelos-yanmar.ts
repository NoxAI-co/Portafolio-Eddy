// Modelos Yanmar por tipo de máquina, tal como los lista la landing de
// Yanmar en el sitio de Partequipos (fotos, datos y enlace a la ficha).
import type { Modelo } from "./marcas";

const SITIO = "https://partequipos.vercel.app";

export const MODELOS_YANMAR: Record<string, Modelo[]> = {
  "miniexcavadoras": [
    {
      nombre: "Miniexcavadora Yanmar VIO17-1B",
      imagen: "/partequipos/marcas/yanmar/modelos/miniexcavadora-yanmar-vio17-1b.jpg",
      datos: [
        { icono: "peso", etiqueta: "Peso operativo", valor: "1,8 t" },
        { icono: "potencia", etiqueta: "Potencia neta", valor: "13,5 hp" },
        { icono: "motor", etiqueta: "Motor", valor: "3TNV70-XBV" },
      ],
      ficha: `${SITIO}/maquinaria-pesada/maquinaria-pesada-nueva/marcas/yanmar/miniexcavadoras/miniexcavadora-yanmar-vio17/`,
    },
    {
      nombre: "Miniexcavadora Yanmar VIO35-7",
      imagen: "/partequipos/marcas/yanmar/modelos/miniexcavadora-yanmar-vio35-7.jpg",
      datos: [
        { icono: "peso", etiqueta: "Peso operativo", valor: "3,5 t" },
        { icono: "potencia", etiqueta: "Potencia neta", valor: "27,3 hp" },
        { icono: "motor", etiqueta: "Motor", valor: "3TNV88-ZSBV" },
      ],
      ficha: `${SITIO}/maquinaria-pesada/maquinaria-pesada-nueva/marcas/yanmar/miniexcavadoras/miniexcavadora-yanmar-vio35-7/`,
    },
    {
      nombre: "Miniexcavadora Yanmar VIO50-6a",
      imagen: "/partequipos/marcas/yanmar/modelos/miniexcavadora-yanmar-vio50-6a.webp",
      datos: [
        { icono: "peso", etiqueta: "Peso operativo", valor: "5 t" },
        { icono: "potencia", etiqueta: "Potencia neta", valor: "39 hp" },
        { icono: "motor", etiqueta: "Motor", valor: "4TNV88C-PBV" },
      ],
      ficha: `${SITIO}/maquinaria-pesada/maquinaria-pesada-nueva/marcas/yanmar/miniexcavadoras/miniexcavadora-yanmar-vio50-6a/`,
    },
    {
      nombre: "Miniexcavadora Yanmar VIO80-1",
      imagen: "/partequipos/marcas/yanmar/modelos/miniexcavadora-yanmar-vio80-1.jpg",
      datos: [
        { icono: "peso", etiqueta: "Peso operativo", valor: "8,2 t" },
        { icono: "potencia", etiqueta: "Potencia neta", valor: "53.7 hp" },
        { icono: "motor", etiqueta: "Motor", valor: "4TNV98-ZWBV2" },
      ],
      ficha: `${SITIO}/maquinaria-pesada/maquinaria-pesada-nueva/marcas/yanmar/miniexcavadoras/miniexcavadora-yanmar-vio80-1/`,
    },
  ],
};
