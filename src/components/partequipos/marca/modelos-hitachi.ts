// Modelos Hitachi por tipo de máquina, tal como los lista la landing de
// Hitachi en el sitio de Partequipos (fotos, datos y enlace a la ficha).
import type { Modelo } from "./marcas";

const SITIO = "https://partequipos.vercel.app";

export const MODELOS_HITACHI: Record<string, Modelo[]> = {
  "excavadoras": [
    {
      nombre: "Excavadora Hitachi ZX130-5B",
      imagen: "/partequipos/marcas/hitachi/modelos/excavadora-hitachi-zx130-5b.jpg",
      datos: [
        { icono: "peso", etiqueta: "Peso operativo", valor: "13 t" },
        { icono: "potencia", etiqueta: "Potencia neta", valor: "98 hp" },
        { icono: "motor", etiqueta: "Motor", valor: "Isuzu AM-4JJ1X" },
      ],
      ficha: `${SITIO}/maquinaria-pesada/maquinaria-pesada-nueva/marcas/hitachi/excavadoras-hitachi/excavadora-hitachi-zx130-5b/`,
    },
    {
      nombre: "Excavadora Hitachi ZX130-5G",
      imagen: "/partequipos/marcas/hitachi/modelos/excavadora-hitachi-zx130-5g.jpg",
      datos: [
        { icono: "peso", etiqueta: "Peso operativo", valor: "12,800kg" },
      ],
      ficha: `${SITIO}/maquinaria-pesada/maquinaria-pesada-nueva/marcas/hitachi/excavadoras-hitachi/excavadora-hitachi-zx130-5g/`,
    },
    {
      nombre: "Excavadora Hitachi ZX200LC-5G",
      imagen: "/partequipos/marcas/hitachi/modelos/excavadora-hitachi-zx200lc-5g.jpg",
      datos: [
        { icono: "peso", etiqueta: "Peso operativo", valor: "20,4000kg" },
        { icono: "potencia", etiqueta: "Potencia neta", valor: "168HP" },
      ],
      ficha: `${SITIO}/maquinaria-pesada/maquinaria-pesada-nueva/marcas/hitachi/excavadoras-hitachi/excavadora-hitachi-zx200lc-5g/`,
    },
    {
      nombre: "Excavadora Hitachi ZX210LC-5B",
      imagen: "/partequipos/marcas/hitachi/modelos/excavadora-hitachi-zx210lc-5b.jpg",
      datos: [
        { icono: "peso", etiqueta: "Peso operativo", valor: "20,9 t" },
        { icono: "potencia", etiqueta: "Potencia neta", valor: "171,6 hp" },
        { icono: "motor", etiqueta: "Motor", valor: "Isuzu AM-4HK1X" },
      ],
      ficha: `${SITIO}/maquinaria-pesada/maquinaria-pesada-nueva/marcas/hitachi/excavadoras-hitachi/excavadora-hitachi-zx210lc-5b/`,
    },
    {
      nombre: "Excavadora Hitachi ZX350LC-5B",
      imagen: "/partequipos/marcas/hitachi/modelos/excavadora-hitachi-zx350lc-5b.jpg",
      datos: [
        { icono: "peso", etiqueta: "Peso operativo", valor: "34 t" },
        { icono: "potencia", etiqueta: "Potencia neta", valor: "271 hp" },
        { icono: "motor", etiqueta: "Motor", valor: "Isuzu AL-6HK1X" },
      ],
      ficha: `${SITIO}/maquinaria-pesada/maquinaria-pesada-nueva/marcas/hitachi/excavadoras-hitachi/excavadora-hitachi-zx350lc-5b/`,
    },
    {
      nombre: "Excavadora Hitachi ZX490-7G",
      imagen: "/partequipos/marcas/hitachi/modelos/excavadora-hitachi-zx490-7g.webp",
      datos: [
        { icono: "peso", etiqueta: "Peso operativo", valor: "47 t" },
        { icono: "potencia", etiqueta: "Potencia neta", valor: "397 hp" },
        { icono: "motor", etiqueta: "Motor", valor: "Isuzu AE-6WG1X WSA" },
      ],
      ficha: `${SITIO}/maquinaria-pesada/maquinaria-pesada-nueva/marcas/hitachi/excavadoras-hitachi/excavadora-hitachi-zx490-7g/`,
    },
    {
      nombre: "Excavadora Hitachi ZX690LC-7H",
      imagen: "/partequipos/marcas/hitachi/modelos/excavadora-hitachi-zx690lc-7h.webp",
      datos: [
        { icono: "peso", etiqueta: "Peso operativo", valor: "69 t" },
        { icono: "potencia", etiqueta: "Potencia neta", valor: "465 hp" },
        { icono: "motor", etiqueta: "Motor", valor: "Isuzu 6WG1" },
      ],
      ficha: `${SITIO}/maquinaria-pesada/maquinaria-pesada-nueva/marcas/hitachi/excavadoras-hitachi/excavadora-hitachi-zx690lc-7h/`,
    },
    {
      nombre: "Excavadora Hitachi ZX75US-5N",
      imagen: "/partequipos/marcas/hitachi/modelos/excavadora-hitachi-zx75us-5n.jpg",
      datos: [
        { icono: "peso", etiqueta: "Peso operativo", valor: "8,1 t" },
        { icono: "potencia", etiqueta: "Potencia neta", valor: "53.7 hp" },
        { icono: "motor", etiqueta: "Motor", valor: "YANMAR 4TNV98C" },
      ],
      ficha: `${SITIO}/maquinaria-pesada/maquinaria-pesada-nueva/marcas/hitachi/excavadoras-hitachi/excavadora-hitachi-zx75us-5n/`,
    },
    {
      nombre: "Excavadora Hitachi ZX75US-7",
      imagen: "/partequipos/marcas/hitachi/modelos/excavadora-hitachi-zx75us-7.jpg",
      datos: [
        { icono: "peso", etiqueta: "Peso operativo", valor: "8,1 t" },
        { icono: "potencia", etiqueta: "Potencia neta", valor: "57,6 hp" },
        { icono: "motor", etiqueta: "Motor", valor: "YANMAR 4TNV98CT" },
      ],
      ficha: `${SITIO}/maquinaria-pesada/maquinaria-pesada-nueva/marcas/hitachi/excavadoras-hitachi/excavadora-hitachi-zx75us-7/`,
    },
    {
      nombre: "Excavadora Hitachi ZX890LC-7H",
      imagen: "/partequipos/marcas/hitachi/modelos/excavadora-hitachi-zx890lc-7h.jpg",
      datos: [
        { icono: "peso", etiqueta: "Peso operativo", valor: "84,6 t" },
        { icono: "potencia", etiqueta: "Potencia neta", valor: "512 hp" },
        { icono: "motor", etiqueta: "Motor", valor: "Isuzu 6WG1" },
      ],
      ficha: `${SITIO}/maquinaria-pesada/maquinaria-pesada-nueva/marcas/hitachi/excavadoras-hitachi/excavadora-hitachi-zx890lc-7h/`,
    },
  ],
};
