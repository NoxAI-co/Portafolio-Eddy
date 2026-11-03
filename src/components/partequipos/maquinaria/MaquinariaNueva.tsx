"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { getMarca, type Marca } from "../marca/marcas";

// Maquinaria pesada nueva: rótulo y título, una tarjeta por marca (foto de
// la marca, su logo en una placa blanca y su presentación) y la retroexcavadora
// Case Utility Plus en un estudio: franjas grises y rojas en la pared, piso
// claro con su reflejo y sombras de contacto. Tarjetas en rejilla de 2 × 2
// desde 1024 px y en carrusel más angosto. Cada
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
      className="relative isolate overflow-hidden bg-bar px-5 pt-14 pb-14 sm:px-10 lg:px-[2.6%] lg:pt-20 2xl:pb-20 min-[90rem]:pt-24"
    >
      <div className="relative z-10 lg:max-w-[52%] 2xl:max-w-[67%]">
        {/* por debajo de 1024 px la retroexcavadora va en el encabezado: a la
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

        {/* desde lg la máquina va anclada a las tarjetas (MaquinaEmpuja). Las
            4 en fila solo desde 2xl: más angosto quedarían muy altas */}
        {/* las tarjetas tapan el estudio (franjas y piso entran por detrás de
            ellas) y la máquina va encima de todo */}
        <div className="relative">
          <div className="relative z-10">
            <Carrusel />
          </div>
          <MaquinaEmpuja />
        </div>

        <div className="relative z-10 mt-8 flex justify-center">
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

// Retroexcavadora Case por debajo de 1024 px, en el encabezado: a la derecha
// del título desde md, debajo de él en teléfono. La caja recorta el aire de
// arriba del render (la máquina va de y≈134 a 864 de 1024, sombra incluida);
// dentro, la caja del render completo lleva el estudio y la máquina.
function EscenaCompacta() {
  return (
    <div aria-hidden className="pointer-events-none relative mt-6 aspect-[1920/992] w-full md:mt-0 lg:hidden">
      <div className="absolute top-[-17.7%] left-0 aspect-[1920/1344] w-full">
        <Estudio
          id="nueva-sm"
          sizes="(max-width: 768px) 100vw, 48vw"
          pisoClassName="left-[-40%] right-[-40%] [mask-image:linear-gradient(90deg,transparent_0,#000_25%,#000_75%,transparent)]"
        />
        <Image
          src="/partequipos/maq-case-utility-plus.webp"
          alt=""
          width={1920}
          height={1344}
          quality={90}
          sizes="(max-width: 768px) 100vw, 48vw"
          className="relative h-auto w-full"
        />
      </div>
    </div>
  );
}

// La retroexcavadora Case Utility Plus desde 1024 px, de perfil y anclada al
// borde derecho de las tarjetas (rejilla de 2 × 2 hasta 1535 px, fila de 4
// desde 2xl), con el cucharón pegado a la última, como si las empujara. Se
// mide por la ALTURA de las tarjetas, no por el ancho de la pantalla: así
// nunca queda pequeña a su lado. Con tope por el ANCHO de pantalla (45vw en
// 2 × 2, 32vw en fila de 4) para que la rueda trasera, al ~72 % del ancho del
// render, siempre quepa: solo el brazo de atrás puede salirse por la derecha.
// Medidas sobre el render (1920 × 1344): la punta del cucharón está en
// x≈31 (1,6 %), la máquina va de y≈176 a 1134 (71 % del alto) y las ruedas
// apoyan al 84,4 %: la caja baja 15,6 % de su alto para dejarlas a ras del
// pie. Se baja con `bottom` y no con translate: un transform la volvería su
// propio contexto de apilado y el estudio no podría quedar bajo las tarjetas.
function MaquinaEmpuja() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-[98.3%] hidden aspect-[1920/1344] lg:block lg:bottom-[calc(min(112%,45vw)*-0.156)] lg:h-[min(112%,45vw)] 2xl:bottom-[calc(min(150%,32vw)*-0.156)] 2xl:h-[min(150%,32vw)]"
    >
      <Estudio
        id="nueva-lg"
        sizes="(max-width: 1280px) 80vw, 60vw"
        pisoClassName="left-[-35%] right-[-120%] [mask-image:linear-gradient(90deg,transparent_0,#000_22%)]"
      />
      <Image
        src="/partequipos/maq-case-utility-plus.webp"
        alt=""
        width={1920}
        height={1344}
        quality={90}
        sizes="(max-width: 1280px) 80vw, 60vw"
        className="relative z-20 h-full w-auto max-w-none"
      />
    </div>
  );
}

