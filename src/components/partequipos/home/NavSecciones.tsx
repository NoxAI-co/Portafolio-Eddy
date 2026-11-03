"use client";

import Image from "next/image";
import { useState, type MouseEvent } from "react";
import { motion, useReducedMotion } from "motion/react";

// Barra para navegar por las secciones de la página, montada sobre el borde
// de abajo del slider: un panel blanco con los tres botones principales,
// cada uno con la
// máquina (o pieza) real recortada de su sección en vez de un icono, y un
// enlace a su ancla. El fondo rojo descansa en el primero y se desliza al que
// está bajo el cursor o con el foco; al pasar, la máquina avanza un poco,
// como si arrancara. En teléfono caben los tres, con los nombres en hasta
// tres líneas.
const SECCIONES = [
  { etiqueta: "Maquinaria pesada nueva", ancla: "nueva", imagen: "nueva" },
  { etiqueta: "Maquinaria pesada usada", ancla: "maquinaria-usada", imagen: "usada" },
  { etiqueta: "Repuestos para maquinaria pesada", ancla: "repuestos", imagen: "repuestos" },
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
      className="relative z-10 mx-auto -mt-[var(--hs-nav-cruce)] w-[min(100%-1.5rem,56rem)] rounded-[1.75rem] bg-bar p-1.5 sm:p-2 shadow-[0_1px_2px_rgb(20_17_15/0.08),0_10px_20px_-12px_rgb(20_17_15/0.3)] sm:w-[min(92%,56rem)]"
      onMouseLeave={() => setActivo(0)}
    >
      <ul className="flex">
        {SECCIONES.map((s, i) => (
          <li
            key={s.ancla}
            className="relative min-w-0 flex-1"
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
              className="group relative flex flex-col items-center gap-2 rounded-[1.25rem] px-1.5 pt-2.5 pb-3 focus-visible:outline-none sm:px-3 sm:pt-3.5 sm:pb-4"
            >
              {i === activo && (
                <motion.span
                  layoutId="nav-secciones-fondo"
                  transition={resorte}
                  aria-hidden
                  className="absolute inset-0 -z-0 rounded-[1.25rem] bg-brand group-focus-visible:outline-3 group-focus-visible:outline-offset-2 group-focus-visible:outline-on-bar"
                />
              )}
              <span className="relative block h-10 w-full sm:h-14 lg:h-[3.75rem]">
                <Image
                  src={`/partequipos/nav/${s.imagen}.webp`}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 30vw, 200px"
                  quality={90}
                  className="object-contain transition-transform duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:translate-x-1 motion-reduce:transition-none"
                />
              </span>
              {/* mismo alto de texto en todos (tres líneas en teléfono, dos
                  desde sm): los nombres quedan alineados aunque unos sean más
                  largos */}
              <span
                className={`relative flex min-h-[3lh] items-center text-center text-[0.8rem] leading-tight max-[380px]:text-[0.74rem] font-bold text-balance transition-colors duration-200 sm:min-h-[2lh] sm:text-base lg:text-[1.05rem] ${
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
