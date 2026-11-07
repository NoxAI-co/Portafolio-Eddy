import Image from "next/image";
import Link from "next/link";

// Maquinaria pesada nueva: a la izquierda el rótulo y el título con «nueva»
// en rojo; a la derecha, la foto de obra (que ya se funde a blanco
// por la izquierda y trae las franjas rojas) con la retroexcavadora Case
// Utility Plus grande arriba a la derecha, de fondo.
// Debajo, una tarjeta por marca: arriba un panel del color
// de la marca con su logo, una franja de luz en diagonal y la máquina parada
// sobre un paisaje de montañas; abajo, en blanco, el botón.
// Hitachi, Case, Dynapac y Yanmar abren su landing; LiuGong la distribuye
// Maquitecno: su tarjeta muestra los dos logos y su botón lleva a ese sitio. Desde lg las cinco van en fila;
// más angosto, en una tira que se desliza. Al final, «Ver todo».
const VER_TODO =
  "https://partequipos.vercel.app/maquinaria-pesada/maquinaria-pesada-nueva/tipos/";
type MarcaNueva = {
  slug: string;
  nombre: string;
  /** Logo en la versión que se lee sobre el panel (blanco sobre colores
      oscuros, original sobre claros). */
  logo: { src: string; ancho: number; alto: number };
  /** Máquina recortada (sin fondo) que va sobre el paisaje. */
  maquina: { src: string; ancho: number; alto: number; alt: string };
  /** Degradado del panel: de arriba a la izquierda hacia abajo a la derecha. */
  panel: [string, string];
  /** Franja de luz en diagonal: blanca sobre colores, oscura sobre claros. */
  luz: string;
  href: string;
  externo?: { etiqueta: string };
  /** Distribuidor que se muestra bajo el logo de la marca (LiuGong: Maquitecno). */
  distribuidor?: {
    nombre: string;
    logo: { src: string; ancho: number; alto: number };
  };
};

const MARCAS: MarcaNueva[] = [
  {
    slug: "hitachi",
    nombre: "Hitachi LANDCROS",
    logo: {
      src: "/partequipos/repuestos/marcas/hitachi-landcros-blanco.webp",
      ancho: 640,
      alto: 313,
    },
    maquina: {
      src: "/partequipos/nueva/hitachi.webp",
      ancho: 900,
      alto: 731,
      alt: "Excavadora Hitachi LANDCROS ZX210",
    },
    panel: ["#e8571a", "#f58a3c"],
    luz: "rgb(255 255 255 / 0.16)",
    href: "/lab/partequipos/hitachi",
  },
  {
    slug: "case",
    nombre: "CASE Construction",
    logo: { src: "/partequipos/marcas/case/logo.png", ancho: 299, alto: 100 },
    maquina: {
      src: "/partequipos/nueva/case.webp",
      ancho: 900,
      alto: 510,
      alt: "Retroexcavadora CASE 580N",
    },
    panel: ["#f6ead4", "#efd7a6"],
    luz: "rgb(255 255 255 / 0.45)",
    href: "/lab/partequipos/case",
  },
  {
    slug: "dynapac",
    nombre: "Dynapac",
    logo: {
      src: "/partequipos/nueva/dynapac-logo-blanco.webp",
      ancho: 258,
      alto: 39,
    },
    maquina: {
      src: "/partequipos/nueva/dynapac.webp",
      ancho: 900,
      alto: 606,
      alt: "Vibrocompactador Dynapac CA1500D",
    },
    panel: ["#c8141f", "#e8323a"],
    luz: "rgb(255 255 255 / 0.14)",
    href: "/lab/partequipos/dynapac",
  },
  {
    slug: "yanmar",
    nombre: "Yanmar",
    logo: { src: "/partequipos/marcas/yanmar/logo.png", ancho: 299, alto: 100 },
    maquina: {
      src: "/partequipos/nueva/yanmar.webp",
      ancho: 900,
      alto: 586,
      alt: "Miniexcavadora Yanmar ViO80",
    },
    panel: ["#ffffff", "#e9e9eb"],
    luz: "rgb(20 17 15 / 0.05)",
    href: "/lab/partequipos/yanmar",
  },
  {
    slug: "liugong",
    nombre: "LiuGong",
    logo: {
      src: "/partequipos/nueva/liugong-logo.webp",
      ancho: 900,
      alto: 168,
    },
    maquina: {
      src: "/partequipos/nueva/liugong.webp",
      ancho: 900,
      alto: 691,
      alt: "Excavadora LiuGong",
    },
    // panel claro para que el logo vaya con sus colores (azul y naranja)
    panel: ["#ffffff", "#e3ebf7"],
    luz: "rgb(14 42 102 / 0.07)",
    distribuidor: {
      nombre: "Maquitecno",
      logo: {
        src: "/partequipos/nueva/maquitecno-logo.webp",
        ancho: 228,
        alto: 57,
      },
    },
    href: "https://maquitecno.co/",
    externo: { etiqueta: "Visitar Maquitecno.co" },
  },
];

