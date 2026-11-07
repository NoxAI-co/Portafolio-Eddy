import Image from "next/image";
import type { CSSProperties } from "react";
import { PartequiposWordmark } from "../brand/PartequiposWordmark";
import type { Marca } from "./marcas";

// Portada de un modelo en lugar de su foto: el rojo de Partequipos con el
// logo de Partequipos arriba, el nombre del modelo en el centro y el logo de
// la marca abajo, todo en blanco. La usan la tarjeta del modelo (tamaño
// «tarjeta») y la ficha (tamaño «ficha»); llena su contenedor, que debe ser
// `relative`.
export const ROJO_PORTADA = "#ae0000";

// Los logos de marca tienen proporciones muy distintas (Hitachi casi
// cuadrado, Yanmar muy ancho): se dimensionan por área para que pesen lo
// mismo, con un tope de ancho para los más alargados.
const AREA_TARJETA = 3400;
const ANCHO_MAX = 150;

function medidaLogo({ ancho, alto }: Marca["logoBlanco"]) {
  const r = ancho / alto;
  const w = Math.min(Math.sqrt(AREA_TARJETA * r), ANCHO_MAX);
  return { w: Math.round(w), h: Math.round(w / r) };
}

export function PortadaModelo({
  nombre,
  marca,
  tamano = "tarjeta",
}: {
  nombre: string;
  marca: Marca;
  tamano?: "tarjeta" | "ficha";
}) {
  const ficha = tamano === "ficha";
  const { w, h } = medidaLogo(marca.logoBlanco);
  return (
    <span
      className={`absolute inset-0 flex flex-col items-center text-center text-white ${
        ficha
          ? "px-[8%] pt-[clamp(28px,5vh,56px)] pb-[clamp(28px,6vh,64px)] [--k:1.5] min-[1025px]:[--k:1.9]"
          : "px-7 pt-7 pb-7 [--k:1]"
      }`}
      style={{ backgroundColor: ROJO_PORTADA }}
    >
      <PartequiposWordmark
        textColor="#ffffff"
        pColor="#ffffff"
        className={`w-auto flex-none ${ficha ? "h-[clamp(26px,3.4vw,40px)]" : "h-[22px]"}`}
      />
      <span
        className={`flex flex-1 items-center justify-center font-bold text-balance uppercase ${
          ficha
            ? "max-w-[18ch] py-6 text-[clamp(30px,3.6vw,56px)] leading-[1.05] tracking-[-0.01em]"
            : "max-w-[20ch] py-3 text-[22px] leading-[1.15] [@media(max-width:767px)]:text-[20px]"
        }`}
      >
        {nombre}
      </span>
      <Image
        src={marca.logoBlanco.src}
        alt=""
        width={marca.logoBlanco.ancho}
        height={marca.logoBlanco.alto}
        sizes={ficha ? "300px" : "150px"}
        className="h-[calc(var(--h)*var(--k))] w-[calc(var(--w)*var(--k))] flex-none"
        style={{ "--w": `${w}px`, "--h": `${h}px` } as CSSProperties}
      />
    </span>
  );
}
