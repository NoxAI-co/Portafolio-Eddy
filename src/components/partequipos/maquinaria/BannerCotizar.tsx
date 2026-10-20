import Image from "next/image";
import { PartequiposWordmark } from "../brand/PartequiposWordmark";

const COTIZAR =
  "https://wa.me/573176707071?text=" +
  encodeURIComponent("Hola, quiero cotizar maquinaria pesada.");

// Banner de cierre, réplica de la referencia. Desde lg el panel mantiene su
// proporción 4,8:1 (alto = 20,8 % del ancho de la sección, con un mínimo para
// que quepa el texto; no se usa aspect-ratio porque con min-height ensancharía
// el panel) y todo se mide en % del panel o en `cqw` (ancho del contenedor):
// texto, máquina y franjas escalan juntos y caen siempre en el mismo sitio. En
// teléfono la máquina baja debajo del texto.
export function BannerCotizar() {
  return (
    <section
      aria-labelledby="banner-cotizar-titulo"
      className="@container bg-bar px-3 pb-3 sm:px-5 sm:pb-5 lg:px-6 lg:pb-6"
    >
      <div className="@container relative isolate overflow-hidden rounded-[1.25rem] bg-[#1c1c1c] lg:h-[max(15rem,20.8cqw)] lg:rounded-[max(0.75rem,0.8cqw)]">
        <Fondo className="-z-10 hidden lg:block" />
        <Montanas className="-z-10 hidden lg:block" />
        <Franjas id="cta-franja-lg" className="-z-10 hidden lg:block" />

        <div className="relative z-10 px-8 pt-9 sm:px-12 lg:flex lg:h-full lg:flex-col lg:justify-center lg:px-0 lg:py-0 lg:pl-[7%]">
          {/* la caja toma el ancho del título y centra en ella el logo y el
              botón */}
          <div className="flex w-fit flex-col items-center">
            <PartequiposWordmark
              className="h-9 w-auto lg:h-[clamp(1.9rem,2.5cqw,3.2rem)]"
              textColor="#ffffff"
              pColor="var(--brand)"
            />

            <h2
              id="banner-cotizar-titulo"
              className="mt-4 text-[2rem] leading-[1.04] font-bold tracking-[-0.02em] text-white lg:mt-[1cqw] lg:text-[clamp(1.85rem,2.85cqw,3.4rem)]"
            >
              Tu operación
              <br />
              <span className="text-brand">no se detiene</span>
            </h2>

            <a
              href={COTIZAR}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-fit items-center gap-2.5 rounded-full bg-brand px-[1.1rem] py-2 text-[0.85rem] font-semibold text-on-brand transition-colors hover:bg-brand-lift focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brand-pale active:bg-brand-deep lg:mt-[1.5cqw] lg:px-[max(1.1rem,1.35cqw)] lg:py-[max(0.55rem,0.58cqw)] lg:text-[max(0.85rem,0.86cqw)]"
            >
              <IconoWhatsapp />
              Escríbenos
            </a>
          </div>
        </div>

        {/* Máquina completa, medida sobre el render (1920×1344): el
            compactador con su sombra ocupa x≈10–91 % e y≈12–86 %. Al 127 % del
            alto del panel y subido un 12 %, va del 3 % al 97 % del alto: entra
            entera, sin que el panel corte nada. Desde el 48 % del ancho la
            máquina va del 52 % al 82 %. */}
        <div className="relative mt-6 h-[clamp(11rem,50vw,18rem)] lg:absolute lg:inset-0 lg:mt-0 lg:h-auto">
          <Fondo className="[mask-image:linear-gradient(180deg,transparent,#000_40%)] lg:hidden" />
          <Montanas className="[mask-image:linear-gradient(180deg,transparent,#000_30%,#000_70%,transparent)] lg:hidden" />
          <Franjas id="cta-franja-sm" className="[mask-image:linear-gradient(180deg,transparent,#000_22%)] lg:hidden" />
          <div className="absolute right-[-2%] bottom-[-6%] w-[96%] lg:top-[-12%] lg:right-auto lg:bottom-auto lg:left-[48%] lg:h-[127%] lg:w-auto">
            <Image
              src="/partequipos/maq-dynapac-banner.png"
              alt="Compactador Dynapac CA3500D"
              width={1920}
              height={1344}
              sizes="(max-width: 1024px) 92vw, 40vw"
              className="relative h-auto w-full lg:h-full lg:w-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// Fondo del banner: muro negro con ruido fino y piso de grava, una sola imagen generada
// en la proporción del panel, 5,4:1 (ver scripts/generar-fondo-cta.cjs). Desde
// lg cubre el panel entero. En teléfono el panel es alto, así que va solo en la
// caja de la máquina y se funde hacia arriba con el gris del panel.
function Fondo({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 bg-[url(/partequipos/texturas/fondo-cta-v3.webp)] bg-cover bg-[position:100%_100%] ${className}`}
    />
  );
}

// Cordillera en la pared, sobre el horizonte del piso (75 % del alto): foto
// con cielo transparente, oscurecida y casi sin color (ver
// scripts/generar-montanas-cta.cjs) para que el texto y el rojo manden. Las
// cumbres asoman hacia el 18 % del alto; la capa va al 70 %, se funde al llegar
// al piso y se concentra a la derecha: desaparece antes de la mitad izquierda,
// donde va el texto.
function Montanas({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-x-0 top-0 h-[78%] overflow-hidden opacity-70 [mask-image:linear-gradient(180deg,#000_82%,transparent),linear-gradient(90deg,transparent_32%,rgb(0_0_0/0.45)_50%,#000_68%)] [mask-composite:intersect] [-webkit-mask-composite:source-in] ${className}`}
    >
      <Image
        src="/partequipos/texturas/montanas-cta.webp"
        alt=""
        width={2400}
        height={980}
        sizes="100vw"
        className="absolute top-[23%] right-0 h-auto w-[115%] max-w-none"
      />
    </div>
  );
}

// Franjas con el mismo lenguaje del hero de maquinaria usada: losas oscuras
// alternas apenas más claras y más hondas que el muro (terminan en el
// horizonte, nunca sobre el piso), y tres franjas rojas con el degradado de la
// franja del hero: rojo pleno arriba que se va apagando al bajar, una parte
// fuerte y la otra opaca. Sobre negro van al 95 %: al 78 % del hero el rojo
// quedaba marrón. Medidas
// sobre la referencia en un lienzo con la proporción del panel (1000×185),
// todas con la misma inclinación (bajan 1 y se corren 0,62 a la izquierda).
// Arrancan por encima del borde superior, que las recorta.
const INCLINACION = 0.62;
const LOSAS = [
  { x: 560, ancho: 120, fill: "#ffffff", opacity: 0.035 },
  { x: 680, ancho: 20, fill: "#000000", opacity: 0.25 },
  { x: 860, ancho: 60, fill: "#ffffff", opacity: 0.03 },
];
const FRANJAS = [
  { x: 704, ancho: 32, fin: 175 },
  { x: 792, ancho: 54, fin: 200 },
  { x: 930, ancho: 46, fin: 230 },
];

// `id` distinto por copia: hay una para escritorio y otra para teléfono, y
// si compartieran ids la oculta (display:none) dejaría sin pintar a la otra
function Franjas({ id, className = "" }: { id: string; className?: string }) {
  const y0 = -20;
  const banda = (x: number, ancho: number, fin: number) => {
    const arriba = x - y0 * INCLINACION;
    const abajo = x - fin * INCLINACION;
    return `${arriba},${y0} ${arriba + ancho},${y0} ${abajo + ancho},${fin} ${abajo},${fin}`;
  };
  return (
    <svg
      aria-hidden
      viewBox="0 0 1000 185"
      preserveAspectRatio="xMaxYMid slice"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    >
      <defs>
        {FRANJAS.map((f, i) => (
          <linearGradient key={i} id={`${id}-${i}`} gradientUnits="userSpaceOnUse" x1="0" y1={y0} x2={f.fin * 0.3 * INCLINACION} y2={f.fin}>
            <stop offset="0" stopColor="var(--brand)" />
            <stop offset="0.42" stopColor="var(--brand)" stopOpacity="0.95" />
            <stop offset="0.72" stopColor="var(--brand)" stopOpacity="0.45" />
            <stop offset="1" stopColor="var(--brand)" stopOpacity="0" />
          </linearGradient>
        ))}
      </defs>
      {LOSAS.map((l, i) => (
        <polygon key={`l${i}`} points={banda(l.x, l.ancho, 139)} fill={l.fill} opacity={l.opacity} />
      ))}
      <g opacity={0.95}>
        {FRANJAS.map((f, i) => (
          <polygon key={i} points={banda(f.x, f.ancho, f.fin)} fill={`url(#${id}-${i})`} />
        ))}
      </g>
    </svg>
  );
}

// Glifo oficial de WhatsApp (Simple Icons), en el color del texto del botón
function IconoWhatsapp() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-[1.2em] shrink-0"
      fill="currentColor"
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}
