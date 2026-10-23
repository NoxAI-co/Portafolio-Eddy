"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const BASE = "/lab/partequipos";

// Secciones de la página principal del lab (anclas) y páginas aparte.
const SECCIONES = [
  { id: "maquinaria-usada", etiqueta: "Usada" },
  { id: "marcas", etiqueta: "Marcas" },
  { id: "repuestos", etiqueta: "Repuestos" },
];
const PAGINAS = [
  { href: `${BASE}/case`, etiqueta: "Case" },
  { href: `${BASE}/hitachi`, etiqueta: "Hitachi" },
  { href: `${BASE}/yanmar`, etiqueta: "Yanmar" },
  { href: `${BASE}/dynapac`, etiqueta: "Dynapac" },
];
// Barra flotante para recorrer el lab. Va abajo a la izquierda para no tapar
// el botón del kit (abajo a la derecha); en teléfono sube encima de él. En la
// página principal marca la sección que está a media pantalla.
export function LabNav() {
  const pathname = usePathname().replace(/\/$/, "");
  const enInicio = pathname === BASE;
  const [visible, setVisible] = useState<string | null>(null);

  useEffect(() => {
    if (!enInicio) return;
    const io = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) if (e.isIntersecting) setVisible(e.target.id);
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    for (const s of SECCIONES) {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, [enInicio]);

  const enlace = (activo: boolean) =>
    `shrink-0 rounded-full px-3 py-1.5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
      activo ? "bg-white/12 font-semibold text-white" : "text-paper-dim hover:text-white"
    }`;

  return (
    <nav
      aria-label="Secciones del lab"
      className="no-scrollbar fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-[max(1rem,env(safe-area-inset-left))] z-[60] flex max-w-[calc(100%-2rem)] items-center gap-0.5 overflow-x-auto rounded-full bg-ink p-1 text-sm shadow-[0_2px_8px_-2px_rgb(18_16_16/0.5)] max-sm:bottom-[calc(max(1rem,env(safe-area-inset-bottom))+3.25rem)] sm:max-w-[calc(100%-15rem)]"
    >
      {SECCIONES.map((s) => (
        <Link
          key={s.id}
          href={`${BASE}#${s.id}`}
          aria-current={enInicio && visible === s.id ? "location" : undefined}
          className={enlace(enInicio && visible === s.id)}
        >
          {s.etiqueta}
        </Link>
      ))}
      {/* espacio, no filete, entre las anclas y las páginas */}
      <span aria-hidden="true" className="w-2 shrink-0" />
      {PAGINAS.map((p) => {
        const activa = pathname === p.href;
        return (
          <Link
            key={p.href}
            href={p.href}
            aria-current={activa ? "page" : undefined}
            className={enlace(activa)}
          >
            {p.etiqueta}
          </Link>
        );
      })}
    </nav>
  );
}
