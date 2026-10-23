"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Flecha } from "../maquinaria/UsedHero";
import type { Marca } from "./marcas";

// Línea de equipos de la marca: el texto de entrada del original y, debajo,
// una cinta que avanza sin parar con una tarjeta por tipo de máquina (render
// arriba, nombre abajo). Usa el bucle del carrusel de marcas: la lista va dos
// veces y la pista se desplaza la mitad (ver .linea-pista en
// scripts/partequipos.css). Las tarjetas siguen a las de categorías del
// inicio: blancas, borde tenue y el círculo de flecha que se pinta de rojo al
// pasar el cursor. Cada tarjeta baja a la sección de su tipo.
export function LineaEquipos({ marca }: { marca: Marca }) {
  // una vuelta lleva al menos 7 tarjetas para llenar el ancho aunque la
  // marca tenga uno o dos tipos; solo la primera serie es navegable, el resto
  // son copias para el bucle
  const vuelta = Array.from({ length: Math.ceil(7 / marca.tipos.length) }, () => marca.tipos).flat();
  const tipos = [...vuelta, ...vuelta];

  return (
    <section
      id="linea-de-equipos"
      aria-labelledby="linea-de-equipos-titulo"
      className="pt-[60px] pb-5 [@media(max-width:1024px)]:pt-10"
    >
      <h2
        id="linea-de-equipos-titulo"
        className="m-0 mb-5 px-[1.5vw] text-center text-xl font-medium text-[#100f0f]"
      >
        Nuestra línea de equipos {marca.nombre} incluye:
      </h2>

      {/* entrada: la cinta sube al aparecer; solo se desplaza, nunca arranca
          invisible */}
      <motion.div
        initial={{ y: 28 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
        // el relleno vertical deja aire al contorno de foco, que el overflow
        // recortaría
        className="linea-carrusel no-scrollbar overflow-hidden py-1 [mask-image:linear-gradient(90deg,transparent,#000_4%,#000_96%,transparent)]"
      >
        {/* sin gap: el espacio va dentro de cada <li> para que la mitad de la
            pista sea exactamente una vuelta y el bucle no salte */}
        <ul aria-label={`Tipos de máquina ${marca.nombre}`} className="linea-pista flex w-max">
          {tipos.map((t, i) => {
            const copia = i >= marca.tipos.length;
            return (
              <li
                key={`${t.id}-${i}`}
                aria-hidden={copia || undefined}
                className="w-[17rem] shrink-0 pr-3 lg:w-[17.5rem] lg:pr-5"
              >
                <a
                  href={`#tipo-${t.id}`}
                  tabIndex={copia ? -1 : undefined}
                  className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-bar-line bg-bar shadow-[0_1px_2px_rgb(20_17_15/0.05)] transition-colors hover:border-brand/60 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand"
                >
                  {/* la imagen va pegada arriba y a los lados, sin relleno: la
                      tarjeta la recorta con su propio radio y solo el texto
                      lleva relleno. El piso queda recto y todas las máquinas
                      se apoyan sobre él a la misma altura */}
                  <span className="relative block aspect-[16/9] overflow-hidden bg-[linear-gradient(180deg,#e6e4e1_0%,#f3f2f0_70%,#eceae7_100%)]">
                    <Image
                      src={t.imagen}
                      alt=""
                      fill
                      sizes="280px"
                      className="origin-bottom object-contain object-bottom px-[8%] pt-[9%] pb-[6%] transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-[1.05]"
                    />
                  </span>
                  {/* alto fijo de dos líneas: los nombres largos (Compactador de
                      doble rodillo) se leen completos y todas las tarjetas miden
                      lo mismo */}
                  <span className="flex min-h-[4.25rem] items-center gap-3 px-5 py-3">
                    <span className="line-clamp-2 min-w-0 flex-1 text-left text-base leading-tight font-semibold text-on-bar">
                      {t.nombre}
                    </span>
                    <span
                      aria-hidden
                      className="flex size-9 shrink-0 items-center justify-center rounded-full bg-card/70 text-on-bar transition-colors duration-300 group-hover:bg-brand group-hover:text-on-brand"
                    >
                      <Flecha className="-rotate-45 transition-[rotate] duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:rotate-0 group-focus-visible:rotate-0" />
                    </span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </motion.div>

      <p className="m-0 mx-auto mt-6 max-w-[760px] px-[1.5vw] text-center text-lg leading-normal text-[#56545a] max-sm:px-6">
        {marca.cierreLinea.map((linea) => (
          <span key={linea} className="block">
            {linea}
          </span>
        ))}
      </p>
    </section>
  );
}
