"use client";

import { useEffect, useRef, useState } from "react";
import type { SeccionKit } from "./leer";

// Panel para el desarrollador que va a llevar estos componentes a otro
// proyecto: un botón flotante abre un panel lateral con el código de cada
// sección (para copiar tal cual), sus imágenes y los .zip listos para
// descargar. No toca el diseño de la página: vive encima, en su propia capa.

const peso = (b: number) =>
  b >= 1024 * 1024 ? `${(b / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(b / 1024))} KB`;

async function copiar(texto: string) {
  try {
    await navigator.clipboard.writeText(texto);
    return true;
  } catch {
    // sin permiso de portapapeles: copia con un textarea temporal
    const t = document.createElement("textarea");
    t.value = texto;
    t.setAttribute("readonly", "");
    t.style.position = "fixed";
    t.style.opacity = "0";
    document.body.appendChild(t);
    t.select();
    const ok = document.execCommand("copy");
    t.remove();
    return ok;
  }
}

export function KitDev({
  secciones,
  estilos,
  zipCompleto,
  carpeta = "/partequipos/kit",
  subtitulo = "Partequipos",
}: {
  secciones: SeccionKit[];
  estilos: string;
  zipCompleto: number;
  /** Carpeta pública con los .zip de este kit (uno por sección y todo.zip). */
  carpeta?: string;
  subtitulo?: string;
}) {
  const [abierto, setAbierto] = useState(false);
  const [actual, setActual] = useState(secciones[0].id);
  const [archivo, setArchivo] = useState(0);
  const [aviso, setAviso] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  const botonRef = useRef<HTMLButtonElement>(null);

  const seccion = secciones.find((s) => s.id === actual) ?? secciones[0];
  const verEstilos = archivo === seccion.archivos.length;
  const codigo = verEstilos ? estilos : seccion.archivos[archivo].codigo;
  const nombreArchivo = verEstilos ? "estilos/partequipos.css" : seccion.archivos[archivo].ruta;

  useEffect(() => {
    if (!abierto) return;
    const boton = botonRef.current;
    const previo = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    const tecla = (e: KeyboardEvent) => e.key === "Escape" && setAbierto(false);
    window.addEventListener("keydown", tecla);
    return () => {
      document.body.style.overflow = previo;
      window.removeEventListener("keydown", tecla);
      boton?.focus();
    };
  }, [abierto]);

  useEffect(() => {
    if (!aviso) return;
    const t = window.setTimeout(() => setAviso(""), 2200);
    return () => window.clearTimeout(t);
  }, [aviso]);

  const copiarCon = async (texto: string, que: string) =>
    setAviso((await copiar(texto)) ? `${que} copiado` : "No se pudo copiar: selecciona el texto y usa Cmd/Ctrl + C");

  const todoElCodigo = () =>
    seccion.archivos.map((a) => `// ===== ${a.ruta} =====\n${a.codigo}`).join("\n\n");

  return (
    <>
      <button
        ref={botonRef}
        type="button"
        onClick={() => setAbierto(true)}
        aria-haspopup="dialog"
        className="fixed right-[max(1rem,env(safe-area-inset-right))] bottom-[max(1rem,env(safe-area-inset-bottom))] z-[60] inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-white shadow-[0_2px_8px_-2px_rgb(18_16_16/0.5)] transition-colors hover:bg-ink-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      >
        <IconoCodigo />
        Kit para desarrollo
      </button>

      {abierto && (
        <div className="fixed inset-0 z-[70] flex justify-end">
          <button
            type="button"
            aria-label="Cerrar panel"
            onClick={() => setAbierto(false)}
            className="absolute inset-0 cursor-default bg-ink/45"
          />
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="kit-titulo"
            tabIndex={-1}
            className="relative flex h-full w-full max-w-[44rem] flex-col bg-bar text-on-bar outline-none"
          >
            <header className="flex items-start justify-between gap-4 border-b border-bar-line px-5 pt-5 pb-4 sm:px-7">
              <div>
                <p className="text-xs font-semibold text-brand-deep">{subtitulo}</p>
                <h2 id="kit-titulo" className="mt-1 text-xl font-semibold tracking-[-0.01em]">
                  Kit para desarrollo
                </h2>
                <p className="mt-1 max-w-md text-sm text-on-bar-dim">
                  Next.js + Tailwind v4. Copia el código tal cual o descarga cada sección con sus imágenes.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setAbierto(false)}
                className="rounded-full px-3 py-1.5 text-sm font-medium text-on-bar-dim transition-colors hover:bg-card hover:text-on-bar focus-visible:outline-2 focus-visible:outline-brand"
              >
                Cerrar
              </button>
            </header>

            <div className="flex flex-wrap items-center gap-2 border-b border-bar-line px-5 py-3 sm:px-7">
              <a
                href={`${carpeta}/todo.zip`}
                download
                className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-on-brand transition-colors hover:bg-brand-lift active:bg-brand-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                <IconoDescarga />
                Kit completo (.zip, {peso(zipCompleto)})
              </a>
              <button
                type="button"
                onClick={() => copiarCon(estilos, "CSS")}
                className="rounded-full px-4 py-2 text-sm font-semibold text-on-bar ring-1 ring-bar-line transition-colors hover:ring-on-bar/40 focus-visible:outline-2 focus-visible:outline-brand"
              >
                Copiar estilos (CSS)
              </button>
              <p role="status" aria-live="polite" className="ml-auto text-sm text-on-bar-dim">
                {aviso}
              </p>
            </div>

            <div className="flex min-h-0 flex-1 flex-col">
              <div role="tablist" aria-label="Secciones" className="no-scrollbar flex gap-1 overflow-x-auto px-5 pt-4 sm:px-7">
                {secciones.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    role="tab"
                    aria-selected={s.id === actual}
                    onClick={() => {
                      setActual(s.id);
                      setArchivo(0);
                    }}
                    className={`shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-brand ${
                      s.id === actual ? "bg-on-bar text-white" : "text-on-bar-dim hover:bg-card hover:text-on-bar"
                    }`}
                  >
                    {s.nombre}
                  </button>
                ))}
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto px-5 pt-4 pb-8 sm:px-7">
                <p className="text-sm text-on-bar-dim">{seccion.descripcion}</p>

                <div className="mt-3 flex flex-wrap gap-2">
                  <a
                    href={`${carpeta}/${seccion.id}.zip`}
                    download
                    className="inline-flex items-center gap-2 rounded-full bg-on-bar px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-on-bar/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                  >
                    <IconoDescarga />
                    Descargar sección (.zip, {peso(seccion.zipBytes)})
                  </a>
                  <button
                    type="button"
                    onClick={() => copiarCon(todoElCodigo(), "Código de la sección")}
                    className="rounded-full px-4 py-2 text-sm font-semibold text-on-bar ring-1 ring-bar-line transition-colors hover:ring-on-bar/40 focus-visible:outline-2 focus-visible:outline-brand"
                  >
                    Copiar todo el código
                  </button>
                  {seccion.destino && (
                    <button
                      type="button"
                      onClick={() => {
                        setAbierto(false);
                        document.querySelector(seccion.destino!)?.scrollIntoView({ behavior: "smooth", block: "center" });
                      }}
                      className="rounded-full px-4 py-2 text-sm font-semibold text-brand-deep transition-colors hover:bg-card focus-visible:outline-2 focus-visible:outline-brand"
                    >
                      Ver en la página
                    </button>
                  )}
                </div>

                <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-[8rem_minmax(0,1fr)]">
                  <dt className="font-semibold">Uso</dt>
                  <dd className="min-w-0">
                    <button
                      type="button"
                      onClick={() => copiarCon(seccion.uso, "Uso")}
                      title="Copiar"
                      className="max-w-full truncate rounded-md bg-card px-2 py-1 text-left font-mono text-[0.8rem] transition-colors hover:bg-card-2"
                    >
                      {seccion.uso}
                    </button>
                  </dd>
                  <dt className="font-semibold">Dependencias</dt>
                  <dd className="text-on-bar-dim">
                    {seccion.dependencias.join(", ")} · Tailwind CSS v4 · fuente Inter
                  </dd>
                </dl>

                <h3 className="mt-6 text-sm font-semibold">Código</h3>
                <div className="no-scrollbar mt-2 flex gap-1 overflow-x-auto" role="tablist" aria-label="Archivos">
                  {[...seccion.archivos.map((a) => a.ruta.split("/").pop()!), "estilos.css"].map((n, i) => (
                    <button
                      key={n + i}
                      type="button"
                      role="tab"
                      aria-selected={i === archivo}
                      onClick={() => setArchivo(i)}
                      className={`shrink-0 rounded-md px-2.5 py-1 font-mono text-[0.78rem] whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-brand ${
                        i === archivo ? "bg-ink text-white" : "bg-card text-on-bar hover:bg-card-2"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>

                <div className="mt-2 overflow-hidden rounded-xl bg-ink text-paper">
                  <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-2">
                    <span className="min-w-0 truncate font-mono text-[0.75rem] text-paper-dim">{nombreArchivo}</span>
                    <button
                      type="button"
                      onClick={() => copiarCon(codigo, nombreArchivo.split("/").pop()!)}
                      className="shrink-0 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-brand-pale"
                    >
                      Copiar archivo
                    </button>
                  </div>
                  <pre className="max-h-[22rem] overflow-auto p-4 font-mono text-[0.75rem] leading-relaxed">
                    <code>{codigo}</code>
                  </pre>
                </div>
                {!verEstilos && (
                  <p className="mt-2 text-xs text-on-bar-dim">
                    Va en <span className="font-mono">{nombreArchivo}</span>; las imágenes, en
                    <span className="font-mono"> public/partequipos/</span>.
                  </p>
                )}

                <h3 className="mt-6 text-sm font-semibold">
                  Imágenes <span className="font-normal text-on-bar-dim">({seccion.assets.length})</span>
                </h3>
                <ul className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {seccion.assets.map((a) => (
                    <li key={a.ruta}>
                      <a
                        href={a.ruta}
                        download
                        className="group flex h-full flex-col gap-2 rounded-xl p-2 ring-1 ring-bar-line transition-colors hover:ring-on-bar/30 focus-visible:outline-2 focus-visible:outline-brand"
                      >
                        <span className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-lg bg-surface">
                          {/* eslint-disable-next-line @next/next/no-img-element -- miniatura del archivo original */}
                          <img src={a.ruta} alt="" loading="lazy" className="max-h-full max-w-full object-contain" />
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate font-mono text-[0.7rem]">{a.ruta.split("/").pop()}</span>
                          <span className="block text-[0.7rem] text-on-bar-dim">
                            {peso(a.bytes)} · <span className="text-brand-deep group-hover:underline">Descargar</span>
                          </span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const trazo = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

function IconoCodigo() {
  return (
    <svg viewBox="0 0 16 16" className="size-4 shrink-0" {...trazo}>
      <path d="M5.5 4.5 2 8l3.5 3.5M10.5 4.5 14 8l-3.5 3.5" />
    </svg>
  );
}

function IconoDescarga() {
  return (
    <svg viewBox="0 0 16 16" className="size-4 shrink-0" {...trazo}>
      <path d="M8 2.5v8M4.5 7 8 10.5 11.5 7M3 13.5h10" />
    </svg>
  );
}
