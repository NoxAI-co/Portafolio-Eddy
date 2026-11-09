import Image from "next/image";

// Ficha de repuestos de un modelo (rediseño de la del sitio de Partequipos,
// …/repuestos-excavadora-case-construction-cx350b/): sobre blanco, con una luz
// diagonal del color de la marca arriba a la derecha, las migas; la cabecera
// con el logo, una separación y el modelo con su línea, y los botones de
// cotización y WhatsApp a la derecha (debajo por debajo de xl); las categorías de repuestos en tarjetas
// (5 por fila; 2 en teléfono) y los otros modelos del mismo tipo, con la franja
// del color de la marca arriba. Los datos de cada modelo están en fichas.ts.
export type FichaModelo = {
  marca: {
    nombre: string;
    logo: { src: string; ancho: number; alto: number };
    color: string;
    /** Panel de las tarjetas de categoría (degradado y franja de luz), como
        el de la tarjeta de la marca en Maquinaria nueva. Debe ser claro: las
        fotos de fondo blanco se funden con él. */
    panel: [string, string];
    luz: string;
    /** Color de la flecha sobre `color` cuando el blanco no se lee (CASE). */
    tintaAcento?: string;
    /** Logo recortado al borde, para las tarjetas de otros modelos (el de la
        cabecera trae aire alrededor). Si falta, se usa `logo`. */
    logoCompacto?: { src: string; ancho: number; alto: number };
    /** Ancho máximo del logo compacto, para que logos muy anchos (Yanmar) no
        pesen más que los otros. Por defecto 9.5rem. */
    logoCompactoAncho?: string;
  };
  tipo: string;
  modelo: string;
  linea: string;
  migas: { texto: string; href?: string }[];
  cotizar: string;
  whatsapp: string;
  categorias: { nombre: string; imagen: string; href: string }[];
  /** `detalle`: línea pequeña bajo el modelo (por ejemplo, la serie). */
  otros: {
    modelo: string;
    detalle?: string;
    nombreCompleto: string;
    href: string;
  }[];
};

