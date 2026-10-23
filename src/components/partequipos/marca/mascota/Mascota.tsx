"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { Mascota } from "../marcas";

// Mascota de cada marca (en Case, el águila Old Abe). El grabado se usa como
// máscara CSS y se rellena con `currentColor`: una sola
// imagen sirve en tinta sobre gris, en blanco sobre la foto o en crema sobre
// oscuro. `tinta` deja solo las líneas (fondos claros); `papel`, solo las
// zonas claras, que sobre oscuro reproduce el grabado tal cual.

export function Grabado({
  mascota,
  capa,
  className = "",
  style,
}: {
  mascota: Mascota;
  capa: "tinta" | "papel";
  className?: string;
  style?: CSSProperties;
}) {
  // sin versión clara (símbolos planos) se usa la de tinta
  const url = `url(${mascota[capa] ?? mascota.tinta})`;
  return (
    <span
      aria-hidden
      className={`block bg-current [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain] ${className}`}
      style={{ aspectRatio: mascota.proporcion, maskImage: url, WebkitMaskImage: url, ...style }}
    />
  );
}

// Mascota de fondo: el grabado enorme y en gris detrás de la zona de
// equipos. Va en una capa del alto de esa zona con el águila `sticky`, así
// acompaña el recorrido por las categorías sin salirse de ella (no pasa por
// detrás del hero ni de la barra), y gira despacio con el scroll como una
// moneda. Las tarjetas, blancas, quedan encima.
export function AguilaFondo({ mascota, children }: { mascota: Mascota; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reducido = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 1], reducido ? [0, 0] : [-8, 8]);

  return (
    <div ref={ref} className="relative isolate">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-x-clip">
        <div className="sticky top-[12vh] flex justify-center pt-10">
          <motion.div style={{ rotate }}>
            <Grabado mascota={mascota} capa="tinta" className="w-[min(1150px,94vw)] text-[#100f0f]/[0.07]" />
          </motion.div>
        </div>
      </div>
      {children}
    </div>
  );
}
