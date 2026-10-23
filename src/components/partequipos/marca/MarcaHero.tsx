import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import type { Marca } from "./marcas";

// Hero de la landing de marca, réplica de la referencia: banda partida en
// dos (gris arriba, color de la marca abajo) con el panel de foto encima, la
// placa blanca con el logo, el título y el indicador de scroll. Las medidas
// son las del original: 55/40/10vw de título y 16/14/13 px de cuerpo en
// escritorio, ≤1024 px y ≤767 px.
export function MarcaHero({
  marca,
  destino = "#linea-de-equipos",
  marcaDeAgua,
}: {
  marca: Marca;
  destino?: string;
  /** Capa decorativa sobre la foto y debajo del contenido. */
  marcaDeAgua?: ReactNode;
}) {
  return (
    <section
      aria-labelledby="marca-hero-titulo"
      className="bg-[linear-gradient(#f0f0f0_50%,var(--marca-acento)_50%)] px-[1.5vw] pt-6 pb-[1.5vw]"
      style={{ "--marca-acento": marca.acento } as CSSProperties}
    >
      <div className="relative flex min-h-[70vh] flex-col overflow-hidden rounded-[30px] bg-[#1f1d1b]">
        <Image
          src={marca.fondo}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: marca.fondoPosicion ?? "50% 50%" }}
        />
        <div aria-hidden="true" className="absolute inset-0 bg-black opacity-60 mix-blend-multiply" />
        {marcaDeAgua}

        <div className="relative flex w-full flex-1 flex-col items-center justify-center gap-5 px-[2.9vw] py-[50px] text-center text-white [@media(max-width:1024px)]:px-[6.4vw] [@media(max-width:767px)]:px-[14.4vw]">
          <div className="box-border flex aspect-square w-[168px] items-center justify-center rounded-[20px] bg-white p-6">
            <Image
              src={marca.logo.src}
              alt={marca.nombre}
              width={marca.logo.ancho}
              height={marca.logo.alto}
              sizes="120px"
              className="h-auto max-h-full w-full"
            />
          </div>

          <h1
            id="marca-hero-titulo"
            className="m-0 w-full max-w-[1000px] text-[55px] leading-[1.2] font-medium [@media(max-width:1024px)]:text-[40px] [@media(max-width:767px)]:text-[10vw]"
          >
            {marca.titulo}
          </h1>

          <p className="m-0 w-full max-w-[650px] text-base leading-[1.4] font-light [@media(max-width:1024px)]:text-sm [@media(max-width:767px)]:text-[13px]">
            {marca.presentacion}
          </p>

          <a href={destino} aria-label="Ir a la línea de equipos" className="mt-[15px] inline-block leading-none">
            <span
              aria-hidden="true"
              className="box-border inline-block h-10 w-[25px] rounded-[50px] border-2 border-white pt-2 text-center"
            >
              <span className="inline-block h-2.5 w-[3px] rounded-[50px] bg-[#e5242d] motion-safe:animate-[raton-rueda_2.2s_cubic-bezier(.15,.41,.69,.94)_2]" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