// Estudio de la retroexcavadora, el mismo de maquinaria usada (UsedHero): vive
// en la caja del render (1920 × 1344), así todo sigue a la máquina a cualquier
// tamaño. La pared lleva una losa gris y una franja roja inclinadas que se apagan
// hacia arriba y hacia el piso; el horizonte va a la altura de los ejes (72 %)
// y debajo arranca un piso claro que se asienta en el blanco de la sección,
// así no hay corte con la sección siguiente. Encima del piso, el reflejo de
// las ruedas y las sombras de contacto. `id` separa los degradados de las dos
// copias (teléfono y escritorio).
function Estudio({ id, sizes, pisoClassName }: { id: string; sizes: string; pisoClassName: string }) {
  return (
    <>
      <Pared id={id} />
      <div
        className={`absolute top-[72%] h-[80%] bg-[linear-gradient(180deg,rgb(20_17_15/0)_0%,rgb(20_17_15/0.04)_1.5%,rgb(243_242_240/0.6)_3.5%,#f1f0ee_7%,#f5f4f2_22%,#fff_45%)] ${pisoClassName}`}
      />
      {/* reflejo: la misma foto volteada sobre la línea donde apoyan las
          ruedas (84 % de alto). La máscara va antes del volteo: deja ver solo
          la parte baja de las ruedas y la apaga pronto, un piso satinado */}
      <Image
        src="/partequipos/maq-case-utility-plus.webp"
        alt=""
        width={1920}
        height={1344}
        sizes={sizes}
        className="absolute inset-0 h-full w-full origin-[50%_84%] -scale-y-100 opacity-[0.16] blur-[1.5px] [mask-image:linear-gradient(180deg,transparent_72%,rgb(0_0_0/0.4)_79%,#000_84%,transparent_84.5%)]"
      />
      <SombrasCase id={id} />
    </>
  );
}

// Pared del estudio en coordenadas del render: una losa gris y una franja roja
// con la inclinación de las de maquinaria usada, reflejada (bajan hacia la
// izquierda, hacia el cucharón). Nacen a la altura de la cabina (fundido de y≈-100 a
// 300, así nunca tocan el título ni el borde de la sección) y el piso las
// tapa en el horizonte (y = 968).
function Pared({ id }: { id: string }) {
  return (
    <svg aria-hidden viewBox="0 0 1920 1344" className="absolute inset-0 h-full w-full overflow-visible">
      <defs>
        {/* rojo que entra desde arriba y baja pleno hasta el piso, que lo
            corta: ese corte es lo que hace leer el horizonte */}
        <linearGradient id={`${id}-roja`} gradientUnits="userSpaceOnUse" x1="0" y1="-250" x2="0" y2="968">
          <stop offset="0.12" stopColor="var(--brand)" stopOpacity="0" />
          <stop offset="0.42" stopColor="var(--brand)" />
          <stop offset="0.65" stopColor="var(--brand)" stopOpacity="0.9" />
          <stop offset="1" stopColor="var(--brand)" stopOpacity="0.55" />
        </linearGradient>
        <linearGradient id={`${id}-gris`} gradientUnits="userSpaceOnUse" x1="0" y1="-250" x2="0" y2="968">
          <stop offset="0.12" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.45" stopColor="#fff" />
        </linearGradient>
        <mask id={`${id}-pared`} maskUnits="userSpaceOnUse" x="-1000" y="-250" width="4000" height="1218">
          <rect x="-1000" y="-250" width="4000" height="1218" fill={`url(#${id}-gris)`} />
        </mask>
      </defs>
      <g mask={`url(#${id}-pared)`}>
        <polygon points="1760,-250 2060,-250 1110,968 810,968" fill="#d3d1ce" opacity="0.45" />
      </g>
      <polygon points="1330,-250 1530,-250 580,968 380,968" fill={`url(#${id}-roja)`} opacity="0.78" />
    </svg>
  );
}