export function FichaModeloRepuestos({ ficha: f }: { ficha: FichaModelo }) {
  const tituloCategorias = `Repuestos disponibles para ${f.tipo} ${f.marca.nombre} ${f.modelo}`;
  return (
    <div className="relative isolate overflow-hidden bg-white px-5 pt-7 pb-14 text-[#100f0f] sm:px-8 md:px-[3.5%] md:pt-9 md:pb-16">
      {/* luz diagonal del color de la marca arriba a la derecha, detrás de todo */}
      <span
        aria-hidden
        className="pointer-events-none absolute top-0 right-[22%] -z-10 hidden h-[17rem] w-[11%] -skew-x-[32deg] md:block"
        style={{
          background: `linear-gradient(180deg, ${f.marca.color}55 0%, ${f.marca.color}1f 45%, transparent 100%)`,
        }}
      />

      <nav aria-label="Ruta de navegación" className="text-sm">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[#4b5563]">
          {f.migas.map((m, i) => (
            <li key={m.texto} className="flex items-center gap-x-2">
              {m.href ? (
                <a className="underline hover:text-[#111827]" href={m.href}>
                  {m.texto}
                </a>
              ) : (
                <span aria-current="page" className="text-[#111827]">
                  {m.texto}
                </span>
              )}
              {i < f.migas.length - 1 && <span aria-hidden>/</span>}
            </li>
          ))}
        </ol>
      </nav>

      {/* cabecera: logo, separación y el modelo con su línea; los botones a la
          derecha en la misma fila desde xl */}
      <section
        aria-labelledby="modelo-titulo"
        className="mt-6 lg:mt-7 xl:flex xl:items-center xl:gap-10"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-7 xl:flex-1">
          <Image
            src={f.marca.logo.src}
            alt={`Logo de ${f.marca.nombre}`}
            width={f.marca.logo.ancho}
            height={f.marca.logo.alto}
            sizes="180px"
            className="h-11 w-auto max-w-[170px] flex-none sm:h-[3.25rem]"
          />
          <span
            aria-hidden
            className="hidden h-[4.5rem] w-px flex-none rounded-full bg-[#d4d4d4] sm:block"
          />
          <div className="min-w-0">
            <h1
              id="modelo-titulo"
              className="m-0 text-[30px] leading-[1.15] font-semibold tracking-[-0.02em] md:text-[38px]"
            >
              {f.tipo} {f.modelo}
            </h1>
            <p className="m-0 mt-2 max-w-[34rem] text-[15px] leading-[1.55] text-[#56545a]">
              {f.linea}
            </p>
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap xl:mt-0 xl:flex-none">
          <a
            href={f.cotizar}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#100f0f] px-6 text-base font-semibold text-white transition-colors hover:bg-[#2e2e2e] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#100f0f]"
          >
            <IconoMensaje />
            Pedir cotización
          </a>
          <a
            href={f.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#0f7b45] px-6 text-base font-semibold text-white transition-colors hover:bg-[#0b6438] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#0f7b45]"
          >
            <IconoWhatsapp />
            Escríbenos por WhatsApp
            <span className="sr-only"> (se abre en otra pestaña)</span>
          </a>
        </div>
      </section>

      <section
        aria-labelledby="modelo-categorias-titulo"
        className="mt-11 md:mt-14"
      >
        <TituloSeccion id="modelo-categorias-titulo">
          {tituloCategorias}
        </TituloSeccion>
        {/* 5 por fila; con 4 o menos categorías, 4 por fila para no dejar hueco */}
        <ul
          className={`m-0 mt-5 grid list-none grid-cols-2 gap-3 p-0 md:gap-4 ${
            f.categorias.length <= 4
              ? "lg:grid-cols-4"
              : "sm:grid-cols-3 lg:grid-cols-5"
          }`}
        >
          {f.categorias.map((c) => (
            <li key={c.nombre} className="flex min-w-0">
              <Baldosa categoria={c} marca={f.marca} />
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-labelledby="otros-modelos-titulo"
        className="mt-12 md:mt-14"
      >
        <TituloSeccion id="otros-modelos-titulo">
          Otros modelos de {f.tipo} {f.marca.nombre}
        </TituloSeccion>
        {/* con muchos modelos (Yanmar 5, Hitachi 25): 2 por fila en tablet, 3
            en lg, 4 en xl y 5 en 2xl, para que los modelos largos quepan en
            una línea; con 3 o menos, 3 por fila desde md */}
        <ul
          className={`m-0 mt-5 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2 md:gap-4 ${
            f.otros.length > 3
              ? "lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
              : "md:grid-cols-3"
          }`}
        >
          {f.otros.map((o) => (
            <li key={o.modelo}>
              <TarjetaModelo modelo={o} marca={f.marca} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

// Tarjeta de otro modelo, en dos capas: un contenedor blanco con borde gris
// suave y una sombra corta, y dentro, separado por un margen, el panel con su
// propio filo (así se ve encajado, con relieve). En el panel: el logo de la
// marca, el modelo grande (y su serie, si la tiene) y, abajo a la derecha, una
// barrida gris curva con el botón del color de la marca encima: lado izquierdo
// inclinado, esquina de arriba redondeada y la flecha. Al pasar el cursor la
// flecha avanza y la barrida se oscurece un poco.
function TarjetaModelo({
  modelo: o,
  marca,
}: {
  modelo: FichaModelo["otros"][number];
  marca: FichaModelo["marca"];
}) {
  return (
    <a
      href={o.href}
      aria-label={o.nombreCompleto}
      className="group block h-full rounded-[1.375rem] border border-[#e6e6e6] bg-white p-1.5 shadow-[0_1px_2px_rgb(16_15_15/0.05),0_10px_18px_-14px_rgb(16_15_15/0.35)] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#100f0f]"
    >
      <span className="relative flex h-full min-h-[6.75rem] flex-col justify-center gap-2.5 overflow-hidden rounded-[1rem] bg-white py-5 pr-[4.75rem] pl-5 shadow-[0_0_0_1px_#ececec,0_1px_3px_rgb(16_15_15/0.07)]">
        {/* barrida gris: el borde de un círculo grande que entra desde
            abajo a la derecha */}
        <span
          aria-hidden
          className="absolute top-[26%] left-[60%] aspect-square w-[85%] rounded-full bg-[#f0f0f0] transition-colors duration-300 group-hover:bg-[#e9e9e9]"
        />
        <span
          className="relative block h-6 max-w-full"
          style={{ width: marca.logoCompactoAncho ?? "9.5rem" }}
        >
          <Image
            src={(marca.logoCompacto ?? marca.logo).src}
            alt=""
            fill
            sizes="152px"
            className="object-contain object-left"
          />
        </span>
        <span className="relative flex flex-col gap-0.5">
          {/* guion que no se corta: «ZX270LC-3» no se parte en el guion */}
          <span className="text-[1.65rem] leading-[1.1] font-bold tracking-[-0.01em] [overflow-wrap:anywhere] lg:text-[1.3rem] 2xl:text-[1.5rem]">
            {o.modelo.replaceAll("-", "\u2011")}
          </span>
          {o.detalle && (
            <span className="text-sm leading-[1.3] text-[#56545a]">
              {o.detalle}
            </span>
          )}
        </span>
        {/* botón de la esquina: un bloque inclinado (lado izquierdo en
            diagonal, esquina de arriba redondeada) que sale por la derecha y
            por abajo; el panel lo recorta con su propio redondeo */}
        <span
          aria-hidden
          className="absolute right-[-1rem] bottom-0 h-[2.45rem] w-[5.4rem] -skew-x-[24deg] rounded-tl-[0.8rem]"
          style={{ background: marca.color }}
        />
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="absolute right-[1.05rem] bottom-[0.5rem] size-[1.4rem] transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none"
          style={{ color: marca.tintaAcento ?? "#ffffff" }}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14M13 18l6-6M13 6l6 6" />
        </svg>
      </span>
    </a>
  );
}

// Título de sección.
function TituloSeccion({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  return (
    <h2
      id={id}
      className="m-0 text-[19px] leading-[1.25] font-semibold md:text-[22px]"
    >
      <span className="min-w-0">{children}</span>
    </h2>
  );
}

// Tarjeta de categoría, como las tarjetas de marca de Maquinaria nueva: arriba
// un panel del color de la marca (degradado y franja de luz en diagonal) con la
// foto del repuesto; abajo, en blanco, el nombre y el botón «Ver productos» de
// contorno rojo, pegado al pie para que los de una fila queden alineados. Las
// fotos con fondo blanco se funden con el panel (multiplicar). Al pasar el
// cursor la foto se acerca y el botón se rellena de rojo.
function Baldosa({
  categoria: c,
  marca,
}: {
  categoria: FichaModelo["categorias"][number];
  marca: FichaModelo["marca"];
}) {
  return (
    <a
      href={c.href}
      className="group flex w-full flex-col overflow-hidden rounded-[1.25rem] bg-white shadow-[0_1px_2px_rgb(20_17_15/0.06),0_8px_18px_-12px_rgb(20_17_15/0.25)] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#100f0f]"
    >
      <span
        className="relative block aspect-[1/0.82] overflow-hidden"
        style={{
          background: `linear-gradient(150deg, ${marca.panel[0]} 0%, ${marca.panel[1]} 100%)`,
        }}
      >
        <span
          aria-hidden
          className="absolute -top-[10%] right-[8%] h-[85%] w-[30%] -skew-x-[30deg]"
          style={{
            background: `linear-gradient(180deg, ${marca.luz} 0%, transparent 100%)`,
          }}
        />
        <span className="absolute inset-[9%]">
          <Image
            src={c.imagen}
            alt=""
            fill
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 18vw"
            className="object-contain mix-blend-multiply transition-transform duration-500 ease-[cubic-bezier(.33,1,.68,1)] group-hover:scale-[1.06] motion-reduce:transition-none"
          />
        </span>
      </span>
      <span className="flex flex-1 flex-col px-4 pt-4 pb-4 md:px-5 md:pb-5">
        <span className="mb-4 block text-center text-[15px] leading-[1.25] font-bold text-balance [overflow-wrap:anywhere] md:text-base">
          {c.nombre}
        </span>
        <span
          aria-hidden
          className="mt-auto flex min-h-10 items-center justify-center gap-2 rounded-full border-[1.5px] border-[#e5242d] px-3 text-[0.9rem] font-semibold whitespace-nowrap text-[#c81e26] transition-colors duration-300 group-hover:bg-[#e5242d] group-hover:text-white"
        >
          Ver productos
          <svg
            viewBox="0 0 16 16"
            className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
          </svg>
        </span>
      </span>
    </a>
  );
}

function IconoMensaje() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 20l1.3-3.9c-2.324-3.437-1.426-7.872 2.1-10.374 3.526-2.501 8.59-2.296 11.845.48 3.255 2.777 3.695 7.266 1.029 10.501-2.666 3.235-7.615 4.215-11.574 2.293L3 20" />
    </svg>
  );
}

function IconoWhatsapp() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
    </svg>
  );
}
