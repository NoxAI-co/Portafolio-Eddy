import Image from "next/image";
import type { CSSProperties } from "react";
import { Flecha } from "../maquinaria/UsedHero";
import { rutaModelo, slugModelo, type Marca, type Modelo, type TipoMaquina } from "./marcas";
import { EnlaceTransicion } from "./transicion";

const WHATSAPP = "https://wa.me/573176707071";

// Una sección por tipo de máquina con sus modelos: título grande y filete
// arriba como en la landing del sitio, y tarjetas blancas con la foto pegada
// arriba, nombre, tres datos y dos botones con flecha. La rejilla tiene 6 columnas (4 en tablet) y cada
// tarjeta ocupa 2: van de a 3 por fila y, cuando la última fila queda corta
// (o son 4, como los minicargadores), se centran. Cada tarjeta es un subgrid
// de 4 filas para que foto, nombre, datos y botones queden a la misma altura
// en toda la fila aunque un nombre ocupe dos líneas.
export function ModelosMarca({
  marca,
  detalle = false,
}: {
  marca: Marca;
  /** Franja, máquina y enlace a la categoría a la derecha del título. */
  detalle?: boolean;
}) {
  return (
    <div
      className="pb-[100px] max-sm:pb-36"
      style={{ "--marca-acento": marca.acento, "--marca-tinta": marca.acentoTinta ?? "#100f0f" } as CSSProperties}
    >
      {marca.tipos.map((t, n) => (
        <section
          key={t.id}
          id={`tipo-${t.id}`}
          aria-labelledby={`tipo-${t.id}-titulo`}
          className={`mx-[5%] mt-10 scroll-mt-28 border-t border-black/[0.12] pt-10 [@media(max-width:1024px)]:mx-[2%] [@media(max-width:767px)]:mx-5 [@media(max-width:767px)]:mt-[30px] [@media(max-width:767px)]:pt-[30px] ${
            detalle ? "relative isolate" : ""
          }`}
        >
          {detalle ? (
            // el detalle se ancla a este bloque: arranca en el filete de la
            // sección y termina dentro de las tarjetas, que lo tapan
            <div className="relative">
              <DetalleTipo tipo={t} />
              <EncabezadoNumerado tipo={t} n={n} />
            </div>
          ) : (
            <EncabezadoNumerado tipo={t} n={n} />
          )}
          <GrillaModelos marca={marca} tipo={t} />
        </section>
      ))}
    </div>
  );
}

// Encabezado de cada tipo en la página de la marca, centrado: el número de
// sección tenue, una barra del color de la marca y el nombre. En teléfono se
// apila para que los nombres largos (Compactador de doble rodillo) no se salgan.
export function EncabezadoNumerado({
  tipo,
  n,
  idTitulo = `tipo-${tipo.id}-titulo`,
}: {
  tipo: TipoMaquina;
  n: number;
  idTitulo?: string;
}) {
  return (
    <h2
      id={idTitulo}
      className="m-0 mb-[30px] flex items-center justify-center gap-8 text-[55px] leading-[1.1] font-bold text-[#100f0f] [@media(max-width:1024px)]:gap-6 [@media(max-width:1024px)]:text-[40px] [@media(max-width:767px)]:flex-col [@media(max-width:767px)]:gap-3 [@media(max-width:767px)]:text-[8vw]"
    >
      <span aria-hidden className="text-[1.4em] leading-none text-[#d6d4d1] tabular-nums">
        {String(n + 1).padStart(2, "0")}
      </span>
      <span
        aria-hidden
        className="h-[1.3em] w-[2px] rounded-full bg-[var(--marca-acento)] [@media(max-width:767px)]:h-[2px] [@media(max-width:767px)]:w-8"
      />
      <span>{tipo.nombre}</span>
    </h2>
  );
}

// A la derecha del título: una franja diagonal del color de la marca que
// nace en el filete de la sección y baja hasta meterse detrás de las tarjetas, el
// render del tipo en gris tenue apoyado sobre ellas y el enlace a la
// categoría, pequeño, en el hueco entre el título y las tarjetas.
//
// La franja y la máquina ocupan 300 px pegados al borde derecho y solo se
// muestran cuando caben al lado del título centrado. El título mide unos
// 33 px por letra más ~160 px de número y barra, y la sección es el 90 % de
// la pantalla, así que la pantalla mínima es (título + 2 × 310) / 0.9. Por
// debajo queda solo el enlace.
const DESDE = [
  [1280, "xl:block"],
  [1440, "min-[1440px]:block"],
  [1600, "min-[1600px]:block"],
  [1920, "min-[1920px]:block"],
] as const;

