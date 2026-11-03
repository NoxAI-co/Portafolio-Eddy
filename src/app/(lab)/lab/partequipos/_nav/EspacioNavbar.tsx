"use client";

import { useEffect, useRef, useState } from "react";

// Solo para validar (en la página principal del lab): ocupa el mismo alto que
// la barra del sitio (partequipos.vercel.app) en cada ancho, para ver cómo
// queda el slider debajo. Medido en el sitio: 62–66 px en teléfono, 71 px en
// tablet y de 88 a 122 px en escritorio (crece con el 2 % del ancho y con el
// logo). Muestra su alto en vivo. Las medidas están en scripts/partequipos.css.
export function EspacioNavbar() {
  const ref = useRef<HTMLDivElement>(null);
  const [alto, setAlto] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setAlto(Math.round(el.getBoundingClientRect().height * 10) / 10));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={ref} className="espacio-navbar" aria-hidden>
      <span className="espacio-navbar-rotulo">
        Espacio de la barra del sitio{alto !== null ? ` · ${alto} px` : ""}
      </span>
    </div>
  );
}
