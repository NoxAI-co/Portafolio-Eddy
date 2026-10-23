// Modelos Dynapac por tipo de máquina, tal como los lista la landing de
// Dynapac en el sitio de Partequipos (fotos, datos y enlace a la ficha).
import type { Modelo } from "./marcas";

const SITIO = "https://partequipos.vercel.app";

export const MODELOS_DYNAPAC: Record<string, Modelo[]> = {
  "doble-rodillo": [
    {
      nombre: "Compactador doble rodillo DYNAPAC CC1200 VI",
      imagen: "/partequipos/marcas/dynapac/modelos/compactador-doble-rodillo-dynapac-cc1200-vi.jpg",
      datos: [
        { icono: "peso", etiqueta: "Peso operativo", valor: "2,6 Ton" },
        { icono: "motor", etiqueta: "Motor", valor: "Kubota – 25 hp" },
      ],
      ficha: `${SITIO}/maquinaria-pesada/maquinaria-pesada-nueva/marcas/dynapac/compactador-doble-rodillo-dynapac/compactador-doble-rodillo-dynapac-cc1200-vi/`,
    },
    {
      nombre: "Compactador doble rodillo DYNAPAC CC1300 VI",
      imagen: "/partequipos/marcas/dynapac/modelos/compactador-doble-rodillo-dynapac-cc1300-vi.jpg",
      datos: [
        { icono: "peso", etiqueta: "Peso operativo", valor: "3,9 Ton" },
        { icono: "motor", etiqueta: "Motor", valor: "Perkins – 48 hp" },
      ],
      ficha: `${SITIO}/maquinaria-pesada/maquinaria-pesada-nueva/marcas/dynapac/compactador-doble-rodillo-dynapac/compactador-doble-rodillo-dynapac-cc1300-vi/`,
    },
    {
      nombre: "Compactador doble rodillo DYNAPAC CC1400 VI",
      imagen: "/partequipos/marcas/dynapac/modelos/compactador-doble-rodillo-dynapac-cc1400-vi.jpg",
      datos: [
        { icono: "peso", etiqueta: "Peso operativo", valor: "3,9 Ton" },
        { icono: "motor", etiqueta: "Motor", valor: "Perkins – 48 hp" },
      ],
      ficha: `${SITIO}/maquinaria-pesada/maquinaria-pesada-nueva/marcas/dynapac/compactador-doble-rodillo-dynapac/compactador-doble-rodillo-dynapac-cc1400-vi/`,
    },
    {
      nombre: "Compactador doble rodillo DYNAPAC CC2200 VI",
      imagen: "/partequipos/marcas/dynapac/modelos/compactador-doble-rodillo-dynapac-cc2200-vi.jpg",
      datos: [
        { icono: "peso", etiqueta: "Peso operativo", valor: "8 Ton" },
        { icono: "motor", etiqueta: "Motor", valor: "Deutz – 74 hp" },
      ],
      ficha: `${SITIO}/maquinaria-pesada/maquinaria-pesada-nueva/marcas/dynapac/compactador-doble-rodillo-dynapac/compactador-doble-rodillo-dynapac-cc2200-vi/`,
    },
    {
      nombre: "Compactador doble rodillo DYNAPAC CC3200 VI",
      imagen: "/partequipos/marcas/dynapac/modelos/compactador-doble-rodillo-dynapac-cc3200-vi.jpg",
      datos: [
        { icono: "peso", etiqueta: "Peso operativo", valor: "8,7 t" },
        { icono: "motor", etiqueta: "Motor", valor: "Cummins – 99 hp" },
      ],
      ficha: `${SITIO}/maquinaria-pesada/maquinaria-pesada-nueva/marcas/dynapac/compactador-doble-rodillo-dynapac/compactador-doble-rodillo-dynapac-cc3200-vi/`,
    },
    {
      nombre: "Compactador doble rodillo DYNAPAC CC4000 VI",
      imagen: "/partequipos/marcas/dynapac/modelos/compactador-doble-rodillo-dynapac-cc4000-vi.jpg",
      datos: [
        { icono: "peso", etiqueta: "Peso operativo", valor: "9,7 Ton" },
        { icono: "motor", etiqueta: "Motor", valor: "Cummins – 135 hp" },
      ],
      ficha: `${SITIO}/maquinaria-pesada/maquinaria-pesada-nueva/marcas/dynapac/compactador-doble-rodillo-dynapac/compactador-doble-rodillo-dynapac-cc4000-vi/`,
    },
  ],
  "llantas": [
    {
      nombre: "Compactador de llantas DYNAPAC CP1200",
      imagen: "/partequipos/marcas/dynapac/modelos/compactador-de-llantas-dynapac-cp1200.jpg",
      datos: [
        { icono: "peso", etiqueta: "Peso operativo", valor: "5,58 Ton" },
        { icono: "motor", etiqueta: "Motor", valor: "Cummins – 74 hp" },
      ],
      ficha: `${SITIO}/maquinaria-pesada/maquinaria-pesada-nueva/marcas/dynapac/compactador-de-llantas-dynapac/compactador-de-llantas-dynapac-cp1200/`,
    },
    {
      nombre: "Compactador de llantas DYNAPAC CP2100",
      imagen: "/partequipos/marcas/dynapac/modelos/compactador-de-llantas-dynapac-cp2100.jpg",
      datos: [
        { icono: "peso", etiqueta: "Peso operativo", valor: "10,4 Ton" },
        { icono: "motor", etiqueta: "Motor", valor: "Cummins – 120 hp" },
      ],
      ficha: `${SITIO}/maquinaria-pesada/maquinaria-pesada-nueva/marcas/dynapac/compactador-de-llantas-dynapac/compactador-de-llantas-dynapac-cp2100/`,
    },
    {
      nombre: "Compactador de llantas DYNAPAC CP28",
      imagen: "/partequipos/marcas/dynapac/modelos/compactador-de-llantas-dynapac-cp28.jpg",
      datos: [
        { icono: "peso", etiqueta: "Peso operativo", valor: "9.6 Ton" },
        { icono: "motor", etiqueta: "Motor", valor: "Cummins F3.8 – 134 Hp" },
      ],
      ficha: `${SITIO}/maquinaria-pesada/maquinaria-pesada-nueva/marcas/dynapac/compactador-de-llantas-dynapac/compactador-de-llantas-dynapac-cp28/`,
    },
  ],
  "suelo": [
    {
      nombre: "Compactador de suelo DYNAPAC CA1300D",
      imagen: "/partequipos/marcas/dynapac/modelos/compactador-de-suelo-dynapac-ca1300d.jpg",
      datos: [
        { icono: "peso", etiqueta: "Peso operativo", valor: "4,7 Ton" },
        { icono: "motor", etiqueta: "Motor", valor: "Kubota – 75 hp" },
      ],
      ficha: `${SITIO}/maquinaria-pesada/maquinaria-pesada-nueva/marcas/dynapac/compactador-de-suelo-dynapac/compactador-de-suelo-dynapac-ca1300d/`,
    },
    {
      nombre: "Compactador de suelo DYNAPAC CA1500D",
      imagen: "/partequipos/marcas/dynapac/modelos/compactador-de-suelo-dynapac-ca1500d.jpg",
      datos: [
        { icono: "peso", etiqueta: "Peso operativo", valor: "7 Ton" },
        { icono: "motor", etiqueta: "Motor", valor: "Deutz – 75 hp" },
      ],
      ficha: `${SITIO}/maquinaria-pesada/maquinaria-pesada-nueva/marcas/dynapac/compactador-de-suelo-dynapac/compactador-de-suelo-dynapac-ca1500d/`,
    },
    {
      nombre: "Compactador de suelo DYNAPAC CA15D",
      imagen: "/partequipos/marcas/dynapac/modelos/compactador-de-suelo-dynapac-ca15d.jpg",
      datos: [
        { icono: "peso", etiqueta: "Peso operativo", valor: "7 Ton" },
        { icono: "motor", etiqueta: "Motor", valor: "Kubota – 75 hp" },
      ],
      ficha: `${SITIO}/maquinaria-pesada/maquinaria-pesada-nueva/marcas/dynapac/compactador-de-suelo-dynapac/compactador-de-suelo-dynapac-ca15d/`,
    },
    {
      nombre: "Compactador de suelo DYNAPAC CA25D",
      imagen: "/partequipos/marcas/dynapac/modelos/compactador-de-suelo-dynapac-ca25d.jpg",
      datos: [
        { icono: "peso", etiqueta: "Peso operativo", valor: "10,4 Ton" },
        { icono: "motor", etiqueta: "Motor", valor: "Cummins – 134 hp" },
      ],
      ficha: `${SITIO}/maquinaria-pesada/maquinaria-pesada-nueva/marcas/dynapac/compactador-de-suelo-dynapac/compactador-de-suelo-dynapac-ca25d/`,
    },
    {
      nombre: "Compactador de suelo DYNAPAC CA35D",
      imagen: "/partequipos/marcas/dynapac/modelos/compactador-de-suelo-dynapac-ca35d.jpg",
      datos: [
        { icono: "peso", etiqueta: "Peso operativo", valor: "12,2 Ton" },
        { icono: "motor", etiqueta: "Motor", valor: "Cummins – 130 hp" },
      ],
      ficha: `${SITIO}/maquinaria-pesada/maquinaria-pesada-nueva/marcas/dynapac/compactador-de-suelo-dynapac/compactador-de-suelo-dynapac-ca35d/`,
    },
  ],
  "pavimentadoras": [
    {
      nombre: "Minipavimentadora DYNAPAC F80W",
      imagen: "/partequipos/marcas/dynapac/modelos/minipavimentadora-dynapac-f80w.jpg",
      datos: [
        { icono: "motor", etiqueta: "Motor", valor: "Hatz – 10 hp" },
      ],
      ficha: `${SITIO}/maquinaria-pesada/maquinaria-pesada-nueva/marcas/dynapac/pavimentadoras-dynapac/pavimentadora-dynapac-f80w/`,
    },
    {
      nombre: "Pavimentadora DYNAPAC F1800C",
      imagen: "/partequipos/marcas/dynapac/modelos/pavimentadora-dynapac-f1800c.jpg",
      datos: [
        { icono: "motor", etiqueta: "Motor", valor: "Deutz – 73 hp" },
      ],
      ficha: `${SITIO}/maquinaria-pesada/maquinaria-pesada-nueva/marcas/dynapac/pavimentadoras-dynapac/pavimentadora-dynapac-f1800c/`,
    },
    {
      nombre: "Pavimentadora DYNAPAC SD2500C",
      imagen: "/partequipos/marcas/dynapac/modelos/pavimentadora-dynapac-sd2500c.jpg",
      datos: [
        { icono: "motor", etiqueta: "Motor", valor: "Cummins – 199 hp" },
      ],
      ficha: `${SITIO}/maquinaria-pesada/maquinaria-pesada-nueva/marcas/dynapac/pavimentadoras-dynapac/pavimentadora-dynapac-sd2500c/`,
    },
  ],
  "reglas": [
    {
      nombre: "Regla DYNAPAC V3500 VTE",
      imagen: "/partequipos/marcas/dynapac/modelos/regla-dynapac-v3500-vte.jpg",
      datos: [],
      ficha: `${SITIO}/maquinaria-pesada/maquinaria-pesada-nueva/marcas/dynapac/reglas-dynapac/regla-dynapac-v3500-vte/`,
    },
    {
      nombre: "Regla DYNAPAC V5100 VTE",
      imagen: "/partequipos/marcas/dynapac/modelos/regla-dynapac-v5100-vte.jpg",
      datos: [],
      ficha: `${SITIO}/maquinaria-pesada/maquinaria-pesada-nueva/marcas/dynapac/reglas-dynapac/regla-dynapac-v5100-vte/`,
    },
    {
      nombre: "Regla DYNAPAC V6000 VTE",
      imagen: "/partequipos/marcas/dynapac/modelos/regla-dynapac-v6000-vte.jpg",
      datos: [],
      ficha: `${SITIO}/maquinaria-pesada/maquinaria-pesada-nueva/marcas/dynapac/reglas-dynapac/regla-dynapac-v6000-vte/`,
    },
  ],
};
