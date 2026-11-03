import Image from "next/image";
import { Fondo } from "./MarcasSlider";

// Marcas de repuestos, en el orden del sitio. Logos tomados del sitio de
// Partequipos (recortados y en webp); Bobcat venía en blanco y se pasó a tinta.
const MARCAS = [
  ["Caterpillar", "caterpillar"],
  ["Case Construction", "case"],
  ["Hitachi", "hitachi"],
  ["Komatsu", "komatsu"],
  ["Volvo", "volvo"],
  ["Yanmar", "yanmar"],
  ["Doosan", "doosan"],
  ["Hyundai", "hyundai"],
  ["Kobelco", "kobelco"],
  ["Link-Belt", "link-belt"],
  ["LiuGong", "liugong"],
  ["Bobcat", "bobcat"],
  ["Dynapac", "dynapac"],
  ["Okada", "okada"],
].map(([nombre, archivo]) => ({ nombre, logo: `/partequipos/repuestos/marcas/${archivo}.webp` }));

// Marcas de repuestos: la sección de marcas en espejo. La miniexcavadora
// Yanmar ViO80 a la izquierda, por delante de una banda blanca con los logos
// corriendo en bucle, que entran y salen por detrás de ella; el título arriba a
// la derecha. Desde lg el panel mantiene su proporción 3:1 y todo se mide en %
// del panel o en `cqw`. Bajo la banda, a la derecha, un pie con las marcas.
// En teléfono se apila: título, máquina, banda y pie.
export function MarcasRepuestos() {
  return (
    <section
      id="marcas-repuestos"
      aria-labelledby="marcas-repuestos-titulo"
      className="bg-bar px-3 pb-3 sm:px-5 sm:pb-5 lg:px-6 lg:pb-6"
    >
      <div className="@container relative isolate overflow-hidden rounded-[1.75rem] bg-bar lg:h-[max(26rem,33cqw)] lg:rounded-[2rem]">
        <Fondo id="marcas-rep" espejo />

        <div className="relative z-10 px-6 pt-10 sm:px-10 lg:absolute lg:top-[14%] lg:right-[5%] lg:p-0 lg:text-right">
          <p className="text-xs font-semibold tracking-wide text-brand-deep">Repuestos</p>
          <h2
            id="marcas-repuestos-titulo"
            className="mt-2 text-[clamp(2rem,7vw,2.6rem)] leading-[1.04] font-semibold tracking-[-0.025em] text-on-bar lg:text-[clamp(2.2rem,3.3cqw,4rem)]"
          >
            Repuestos para
            <br />
            <span className="text-brand">las marcas que trabajas</span>
          </h2>
        </div>

        {/* Máquina, medida sobre el render (1920×1344): la miniexcavadora
            ocupa x≈16–83 % e y≈3–98 %, así que es alta y estrecha. Desde lg
            va a la izquierda, centrada en vertical en el panel, por delante
            de la banda de logos. */}
        <div className="relative z-20 mx-auto mt-4 aspect-[1920/1344] w-[min(85%,30rem)] lg:absolute lg:top-1/2 lg:left-[2%] lg:mt-0 lg:w-[46%] lg:-translate-y-1/2">
          <Image
            src="/partequipos/repuestos/yanmar-vio80.webp"
            alt="Miniexcavadora Yanmar ViO80"
            fill
            quality={90}
            sizes="(min-width: 1024px) 46vw, 85vw"
            className="object-contain"
          />
        </div>

        {/* banda blanca: en escritorio va del borde derecho hasta debajo de
            la máquina y se funde a la izquierda, así los logos se esconden
            detrás de ella */}
        <div className="relative z-10 mt-2 mb-6 bg-bar py-5 lg:absolute lg:top-[52%] lg:right-0 lg:my-0 lg:w-[86%] lg:py-[max(1.3rem,1.8cqw)] lg:[mask-image:linear-gradient(270deg,#000_70%,transparent_92%)]">
          <Carrusel />
        </div>

        {/* pie de la banda: las marcas para las que hay soluciones. Desde lg
            va abajo a la derecha, bajo los logos, en el hueco libre */}
        <p className="relative z-10 px-6 pb-8 text-[0.95rem] leading-relaxed text-balance text-on-bar-dim sm:px-10 lg:absolute lg:right-[5%] lg:bottom-[9%] lg:max-w-[min(40%,34rem)] lg:p-0 lg:text-right lg:text-[clamp(0.9rem,0.95cqw,1.05rem)]">
          {/* «Link-Belt» con guion que no se corta, para que no se parta al
              final de una línea */}
          {"Soluciones para marcas como Caterpillar, CASE Construction, Hitachi LANDCROS, Yanmar, LiuGong, Link\u2011Belt, Hyundai, Doosan, Develon y más."}
        </p>
      </div>
    </section>
  );
}

// Los logos corren en bucle con el mismo CSS que el de marcas: la pista lleva
// la lista dos veces y se desplaza la mitad; se pausa con el mouse encima y
// con movimiento reducido queda quieta.
function Carrusel() {
  return (
    <div className="marcas-carrusel overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)] lg:pr-[5%] lg:[mask-image:none]">
      <ul aria-label="Marcas de repuestos" className="marcas-pista marcas-pista-larga flex w-max items-center">
        {[...MARCAS, ...MARCAS].map((m, i) => (
          <li
            key={`${m.nombre}-${i}`}
            aria-hidden={i >= MARCAS.length || undefined}
            className="flex shrink-0 items-center"
          >
            <span className="flex h-16 w-[12rem] items-center justify-center px-5 lg:h-[max(4rem,5.2cqw)] lg:w-[max(12.5rem,15cqw)] lg:px-[max(1.5rem,2cqw)]">
              {/* eslint-disable-next-line @next/next/no-img-element -- logos pequeños, ya optimizados */}
              <img
                src={m.logo}
                alt={i < MARCAS.length ? m.nombre : ""}
                className="max-h-11 w-auto max-w-full object-contain lg:max-h-[max(2.75rem,3.4cqw)]"
              />
            </span>
            <span aria-hidden className="block h-14 w-px rounded-full bg-on-bar/12 lg:h-[max(3.5rem,4.4cqw)]" />
          </li>
        ))}
      </ul>
    </div>
  );
}
