import Image from "next/image";
import { BRANDS, type Brand } from "../brands";

// Orden de la referencia; las marcas que no tienen logo en el proyecto (Eni,
// CF Undercarriage) se agregan aquí cuando lleguen sus SVG.
const ORDEN = ["Dynapac", "Yanmar", "Caterpillar", "Hitachi", "Case", "LiuGong"];
const MARCAS = ORDEN.map((n) => BRANDS.find((b) => b.name === n)).filter((b): b is Brand => b !== undefined);

// Sección de marcas, réplica de la referencia: título arriba a la izquierda, una
// banda blanca con los logos corriendo en bucle y la retroexcavadora Case a la
// derecha, por delante de la banda. Desde lg el panel mantiene su proporción
// 3:1 (alto = 33 % del ancho, con un mínimo) y todo se mide en % del panel o en
// `cqw`, así máquina, banda y franjas caen siempre en el mismo sitio. En
// teléfono se apila: título, máquina y la banda de logos.
export function MarcasSlider() {
  return (
    <section
      id="marcas"
      aria-labelledby="marcas-titulo"
      className="bg-bar px-3 pb-3 sm:px-5 sm:pb-5 lg:px-6 lg:pb-6"
    >
      <div className="@container relative isolate overflow-hidden rounded-[1.75rem] bg-bar lg:h-[max(26rem,33cqw)] lg:rounded-[2rem]">
        <Fondo />

        <div className="relative z-10 px-6 pt-10 sm:px-10 lg:absolute lg:top-[14%] lg:left-[5%] lg:p-0">
          <h2
            id="marcas-titulo"
            className="mt-2 text-[clamp(2rem,7vw,2.6rem)] leading-[1.04] font-semibold tracking-[-0.025em] text-on-bar lg:text-[clamp(2.2rem,3.3cqw,4rem)]"
          >
            Marcas que mueven
            <br />
            <span className="text-brand">tu operación</span>
          </h2>
        </div>

        {/* Máquina, medida sobre el render (1920×1344): el compactador
            ocupa x≈10–91 % e y≈12–93 % (sombra incluida), así que su centro
            visible cae al 52,5 % de la caja. Desde lg va centrada en vertical
            en el panel (top 50 % y subida 49 %, un poco menos que 52,5 %): la
            cabina alta hace que el centro geométrico se vea arriba, así que
            baja unos píxeles para verse centrada en perspectiva. Va por
            delante de la banda de logos, como en la referencia. */}
        <div className="relative z-20 mx-auto mt-4 aspect-[1920/1344] w-[min(85%,34rem)] lg:absolute lg:top-1/2 lg:right-[3%] lg:mt-0 lg:w-[46%] lg:-translate-y-[49%]">
          {/* el render de Dynapac trae su propia sombra de contacto */}
          <Image
            src="/partequipos/maq-dynapac-banner.png"
            alt="Compactador Dynapac CA3500D"
            fill
            quality={90}
            sizes="(min-width: 1024px) 46vw, 85vw"
            className="object-contain"
          />
        </div>

        {/* banda blanca: en escritorio va del borde izquierdo hasta debajo de
            la máquina y se funde a la derecha para que los logos entren y
            salgan por detrás del brazo */}
        <div className="relative z-10 mt-2 mb-6 bg-bar py-5 lg:absolute lg:top-[45%] lg:left-0 lg:my-0 lg:w-[66%] lg:py-[max(1.3rem,1.8cqw)] lg:[mask-image:linear-gradient(90deg,#000_80%,transparent)]">
          <Carrusel />
        </div>
      </div>
    </section>
  );
}