// Borde derecho de la última tarjeta de la primera fila, para que el enlace
// quede sobre ella: escritorio (6 columnas, hueco 32 px; fila centrada de 1
// o 2) y tablet (4 columnas, hueco 20 px; solo una tarjeta se centra).
const BORDE_LG = ["", "min-[1025px]:right-[calc((100%-160px)/3+64px)]", "min-[1025px]:right-[calc((100%-160px)/6+32px)]", "min-[1025px]:right-0"];

function DetalleTipo({ tipo }: { tipo: TipoMaquina }) {
  const cantidad = tipo.modelos.length;
  const enFila = cantidad === 4 ? 2 : Math.min(cantidad, 3);
  const minimo = (33 * tipo.nombre.length + 160 + 620) / 0.9;
  // la franja tiene que caer sobre una tarjeta: con la fila centrada (1 o 2)
  // debajo del borde derecho no hay ninguna, así que ahí va solo el enlace
  const desde = enFila === 3 ? (DESDE.find(([px]) => minimo <= px)?.[1] ?? "") : "";
  const bordeMd = cantidad === 1 ? "min-[768px]:right-[calc((100%-60px)/4+20px)]" : "min-[768px]:right-0";
  return (
    <>
      {/* del filete de la sección (40 px por encima del bloque) a 30 px
          dentro de las tarjetas: debajo del título van sus 30 px de margen */}
      <span
        aria-hidden
        className={`pointer-events-none absolute top-[-40px] right-0 bottom-[-60px] -z-10 hidden w-[300px] ${desde}`}
      >
        <span className="absolute top-0 right-[160px] bottom-0 w-[44px] -skew-x-[30deg] bg-[var(--marca-acento)] opacity-80" />
        <span className="absolute right-0 bottom-[22px] h-[150px] w-[210px]">
          <Image src={tipo.imagen} alt="" fill sizes="210px" className="object-contain object-bottom opacity-30 grayscale" />
        </span>
      </span>
      <a
        href={tipo.categoria}
        className={`group/ver absolute right-0 bottom-[-25px] z-10 ${bordeMd} ${BORDE_LG[enFila]} inline-flex items-center gap-2 text-[13px] font-semibold text-[#100f0f] transition-colors hover:text-[#56545a] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--marca-acento)]`}
      >
        Ver toda la categoría
        <Flecha className="size-3.5 text-[var(--marca-acento)] transition-transform duration-300 group-hover/ver:translate-x-1" />
      </a>
    </>
  );
}

// La rejilla de tarjetas de un tipo, sin encabezado. Necesita --marca-acento
// en un ancestro.
export function GrillaModelos({ marca, tipo }: { marca: Marca; tipo: TipoMaquina }) {
  return (
    <ul className="m-0 grid list-none grid-cols-1 gap-x-8 p-0 min-[768px]:grid-cols-4 min-[1025px]:grid-cols-6 [@media(max-width:1024px)]:gap-x-5">
      {tipo.modelos.map((m, i) => (
        <li
          key={m.nombre}
          className={`row-span-4 mb-8 grid grid-rows-subgrid gap-y-0 overflow-hidden rounded-[14px] bg-white shadow-[0_1px_2px_rgb(16_15_15/0.06),0_6px_16px_-10px_rgb(16_15_15/0.18)] min-[768px]:col-span-2 ${columna(i, tipo.modelos.length)}`}
        >
          <TarjetaModelo modelo={m} href={rutaModelo(marca, m)} />
        </li>
      ))}
    </ul>
  );
}

// Dónde arranca cada tarjeta para centrar la última fila: con 4 en escritorio
// van de a 2 (columnas 2–3 y 4–5); si sobra una va al centro (3–4) y si
// sobran dos arrancan en la 2. En tablet (de a 2) la última impar se centra.
function columna(i: number, n: number) {
  let lg = "";
  if (n === 4) lg = i % 2 === 0 ? "min-[1025px]:col-start-2" : "min-[1025px]:col-start-4";
  else if (n % 3 === 1 && i === n - 1) lg = "min-[1025px]:col-start-3";
  else if (n % 3 === 2 && i === n - 2) lg = "min-[1025px]:col-start-2";

  const md = n % 2 === 1 && i === n - 1 ? "min-[768px]:col-start-2" : "";
  if (md && !lg) lg = "min-[1025px]:col-start-auto";
  return `${md} ${lg}`;
}