export function MaquinariaNueva() {
  return (
    <section
      id="nueva"
      aria-labelledby="nueva-titulo"
      className="relative isolate overflow-hidden bg-bar px-5 pt-12 pb-14 sm:px-10 lg:px-[2.6%] lg:pt-16 lg:pb-16"
    >
      <Fondo />

      <div className="relative z-10 lg:max-w-[50%] lg:pt-[clamp(1rem,3vw,3.5rem)] xl:max-w-[46%]">
        <p className="m-0 text-sm font-semibold text-brand-deep sm:text-base">
          Venta de maquinaria
        </p>
        <h2
          id="nueva-titulo"
          className="m-0 mt-3 text-[clamp(2.1rem,7vw,2.8rem)] leading-[1.08] font-bold tracking-[-0.025em] text-balance text-on-bar lg:text-[clamp(2.3rem,3.5vw,4rem)]"
        >
          Maquinaria{" "}
          <span className="whitespace-nowrap">
            pesada <span className="text-brand">nueva</span>
          </span>
        </h2>
      </div>

      {/* por debajo de lg la máquina va entre el texto y las tarjetas */}
      <EscenaCompacta />

      <ul className="no-scrollbar relative z-10 -mx-5 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pt-1 pb-3 [mask-image:linear-gradient(90deg,#000_88%,transparent)] sm:-mx-10 sm:scroll-px-10 sm:px-10 lg:mx-0 lg:mt-[clamp(3.5rem,7vw,7rem)] lg:grid lg:grid-cols-5 lg:gap-4 xl:gap-5 lg:overflow-visible lg:px-0 lg:pb-0 lg:[mask-image:none] 2xl:gap-6">
        {MARCAS.map((m) => (
          <li
            key={m.slug}
            className="w-[72%] shrink-0 snap-start sm:w-[40%] md:w-[30%] lg:w-auto"
          >
            <Tarjeta marca={m} />
          </li>
        ))}
      </ul>

      <div className="relative z-10 mt-8 flex justify-center lg:mt-10">
        <a
          href={VER_TODO}
          className="inline-flex min-h-12 items-center gap-3 rounded-full bg-brand px-9 text-base font-semibold text-on-brand transition-colors hover:bg-brand-deep focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brand lg:min-h-14 lg:px-11 lg:text-lg"
        >
          <IconoEngranaje />
          Ver todo
        </a>
      </div>
    </section>
  );
}

// Fondo de la sección desde lg: la foto de obra (montañas, piso y las franjas
// rojas arriba a la derecha) a todo el ancho y con su proporción, anclada
// arriba, que se funde a blanco hacia abajo, con la retroexcavadora Case
// Utility Plus grande arriba a la derecha; las tarjetas le tapan la parte de
// abajo. La foto ya es blanca por la izquierda y un velo deja el título y la
// frase sobre claro.
function Fondo() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 hidden lg:block"
    >
      <div className="absolute inset-x-0 top-0 aspect-[1921/819] [mask-image:linear-gradient(180deg,#000_0%,#000_62%,transparent_100%)]">
        <Image
          src="/partequipos/texturas/fondo-nueva-2.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          quality={85}
          className="object-cover object-[100%_0%]"
        />
        <span className="absolute inset-0 bg-[linear-gradient(100deg,rgb(255_255_255/0.95)_0%,rgb(255_255_255/0.8)_40%,rgb(255_255_255/0)_58%)] xl:bg-[linear-gradient(100deg,rgb(255_255_255/0.9)_0%,rgb(255_255_255/0.55)_30%,rgb(255_255_255/0)_50%)]" />
      </div>
      <div className="absolute top-[3%] right-[3%] aspect-[1920/1344] w-[min(44%,46rem)] xl:top-[2%] xl:w-[min(42%,48rem)]">
        <Image
          src="/partequipos/maq-case-utility-plus.webp"
          alt=""
          fill
          priority
          sizes="44vw"
          quality={90}
          className="object-contain"
        />
      </div>
    </div>
  );
}

// Por debajo de lg la retroexcavadora va entre el texto y las tarjetas, sobre
// la misma foto de obra.
function EscenaCompacta() {
  return (
    <div
      aria-hidden
      className="pointer-events-none relative -mx-5 mt-6 aspect-[16/9] sm:-mx-10 lg:hidden"
    >
      <Image
        src="/partequipos/texturas/fondo-nueva-2.jpg"
        alt=""
        fill
        sizes="100vw"
        quality={80}
        className="object-cover object-[100%_70%] [mask-image:linear-gradient(180deg,#000_60%,transparent)]"
      />
      <div className="absolute inset-x-[6%] top-[2%] bottom-[2%]">
        <Image
          src="/partequipos/maq-case-utility-plus.webp"
          alt=""
          fill
          sizes="90vw"
          quality={90}
          className="object-contain"
        />
      </div>
    </div>
  );
}

