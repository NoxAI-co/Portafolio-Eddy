"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { getMarca, type Marca } from "../marca/marcas";

// Maquinaria pesada nueva: rótulo y título, una tarjeta por marca (foto de
// la marca, su logo en una placa blanca y su presentación) y el compactador
// Dynapac, todo sobre la foto de obra de fondo. Tarjetas en fila de 4 en
// escritorio, en rejilla de 2 × 2 en portátil y en carrusel más angosto. Cada
// tarjeta abre la landing de la marca. Los textos, fotos y logos salen de los
// datos de cada marca.
const MARCAS = ["yanmar", "hitachi", "case", "dynapac"].map((slug) => getMarca(slug)!);

const VER_TODO = "https://partequipos.vercel.app/maquinaria-pesada/maquinaria-pesada-nueva/";
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

export function MaquinariaNueva() {
  return (
    <section
      id="nueva"
      aria-labelledby="nueva-titulo"
      className="relative isolate overflow-hidden bg-bar px-5 pt-14 pb-14 sm:px-10 lg:px-[2.6%] lg:pt-20 min-[90rem]:min-h-[52rem] min-[90rem]:pt-24"
    >
      <Escena />
      <MaquinaFrente />

      <div className="relative z-10 lg:max-w-[54%] min-[90rem]:max-w-[68%]">
        {/* por debajo de 1024 px el compactador va en el encabezado: a la
            derecha del título desde md, debajo de él en teléfono */}
        <div className="grid items-end gap-x-8 md:grid-cols-[minmax(0,1fr)_minmax(0,48%)] lg:block">
          <div className="md:self-center">
            {/* mismo rótulo que el de maquinaria usada */}
            <p className="m-0 text-xs font-semibold tracking-wide text-brand-deep">Venta de Maquinaria</p>
            <h2
              id="nueva-titulo"
              className="m-0 mt-4 text-[clamp(2rem,6vw,2.6rem)] leading-tight font-semibold tracking-[-0.02em] text-on-bar lg:text-[clamp(2.4rem,3.3vw,3.4rem)]"
            >
              Maquinaria pesada nueva
            </h2>
          </div>
          <EscenaCompacta />
        </div>

        <Carrusel />

        <div className="mt-8 flex justify-center">
          <a
            href={VER_TODO}
            className="inline-flex min-h-12 items-center gap-3 rounded-full bg-brand px-8 text-base font-semibold text-on-brand transition-colors hover:bg-brand-lift focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brand active:bg-brand-deep"
          >
            <IconoEngranaje />
            Ver todo
          </a>
        </div>
      </div>
    </section>
  );
}

// Compactador por debajo de 1024 px, en el encabezado: a la derecha del
// título desde md, debajo de él en teléfono. La caja recorta el aire de
// arriba del render (la máquina va de y≈159 a 1253 de 1344, sombra incluida).
// Detrás lleva su propio recorte de la obra, con el horizonte a media altura
// para que las ruedas pisen tierra; en teléfono sale hasta los bordes de la
// pantalla y se funde en el blanco por arriba, por la izquierda y por abajo.
function EscenaCompacta() {
  return (
    <div aria-hidden className="pointer-events-none relative mt-6 aspect-[1920/1113] w-full md:mt-0 lg:hidden">
      <div className="absolute -inset-x-5 top-[-18%] bottom-[-16%] sm:-inset-x-10 md:left-[-12%]">
        <FotoObra fundido={FUNDIDO_COMPACTO} sizes="(max-width: 768px) 220vw, 110vw" />
        <span className="absolute top-0 left-[78%] h-[62%] w-[20%] origin-top -skew-x-[22deg] bg-[linear-gradient(180deg,rgb(232_24_40/0)_0%,rgb(232_24_40/0.42)_22%,rgb(232_24_40/0.32)_55%,rgb(232_24_40/0)_100%)]" />
      </div>
      <Image
        src="/partequipos/maq-dynapac-banner.png"
        alt=""
        width={1920}
        height={1344}
        sizes="(max-width: 768px) 100vw, 48vw"
        className="absolute top-[-12.6%] left-0 h-auto w-full max-w-none"
      />
    </div>
  );
}

// Fundidos de la foto (máscaras que se cruzan). Desde 1024 px: hacia la
// izquierda, hacia arriba y abajo. Por debajo: arriba, a la izquierda y abajo.
const FUNDIDO = [
  "linear-gradient(90deg, transparent 0%, rgb(0 0 0 / 0.15) 14%, rgb(0 0 0 / 0.55) 30%, #000 48%)",
  "linear-gradient(180deg, transparent 0%, rgb(0 0 0 / 0.35) 14%, #000 34%, #000 86%, transparent 100%)",
].join(", ");
const FUNDIDO_COMPACTO = [
  "linear-gradient(90deg, transparent 0%, #000 22%)",
  "linear-gradient(180deg, transparent 0%, rgb(0 0 0 / 0.5) 18%, #000 38%, #000 78%, transparent 100%)",
].join(", ");
// la capa a color solo deja ver el piso; la gris cubre cielo y montañas y
// se apaga donde empieza la tierra
const SOLO_PISO = "linear-gradient(180deg, transparent 0%, transparent 50%, #000 72%)";
const SOLO_MONTANAS = "linear-gradient(180deg, #000 0%, #000 50%, transparent 74%)";

