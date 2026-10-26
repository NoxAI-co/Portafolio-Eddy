import Image from "next/image";
import type { CSSProperties } from "react";
import { Flecha } from "../maquinaria/UsedHero";
import { GrillaModelos } from "../marca/ModelosMarca";
import { getMarca, type Marca, type TipoMaquina } from "../marca/marcas";

// Página de categoría: excavadoras nuevas de todas las marcas. Arriba un
// hero con foto; abajo, por marca, un banner con su logo y el conteo, y las
// mismas tarjetas de las landings de marca (abren la ficha con la transición). Los modelos
// salen de los datos de cada marca, así no hay dos listas.
type Grupo = {
  marca: Marca;
  tipo: TipoMaquina;
  logo: { src: string; ancho: number; alto: number };
  foto: string;
  /** Nombre corto de la marca para el título del banner. */
  corto: string;
  /** Banner oscuro (título en blanco) en vez de claro. */
  oscuro?: boolean;
};

const EXC = "/partequipos/excavadoras";

function grupo(slug: string, extra: Omit<Grupo, "marca" | "tipo">): Grupo {
  const marca = getMarca(slug)!;
  return { marca, tipo: marca.tipos.find((t) => t.id === "excavadoras")!, ...extra };
}

const GRUPOS: Grupo[] = [
  grupo("case", {
    logo: { src: `${EXC}/logo-case.webp`, ancho: 228, alto: 69 },
    foto: `${EXC}/banner-case.jpg`,
    corto: "Case",
  }),
  grupo("hitachi", {
    logo: { src: `${EXC}/logo-hitachi-blanco.webp`, ancho: 600, alto: 178 },
    oscuro: true,
    foto: `${EXC}/banner-hitachi.jpg`,
    corto: "Hitachi",
  }),
];

