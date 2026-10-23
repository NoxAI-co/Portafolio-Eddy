"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Marca } from "./marcas";

// Píldora de navegación de la landing de marca, al estilo de la isla de
// Apple: aparece arriba al centro cuando el hero sale de la pantalla, primero
// como la píldora del logo y enseguida se extiende con las categorías. La
// categoría que está a media pantalla se marca con una pastilla del color de
// la marca que se desliza de una a otra. Al volver al hero se recoge y se va.
// Es un atajo: las secciones siguen ahí aunque la píldora no aparezca.
//
// Vidrio oscuro: una tinta negra cálida al 55 % sobre un fondo que el propio
// filtro oscurece (brillo al 55 %), desenfoca y satura, así lo de atrás se ve
// pasar pero la píldora sigue siendo oscura y el texto blanco se lee. Encima,
// el brillo especular en la mitad de arriba, un canto claro arriba, un borde
// del mismo vidrio y una sombra corta.
const RESORTE = { type: "spring", stiffness: 420, damping: 36 } as const;

export function PildoraMarca({ marca }: { marca: Marca }) {
  const [visible, setVisible] = useState(false);
  const [activa, setActiva] = useState(marca.tipos[0]?.id);
  const reducido = useReducedMotion();
  const listaRef = useRef<HTMLUListElement>(null);

  // visible desde que el hero deja de verse
  useEffect(() => {
    const hero = document.getElementById("marca-hero-titulo")?.closest("section");
    if (!hero) return;
    const io = new IntersectionObserver(([e]) => setVisible(!e.isIntersecting), { threshold: 0 });
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  // la categoría activa es la que cruza la mitad de la pantalla
  useEffect(() => {
    const io = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) if (e.isIntersecting) setActiva(e.target.id.replace(/^tipo-/, ""));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const t of marca.tipos) {
      const el = document.getElementById(`tipo-${t.id}`);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, [marca.tipos]);

  // en teléfono la lista se desliza: mantiene a la vista la categoría activa
  useEffect(() => {
    const el = listaRef.current?.querySelector<HTMLElement>('[aria-current="location"]');
    el?.scrollIntoView({ block: "nearest", inline: "center", behavior: reducido ? "auto" : "smooth" });
  }, [activa, reducido]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          key="pildora"
          aria-label={`Categorías ${marca.nombre}`}
          initial={{ y: -24, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -24, opacity: 0, scale: 0.9 }}
          transition={reducido ? { duration: 0 } : RESORTE}
          className="fixed top-5 left-1/2 z-50 flex max-w-[calc(100%-2rem)] -translate-x-1/2 items-center gap-1 rounded-full bg-[#121010]/[0.55] bg-[linear-gradient(180deg,rgb(255_255_255/0.16)_0%,rgb(255_255_255/0.05)_48%,transparent_52%)] p-1.5 shadow-[inset_0_1px_0_rgb(255_255_255/0.28),inset_0_-1px_0_rgb(255_255_255/0.06),inset_0_0_0_1px_rgb(255_255_255/0.1),0_4px_14px_-6px_rgb(16_15_15/0.55)] backdrop-blur-2xl backdrop-brightness-[0.55] backdrop-saturate-[1.8] max-sm:top-3"
          style={{ "--marca-acento": marca.acento, "--marca-tinta": marca.acentoTinta ?? "#100f0f" } as CSSProperties}
        >
          {/* píldora del logo: lleva arriba del todo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: reducido ? "auto" : "smooth" });
            }}
            aria-label={`${marca.nombre}: volver arriba`}
            className="flex h-10 shrink-0 items-center rounded-full bg-white/90 px-4 shadow-[inset_0_1px_0_rgb(255_255_255/0.9)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--marca-acento)]"
          >
            <Image
              src={marca.logo.src}
              alt=""
              width={marca.logo.ancho}
              height={marca.logo.alto}
              sizes="96px"
              className="h-6 w-auto max-w-[96px] object-contain"
            />
          </a>

          {/* se extiende desde el logo: el ancho crece de 0 a su tamaño */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "auto" }}
            exit={{ width: 0 }}
            transition={reducido ? { duration: 0 } : { ...RESORTE, delay: 0.08 }}
            className="min-w-0 overflow-hidden"
          >
            <ul ref={listaRef} className="no-scrollbar m-0 flex list-none items-center gap-0.5 overflow-x-auto p-0">
              {marca.tipos.map((t) => {
                const esta = t.id === activa;
                return (
                  <li key={t.id} className="shrink-0">
                    <a
                      href={`#tipo-${t.id}`}
                      onClick={(e) => {
                        const destino = document.getElementById(`tipo-${t.id}`);
                        if (!destino) return;
                        e.preventDefault();
                        // baja con suavidad; scroll-mt de la sección deja
                        // espacio para la píldora
                        destino.scrollIntoView({ behavior: reducido ? "auto" : "smooth", block: "start" });
                        history.replaceState(null, "", `#tipo-${t.id}`);
                      }}
                      aria-current={esta ? "location" : undefined}
                      className={`relative isolate block rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--marca-acento)] ${
                        esta ? "text-[var(--marca-tinta)]" : "text-white/85 hover:text-white"
                      }`}
                    >
                      {esta && (
                        <motion.span
                          layoutId="pildora-activa"
                          transition={reducido ? { duration: 0 } : RESORTE}
                          className="absolute inset-0 -z-10 rounded-full bg-[var(--marca-acento)]"
                        />
                      )}
                      <span className="relative">{t.corto ?? t.nombre}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
