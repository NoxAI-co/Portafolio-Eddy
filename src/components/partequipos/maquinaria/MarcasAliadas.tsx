"use client";

import Image from "next/image";
import { useEffect, useState, useSyncExternalStore, type CSSProperties } from "react";

// Marcas aliadas del grupo: una tarjeta por marca con su logo sobre blanco y,
// debajo, una foto de su negocio teñida con el color de la marca. El tinte va
// en dos capas: el color de la marca multiplicado desde la esquina de abajo y
// un oscurecido al pie, que es el que sostiene el texto blanco (así se lee
// igual sobre el amarillo de ENI que sobre el azul de Express). La foto entra
// con un corte en diagonal arriba. Cada tarjeta abre el sitio de la marca.
// El contenedor lleva de fondo las fotos de la franja de «Marcas aliadas» de
// /nosotros, tenues, que se relevan con un fundido lento; un velo oscuro
// sostiene el título en blanco y las tarjetas van encima.
type Aliada = {
  id: string;
  nombre: string;
  logo: string;
  foto: string;
  texto: string;
  color: string;
  href: string;
};

const ALIADAS: Aliada[] = [
  {
    id: "partequipos-express",
    logo: "/partequipos/marcas-aliadas/web/logo-partequipos-express.webp",
    foto: "/partequipos/marcas-aliadas/web/foto-partequipos-express.jpg",
    nombre: "Partequipos Express",
    texto: "Soluciones rápidas en repuestos y equipos.",
    color: "#0a5bb0",
    href: "https://partequiposexpress.com/",
  },
  {
    id: "tu-maquinaria",
    logo: "/partequipos/marcas-aliadas/web/logo-tu-maquinaria.webp",
    foto: "/partequipos/marcas-aliadas/web/foto-tu-maquinaria.jpg",
    nombre: "Tu Maquinaria",
    texto: "Especialistas en maquinaria usada.",
    color: "#e8a90e",
    href: "https://tumaquinaria.com.co/",
  },
  {
    id: "partequipos-peru",
    logo: "/partequipos/marcas-aliadas/web/logo-partequipos-peru.webp",
    foto: "/partequipos/marcas-aliadas/web/foto-partequipos-peru.jpg",
    nombre: "Partequipos Perú",
    texto: "Presencia en el mercado peruano.",
    color: "#d4122f",
    href: "https://www.partequipos.pe/",
  },
  {
    id: "maquitecno",
    logo: "/partequipos/marcas-aliadas/web/logo-maquitecno.webp",
    foto: "/partequipos/marcas-aliadas/web/foto-maquitecno.jpg",
    nombre: "Maquitecno",
    texto: "Distribuidor oficial LiuGong.",
    color: "#ec6c0b",
    href: "https://maquitecno.co/",
  },
  {
    id: "eni",
    logo: "/partequipos/marcas-aliadas/web/logo-eni.webp",
    foto: "/partequipos/marcas-aliadas/web/foto-eni.jpg",
    nombre: "Eni Lubricantes",
    texto: "Lubricantes de alto rendimiento.",
    color: "#e6c200",
    href: "https://enicolombiapartequipos.com/",
  },
];

// fotos de la franja de /nosotros, en su orden
const FOTOS = [
  { src: "/partequipos/marcas-aliadas/web/franja-nosotros.webp", posicion: "50% 60%" },
  { src: "/partequipos/marcas-aliadas/web/franja-case.webp", posicion: "50% 58%" },
  { src: "/partequipos/marcas-aliadas/web/franja-yanmar.webp", posicion: "50% 45%" },
];
const INTERVALO = 6000;
const MOVIMIENTO = "(prefers-reduced-motion: reduce)";

function suscribirMovimiento(avisar: () => void) {
  const mq = window.matchMedia(MOVIMIENTO);
  mq.addEventListener("change", avisar);
  return () => mq.removeEventListener("change", avisar);
}