export function ExcavadorasNuevas() {
  const total = GRUPOS.reduce((n, g) => n + g.tipo.modelos.length, 0);
  return (
    <main className="flex-1 bg-[#f0f0f0] pb-[100px] max-sm:pb-36">
      <section aria-labelledby="excavadoras-titulo" className="px-[1.5vw] pt-6">
        <div className="relative isolate flex min-h-[62vh] flex-col items-center justify-center overflow-hidden rounded-[30px] bg-[#1f1d1b] px-[6%] py-16 text-center text-white">
          <Image src={`${EXC}/hero.jpg`} alt="" fill priority sizes="100vw" className="-z-10 object-cover" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-black opacity-55 mix-blend-multiply" />
          <p className="m-0 text-base text-white/80">Maquinaria pesada nueva</p>
          <h1
            id="excavadoras-titulo"
            className="m-0 mt-2 text-[55px] leading-[1.1] font-semibold [@media(max-width:1024px)]:text-[40px] [@media(max-width:767px)]:text-[10vw]"
          >
            Excavadora
          </h1>
          <p className="m-0 mt-4 max-w-[38rem] text-base leading-relaxed text-white/85">
            {total} modelos nuevos de {GRUPOS.map((g) => g.marca.nombre).join(" y ")}, con respaldo oficial, servicio
            técnico y repuestos originales en Colombia.
          </p>
          {/* atajos a cada marca */}
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            {GRUPOS.map((g) => (
              <a
                key={g.marca.slug}
                href={`#excavadoras-${g.marca.slug}`}
                className="group/ir inline-flex min-h-10 items-center gap-2.5 rounded-full bg-white/12 px-5 text-sm font-semibold backdrop-blur-md transition-colors hover:bg-white hover:text-[#100f0f] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white"
              >
                {g.marca.nombre}
                <span className="text-white/60 tabular-nums group-hover/ir:text-[#56545a]">{g.tipo.modelos.length}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {GRUPOS.map((g) => (
        <section
          key={g.marca.slug}
          id={`excavadoras-${g.marca.slug}`}
          aria-labelledby={`excavadoras-${g.marca.slug}-titulo`}
          className="mx-[5%] mt-14 scroll-mt-6 [@media(max-width:1024px)]:mx-[2%] [@media(max-width:767px)]:mx-5 [@media(max-width:767px)]:mt-10"
          style={{ "--marca-acento": g.marca.acento, "--marca-tinta": g.marca.acentoTinta ?? "#100f0f" } as CSSProperties}
        >
          <BannerMarca grupo={g} />
          <div className="mt-5">
            <GrillaModelos marca={g.marca} tipo={g.tipo} />
          </div>
        </section>
      ))}
    </main>
  );
}

// Banner de marca: a la izquierda el logo sobre una forma del color de la
// marca con el borde en diagonal y las esquinas redondeadas (un rectángulo
// sesgado con radio); junto a ella el título y el conteo sobre un tono claro
// de la marca (u oscuro, según la marca); a la derecha la foto, teñida con el
// color de la marca, que se oscurece hacia el borde donde va «Ver marca». En
// teléfono es una tarjeta blanca simple: el logo en su bloque de color, el
// título y el conteo, y una flecha a la marca.
function BannerMarca({ grupo: g }: { grupo: Grupo }) {
  const n = g.tipo.modelos.length;
  // en teléfono es una tarjeta blanca: el color queda solo en el bloque del
  // logo; desde md, el banner de color completo
  const base = g.oscuro ? "bg-white md:bg-[#1c1613]" : "bg-white md:bg-[color-mix(in_oklab,var(--marca-acento)_58%,white)]";
  const tinta = g.oscuro ? "text-[#100f0f] md:text-white" : "text-[#100f0f]";

  return (
    <header
      className={`relative isolate flex min-h-[88px] items-stretch overflow-hidden rounded-[14px] ${base} shadow-[0_1px_2px_rgb(16_15_15/0.06),0_6px_16px_-10px_rgb(16_15_15/0.18)] md:grid md:shadow-none md:min-h-[108px] md:grid-cols-[22%_minmax(0,1fr)_auto] md:items-center`}
    >
      {/* foto: entra desde la mitad, teñida con el color de la marca y
          oscurecida al borde derecho. En teléfono ocupa la mitad derecha,
          disuelta en diagonal hacia el texto */}
      <span
        aria-hidden
        className="absolute top-0 right-0 -z-10 hidden h-full w-[62%] md:block md:[mask-image:linear-gradient(to_right,transparent_0%,rgb(0_0_0/0.55)_30%,#000_55%)]"
      >
        <Image src={g.foto} alt="" fill sizes="(max-width: 767px) 62vw, 62vw" className="object-cover" />
        <span className="absolute inset-0 bg-[linear-gradient(90deg,var(--marca-acento)_0%,var(--marca-acento)_25%,transparent_70%)] opacity-80 mix-blend-multiply" />
        <span className="absolute inset-0 bg-[linear-gradient(to_left,rgb(20_14_12/0.75)_0%,rgb(20_14_12/0.35)_28%,transparent_55%)]" />
      </span>

      {/* forma del logo: sesgada desde abajo, así el borde diagonal sube hacia
          la derecha y las esquinas de la derecha quedan redondeadas; el borde
          izquierdo lo recorta el propio banner */}
      {/* forma de atrás: la misma, 22 px más ancha y en un tono más oscuro de
          la marca; asoma por la diagonal y da profundidad */}
      <span
        aria-hidden
        className="absolute top-0 bottom-0 left-[-100px] hidden w-[calc(22%+100px-2.2rem+22px)] origin-bottom -skew-x-[30deg] rounded-r-[16px] bg-[color-mix(in_oklab,var(--marca-acento)_72%,#3a1a00)] md:block"
      />
      <span
        aria-hidden
        className="absolute top-0 bottom-0 left-[-100px] hidden w-[calc(22%+100px-2.2rem)] origin-bottom -skew-x-[30deg] rounded-r-[16px] bg-[var(--marca-acento)] md:block"
      />

      {/* en teléfono, el bloque del logo con su esquina en diagonal */}
      <div className="relative flex w-[36%] shrink-0 items-center justify-center bg-[var(--marca-acento)] pr-[6%] pl-3 [clip-path:polygon(0_0,100%_0,84%_100%,0_100%)] md:w-auto md:bg-transparent md:pr-[3.5rem] md:pl-0 md:[clip-path:none]">
        <span className="flex items-center">
          <Image
            src={g.logo.src}
            alt={g.marca.nombre}
            width={g.logo.ancho}
            height={g.logo.alto}
            sizes="180px"
            className="h-auto max-h-9 w-auto max-w-full object-contain md:max-h-12 md:max-w-[170px]"
          />
        </span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-center py-3 pl-3 md:block md:py-0 md:pl-[calc(1.5%+28px)]">
        <h2
          id={`excavadoras-${g.marca.slug}-titulo`}
          className={`m-0 text-[18px] leading-tight font-bold md:text-[clamp(1.5rem,2.2vw,2.1rem)] ${tinta}`}
        >
          {g.tipo.nombre} {g.corto}
        </h2>
        <p className={`m-0 mt-0.5 text-[13px] font-medium opacity-60 md:text-[15px] md:opacity-70 ${tinta}`}>
          {n} {n === 1 ? "modelo" : "modelos"}
        </p>
      </div>

      <div className="flex shrink-0 items-center pr-4 pl-2 md:block md:pr-8 md:pl-4">
        <a
          href={`/lab/partequipos/${g.marca.slug}`}
          aria-label={`Ver marca ${g.marca.nombre}`}
          className="group/ver inline-flex size-10 items-center justify-center rounded-full bg-[#100f0f] text-sm font-semibold whitespace-nowrap text-white transition-colors hover:bg-[#100f0f] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--marca-acento)] md:size-auto md:min-h-11 md:gap-6 md:border-[1.5px] md:border-[var(--marca-acento)] md:bg-[#100f0f]/85 md:px-6 md:focus-visible:outline-white"
        >
          <span className="max-md:sr-only">Ver marca</span>
          <Flecha className="text-[var(--marca-acento)] transition-transform duration-300 group-hover/ver:translate-x-1" />
        </a>
      </div>
    </header>
  );
}
