"use client";

import Image from "next/image";
import { useState, type MouseEvent } from "react";
import { motion, useReducedMotion } from "motion/react";

// Barra para navegar por las secciones de la página, montada sobre el borde
// de abajo del slider: un panel blanco con cinco botones, cada uno con la
// máquina (o pieza) real recortada de su sección en vez de un icono, y un
// enlace a su ancla. El fondo rojo descansa en el primero y se desliza al que
// está bajo el cursor o con el foco; al pasar, la máquina avanza un poco,
// como si arrancara. En teléfono es una tira que se desliza de lado.
const SECCIONES = [
  { etiqueta: "Maquinaria pesada nueva", ancla: "nueva", imagen: "nueva" },
  { etiqueta: "Maquinaria pesada usada", ancla: "maquinaria-usada", imagen: "usada" },
  { etiqueta: "Marcas", ancla: "marcas", imagen: "marcas" },
  { etiqueta: "Repuestos para maquinaria pesada", ancla: "repuestos", imagen: "repuestos" },
  { etiqueta: "Marcas de repuestos", ancla: "marcas-repuestos", imagen: "marcas-repuestos", alta: true },
];

export function NavSecciones() {
  const [activo, setActivo] = useState(0);
  const reducido = useReducedMotion();
  const resorte = reducido ? { duration: 0 } : ({ type: "spring", stiffness: 420, damping: 36 } as const);

  // baja con suavidad hasta la sección (con movimiento reducido, salta) y
  // deja el ancla en la dirección sin volver a saltar
  const irA = (e: MouseEvent<HTMLAnchorElement>, ancla: string) => {
    const destino = document.getElementById(ancla);
    if (!destino) return;
    e.preventDefault();
    destino.scrollIntoView({ behavior: reducido ? "auto" : "smooth", block: "start" });
    history.replaceState(null, "", `#${ancla}`);
  };

  return (
    <nav
      aria-label="Secciones de Partequipos"
      className="relative z-10 mx-auto -mt-[var(--hs-nav-cruce)] w-[min(100%-1.5rem,72rem)] rounded-[1.75rem] bg-bar p-2 shadow-[0_1px_2px_rgb(20_17_15/0.08),0_10px_20px_-12px_rgb(20_17_15/0.3)] sm:w-[min(92%,72rem)]"
      onMouseLeave={() => setActivo(0)}
    >
      <ul className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto scroll-px-2 [mask-image:linear-gradient(90deg,#000_85%,transparent)] lg:overflow-visible lg:[mask-image:none]">
        {SECCIONES.map((s, i) => (
          <li
            key={s.ancla}
            className="relative min-w-[11rem] flex-1 shrink-0 snap-start sm:min-w-[11.5rem] lg:min-w-0"
          >
            {/* separador: una raya corta y redonda entre botones; se apaga
                al lado del que está en rojo */}
            {i > 0 && (
              <span
                aria-hidden
                className={`absolute top-1/2 left-0 h-[46%] w-px -translate-y-1/2 rounded-full bg-on-bar/12 transition-opacity duration-200 ${
                  i === activo || i - 1 === activo ? "opacity-0" : ""
                }`}
              />
            )}
            <a
              href={`#${s.ancla}`}
              onMouseEnter={() => setActivo(i)}
              onFocus={() => setActivo(i)}
              onBlur={() => setActivo(0)}
              onClick={(e) => irA(e, s.ancla)}
              className="group relative flex flex-col items-center gap-2 rounded-[1.25rem] px-3 pt-3 lg:px-2 xl:px-3 pb-3.5 focus-visible:outline-none sm:pt-3.5 sm:pb-4"
            >
              {i === activo && (
                <motion.span
                  layoutId="nav-secciones-fondo"
                  transition={resorte}
                  aria-hidden
                  className="absolute inset-0 -z-0 rounded-[1.25rem] bg-brand group-focus-visible:outline-3 group-focus-visible:outline-offset-2 group-focus-visible:outline-on-bar"
                />
              )}
              {/* la caja de la imagen tiene el mismo alto en todos; la
                  Yanmar, alta y angosta, sobresale hacia arriba para no verse
                  chica, sin mover su texto */}
              <span className="relative block h-12 w-full sm:h-14 lg:h-[3.75rem]">
                <span className={`absolute inset-x-0 bottom-0 ${"alta" in s ? "h-[122%]" : "h-full"}`}>
                  <Image
                    src={`/partequipos/nav/${s.imagen}.webp`}
                    alt=""
                    fill
                    sizes="160px"
                    quality={90}
                    className="object-contain transition-transform duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:translate-x-1 motion-reduce:transition-none"
                  />
                </span>
              </span>
              {/* hasta dos líneas, con el alto de dos en todos: los
                  nombres quedan alineados aunque unos sean más largos */}
              <span
                className={`relative flex min-h-[2lh] items-center text-center text-[0.875rem] leading-tight font-bold text-balance transition-colors duration-200 sm:text-base lg:text-[0.95rem] xl:text-[1.05rem] ${
                  i === activo ? "text-on-brand" : "text-on-bar"
                }`}
              >
                {s.etiqueta}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
