"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { esRecorte, type Equipo } from "./equipos";

// Galería de la ficha: foto grande con flechas + tira de miniaturas que se
// desplaza sola hasta la foto activa. Todo son botones reales (clic, teclado)
// y la foto grande abre un visor a pantalla completa sobre <dialog>, que ya
// trae foco atrapado y cierre con Esc.
export function ProductGallery({ fotos }: { fotos: Equipo["fotos"] }) {
  const [actual, setActual] = useState(0);
  const visor = useRef<HTMLDialogElement>(null);
  const tira = useRef<HTMLUListElement>(null);
  // bordes de la tira que aún esconden miniaturas: ahí se desvanece en vez
  // de cortar la foto en seco
  const [bordes, setBordes] = useState({ izq: false, der: false });
  const medirBordes = () => {
    const ul = tira.current;
    if (!ul) return;
    setBordes({
      izq: ul.scrollLeft > 2,
      der: ul.scrollLeft + ul.clientWidth < ul.scrollWidth - 2,
    });
  };
  useEffect(() => {
    medirBordes();
    window.addEventListener("resize", medirBordes);
    return () => window.removeEventListener("resize", medirBordes);
  }, []);
  const total = fotos.length;
  const foto = fotos[actual];

  const mover = (paso: number) => setActual((i) => (i + paso + total) % total);

  // flechas del teclado dentro del visor
  useEffect(() => {
    const dlg = visor.current;
    if (!dlg) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") mover(1);
      if (e.key === "ArrowLeft") mover(-1);
    };
    dlg.addEventListener("keydown", onKey);
    return () => dlg.removeEventListener("keydown", onKey);
  });

  // lleva la miniatura activa a la vista moviendo solo la tira, nunca la
  // página (scrollIntoView arrastraría también el scroll vertical)
  useEffect(() => {
    const ul = tira.current;
    const li = ul?.children[actual] as HTMLElement | undefined;
    if (!ul || !li) return;
    const m = li.getBoundingClientRect();
    const t = ul.getBoundingClientRect();
    if (m.left < t.left) ul.scrollBy({ left: m.left - t.left - 6, behavior: "smooth" });
    else if (m.right > t.right)
      ul.scrollBy({ left: m.right - t.right + 6, behavior: "smooth" });
  }, [actual]);

  return (
    <div className="grid gap-3 lg:gap-4">
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-ink-2">
        {/* las fotos que no son de obra (recortes con fondo transparente) se
            ven sobre la superficie cálida en vez del negro */}
        <Image
          key={foto.src}
          src={foto.src}
          alt={foto.alt}
          fill
          priority={actual === 0}
          sizes="(max-width: 1024px) 100vw, 55vw"
          className={
            esRecorte(foto.src) ? "bg-card object-contain p-6" : "object-cover"
          }
        />

        <button
          type="button"
          onClick={() => visor.current?.showModal()}
          aria-label="Ver foto en pantalla completa"
          className="absolute top-3 left-3 flex size-10 items-center justify-center rounded-full bg-ink/55 text-paper backdrop-blur-sm transition-colors hover:bg-ink/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          <svg
            viewBox="0 0 24 24"
            className="size-[18px]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
          </svg>
        </button>

        {total > 1 && (
          <>
            <Flecha lado="izq" onClick={() => mover(-1)} />
            <Flecha lado="der" onClick={() => mover(1)} />
            <p className="absolute right-3 bottom-3 rounded-full bg-ink/55 px-3 py-1 text-xs font-medium tabular-nums text-paper backdrop-blur-sm">
              {actual + 1} / {total}
            </p>
          </>
        )}
      </div>

      {/* con una sola foto, la tira de miniaturas no tiene nada que elegir */}
      {total > 1 && (
        <ul
          ref={tira}
          onScroll={medirBordes}
          style={{
            maskImage: `linear-gradient(to right, ${bordes.izq ? "transparent, #000 3rem" : "#000"}, ${bordes.der ? "#000 calc(100% - 3rem), transparent" : "#000"})`,
          }}
          aria-label="Fotos del equipo"
          className="no-scrollbar -m-1.5 flex snap-x scroll-px-1.5 gap-2.5 overflow-x-auto p-1.5 sm:gap-3"
        >
          {fotos.map((f, i) => (
            <li key={f.src} className="shrink-0 snap-start">
              <button
                type="button"
                onClick={() => setActual(i)}
                aria-label={`Ver foto ${i + 1}: ${f.alt}`}
                aria-current={i === actual}
                className={`relative block aspect-[4/3] w-20 overflow-hidden rounded-xl outline-offset-2 transition-[opacity,outline-color] sm:w-24 ${
                  i === actual
                    ? "outline-2 outline-brand"
                    : "opacity-60 outline-2 outline-transparent hover:opacity-100"
                } focus-visible:outline-brand`}
              >
                <Image
                  src={f.src}
                  alt=""
                  fill
                  sizes="120px"
                  className={
                    esRecorte(f.src)
                      ? "bg-card object-contain p-2"
                      : "object-cover"
                  }
                />
              </button>
            </li>
          ))}
        </ul>
      )}

      <dialog
        ref={visor}
        onClick={(e) => e.target === visor.current && visor.current?.close()}
        className="m-auto max-h-none max-w-none bg-transparent p-0 backdrop:bg-ink/92"
      >
        <div className="relative flex h-[100svh] w-screen items-center justify-center px-4 py-16 sm:px-20">
          <div className="relative h-full w-full">
            <Image
              src={foto.src}
              alt={foto.alt}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>

          <button
            type="button"
            onClick={() => visor.current?.close()}
            aria-label="Cerrar"
            className="absolute top-4 right-4 flex size-11 items-center justify-center rounded-full text-paper transition-colors hover:bg-white/10"
          >
            <svg
              viewBox="0 0 24 24"
              className="size-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>

          {total > 1 && (
            <>
              <FlechaVisor lado="izq" onClick={() => mover(-1)} />
              <FlechaVisor lado="der" onClick={() => mover(1)} />
            </>
          )}

          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-sm tabular-nums text-paper-dim">
            {actual + 1} / {total}
          </p>
        </div>
      </dialog>
    </div>
  );
}

function Chevron({ lado }: { lado: "izq" | "der" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d={lado === "izq" ? "M14.5 5.5L8 12l6.5 6.5" : "M9.5 5.5L16 12l-6.5 6.5"} />
    </svg>
  );
}

// flechas sobre la foto grande, siempre visibles para que sirvan en táctil
function Flecha({ lado, onClick }: { lado: "izq" | "der"; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={lado === "izq" ? "Foto anterior" : "Foto siguiente"}
      className={`absolute top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-ink/55 text-paper backdrop-blur-sm transition-colors hover:bg-ink/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
        lado === "izq" ? "left-3" : "right-3"
      }`}
    >
      <Chevron lado={lado} />
    </button>
  );
}

function FlechaVisor({ lado, onClick }: { lado: "izq" | "der"; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={lado === "izq" ? "Foto anterior" : "Foto siguiente"}
      className={`absolute top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full text-paper transition-colors hover:bg-white/10 ${
        lado === "izq" ? "left-2 sm:left-5" : "right-2 sm:right-5"
      }`}
    >
      <Chevron lado={lado} />
    </button>
  );
}
