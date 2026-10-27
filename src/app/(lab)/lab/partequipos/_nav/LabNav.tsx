"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const BASE = "/lab/partequipos";

// Lo que ya está implementado en el sitio y lo que falta. Las secciones de
// la página principal van por ancla; el resto son páginas aparte. Para pasar
// algo a listo basta cambiar su `listo`.
type Item = { etiqueta: string; listo: boolean } & ({ ancla: string } | { href: string });

const ITEMS: Item[] = [
  { ancla: "maquinaria-usada", etiqueta: "Usada", listo: true },
  { ancla: "marcas", etiqueta: "Marcas", listo: false },
  { ancla: "repuestos", etiqueta: "Repuestos", listo: false },
  { href: `${BASE}/case`, etiqueta: "Case", listo: true },
  { href: `${BASE}/hitachi`, etiqueta: "Hitachi", listo: true },
  { href: `${BASE}/yanmar`, etiqueta: "Yanmar", listo: true },
  { href: `${BASE}/dynapac`, etiqueta: "Dynapac", listo: true },
  { href: `${BASE}/nueva`, etiqueta: "Nueva", listo: false },
  { href: `${BASE}/aliadas`, etiqueta: "Aliadas", listo: false },
  { href: `${BASE}/excavadoras`, etiqueta: "Excavadoras", listo: false },
];

const ANCLAS = ITEMS.flatMap((i) => ("ancla" in i ? [i.ancla] : []));

// Barra flotante para recorrer el lab. Lo que falta va a la vista; lo ya
// implementado se agrupa en «Listos», que despliega un panel hacia arriba
// (Motion). Va abajo a la izquierda para no tapar el botón del kit (abajo a
// la derecha); en teléfono sube encima de él. En la página principal marca la
// sección que está a media pantalla.
export function LabNav() {
  const pathname = usePathname().replace(/\/$/, "");
  const enInicio = pathname === BASE;
  const [visible, setVisible] = useState<string | null>(null);
  const [abierto, setAbierto] = useState(false);
  const reducido = useReducedMotion();
  const raiz = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enInicio) return;
    const io = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) if (e.isIntersecting) setVisible(e.target.id);
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    for (const id of ANCLAS) {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, [enInicio]);

  // se cierra al navegar, con Esc o al tocar fuera
  useEffect(() => setAbierto(false), [pathname]);
  useEffect(() => {
    if (!abierto) return;
    const fuera = (e: PointerEvent) => !raiz.current?.contains(e.target as Node) && setAbierto(false);
    const tecla = (e: KeyboardEvent) => e.key === "Escape" && setAbierto(false);
    document.addEventListener("pointerdown", fuera);
    document.addEventListener("keydown", tecla);
    return () => {
      document.removeEventListener("pointerdown", fuera);
      document.removeEventListener("keydown", tecla);
    };
  }, [abierto]);

  const activo = (i: Item) => ("ancla" in i ? enInicio && visible === i.ancla : pathname === i.href);
  const enlace = (i: Item, extra = "") => {
    const href = "ancla" in i ? `${BASE}#${i.ancla}` : i.href;
    const esta = activo(i);
    return (
      <Link
        key={href}
        href={href}
        onClick={() => setAbierto(false)}
        aria-current={esta ? ("ancla" in i ? "location" : "page") : undefined}
        className={`flex shrink-0 items-center gap-2 rounded-full px-3 py-1.5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
          esta ? "bg-white/12 font-semibold text-white" : "text-paper-dim hover:bg-white/6 hover:text-white"
        } ${extra}`}
      >
        {i.etiqueta}
        {i.listo && <Check />}
      </Link>
    );
  };

  const listos = ITEMS.filter((i) => i.listo);
  const faltan = ITEMS.filter((i) => !i.listo);
  // el botón muestra en cuál de los listos estás, si estás en uno
  const actual = listos.find(activo);
  const resorte = reducido ? { duration: 0 } : ({ type: "spring", stiffness: 520, damping: 38 } as const);

  return (
    <div
      ref={raiz}
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-[max(1rem,env(safe-area-inset-left))] z-[60] text-sm max-sm:bottom-[calc(max(1rem,env(safe-area-inset-bottom))+3.25rem)]"
    >
      <AnimatePresence>
        {abierto && (
          <motion.div
            id="lab-listos"
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={resorte}
            style={{ transformOrigin: "bottom left" }}
            className="absolute bottom-full left-0 mb-2 w-56 rounded-3xl bg-ink p-1.5 shadow-[0_4px_14px_-6px_rgb(18_16_16/0.55)]"
          >
            <p className="m-0 px-3 pt-2 pb-1.5 text-[11px] font-semibold text-paper-dim/70">Implementado</p>
            <motion.ul
              className="m-0 flex list-none flex-col gap-0.5 p-0"
              initial="cerrado"
              animate="abierto"
              variants={{ abierto: { transition: { staggerChildren: reducido ? 0 : 0.025 } } }}
            >
              {listos.map((i) => (
                <motion.li
                  key={i.etiqueta}
                  variants={{ cerrado: { y: 6 }, abierto: { y: 0 } }}
                  transition={resorte}
                >
                  {enlace(i, "justify-between")}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>

      <nav
        aria-label="Secciones del lab"
        className="no-scrollbar flex max-w-[calc(100vw-2rem)] items-center gap-0.5 overflow-x-auto rounded-full bg-ink p-1 shadow-[0_2px_8px_-2px_rgb(18_16_16/0.5)] sm:max-w-[calc(100vw-15rem)]"
      >
        <button
          type="button"
          onClick={() => setAbierto((a) => !a)}
          aria-expanded={abierto}
          aria-controls="lab-listos"
          className={`flex shrink-0 items-center gap-2 rounded-full px-3 py-1.5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
            abierto || actual ? "bg-white/12 font-semibold text-white" : "text-paper-dim hover:bg-white/6 hover:text-white"
          }`}
        >
          <Check />
          {actual ? actual.etiqueta : "Listos"}
          <span className="text-paper-dim tabular-nums">{listos.length}</span>
          <motion.svg
            viewBox="0 0 16 16"
            className="size-3.5 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
            animate={{ rotate: abierto ? 180 : 0 }}
            transition={resorte}
          >
            <path d="M4 10l4-4 4 4" />
          </motion.svg>
        </button>

        {faltan.length > 0 && (
          <>
            {/* separa los grupos con espacio y un rótulo, no con un filete */}
            <span className="ml-2 shrink-0 px-1 text-[11px] font-semibold text-paper-dim/70">Falta</span>
            {faltan.map((i) => enlace(i))}
          </>
        )}
      </nav>
    </div>
  );
}

// Check de «implementado»: verde suave, para que se distinga del texto sin
// gritar.
function Check() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="size-3.5 shrink-0 text-[#6fcf8f]"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-label="implementado"
    >
      <path d="M3.5 8.5 6.5 11.5 12.5 4.5" />
    </svg>
  );
}
