import Image from "next/image";
import { CATEGORIAS } from "./categorias";
import { Flecha } from "./UsedHero";

// Un solo panel redondeado con el hero y, debajo, tres botones de categoría
// (máquina recortada, nombre y flecha). Cada botón lleva a la página de esa
// categoría de maquinaria usada en el sitio. Al pasar el cursor el borde se
// vuelve rojo y la flecha se rellena.
export function CatalogoUsados({ hero }: { hero: React.ReactNode }) {
  return (
    <div id="maquinaria-usada" className="bg-bar px-3 py-3 sm:px-5 sm:py-5 lg:px-6 lg:py-6">
      <div className="relative isolate overflow-hidden rounded-[1.75rem] bg-[#f1f0ee] lg:rounded-[2rem]">
        {hero}

        {/* `relative z-10`: el hero es una capa posicionada y su piso baja hasta
            aquí; sin esto se pintaría ENCIMA de los botones y los lavaría */}
        <div className="relative z-10 mx-auto max-w-[1400px] px-6 pb-10 lg:px-10 lg:pb-14">
          <ul aria-label="Categorías de maquinaria usada" className="grid gap-3 py-1 sm:grid-cols-3 lg:gap-5">
            {CATEGORIAS.map((c) => (
              <li key={c.id}>
                <a
                  href={c.href}
                  className="group flex h-full w-full items-center gap-4 rounded-[1.5rem] border border-bar-line bg-bar py-3 pr-4 pl-3 text-left shadow-[0_1px_2px_rgb(20_17_15/0.05)] transition-colors hover:border-brand/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand lg:py-4 lg:pr-5 lg:pl-4"
                >
                  <span className="relative block h-14 w-24 shrink-0 lg:h-[4.5rem] lg:w-[7.25rem]">
                    <Image src={c.imagen} alt="" fill sizes="120px" className="object-contain" />
                  </span>
                  <span className="min-w-0 flex-1 text-base leading-tight font-semibold text-on-bar lg:text-[1.05rem]">
                    {c.nombre}
                    <span className="sr-only">: maquinaria usada</span>
                  </span>
                  <span
                    aria-hidden
                    className="flex size-9 shrink-0 items-center justify-center rounded-full bg-card/70 text-on-bar transition-colors duration-300 group-hover:bg-brand group-hover:text-on-brand"
                  >
                    <Flecha className="transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