// Tarjeta de marca: arriba, el panel del color de la marca con su logo, una
// franja de luz en diagonal y, al pie, un paisaje de montañas (se funde con el
// color por arriba) con la máquina parada encima; abajo, en blanco, el botón.
// Al pasar el cursor la máquina avanza un poco y el botón se rellena de rojo.
function Tarjeta({ marca: m }: { marca: MarcaNueva }) {
  const externo = Boolean(m.externo);
  const contenido = (
    <>
      <span
        className="relative block aspect-[1/0.94] overflow-hidden"
        style={{
          background: `linear-gradient(150deg, ${m.panel[0]} 0%, ${m.panel[1]} 100%)`,
        }}
      >
        <span
          aria-hidden
          className="absolute -top-[10%] right-[8%] h-[85%] w-[30%] -skew-x-[30deg]"
          style={{
            background: `linear-gradient(180deg, ${m.luz} 0%, transparent 100%)`,
          }}
        />
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-[52%] [mask-image:linear-gradient(180deg,transparent_0%,#000_45%)]"
        >
          <Image
            src="/partequipos/texturas/fondo-obra.jpg"
            alt=""
            fill
            sizes="(max-width: 640px) 80vw, (max-width: 1024px) 36vw, 32vw"
            quality={75}
            className="object-cover object-bottom"
          />
        </span>
        {m.distribuidor ? (
          // logo de la marca y, debajo, «Distribuido por» con el logo del
          // distribuidor; ocupa el mismo alto que el logo de las demás
          <span className="absolute top-[7%] left-[10%] flex h-[26%] w-[80%] flex-col items-center justify-center gap-[6%]">
            <Image
              src={m.logo.src}
              alt={m.nombre}
              width={m.logo.ancho}
              height={m.logo.alto}
              sizes="220px"
              className="h-auto max-h-[52%] w-auto max-w-[88%] object-contain"
            />
            <span className="flex max-h-[34%] items-center gap-1.5 text-[0.7rem] leading-none font-medium whitespace-nowrap text-on-bar-dim">
              Distribuido por
              <Image
                src={m.distribuidor.logo.src}
                alt={m.distribuidor.nombre}
                width={m.distribuidor.logo.ancho}
                height={m.distribuidor.logo.alto}
                sizes="120px"
                className="h-[1.15rem] w-auto object-contain"
              />
            </span>
          </span>
        ) : (
          <span className="absolute top-[7%] left-[10%] flex h-[24%] w-[80%] items-center justify-center">
            <Image
              src={m.logo.src}
              alt={m.nombre}
              width={m.logo.ancho}
              height={m.logo.alto}
              sizes="220px"
              className="h-auto max-h-full w-auto max-w-full object-contain"
            />
          </span>
        )}
        <span className="absolute inset-x-[3%] bottom-[2%] h-[62%]">
          <Image
            src={m.maquina.src}
            alt={m.maquina.alt}
            fill
            sizes="(max-width: 640px) 70vw, (max-width: 1024px) 34vw, 30vw"
            quality={90}
            className="object-contain object-bottom transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:translate-x-1.5 motion-reduce:transition-none"
          />
        </span>
      </span>

      <span className="block p-4 lg:p-3.5 xl:p-4">
        <span
          className={`flex min-h-11 items-center justify-center gap-2 rounded-full px-3 text-[0.95rem] font-semibold whitespace-nowrap transition-colors lg:text-[0.85rem] xl:text-[0.95rem] ${
            externo
              ? "bg-brand text-on-brand group-hover:bg-brand-deep"
              : "border-[1.5px] border-brand text-brand-deep group-hover:bg-brand group-hover:text-on-brand"
          }`}
        >
          {externo ? (
            // en tarjetas angostas (md a xl) solo el dominio; va en un solo
            // span para que el gap del botón no separe las dos palabras
            <span>
              <span className="md:max-xl:sr-only">Visitar </span>
              {m.externo!.etiqueta.replace(/^Visitar /, "")}
            </span>
          ) : (
            "Ver maquinaria"
          )}
          {externo ? <FlechaAfuera /> : <FlechaDerecha />}
        </span>
      </span>
    </>
  );

  const clases =
    "group relative flex h-full flex-col overflow-hidden rounded-[1.25rem] bg-bar  shadow-[0_1px_2px_rgb(20_17_15/0.06),0_8px_18px_-12px_rgb(20_17_15/0.25)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brand";

  return externo ? (
    <a
      href={m.href}
      target="_blank"
      rel="noopener noreferrer"
      className={clases}
    >
      {contenido}
      <span className="sr-only"> (se abre en otra pestaña)</span>
    </a>
  ) : (
    <Link href={m.href} className={clases}>
      {contenido}
    </Link>
  );
}

function FlechaDerecha() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
    </svg>
  );
}

function FlechaAfuera() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M6 3.5h6.5V10M12.5 3.5 4 12" />
    </svg>
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