// Los logos corren en bucle con CSS: la pista lleva la lista dos veces y se
// desplaza la mitad, así el empalme no se nota. Se pausa con el mouse encima y
// con movimiento reducido queda quieta (y se puede desplazar a mano).
function Carrusel() {
  return (
    <div className="marcas-carrusel overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)] lg:[mask-image:linear-gradient(90deg,transparent,#000_8%)] lg:pl-[5%]">
      <ul aria-label="Marcas que trabajamos" className="marcas-pista flex w-max items-center">
        {[...MARCAS, ...MARCAS].map((b, i) => (
          <li
            key={`${b.name}-${i}`}
            aria-hidden={i >= MARCAS.length || undefined}
            className="flex shrink-0 items-center"
          >
            <span className="flex h-16 w-[13.5rem] items-center justify-center px-5 lg:h-[max(4rem,5.2cqw)] lg:w-[max(14.5rem,18cqw)] lg:px-[max(1.5rem,2cqw)]">
              {/* eslint-disable-next-line @next/next/no-img-element -- SVG vectorial */}
              <img
                src={b.logoOnLight ?? b.logo}
                alt={i < MARCAS.length ? b.name : ""}
                className="max-h-11 w-auto max-w-full object-contain lg:max-h-[max(2.75rem,3.5cqw)]"
              />
            </span>
            <span aria-hidden className="block h-14 w-px rounded-full bg-on-bar/12 lg:h-[max(3.5rem,4.4cqw)]" />
          </li>
        ))}
      </ul>
    </div>
  );
}

// Fondo del panel: losas diagonales claras y una franja roja con el mismo
// degradado de la franja del hero de maquinaria usada, entrando por arriba a
// la derecha, más un piso claro bajo la máquina. Anclado a la derecha
// (`xMaxYMid slice`) y apagado hacia la izquierda para dejar limpio el texto.
// Las losas bajan hasta el borde inferior y el piso las tapa: así no terminan
// en seco a media altura.
function Fondo() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1000 333"
      preserveAspectRatio="xMaxYMid slice"
      // en teléfono el panel es alto y angosto: el `slice` agrandaría la
      // franja hasta taparlo todo, así que el fondo empieza en lg
      className="pointer-events-none absolute inset-0 -z-10 hidden h-full w-full lg:block"
    >
      <defs>
        <linearGradient id="marcas-izq" gradientUnits="userSpaceOnUse" x1="380" y1="0" x2="640" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#fff" />
        </linearGradient>
        <mask id="marcas-mask" maskUnits="userSpaceOnUse" x="0" y="-100" width="1000" height="500">
          <rect x="0" y="-100" width="1000" height="500" fill="url(#marcas-izq)" />
        </mask>
        <linearGradient id="marcas-roja" gradientUnits="userSpaceOnUse" x1="0" y1="-20" x2="0" y2="250">
          <stop offset="0" stopColor="var(--brand)" />
          <stop offset="0.45" stopColor="var(--brand)" stopOpacity="0.92" />
          <stop offset="0.75" stopColor="var(--brand)" stopOpacity="0.45" />
          <stop offset="1" stopColor="var(--brand)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="marcas-piso" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="0.3" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="0.55" stopColor="#ffffff" />
          <stop offset="1" stopColor="#ffffff" />
        </linearGradient>
      </defs>
      {/* todas con la misma inclinación: bajan 1 y se corren 0,62 a la
          izquierda; arrancan por encima del borde superior, que las recorta */}
      <g mask="url(#marcas-mask)">
        <polygon points="642,-20 772,-20 549,340 419,340" fill="#d8d6d3" opacity="0.45" />
        <polygon points="772,-20 862,-20 639,340 549,340" fill="#ebe9e6" opacity="0.5" />
        <polygon points="1020,-20 1120,-20 897,340 797,340" fill="#d8d6d3" opacity="0.4" />
        <polygon points="862,-20 920,-20 763,233 705,233" fill="url(#marcas-roja)" opacity="0.85" />
      </g>
      {/* el piso va fuera de la máscara y a todo el ancho: dentro de ella
          quedaba a media opacidad en la zona de fundido y dejaba ver el pie
          de las losas como un bloque claro */}
      <rect x="-1000" y="225" width="3000" height="120" fill="url(#marcas-piso)" />
    </svg>
  );
}
