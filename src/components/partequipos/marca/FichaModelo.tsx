import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { Flecha } from "../maquinaria/UsedHero";
import { GrillaModelos, Icono } from "./ModelosMarca";
import { getMarca, getModelo, slugModelo } from "./marcas";
import { AguilaFondo } from "./mascota/Mascota";
import { EnlaceTransicion, FinTransicion } from "./transicion";

const WHATSAPP = "https://wa.me/573176707071";

// Ficha de un modelo dentro de la landing de su marca. Al abrirla, la foto de
// la tarjeta crece hasta la foto grande de aquí (data-foto-ficha), y al volver
// regresa a su tarjeta (ver transicion.tsx). Debajo van
// los otros modelos del mismo tipo, que abren su ficha igual.
export function FichaModelo({ marcaSlug, slug }: { marcaSlug: string; slug: string }) {
  const encontrado = getModelo(marcaSlug, slug);
  if (!encontrado) notFound();
  const { marca, tipo, modelo } = encontrado;
  const otros = { ...tipo, modelos: tipo.modelos.filter((m) => slugModelo(m) !== slug) };
  const cotizar = `${WHATSAPP}?text=${encodeURIComponent(`Hola, quiero cotizar ${modelo.nombre}.`)}`;

  const contenido = (
    <>
      <section aria-labelledby="ficha-titulo" className="px-[1.5vw] pt-6">
        <div className="grid overflow-hidden rounded-[30px] bg-white min-[1025px]:min-h-[calc(100svh-48px)] min-[1025px]:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <div data-foto-ficha className="relative h-[52vh] min-h-[280px] bg-[#f0f0f0] min-[1025px]:h-auto">
            <Image src={modelo.imagen} alt={modelo.nombre} fill priority sizes="(max-width: 1024px) 100vw, 56vw" className="object-cover" />
          </div>

          <div className="flex flex-col justify-center px-[8%] py-12 min-[1025px]:py-16">
            <EnlaceTransicion
              href={`/lab/partequipos/${marca.slug}#${slug}`}
              origen="[data-foto-ficha]"
              destino={`[data-foto="${slug}"]`}
              className="group/volver inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#56545a] transition-colors hover:text-[#100f0f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--marca-acento)]"
            >
              <Flecha className="rotate-180 text-[var(--marca-acento)] transition-transform duration-300 group-hover/volver:-translate-x-1" />
              Volver a {marca.nombre}
            </EnlaceTransicion>

            <p className="m-0 mt-8 flex items-center gap-3 text-[15px] font-semibold text-[#56545a]">
              <span aria-hidden className="h-[1.1em] w-[2px] rounded-full bg-[var(--marca-acento)]" />
              {tipo.nombre} · Maquinaria nueva
            </p>
            <h1
              id="ficha-titulo"
              className="m-0 mt-3 text-[44px] leading-[1.08] font-bold text-balance text-[#100f0f] [@media(max-width:767px)]:text-[8.5vw]"
            >
              {modelo.nombre}
            </h1>

            {modelo.datos.length > 0 && (
              <dl className="m-0 mt-8">
                {modelo.datos.map((d) => (
                  <div key={d.etiqueta} className="flex items-center gap-4 border-b border-black/10 py-3.5">
                    <Icono tipo={d.icono} />
                    <dt className="text-[15px] text-[#56545a]">{d.etiqueta}</dt>
                    <dd className="m-0 ml-auto text-right text-[17px] font-semibold text-[#100f0f]">{d.valor}</dd>
                  </div>
                ))}
              </dl>
            )}

            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
              <a
                href={cotizar}
                target="_blank"
                rel="noopener noreferrer"
                className="group/boton inline-flex min-h-12 items-center gap-3.5 rounded-full border border-[var(--marca-acento)] bg-[var(--marca-acento)] px-7 text-base font-semibold text-[var(--marca-tinta)] transition-colors hover:border-[#100f0f] hover:bg-[#100f0f] hover:text-white focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#100f0f]"
              >
                Cotizar por WhatsApp
                <Flecha className="transition-transform duration-300 group-hover/boton:translate-x-1" />
              </a>
              <a
                href={modelo.ficha}
                target="_blank"
                rel="noopener noreferrer"
                className="group/ver inline-flex items-center gap-2 text-sm font-semibold text-[#100f0f] transition-colors hover:text-[#56545a] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--marca-acento)]"
              >
                Ficha técnica completa
                <Flecha className="size-3.5 -rotate-45 text-[var(--marca-acento)] transition-transform duration-300 group-hover/ver:translate-x-0.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {otros.modelos.length > 0 && (
        <section aria-labelledby="ficha-otros" className="mx-[5%] pt-20 pb-[100px] [@media(max-width:1024px)]:mx-[2%] [@media(max-width:767px)]:mx-5 max-sm:pb-36">
          <h2 id="ficha-otros" className="m-0 mb-[30px] text-center text-[32px] font-bold text-[#100f0f]">
            Otros modelos: {tipo.nombre.toLowerCase()}
          </h2>
          <GrillaModelos marca={marca} tipo={otros} />
        </section>
      )}
    </>
  );

  return (
    <main
      className="flex-1 bg-[#f0f0f0] pb-24"
      style={{ "--marca-acento": marca.acento, "--marca-tinta": marca.acentoTinta ?? "#100f0f" } as CSSProperties}
    >
      <FinTransicion />
      {marca.mascota ? <AguilaFondo mascota={marca.mascota}>{contenido}</AguilaFondo> : contenido}
    </main>
  );
}

// Para las páginas /lab/partequipos/<marca>/[modelo].
export const parametrosModelos = (marcaSlug: string) =>
  getMarca(marcaSlug)!.tipos.flatMap((t) => t.modelos.map((m) => ({ modelo: slugModelo(m) })));

export function metadataModelo(marcaSlug: string, slug: string): Metadata {
  const e = getModelo(marcaSlug, slug);
  if (!e) return {};
  return {
    title: `${e.modelo.nombre} | ${e.marca.nombre} | Partequipos`,
    description: `${e.modelo.nombre}: ${e.modelo.datos.map((d) => `${d.etiqueta} ${d.valor}`).join(", ")}.`,
    robots: { index: false, follow: false },
  };
}