function mascara(capas: string) {
  return { maskImage: capas, WebkitMaskImage: capas, maskComposite: "intersect", WebkitMaskComposite: "source-in" } as const;
}

// La foto de la obra (cielo, montañas y piso de tierra) anclada abajo: el
// piso a color y con algo más de contraste para que se lea definido, y
// encima la misma foto en gris, aclarada y tenue, para cielo y montañas.
function FotoObra({ fundido, sizes }: { fundido: string; sizes: string }) {
  return (
    <>
      <div className="absolute inset-0" style={mascara(`${fundido}, ${SOLO_PISO}`)}>
        <Image
          src="/partequipos/texturas/fondo-obra.jpg"
          alt=""
          fill
          quality={90}
          sizes={sizes}
          className="object-cover object-[82%_100%] [filter:contrast(1.18)_saturate(1.12)_brightness(0.98)]"
        />
      </div>
      <div className="absolute inset-0 opacity-55" style={mascara(`${fundido}, ${SOLO_MONTANAS}`)}>
        <Image
          src="/partequipos/texturas/fondo-obra.jpg"
          alt=""
          fill
          quality={90}
          sizes={sizes}
          className="object-cover object-[82%_100%] [filter:grayscale(1)_brightness(1.1)_contrast(0.9)]"
        />
      </div>
    </>
  );
}

// Fondo desde 1024 px: la foto recortada a la derecha, detrás del compactador
// (el pico y las rocas de la derecha de la foto), fundida en el blanco hacia
// la izquierda y hacia arriba, así título y tarjetas quedan sobre fondo limpio;
// se disuelve abajo para que no haya un corte seco con la sección siguiente.
// Por debajo de 1024 px la foto va solo detrás del compactador (EscenaCompacta).
function Escena() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 hidden lg:block">
      <div className="absolute top-0 right-0 bottom-0 w-[66%] min-[90rem]:w-[58%]">
        <FotoObra fundido={FUNDIDO} sizes="140vw" />
      </div>
      {/* dos franjas rojas translúcidas en diagonal, detrás del compactador;
          donde se cruzan el rojo se suma, y se apagan hacia abajo */}
      <span className="absolute top-0 left-[90.5%] h-[56%] w-[24%] origin-top -skew-x-[22deg] bg-[linear-gradient(180deg,rgb(232_24_40/0.5)_0%,rgb(232_24_40/0.42)_55%,rgb(232_24_40/0)_100%)]" />
      <span className="absolute top-0 left-[103%] h-[64%] w-[16%] origin-top -skew-x-[22deg] bg-[linear-gradient(180deg,rgb(232_24_40/0.5)_0%,rgb(232_24_40/0.42)_60%,rgb(232_24_40/0)_100%)]" />
    </div>
  );
}

// El compactador desde 1024 px, sobre el piso de la foto. Dos diseños:
// escritorio (1440+), por delante de la fila de 4 tarjetas, montado apenas (unos 16 px)
// sobre el borde de la última para dar profundidad; portátil
// (1024–1439), grande y por delante (z-20) de la rejilla de 2 × 2, tapando un
// poco la columna de la derecha para dar profundidad. No recibe clics, así
// las tarjetas que tapa se siguen pudiendo abrir.
function MaquinaFrente() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute right-[-4%] bottom-[10%] z-20 hidden w-[58%] lg:block min-[90rem]:right-[-4%] min-[90rem]:bottom-[8%] min-[90rem]:w-[42%]"
    >
      <Image
        src="/partequipos/maq-dynapac-banner.png"
        alt=""
        width={1920}
        height={1344}
        sizes="(max-width: 1440px) 58vw, 42vw"
        className="h-auto w-full"
      />
    </div>
  );
}