function TarjetaModelo({ modelo, href }: { modelo: Modelo; href: string }) {
  const cotizar = `${WHATSAPP}?text=${encodeURIComponent(`Hola, quiero cotizar ${modelo.nombre}.`)}`;
  const id = `modelo-${modelo.nombre.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  // la foto de la tarjeta es la que se transforma en la de la ficha
  const foto = `[data-foto="${slugModelo(modelo)}"]`;

  return (
    <>
      {/* la foto va pegada arriba y a los lados: la tarjeta la recorta con su
          radio; solo el contenido de abajo lleva relleno. También abre la
          ficha, y es la que se transforma en la foto grande de la ficha */}
      <EnlaceTransicion
        href={href}
        origen={foto}
        destino="[data-foto-ficha]"
        tabIndex={-1}
        aria-hidden
        data-foto={slugModelo(modelo)}
        className="relative block h-60 bg-[#f0f0f0] [@media(max-width:767px)]:h-[210px]"
      >
        <Image
          src={modelo.imagen}
          alt=""
          fill
          sizes="(max-width: 767px) 90vw, (max-width: 1024px) 45vw, 560px"
          className="object-cover"
        />
      </EnlaceTransicion>

      <h3 id={id} className="m-0 px-6 pt-6 text-lg leading-[1.25] font-semibold text-[#100f0f] uppercase">
        {modelo.nombre}
      </h3>

      <ul className="m-0 mt-3 flex list-none flex-col px-6 py-0">
        {modelo.datos.map((d) => (
          <li
            key={d.etiqueta}
            title={`${d.etiqueta}: ${d.valor}`}
            className="flex items-center gap-3.5 border-b border-black/10 py-2.5 text-[15px] text-[#100f0f]"
          >
            <Icono tipo={d.icono} />
            <span className="line-clamp-2 min-w-0">
              <strong className="font-semibold">{d.etiqueta}:</strong> {d.valor}
            </span>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-3 self-start px-6 pt-5 pb-6">
        <EnlaceTransicion
          href={href}
          origen={foto}
          destino="[data-foto-ficha]"
          aria-describedby={id}
          className={`${BOTON} border-[var(--marca-acento)] bg-[var(--marca-acento)] text-[var(--marca-tinta)]`}
        >
          Ver ficha
          <Flecha className="transition-transform duration-300 group-hover/boton:translate-x-1" />
        </EnlaceTransicion>
        <a
          href={cotizar}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Cotizar ${modelo.nombre}`}
          className={`${BOTON} border-[var(--marca-acento)] bg-white text-[#100f0f]`}
        >
          Cotizar
          <Flecha className="text-[var(--marca-acento)] transition-[translate,color] duration-300 group-hover/boton:translate-x-1 group-hover/boton:text-white" />
        </a>
      </div>
    </>
  );
}

// Los dos botones comparten forma; al pasar el cursor se rellenan de tinta y
// la flecha se corre un poco, sin que el botón se mueva.
const BOTON =
  "group/boton inline-flex min-h-11 items-center justify-center gap-3.5 rounded-full border px-6 text-base leading-none font-semibold transition-colors hover:border-[#100f0f] hover:bg-[#100f0f] hover:text-white focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#100f0f]";

// Íconos de los datos (peso, potencia, motor), los mismos trazos del sitio.
// También los usa la ficha del modelo.
export function Icono({ tipo }: { tipo: Modelo["datos"][number]["icono"] }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-[22px] flex-none text-[#e5242d]"
      aria-hidden
    >
      {tipo === "peso" && (
        <>
          <path d="M9 6a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
          <path d="M6.835 9h10.33a1 1 0 0 1 .984 .821l1.637 9a1 1 0 0 1 -.984 1.179h-13.604a1 1 0 0 1 -.984 -1.179l1.637 -9a1 1 0 0 1 .984 -.821" />
        </>
      )}
      {tipo === "potencia" && <path d="M13 3l0 7l6 0l-8 11l0 -7l-6 0l8 -11" />}
      {tipo === "motor" && (
        <>
          <path d="M3 10v6" />
          <path d="M12 5v3" />
          <path d="M10 5h4" />
          <path d="M5 13h-2" />
          <path d="M6 10h2l2 -2h3.382a1 1 0 0 1 .894 .553l1.448 2.894a1 1 0 0 0 .894 .553h1.382v-2h2a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-2v-2h-3v2a1 1 0 0 1 -1 1h-3.465a1 1 0 0 1 -.832 -.445l-1.703 -2.555h-2v-6" />
        </>
      )}
    </svg>
  );
}
