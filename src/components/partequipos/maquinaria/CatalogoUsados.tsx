"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { EQUIPOS, formatoNumero, type Equipo } from "../equipos";
import { CATEGORIAS, entraEn } from "./categorias";
import { Flecha } from "./UsedHero";

const USADOS = EQUIPOS.filter((e) => e.condicion === "usada");
const WHATSAPP = "https://wa.me/573176707071";

// Un solo panel redondeado con el hero, las categorías y el listado: las
// categorías son el único filtro y los equipos aparecen justo debajo, en las
// mismas tarjetas blancas sobre el mismo gris. Siempre hay una categoría
// elegida, así que no hace falta un "Todos".
export function CatalogoUsados({ hero }: { hero: React.ReactNode }) {
  const [filtro, setFiltro] = useState(CATEGORIAS[0].id);
  const listadoRef = useRef<HTMLDivElement>(null);

  const categoria = CATEGORIAS.find((c) => c.id === filtro) ?? CATEGORIAS[0];
  const lista = USADOS.filter((e) => entraEn(categoria, e.tipo));

  const elegir = (id: string) => {
    setFiltro(id);
    // en escritorio el hero ocupa la pantalla y el listado queda debajo del
    // pliegue; solo se desplaza lo necesario para que empiece a verse
    listadoRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  return (
    <div id="maquinaria-usada" className="bg-bar px-3 py-3 sm:px-5 sm:py-5 lg:px-6 lg:py-6">
      <div className="relative isolate overflow-hidden rounded-[1.75rem] bg-[#f1f0ee] lg:rounded-[2rem]">
        {hero}

        {/* `relative z-10`: el hero es una capa posicionada y su piso baja hasta
            aquí; sin esto se pintaría ENCIMA de las tarjetas y las lavaría */}
        <div className="relative z-10 mx-auto max-w-[1400px] px-6 pb-10 lg:px-10 lg:pb-14">
          <ul
            aria-label="Categorías"
            className="grid gap-3 py-1 sm:grid-cols-3 lg:gap-5"
          >
            {CATEGORIAS.map((c) => {
              const activa = c.id === filtro;
              return (
                <li key={c.id}>
                  <button
                    type="button"
                    aria-pressed={activa}
                    aria-controls="listado"
                    onClick={() => elegir(c.id)}
                    className={`group flex h-full w-full items-center gap-4 rounded-[1.5rem] border bg-bar py-3 pr-4 pl-3 text-left shadow-[0_1px_2px_rgb(20_17_15/0.05)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand lg:py-4 lg:pr-5 lg:pl-4 ${
                      activa
                        ? "border-brand bg-[linear-gradient(90deg,#fdeeee_0%,var(--bar)_75%)]"
                        : "border-bar-line hover:border-brand/60"
                    }`}
                  >
                    <span className="relative block h-14 w-24 shrink-0 lg:h-[4.5rem] lg:w-[7.25rem]">
                      <Image src={c.imagen} alt="" fill sizes="120px" className="object-contain" />
                    </span>
                    <span className="min-w-0 flex-1 text-base leading-tight font-semibold text-on-bar lg:text-[1.05rem]">
                      {c.nombre}
                    </span>
                    <span
                      aria-hidden
                      className={`flex size-9 shrink-0 items-center justify-center rounded-full transition-[background-color,color,rotate] duration-300 ${
                        activa
                          ? "rotate-90 bg-brand text-on-brand"
                          : "bg-card/70 text-on-bar group-hover:bg-brand group-hover:text-on-brand"
                      }`}
                    >
                      <Flecha />
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div
            id="listado"
            ref={listadoRef}
            aria-live="polite"
            className="scroll-mt-32 pt-5 lg:pt-6"
          >
            {lista.length > 0 ? (
              <SliderEquipos
                key={filtro}
                equipos={lista}
                etiqueta={categoria.nombre}
              />
            ) : (
              <div className="rounded-[1.5rem] border border-dashed border-on-bar/15 bg-bar px-6 py-12 text-center">
                <p className="font-semibold text-on-bar">
                  Por ahora no hay {categoria.busqueda} en el inventario.
                </p>
                <p className="mt-1 text-on-bar-dim">
                  Cuéntanos qué buscas y te avisamos cuando llegue.
                </p>
                <a
                  href={`${WHATSAPP}?text=${encodeURIComponent(`Hola, busco ${categoria.busqueda}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-on-brand transition-colors hover:bg-brand-lift active:bg-brand-deep"
                >
                  Escríbenos por WhatsApp
                  <Flecha />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const INTERVALO = 5000;
const MOVIMIENTO = "(prefers-reduced-motion: reduce)";

function suscribirMovimiento(avisar: () => void) {
  const mq = window.matchMedia(MOVIMIENTO);
  mq.addEventListener("change", avisar);
  return () => mq.removeEventListener("change", avisar);
}

function leerMovimiento() {
  return window.matchMedia(MOVIMIENTO).matches;
}

// Carrusel de tres en escritorio, dos en tablet y una en móvil. El
// desplazamiento es nativo con scroll-snap (arrastre y gesto táctil gratis);
// los puntos y el avance automático solo mueven `scrollLeft`. Cada punto es
// una posición de arranque, así que con 5 equipos y 3 visibles hay 3 puntos.
function SliderEquipos({
  equipos,
  etiqueta,
}: {
  equipos: Equipo[];
  etiqueta: string;
}) {
  const pistaRef = useRef<HTMLUListElement>(null);
  const [posiciones, setPosiciones] = useState(1);
  const [actual, setActual] = useState(0);
  // con movimiento reducido arranca en pausa; el botón lo puede reanudar
  const reducido = useSyncExternalStore(suscribirMovimiento, leerMovimiento, () => false);
  const [eleccion, setEleccion] = useState<boolean | null>(null);
  const pausado = eleccion ?? reducido;
  const [encima, setEncima] = useState(false);

  const paso = useCallback(() => {
    const pista = pistaRef.current;
    const item = pista?.firstElementChild as HTMLElement | null;
    if (!pista || !item) return 0;
    return item.offsetWidth + parseFloat(getComputedStyle(pista).columnGap || "0");
  }, []);

  // cuántas tarjetas caben cambia con el ancho, y con ello los puntos
  useEffect(() => {
    const pista = pistaRef.current;
    if (!pista) return;
    const medir = () => {
      const p = paso();
      if (!p) return;
      const visibles = Math.max(1, Math.round((pista.clientWidth + 1) / p));
      setPosiciones(Math.max(1, equipos.length - visibles + 1));
      setActual(Math.round(pista.scrollLeft / p));
    };
    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(pista);
    return () => ro.disconnect();
  }, [equipos.length, paso]);


  const ir = useCallback(
    (i: number) => {
      pistaRef.current?.scrollTo({ left: i * paso(), behavior: "smooth" });
    },
    [paso],
  );

  useEffect(() => {
    if (pausado || encima || posiciones <= 1) return;
    const t = window.setTimeout(() => ir((actual + 1) % posiciones), INTERVALO);
    return () => window.clearTimeout(t);
  }, [actual, pausado, encima, posiciones, ir]);

  return (
    <div
      onMouseEnter={() => setEncima(true)}
      onMouseLeave={() => setEncima(false)}
      onFocusCapture={() => setEncima(true)}
      onBlurCapture={() => setEncima(false)}
    >
      <ul
        ref={pistaRef}
        aria-label={etiqueta}
        onScroll={(e) => {
          const p = paso();
          if (p) setActual(Math.round(e.currentTarget.scrollLeft / p));
        }}
        // el margen negativo con relleno deja aire para el contorno de foco,
        // que el overflow del carrusel recortaría
        className="no-scrollbar -m-1 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-1 p-1 lg:gap-5"
      >
        {equipos.map((e) => (
          <motion.li
            key={e.slug}
            // solo se desplaza: el contenido nunca arranca invisible
            initial={{ y: 12 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            className="w-full shrink-0 snap-start md:w-[calc((100%-0.75rem)/2)] lg:w-[calc((100%-1.25rem)/2)] xl:w-[calc((100%-2.5rem)/3)]"
          >
            <TarjetaEquipo equipo={e} />
          </motion.li>
        ))}
      </ul>

      {posiciones > 1 && (
        <div className="mt-5 flex items-center justify-center gap-1">
          {Array.from({ length: posiciones }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => ir(i)}
              aria-label={`Ir a la posición ${i + 1} de ${posiciones}`}
              aria-current={i === actual ? "true" : undefined}
              className="group/punto flex h-8 items-center px-1.5 focus-visible:outline-2 focus-visible:outline-brand"
            >
              <span
                className={`block h-1.5 rounded-full transition-[width,background-color] duration-300 ${
                  i === actual
                    ? "w-6 bg-on-bar"
                    : "w-1.5 bg-on-bar/25 group-hover/punto:bg-on-bar/50"
                }`}
              />
            </button>
          ))}
          <button
            type="button"
            onClick={() => setEleccion(!pausado)}
            aria-label={pausado ? "Reanudar avance automático" : "Pausar avance automático"}
            className="ml-2 flex size-8 items-center justify-center rounded-full text-on-bar ring-1 ring-on-bar/70 transition-colors hover:bg-on-bar hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            <svg viewBox="0 0 16 16" className="size-3.5" fill="currentColor" aria-hidden>
              {pausado ? (
                <path d="M5 3.2v9.6a.6.6 0 0 0 .9.5l7.6-4.8a.6.6 0 0 0 0-1L5.9 2.7a.6.6 0 0 0-.9.5Z" />
              ) : (
                <>
                  <rect x="4" y="3" width="2.6" height="10" rx="1" />
                  <rect x="9.4" y="3" width="2.6" height="10" rx="1" />
                </>
              )}
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

// Tarjeta del listado: foto, nombre completo con el año, tres datos en filas
// y dos acciones. Los dos botones van al pie con `mt-auto` para que queden a
// la misma altura en toda la fila aunque un nombre ocupe dos líneas.
function TarjetaEquipo({ equipo }: { equipo: Equipo }) {
  const foto = equipo.fotos[0];
  const href = `/lab/partequipos/${equipo.slug}`;
  const nombre = [equipo.tipo, equipo.marca, equipo.modelo, equipo.anio]
    .filter(Boolean)
    .join(" ");
  // si falta un dato se conserva la fila con un guion, así las filas de las
  // tarjetas vecinas no se descuadran
  const datos = [
    {
      icono: <IconoPeso />,
      etiqueta: "Peso operativo",
      valor: equipo.peso !== undefined ? `${formatoNumero.format(equipo.peso)} t` : "—",
    },
    { icono: <IconoCalendario />, etiqueta: "Año", valor: equipo.anio ? String(equipo.anio) : "—" },
    { icono: <IconoReloj />, etiqueta: "Horómetro", valor: `${formatoNumero.format(equipo.horas)} h` },
  ];

  return (
    <article className="group flex h-full flex-col rounded-[1.5rem] border border-bar-line bg-bar p-4 shadow-[0_1px_2px_rgb(20_17_15/0.05)] sm:p-5">
      <Link
        href={href}
        tabIndex={-1}
        aria-hidden
        className="relative block aspect-[3/2] overflow-hidden rounded-[1rem] bg-[linear-gradient(180deg,#e6e4e1_0%,#f3f2f0_70%,#eceae7_100%)]"
      >
        <Image
          src={foto.src}
          alt={foto.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className={`transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-[1.04] ${
            /\.(png|webp)$/.test(foto.src)
              ? "object-contain object-bottom px-6 pt-5 pb-4"
              : "object-cover"
          }`}
        />
      </Link>

      <h3 className="mt-5 text-lg leading-snug font-semibold text-on-bar">
        <Link
          href={href}
          className="transition-colors hover:text-brand-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          {nombre}
        </Link>
      </h3>

      <dl className="mt-3 divide-y divide-bar-line">
        {datos.map((d) => (
          <div key={d.etiqueta} className="flex items-center gap-2.5 py-2.5 text-[0.95rem]">
            <span className="text-brand">{d.icono}</span>
            <dt className="text-on-bar">{d.etiqueta}:</dt>
            <dd className="text-on-bar-dim">{d.valor}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-auto flex items-center justify-between gap-3 pt-5">
        <Link
          href={href}
          className="rounded-full bg-brand px-6 py-2.5 text-[0.95rem] font-medium text-on-brand transition-colors hover:bg-brand-lift focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand active:bg-brand-deep"
        >
          Ver más
          <span className="sr-only">: {nombre}</span>
        </Link>
        <Link
          href={`${href}#ficha-tecnica`}
          className="rounded-full bg-on-bar px-6 py-2.5 text-[0.95rem] font-medium text-white transition-colors hover:bg-on-bar/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          Cotizar ahora
          <span className="sr-only">: {nombre}</span>
        </Link>
      </div>
    </article>
  );
}

const icono = {
  viewBox: "0 0 20 20",
  className: "size-4 shrink-0",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

function IconoCalendario() {
  return (
    <svg {...icono}>
      <rect x="3" y="4.5" width="14" height="12.5" rx="2" />
      <path d="M3 8.5h14M7 2.75v3.5M13 2.75v3.5" />
    </svg>
  );
}

function IconoReloj() {
  return (
    <svg {...icono}>
      <circle cx="10" cy="10" r="7" />
      <path d="M10 6v4l2.75 1.75" />
    </svg>
  );
}

function IconoPeso() {
  return (
    <svg {...icono}>
      <path d="M7.25 7.5a2.75 2.75 0 1 1 5.5 0" />
      <path d="M5.6 7.5h8.8l1.6 9H4l1.6-9Z" />
    </svg>
  );
}