function Carrusel() {
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
      // en rejilla (desde lg) no hay nada que deslizar
      if (pista.scrollWidth <= pista.clientWidth + 1) return setPosiciones(1);
      const visibles = Math.max(1, Math.round((pista.clientWidth + 1) / p));
      setPosiciones(Math.max(1, MARCAS.length - visibles + 1));
      setActual(Math.round(pista.scrollLeft / p));
    };
    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(pista);
    return () => ro.disconnect();
  }, [paso]);

  const ir = useCallback(
    (i: number) => pistaRef.current?.scrollTo({ left: i * paso(), behavior: "smooth" }),
    [paso],
  );

  useEffect(() => {
    if (pausado || encima || posiciones <= 1) return;
    const t = window.setTimeout(() => ir((actual + 1) % posiciones), INTERVALO);
    return () => window.clearTimeout(t);
  }, [actual, pausado, encima, posiciones, ir]);

  return (
    <div
      className="mt-8"
      onMouseEnter={() => setEncima(true)}
      onMouseLeave={() => setEncima(false)}
      onFocusCapture={() => setEncima(true)}
      onBlurCapture={() => setEncima(false)}
    >
      <ul
        ref={pistaRef}
        aria-label="Marcas de maquinaria nueva"
        onScroll={(e) => {
          const p = paso();
          if (p) setActual(Math.round(e.currentTarget.scrollLeft / p));
        }}
        // el margen negativo con relleno deja aire para el contorno de foco,
        // que el overflow del carrusel recortaría
        className="no-scrollbar -m-1 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-1 p-1 lg:grid lg:grid-cols-2 lg:overflow-visible min-[90rem]:grid-cols-4"
      >
        {MARCAS.map((m) => (
          <li
            key={m.slug}
            className="w-[78%] shrink-0 snap-start min-[480px]:w-[calc((100%-1rem)/2)] md:w-[calc((100%-2rem)/3)] lg:w-auto"
          >
            <TarjetaMarca marca={m} />
          </li>
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
                  i === actual ? "w-6 bg-on-bar" : "w-1.5 bg-on-bar/25 group-hover/punto:bg-on-bar/50"
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

// Tarjeta de marca: la foto llena la tarjeta y se oscurece hacia abajo; el
// logo va en una placa blanca y debajo la presentación de la marca. La placa
// arranca a la misma altura en todas (relleno de arriba en % del ancho, que es
// igual para todas), así logos y textos quedan alineados aunque un texto sea
// más largo; las tarjetas toman el alto de la más alta.
function TarjetaMarca({ marca: m }: { marca: Marca }) {
  return (
    <Link
      href={`/lab/partequipos/${m.slug}`}
      aria-label={`${m.nombre}: ver la marca`}
      className="group relative isolate flex h-full min-h-[25rem] flex-col justify-start overflow-hidden rounded-[18px] bg-[#1f1d1b] p-4 pt-[52%] lg:min-h-0 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-brand lg:p-6 lg:pt-[28%] min-[90rem]:min-h-[27rem] min-[90rem]:p-[7%] min-[90rem]:pt-[52%]"
    >
      <Image
        src={m.fondo}
        alt=""
        fill
        sizes="(max-width: 480px) 78vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        className="-z-10 object-cover transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-[1.05]"
      />
      <span
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(16_14_13/0.94)_0%,rgb(16_14_13/0.88)_45%,rgb(16_14_13/0.55)_58%,rgb(16_14_13/0.1)_72%,transparent_82%)]"
      />
      <span className="flex aspect-square w-[40%] max-w-[110px] min-w-[84px] items-center justify-center rounded-[14px] bg-white p-2.5 lg:w-[80px] lg:min-w-0 lg:rounded-[12px] lg:p-2 min-[90rem]:w-[40%] min-[90rem]:min-w-[84px] min-[90rem]:rounded-[14px] min-[90rem]:p-2.5 shadow-[0_2px_6px_-2px_rgb(0_0_0/0.35)]">
        <Image
          src={m.logo.src}
          alt=""
          width={m.logo.ancho}
          height={m.logo.alto}
          sizes="100px"
          className="h-auto max-h-full w-full object-contain"
        />
      </span>
      <span className="mt-4 text-[15px] leading-snug text-white/90 lg:mt-3 lg:text-[14.5px] min-[90rem]:mt-4 min-[90rem]:text-[14px] min-[100rem]:text-[15px]">{m.presentacion}</span>
    </Link>
  );
}

function IconoEngranaje() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M10.3 4.3c.4-1.7 3-1.7 3.4 0a1.7 1.7 0 0 0 2.6 1.1c1.5-.9 3.3.8 2.4 2.4a1.7 1.7 0 0 0 1 2.5c1.8.4 1.8 3 0 3.4a1.7 1.7 0 0 0-1 2.6c.9 1.5-.9 3.3-2.4 2.4a1.7 1.7 0 0 0-2.6 1c-.4 1.8-3 1.8-3.4 0a1.7 1.7 0 0 0-2.5-1c-1.6.9-3.3-.9-2.4-2.4a1.7 1.7 0 0 0-1.1-2.6c-1.7-.4-1.7-3 0-3.4a1.7 1.7 0 0 0 1.1-2.5c-.9-1.6.8-3.3 2.4-2.4a1.7 1.7 0 0 0 2.5-1.1Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