export function MarcasAliadas() {
  return (
    <section
      id="aliadas"
      aria-labelledby="aliadas-titulo"
      className="bg-bar px-3 pb-3 sm:px-5 sm:pb-5 lg:px-6 lg:pb-6"
    >
      <div className="relative isolate overflow-hidden rounded-[1.75rem] bg-[#141210] px-5 py-10 sm:px-10 lg:rounded-[2rem] lg:px-[5%] lg:py-14">
        <FondoFotos />
        <h2
          id="aliadas-titulo"
          className="text-center text-[clamp(1.6rem,6vw,2.2rem)] leading-tight font-semibold tracking-[-0.025em] text-white [text-shadow:0_1px_3px_rgb(0_0_0/0.35)] lg:text-[clamp(2rem,2.4vw,2.6rem)]"
        >
          Marcas aliadas
        </h2>

        {/* filas centradas: con 5 tarjetas en 2 o 3 columnas, la última fila
            corta queda al centro en vez de colgar a la izquierda. En
            teléfono es una tira que se desliza */}
        <ul className="no-scrollbar -mx-5 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 sm:pb-0 lg:gap-5">
          {ALIADAS.map((a) => (
            <li
              key={a.id}
              className="w-[78%] shrink-0 snap-start sm:w-[calc((100%-1rem)/2)] md:w-[calc((100%-2rem)/3)] xl:w-[calc((100%-5rem)/5)]"
            >
              <Tarjeta aliada={a} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// Fondo del contenedor: las fotos apiladas, la de turno visible y las demás
// transparentes (la primera se ve desde el primer render, sin esperar a
// JavaScript). Cada foto se acerca muy despacio mientras está al frente. Con
// movimiento reducido arranca en pausa y sin acercamiento; el botón pausa o
// reanuda el relevo.
function FondoFotos() {
  const [actual, setActual] = useState(0);
  const reducido = useSyncExternalStore(suscribirMovimiento, () => window.matchMedia(MOVIMIENTO).matches, () => false);
  const [eleccion, setEleccion] = useState<boolean | null>(null);
  const pausado = eleccion ?? reducido;

  useEffect(() => {
    if (pausado) return;
    const t = window.setTimeout(() => setActual((i) => (i + 1) % FOTOS.length), INTERVALO);
    return () => window.clearTimeout(t);
  }, [actual, pausado]);

  return (
    <>
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 opacity-35">
          {FOTOS.map((f, i) => (
            <Image
              key={f.src}
              src={f.src}
              alt=""
              fill
              sizes="100vw"
              priority={i === 0}
              style={{ objectPosition: f.posicion }}
              className={`object-cover transition-[opacity,scale] ease-out motion-reduce:transition-none ${
                i === actual
                  ? "scale-[1.06] opacity-100 duration-[1200ms,7000ms] motion-reduce:scale-100"
                  : "scale-100 opacity-0 duration-[1200ms,0ms]"
              }`}
            />
          ))}
        </div>
        {/* velo: más denso arriba, donde va el título */}
        <span className="absolute inset-0 bg-[linear-gradient(180deg,rgb(16_14_13/0.6)_0%,rgb(16_14_13/0.35)_35%,rgb(16_14_13/0.3)_75%,rgb(16_14_13/0.5)_100%)]" />
      </div>
      <button
        type="button"
        onClick={() => setEleccion(!pausado)}
        aria-label={pausado ? "Reanudar las fotos de fondo" : "Pausar las fotos de fondo"}
        className="absolute top-4 right-4 z-10 flex size-9 items-center justify-center rounded-full bg-white/90 text-[#100f0f] transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:top-5 lg:right-5"
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
    </>
  );
}

function Tarjeta({ aliada: a }: { aliada: Aliada }) {
  return (
    <a
      href={a.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${a.nombre}: ${a.texto} (abre su sitio)`}
      className="group flex h-full flex-col overflow-hidden rounded-[14px] bg-white shadow-[0_1px_2px_rgb(16_15_15/0.06),0_6px_16px_-10px_rgb(16_15_15/0.2)] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[var(--aliada)]"
      style={{ "--aliada": a.color } as CSSProperties}
    >
      <span className="flex h-24 items-center justify-center px-7">
        <Image
          src={a.logo}
          alt=""
          width={700}
          height={200}
          sizes="200px"
          className="h-auto max-h-11 w-auto max-w-[82%] object-contain"
        />
      </span>

      {/* el borde de arriba de la foto es un arco: una elipse mucho más
          ancha que la tarjeta, con el centro abajo a la derecha, recorta la
          foto con una curva que sube de izquierda a derecha. Solo toca la
          foto: el texto va al pie */}
      <span className="relative -mt-3 block aspect-[4/3] overflow-hidden [clip-path:ellipse(150%_100%_at_100%_100%)]">
        <Image
          src={a.foto}
          alt=""
          fill
          sizes="(max-width: 640px) 78vw, (max-width: 1280px) 33vw, 20vw"
          className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-[1.05]"
        />
        <span
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(20deg,var(--aliada)_0%,var(--aliada)_25%,transparent_75%)] opacity-85 mix-blend-multiply"
        />
        <span
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_top,rgb(12_10_9/0.88)_0%,rgb(12_10_9/0.7)_30%,rgb(12_10_9/0.25)_55%,transparent_75%)]"
        />

        <span className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
          <span className="text-[15px] leading-snug font-semibold text-balance text-white [text-shadow:0_1px_2px_rgb(0_0_0/0.35)] xl:text-[14px]">{a.texto}</span>
          <span
            aria-hidden
            className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-[#100f0f] transition-colors duration-300 group-hover:bg-[var(--aliada)] group-hover:text-white"
          >
            <svg
              viewBox="0 0 16 16"
              className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 3.5 10.5 8 6 12.5" />
            </svg>
          </span>
        </span>
      </span>
    </a>
  );
}