// Sombras medidas sobre el render: las ruedas apoyan en y≈1128 (delantera de
// x≈560 a 700, trasera de 1080 a 1320) y el cucharón queda un poco en el aire
// sobre x≈40 a 240. Tres capas como en UsedHero: piso amplio y difuso,
// oclusión bajo cada rueda y un contacto oscuro y apretado donde tocan.
function SombrasCase({ id }: { id: string }) {
  return (
    <svg aria-hidden viewBox="0 0 1920 1344" className="absolute inset-0 h-full w-full overflow-visible">
      <defs>
        <filter id={`${id}-amplia`} x="-50%" y="-300%" width="200%" height="700%">
          <feGaussianBlur stdDeviation="30" />
        </filter>
        <filter id={`${id}-media`} x="-50%" y="-300%" width="200%" height="700%">
          <feGaussianBlur stdDeviation="13" />
        </filter>
        <filter id={`${id}-contacto`} x="-50%" y="-300%" width="200%" height="700%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>

      {/* piso: bajo toda la máquina, más cargado hacia atrás */}
      <ellipse cx="1000" cy="1140" rx="820" ry="46" fill="#14110f" opacity="0.26" filter={`url(#${id}-amplia)`} />
      <ellipse cx="150" cy="1134" rx="150" ry="20" fill="#14110f" opacity="0.2" filter={`url(#${id}-media)`} />

      {/* oclusión bajo cada rueda */}
      <ellipse cx="630" cy="1132" rx="120" ry="15" fill="#14110f" opacity="0.4" filter={`url(#${id}-media)`} />
      <ellipse cx="1200" cy="1132" rx="160" ry="17" fill="#14110f" opacity="0.4" filter={`url(#${id}-media)`} />

      {/* contacto */}
      <ellipse cx="630" cy="1128" rx="80" ry="8" fill="#14110f" opacity="0.7" filter={`url(#${id}-contacto)`} />
      <ellipse cx="1200" cy="1128" rx="105" ry="9" fill="#14110f" opacity="0.72" filter={`url(#${id}-contacto)`} />
    </svg>
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
        className="no-scrollbar -m-1 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-1 p-1 lg:grid lg:grid-cols-2 lg:overflow-visible 2xl:grid-cols-4"
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
      className="group relative isolate flex h-full min-h-[25rem] flex-col justify-start overflow-hidden rounded-[18px] bg-[#1f1d1b] p-4 pt-[52%] lg:min-h-0 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-brand lg:p-6 lg:pt-[28%] 2xl:p-[6%] 2xl:pt-[42%]"
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
      <span className="flex aspect-square w-[40%] max-w-[110px] min-w-[84px] items-center justify-center rounded-[14px] bg-white p-2.5 lg:w-[80px] lg:min-w-0 lg:rounded-[12px] lg:p-2 2xl:w-[40%] 2xl:min-w-[72px] 2xl:rounded-[14px] 2xl:p-2.5 shadow-[0_2px_6px_-2px_rgb(0_0_0/0.35)]">
        <Image
          src={m.logo.src}
          alt=""
          width={m.logo.ancho}
          height={m.logo.alto}
          sizes="100px"
          className="h-auto max-h-full w-full object-contain"
        />
      </span>
      <span className="mt-4 text-[15px] leading-snug text-white/90 lg:mt-3 lg:text-[14.5px] 2xl:mt-4 2xl:text-[14.5px]">{m.presentacion}</span>
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
