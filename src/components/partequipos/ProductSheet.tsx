import Image from "next/image";
import Link from "next/link";
import { ProductGallery } from "./ProductGallery";
import { formatoNumero, type Equipo } from "./equipos";
import { PHONE, PHONE_HREF } from "./contacto";

// Ficha de producto: la propia foto del equipo, desenfocada, es el ambiente
// de la sección; un velo blanco entra desde la derecha para
// que el texto se lea sin caja. La foto nítida y las miniaturas van a la
// izquierda, montadas sobre su propia versión borrosa.
export function ProductSheet({ equipo }: { equipo: Equipo }) {
  const nombre = `${equipo.tipo} ${equipo.marca} ${equipo.modelo}`;
  const esNueva = equipo.condicion === "nueva";
  const categoria = `Maquinaria pesada ${equipo.condicion}`;
  const whatsapp = `https://wa.me/573176707071?text=${encodeURIComponent(
    equipo.serial
      ? `Hola, me interesa la ${nombre} (serial ${equipo.serial}).`
      : `Hola, me interesa este equipo nuevo: ${nombre}.`,
  )}`;

  // solo los datos que el equipo tiene: a un equipo nuevo no se le inventan
  // año ni serial
  const datos = [
    esNueva && { icono: <IconoCondicion />, etiqueta: "Condición", valor: "Nueva" },
    equipo.peso !== undefined && {
      icono: <IconoPeso />,
      etiqueta: "Peso",
      valor: `${formatoNumero.format(equipo.peso)} t`,
    },
    equipo.anio !== undefined && { icono: <IconoAnio />, etiqueta: "Año", valor: String(equipo.anio) },
    equipo.serial !== undefined && { icono: <IconoSerial />, etiqueta: "Serial", valor: equipo.serial },
    { icono: <IconoHoras />, etiqueta: "Horas", valor: formatoNumero.format(equipo.horas) },
  ].filter(<T,>(d: T | false): d is T => d !== false);

  return (
    <section className="px-3 pt-3 pb-10 sm:px-5 sm:pt-5 lg:px-14 lg:pt-8">
      {/* móvil: ruta → título → fotos → descripción → datos → cotizar.
          escritorio: galería a la izquierda, centrada contra el texto; a la
          derecha, la ruta arriba y el bloque de texto centrado entre dos
          filas elásticas. La caja ocupa todo el ancho con margen parejo y es
          blanca del lado del texto. */}
      <div className="relative isolate mx-auto grid gap-y-7 overflow-hidden rounded-3xl bg-bar ring-1 ring-bar-line/60 px-5 py-7 sm:px-10 sm:py-9 lg:min-h-[calc(100svh-9rem)] lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:grid-rows-[auto_1fr_auto_auto_1fr] lg:gap-x-14 lg:gap-y-0 lg:px-14 lg:py-9 xl:gap-x-20 xl:px-20">
        {/* ambiente: la foto principal escalada para que el desenfoque no
            deje ver sus bordes grises dentro del recorte */}
        <div aria-hidden className="absolute inset-0 -z-10">
          <Image
            src={equipo.ambiente ?? equipo.fotos[0].src}
            alt=""
            fill
            sizes="60vw"
            quality={40}
            className="scale-110 object-cover blur-2xl saturate-[1.15]"
          />
          {/* velo claro, disuelto con muchas paradas para que no aparezca una
              línea donde termina. En móvil la foto queda arriba, así que el
              ambiente asoma solo alrededor de la galería y el velo vuelve a
              cerrarse bajo el texto; en escritorio entra desde la derecha. */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--bar)_0%,var(--bar)_14%,rgb(255_255_255/0.8)_20%,rgb(255_255_255/0.5)_28%,rgb(255_255_255/0.5)_40%,rgb(255_255_255/0.8)_48%,rgb(255_255_255/0.95)_55%,rgb(255_255_255/0.95)_100%)] lg:bg-[linear-gradient(to_left,var(--bar)_0%,var(--bar)_38%,rgb(255_255_255/0.9)_41%,rgb(255_255_255/0.7)_44%,rgb(255_255_255/0.45)_47%,rgb(255_255_255/0.25)_50%,rgb(255_255_255/0.1)_53%,rgb(255_255_255/0.03)_56%,transparent_59%)]" />
        </div>

        <nav aria-label="Ruta" className="-mb-1 text-sm text-on-bar-dim lg:col-start-2 lg:row-start-1 lg:mb-0">
          <ol className="flex flex-wrap items-center gap-x-2">
            <li>
              <Link href="/lab/partequipos" className="transition-colors hover:text-on-bar">
                Inicio
              </Link>
            </li>
            <li aria-hidden className="text-bar-line">/</li>
            <li>
              <Link href="/lab/partequipos" className="transition-colors hover:text-on-bar">
                {categoria}
              </Link>
            </li>
            <li aria-hidden className="text-bar-line">/</li>
            <li aria-current="page" className="font-medium text-on-bar">
              {equipo.modelo}
            </li>
          </ol>
        </nav>

          <h1 className="max-w-xl text-[2rem] leading-[1.1] font-extrabold tracking-tight text-balance text-on-bar md:text-[2.6rem] lg:col-start-2 lg:row-start-3 lg:self-end">
            {equipo.tipo} {equipo.marca}{" "}
            <span className="whitespace-nowrap">{equipo.modelo}</span>
          </h1>

        <div className="lg:col-start-1 lg:row-[3/5] lg:self-center">
          <ProductGallery fotos={equipo.fotos} />
        </div>

          <div className="max-w-xl lg:col-start-2 lg:row-start-4 lg:mt-6 lg:self-start">
            <p className="text-lg leading-snug text-on-bar">{equipo.linea}</p>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-on-bar-dim">
              <strong className="font-semibold text-on-bar">
                {esNueva ? "Partequipos Maquinaria Nueva." : "Partequipos Usados Premium."}
              </strong>{" "}
              {!esNueva && "Equipo revisado, en excelente estado y listo para obra. "}
              {equipo.resumen}
            </p>

            {/* datos en vidrio: detrás de las fichas va la foto del equipo
                muy desenfocada y disuelta en óvalo, para que el vidrio tenga
                color que esmerilar sin dejar ningún borde a la vista */}
            <div className="relative isolate mt-6">
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-x-8 -inset-y-10 -z-10 opacity-50 [mask-image:radial-gradient(closest-side,#000_35%,transparent)]"
              >
                <Image
                  src={equipo.ambiente ?? equipo.fotos[0].src}
                  alt=""
                  fill
                  sizes="400px"
                  quality={30}
                  className="object-cover blur-xl saturate-150"
                />
              </div>

              <dl id="ficha-tecnica" className="grid scroll-mt-40 grid-cols-2 gap-3">
                {datos.map((d) => (
                  <div
                    key={d.etiqueta}
                    className="flex items-center gap-3.5 rounded-2xl bg-white/55 px-4 py-3.5 shadow-[inset_0_1px_0_rgb(255_255_255/0.9),0_1px_2px_rgb(20_17_15/0.07),0_6px_12px_-8px_rgb(20_17_15/0.18)] ring-1 ring-white/70 backdrop-blur-xl backdrop-saturate-150 sm:px-5 sm:py-4"
                  >
                    <span className="shrink-0 text-brand">{d.icono}</span>
                    <div className="min-w-0">
                      <dt className="text-xs text-on-bar-dim">{d.etiqueta}</dt>
                      <dd className="text-base leading-tight font-semibold break-all tabular-nums text-on-bar sm:text-lg">
                        {d.valor}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-edge bg-brand px-5 py-3 text-sm font-semibold text-on-brand transition-colors hover:bg-brand-lift active:bg-brand-deep"
              >
                Cotizar este equipo
                <svg viewBox="0 0 16 16" className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M5 11l6-6M6 5h5v5" />
                </svg>
              </a>
              <p className="text-sm text-on-bar-dim">
                o llama al{" "}
                <a href={PHONE_HREF} className="font-medium text-on-bar hover:text-brand-deep">
                  {PHONE}
                </a>
              </p>
            </div>
          </div>
      </div>

      {/* descripción y comentarios bajo la caja, sobre la misma rejilla
          7/5 para que cada bloque caiga bajo la galería y bajo el texto */}
      {(equipo.descripcion || equipo.comentarios) && (
        <div className="mt-10 grid gap-10 px-2 sm:px-5 lg:mt-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-x-14 lg:px-14 xl:gap-x-20 xl:px-20">
          {equipo.descripcion && (
            <section aria-labelledby="descripcion" className="max-w-2xl">
              <h2 id="descripcion" className="text-xl font-bold tracking-tight text-on-bar">
                Descripción de la máquina
              </h2>
              <div className="mt-4 space-y-3 text-[0.95rem] leading-relaxed text-on-bar-dim">
                {equipo.descripcion.map((parrafo) => (
                  <p key={parrafo}>{parrafo}</p>
                ))}
              </div>
            </section>
          )}

          {equipo.comentarios && (
            <section
              aria-labelledby="comentarios"
              className={equipo.descripcion ? "" : "lg:col-start-2"}
            >
              <h2 id="comentarios" className="text-xl font-bold tracking-tight text-on-bar">
                Comentarios del equipo
              </h2>
              <ul className="mt-4 space-y-2.5 text-[0.95rem] leading-relaxed text-on-bar">
                {equipo.comentarios.map((c) => (
                  <li key={c} className="flex gap-3">
                    <IconoCheck />
                    {c}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}
    </section>
  );
}

// marca de cada comentario: el mismo trazo de 1.75 de los iconos de la ficha,
// alineado a la primera línea del texto
function IconoCheck() {
  return (
    <svg viewBox="0 0 24 24" className="mt-[0.2rem] size-[1.1rem] shrink-0 text-brand" aria-hidden>
      <path {...trazo} d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

// Iconos de la ficha: trazo de 1.75 sobre rejilla de 24, y cada uno lleva una
// sola pieza rellena (la pesa, el día marcado, la barra del código, la aguja
// del horómetro) que es el dato al que apunta.
const trazo = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function IconoCondicion() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" aria-hidden>
      <path {...trazo} d="M3.5 12.2V5a1.5 1.5 0 0 1 1.5-1.5h7.2l8.1 8.1a1.5 1.5 0 0 1 0 2.1l-6.6 6.6a1.5 1.5 0 0 1-2.1 0z" />
      <circle cx="8.3" cy="8.3" r="2" fill="currentColor" />
    </svg>
  );
}

function IconoPeso() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" aria-hidden>
      <path {...trazo} d="M9.5 7.5a2.5 2.5 0 1 1 5 0" />
      <path d="M6.2 9h11.6l2.2 11H4z" fill="currentColor" />
      <path d="M10 16.5h4" stroke="var(--bar)" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

function IconoAnio() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" aria-hidden>
      <rect {...trazo} x="3.5" y="5" width="17" height="15" rx="2" />
      <path {...trazo} d="M3.5 10h17M8 3v4M16 3v4" />
      <rect x="13" y="13" width="4" height="4" rx="0.8" fill="currentColor" />
    </svg>
  );
}

function IconoSerial() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" aria-hidden>
      <path {...trazo} d="M3.5 8V5.5a2 2 0 0 1 2-2H8M16 3.5h2.5a2 2 0 0 1 2 2V8M20.5 16v2.5a2 2 0 0 1-2 2H16M8 20.5H5.5a2 2 0 0 1-2-2V16" />
      <path {...trazo} d="M8 8v8M15.5 8v8M17.5 8v8" />
      <rect x="10.4" y="7.1" width="3" height="9.8" rx="0.8" fill="currentColor" />
    </svg>
  );
}

function IconoHoras() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" aria-hidden>
      <path {...trazo} d="M4.2 17.5a8.5 8.5 0 1 1 15.6 0" />
      <path {...trazo} d="M12 5v1.5M5.5 11.5H7M17 11.5h1.5" />
      <path d="M11 15.2l5.2-5.6-4.1 6.7a1.3 1.3 0 1 1-1.1-1.1z" fill="currentColor" />
      <circle cx="12" cy="16.5" r="1.9" fill="currentColor" />
    </svg>
  );
}
