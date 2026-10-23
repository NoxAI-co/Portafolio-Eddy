// Modelos Case por tipo de máquina, tal como los lista la landing de Case en
// el sitio de Partequipos (fotos, datos y enlace a la ficha).
import type { Modelo } from "./marcas";

const SITIO = "https://partequipos.vercel.app";

export const MODELOS_CASE: Record<string, Modelo[]> = {
  bulldozers: [
    {
      nombre: "Bulldozer Case Construction 1150M Tier4",
      imagen: "/partequipos/marcas/case/modelos/bulldozer-1150m-tier4.webp",
      datos: [
        { icono: "peso", etiqueta: "Peso operativo", valor: "14,3 t" },
        { icono: "potencia", etiqueta: "Potencia neta", valor: "138 hp" },
        { icono: "motor", etiqueta: "Motor", valor: "FPT F4HFE613F" },
      ],
      ficha: `${SITIO}/maquinaria-pesada/maquinaria-pesada-nueva/marcas/case-construction/bulldozer/bulldozer-case-construction-1150m-tier4/`,
    },
    {
      nombre: "Bulldozer Case Construction 1650M Tier4",
      imagen: "/partequipos/marcas/case/modelos/bulldozer-1650m-tier4.jpg",
      datos: [
        { icono: "peso", etiqueta: "Peso operativo", valor: "17,3 t" },
        { icono: "potencia", etiqueta: "Potencia neta", valor: "164 hp" },
        { icono: "motor", etiqueta: "Motor", valor: "FPT F4HFE6132" },
      ],
      ficha: `${SITIO}/maquinaria-pesada/maquinaria-pesada-nueva/marcas/case-construction/bulldozer/bulldozer-case-construction-1650m-tier4/`,
    },
    {
      nombre: "Bulldozer Case Construction 2050M Tier4",
      imagen: "/partequipos/marcas/case/modelos/bulldozer-2050m-tier4.webp",
      datos: [
        { icono: "peso", etiqueta: "Peso operativo", valor: "20,7 t" },
        { icono: "potencia", etiqueta: "Potencia neta", valor: "232 hp" },
        { icono: "motor", etiqueta: "Motor", valor: "FPT F4HFE613J" },
      ],
      ficha: `${SITIO}/maquinaria-pesada/maquinaria-pesada-nueva/marcas/case-construction/bulldozer/bulldozer-case-construction-2050m-tier4/`,
    },
  ],
  cargadores: [
    {
      nombre: "Cargador Case Construction 621E",
      imagen: "/partequipos/marcas/case/modelos/cargador-621e.jpg",
      datos: [
        { icono: "peso", etiqueta: "Peso operativo", valor: "11,9 TON" },
        { icono: "potencia", etiqueta: "Potencia neta", valor: "142 HP" },
        { icono: "motor", etiqueta: "Motor", valor: "CASE/FPT F4HE96849*J101" },
      ],
      ficha: `${SITIO}/maquinaria-pesada/maquinaria-pesada-nueva/marcas/case-construction/cargadores/cargador-case-construction-621e/`,
    },
    {
      nombre: "Cargador Case Construction 821E",
      imagen: "/partequipos/marcas/case/modelos/cargador-821e.jpg",
      datos: [
        { icono: "peso", etiqueta: "Peso operativo", valor: "17,1 TON" },
        { icono: "potencia", etiqueta: "Potencia neta", valor: "227 HP" },
        { icono: "motor", etiqueta: "Motor", valor: "CASE/FPT F4HE9684E*J109" },
      ],
      ficha: `${SITIO}/maquinaria-pesada/maquinaria-pesada-nueva/marcas/case-construction/cargadores/cargador-case-construction-821e/`,
    },
    {
      nombre: "Cargador Case Construction W20F",
      imagen: "/partequipos/marcas/case/modelos/cargador-w20f.jpg",
      datos: [
        { icono: "peso", etiqueta: "Peso operativo", valor: "10 TON" },
        { icono: "potencia", etiqueta: "Potencia neta", valor: "152 HP" },
        { icono: "motor", etiqueta: "Motor", valor: "CASE/FTP - F4GE9684T*J601" },
      ],
      ficha: `${SITIO}/maquinaria-pesada/maquinaria-pesada-nueva/marcas/case-construction/cargadores/cargador-case-construction-w20f/`,
    },
  ],
  excavadoras: [
    {
      nombre: "Excavadora Case Construction CX 130D Tier4",
      imagen: "/partequipos/marcas/case/modelos/excavadora-cx-130d-tier4.jpg",
      datos: [
        { icono: "peso", etiqueta: "Peso operativo", valor: "13,3 t" },
        { icono: "potencia", etiqueta: "Potencia neta", valor: "102 hp" },
        { icono: "motor", etiqueta: "Motor", valor: "Isuzu AR-4JJ1X" },
      ],
      ficha: `${SITIO}/maquinaria-pesada/maquinaria-pesada-nueva/marcas/case-construction/excavadoras/excavadora-case-construction-cx-130d-tier4/`,
    },
    {
      nombre: "Excavadora Case Construction CX 210D Tier4",
      imagen: "/partequipos/marcas/case/modelos/excavadora-cx-210d-tier4.jpg",
      datos: [
        { icono: "peso", etiqueta: "Peso operativo", valor: "22,2 t" },
        { icono: "potencia", etiqueta: "Potencia neta", valor: "160 hp" },
        { icono: "motor", etiqueta: "Motor", valor: "Isuzu AR-4HK1X" },
      ],
      ficha: `${SITIO}/maquinaria-pesada/maquinaria-pesada-nueva/marcas/case-construction/excavadoras/excavadora-case-construction-cx-210d-tier4/`,
    },
    {
      nombre: "Excavadora Case Construction CX 350D Tier4",
      imagen: "/partequipos/marcas/case/modelos/excavadora-cx-350d-tier4.webp",
      datos: [
        { icono: "peso", etiqueta: "Peso operativo", valor: "37,4 t" },
        { icono: "potencia", etiqueta: "Potencia neta", valor: "268 hp" },
        { icono: "motor", etiqueta: "Motor", valor: "Isuzu AQ-6HK1X" },
      ],
      ficha: `${SITIO}/maquinaria-pesada/maquinaria-pesada-nueva/marcas/case-construction/excavadoras/excavadora-case-construction-cx-350d-tier4/`,
    },
  ],
  minicargadores: [
    {
      nombre: "Minicargador Case Construction SR175B Tier4",
      imagen: "/partequipos/marcas/case/modelos/minicargador-sr175b-tier4.webp",
      datos: [
        { icono: "peso", etiqueta: "Peso operativo", valor: "2,8 t" },
        { icono: "potencia", etiqueta: "Potencia neta", valor: "67 hp" },
        { icono: "motor", etiqueta: "Motor", valor: "Perkins 404F" },
      ],
      ficha: `${SITIO}/maquinaria-pesada/maquinaria-pesada-nueva/marcas/case-construction/minicargadores-case/minicargador-case-construction-sr175b-tier4/`,
    },
    {
      nombre: "Minicargador Case Construction SR210B Tier4",
      imagen: "/partequipos/marcas/case/modelos/minicargador-sr210b-tier4.webp",
      datos: [
        { icono: "peso", etiqueta: "Peso operativo", valor: "3,1 t" },
        { icono: "potencia", etiqueta: "Potencia neta", valor: "74 hp" },
        { icono: "motor", etiqueta: "Motor", valor: "FPT F5H FL463" },
      ],
      ficha: `${SITIO}/maquinaria-pesada/maquinaria-pesada-nueva/marcas/case-construction/minicargadores-case/minicargador-case-construction-sr210b-tier4/`,
    },
    {
      nombre: "Minicargador Case Construction SR240B Tier4",
      imagen: "/partequipos/marcas/case/modelos/minicargador-sr240b-tier4.jpg",
      datos: [
        { icono: "peso", etiqueta: "Peso operativo", valor: "3,3 t" },
        { icono: "potencia", etiqueta: "Potencia neta", valor: "74 hp" },
        { icono: "motor", etiqueta: "Motor", valor: "FPT F5H FL463" },
      ],
      ficha: `${SITIO}/maquinaria-pesada/maquinaria-pesada-nueva/marcas/case-construction/minicargadores-case/minicargador-case-construction-sr240b-tier4/`,
    },
    {
      nombre: "Minicargador Case Construction SR270B Tier4",
      imagen: "/partequipos/marcas/case/modelos/minicargador-sr270b-tier4.webp",
      datos: [
        { icono: "peso", etiqueta: "Peso operativo", valor: "3,6 t" },
        { icono: "potencia", etiqueta: "Potencia neta", valor: "90 hp" },
        { icono: "motor", etiqueta: "Motor", valor: "FPT F5B FL413" },
      ],
      ficha: `${SITIO}/maquinaria-pesada/maquinaria-pesada-nueva/marcas/case-construction/minicargadores-case/minicargador-case-construction-sr270b-tier4/`,
    },
  ],
  motoniveladoras: [
    {
      nombre: "Motoniveladora Case Construction 845C Tier 4",
      imagen: "/partequipos/marcas/case/modelos/motoniveladora-845c-tier-4.webp",
      datos: [
        { icono: "peso", etiqueta: "Peso operativo", valor: "13,5 t" },
        { icono: "potencia", etiqueta: "Potencia neta", valor: "175 hp" },
        { icono: "motor", etiqueta: "Motor", valor: "FPT F4HE613B" },
      ],
      ficha: `${SITIO}/maquinaria-pesada/maquinaria-pesada-nueva/marcas/case-construction/motoniveladoras-case/motoniveladora-case-construction-845c-tier-4/`,
    },
    {
      nombre: "Motoniveladora Case Construction 865C Tier 4",
      imagen: "/partequipos/marcas/case/modelos/motoniveladora-865c-tier-4.webp",
      datos: [
        { icono: "peso", etiqueta: "Peso operativo", valor: "15,5 t" },
        { icono: "potencia", etiqueta: "Potencia neta", valor: "220 hp" },
        { icono: "motor", etiqueta: "Motor", valor: "FPT F4HE613B" },
      ],
      ficha: `${SITIO}/maquinaria-pesada/maquinaria-pesada-nueva/marcas/case-construction/motoniveladoras-case/motoniveladora-case-construction-865c-tier-4/`,
    },
  ],
  retrocargadoras: [
    {
      nombre: "Retrocargadora Case Construction 580N Tier4",
      imagen: "/partequipos/marcas/case/modelos/retrocargadora-580n-tier4.jpg",
      datos: [
        { icono: "peso", etiqueta: "Peso operativo", valor: "7,7 t" },
        { icono: "potencia", etiqueta: "Potencia neta", valor: "90 hp" },
        { icono: "motor", etiqueta: "Motor", valor: "FPT F5BFL413C" },
      ],
      ficha: `${SITIO}/maquinaria-pesada/maquinaria-pesada-nueva/marcas/case-construction/retrocargadoras/retrocargadora-case-construction-580n-tier4/`,
    },
    {
      nombre: "Retrocargadora Case Construction 580SV Tier4",
      imagen: "/partequipos/marcas/case/modelos/retrocargadora-580sv-tier4.jpg",
      datos: [
        { icono: "peso", etiqueta: "Peso operativo", valor: "8,5 t" },
        { icono: "potencia", etiqueta: "Potencia neta", valor: "97 hp" },
        { icono: "motor", etiqueta: "Motor", valor: "FPT F5BFL413B" },
      ],
      ficha: `${SITIO}/maquinaria-pesada/maquinaria-pesada-nueva/marcas/case-construction/retrocargadoras/retrocargadora-case-construction-580sv-tier4/`,
    },
    {
      nombre: "Retrocargadora Case Construction 851 FX Tier4",
      imagen: "/partequipos/marcas/case/modelos/retrocargadora-851-fx-tier4.webp",
      datos: [
        { icono: "peso", etiqueta: "Peso operativo", valor: "8,1 t" },
        { icono: "potencia", etiqueta: "Potencia neta", valor: "97 hp" },
        { icono: "motor", etiqueta: "Motor", valor: "FPT F5BFL413A" },
      ],
      ficha: `${SITIO}/maquinaria-pesada/maquinaria-pesada-nueva/marcas/case-construction/retrocargadoras/retrocargadora-case-construction-851-fx-tier4/`,
    },
  ],
  vibrocompactadores: [
    {
      nombre: "Vibrocompactador Case Construction SV208",
      imagen: "/partequipos/marcas/case/modelos/vibrocompactador-sv208.jpg",
      datos: [
        { icono: "peso", etiqueta: "Peso operativo", valor: "15.830 lbs" },
        { icono: "potencia", etiqueta: "Potencia bruta del motor", valor: "99 hp" },
      ],
      ficha: `${SITIO}/maquinaria-pesada/maquinaria-pesada-nueva/marcas/case-construction/vibrocompactador-case-sv208/vibrocompactador-case-construction-sv208/`,
    },
  ],
};
