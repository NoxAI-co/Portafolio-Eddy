import Image from "next/image";
import { Flecha } from "./UsedHero";

const WHATSAPP = "https://wa.me/573176707071";

const whatsapp = (texto: string) =>
  `${WHATSAPP}?text=${encodeURIComponent(texto)}`;

// Las fotos salen del diseño de referencia (recortadas y sin fondo) a la
// espera de fotos propias de cada línea de repuestos.
type CategoriaRepuesto = {
  id: string;
  nombre: string;
  imagen: string;
};

const CATEGORIAS: CategoriaRepuesto[] = [
  { id: "tren-de-rodaje", nombre: "Tren de rodaje", imagen: "/partequipos/repuestos/tren.png" },
  { id: "filtracion", nombre: "Filtración", imagen: "/partequipos/repuestos/filtracion.png" },
  { id: "baldes", nombre: "Baldes y herramienta de corte", imagen: "/partequipos/repuestos/baldes.png" },
  { id: "lubricantes", nombre: "Lubricantes", imagen: "/partequipos/repuestos/lubricantes.png" },
  { id: "llantas", nombre: "Llantas y rines", imagen: "/partequipos/repuestos/llantas.png" },
  { id: "miscelaneos", nombre: "Misceláneos", imagen: "/partequipos/repuestos/miscelaneos.png" },
  { id: "componentes", nombre: "Componentes mayores", imagen: "/partequipos/repuestos/componentes.png" },
  { id: "motor-diesel", nombre: "Repuestos para motor diésel", imagen: "/partequipos/repuestos/motor.png" },
  { id: "transmision", nombre: "Transmisión", imagen: "/partequipos/repuestos/transmision.png" },
  { id: "hidraulicos", nombre: "Hidráulicos", imagen: "/partequipos/repuestos/hidraulicos.png" },
];

// Sección de repuestos: rótulo y título con «Repuestos» en rojo de marca, dos
// párrafos de entrada y el enlace «Encuentra la referencia…» a WhatsApp; debajo,
// las 10 categorías en tarjetas blancas (5 por fila desde
// lg). Detrás, franjas diagonales grises y una roja arriba a la derecha, con
// la misma inclinación de las del resto de la página.
export function CatalogoRepuestos() {
  return (
    <section
      id="repuestos"
      aria-labelledby="repuestos-titulo"
      className="bg-bar px-3 pb-3 sm:px-5 sm:pb-5 lg:px-6 lg:pb-6"
    >
      <div className="relative isolate overflow-hidden rounded-[1.75rem] bg-[#f1f0ee] px-5 py-9 sm:px-10 sm:py-11 lg:rounded-[2rem] lg:px-[4%] lg:py-14">
        <Franjas />

        <div className="relative max-w-[52rem]">
          <p className="text-xs font-semibold tracking-wide text-brand-deep">Venta de Repuestos</p>
          <h2
            id="repuestos-titulo"
            className="mt-3 text-[clamp(1.7rem,6vw,2.4rem)] leading-[1.1] font-bold tracking-[-0.025em] text-on-bar lg:text-[clamp(2.2rem,3vw,3.1rem)]"
          >
            Encuentra Maquinaria y <span className="text-brand">Repuestos</span> Rápido y Fácil
          </h2>
          {/* entrada bajo el título (qué repuestos y para qué marcas), en la
              columna del título para no cruzar la franja roja de la derecha;
              el cierre es un enlace */}
          <p className="mt-4 max-w-[44rem] text-[0.95rem] leading-relaxed text-on-bar-dim lg:text-base">
            Encuentra repuestos, filtros, tren de rodaje, componentes hidráulicos, herramientas de corte,
            lubricantes y más para excavadoras, retrocargadoras, cargadores, minicargadores, motoniveladoras y
            otros equipos.
          </p>
          {/* «Link-Belt» con guion que no se corta al final de una línea */}
          <p className="mt-3 max-w-[44rem] text-[0.95rem] leading-relaxed text-on-bar-dim lg:text-base">
            {"Soluciones para marcas como Caterpillar, CASE Construction, Hitachi LANDCROS, Yanmar, LiuGong, Link\u2011Belt, Hyundai, Doosan, Develon y más."}
          </p>
          <a
            href={whatsapp("Hola, busco la referencia de un repuesto para mi máquina.")}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-3 inline-block rounded-md text-[0.95rem] font-semibold text-brand-deep transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand lg:text-base"
          >
            {/* la flecha va pegada a la última palabra, también si el
                enlace se parte en dos líneas */}
            Encuentra la referencia que tu máquina{" "}
            <span className="whitespace-nowrap">
              necesita
              <Flecha className="ml-1.5 inline-block align-[-0.2em] transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none" />
            </span>
            <span className="sr-only">(abre WhatsApp)</span>
          </a>
        </div>

        <ul className="relative mt-9 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:mt-11 lg:grid-cols-5 lg:gap-4 2xl:gap-5">
          {CATEGORIAS.map((c) => (
            <li key={c.id}>
              <TarjetaCategoria categoria={c} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// Franjas del fondo: tres losas grises translúcidas y una roja que baja desde
// arriba a la derecha y se apaga al bajar, detrás del texto y las tarjetas.
// Solo desde xl: más angosto cruzarían el texto.
function Franjas() {
  const losa = "absolute top-0 h-[78%] origin-top -skew-x-[30deg]";
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 hidden xl:block">
      <span className={`${losa} left-[48%] w-[9%] bg-white/70`} />
      <span className={`${losa} left-[60%] w-[6%] bg-[#d9d6d2]/45`} />
      <span className={`${losa} left-[90%] w-[8%] bg-white/70`} />
      <span
        className={`${losa} left-[76%] w-[9%] bg-[linear-gradient(180deg,var(--brand)_0%,rgb(220_38_38/0.85)_35%,rgb(220_38_38/0.25)_70%,transparent_100%)]`}
      />
    </div>
  );
}

// Tarjeta de categoría: blanca, con una esquina roja recortada arriba a la
// izquierda, la foto grande arriba y, al pie, el nombre con un botón redondo
// con la flecha a su lado. Todo es un solo enlace; al pasar el cursor la foto
// se acerca y el botón se rellena de rojo.
function TarjetaCategoria({ categoria: c }: { categoria: CategoriaRepuesto }) {
  return (
    <a
      href={whatsapp(`Hola, busco repuestos de ${c.nombre.toLowerCase()}.`)}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex h-full flex-col overflow-hidden rounded-[1.25rem] bg-bar p-4 shadow-[0_1px_2px_rgb(20_17_15/0.05),0_6px_16px_-10px_rgb(20_17_15/0.18)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:p-5"
    >
      <span aria-hidden className="absolute top-0 left-0 size-10 bg-brand [clip-path:polygon(0_0,100%_0,0_100%)] sm:size-12" />
      <span className="relative block aspect-[4/3] w-full">
        <Image
          src={c.imagen}
          alt=""
          fill
          sizes="(max-width: 768px) 45vw, (max-width: 1024px) 30vw, 18vw"
          className="object-contain transition-transform duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-[1.06]"
        />
      </span>
      {/* nombre y flecha en una fila, pegada al pie de la tarjeta y con la
          flecha abajo: en una fila de tarjetas las flechas quedan a la misma
          altura aunque un nombre ocupe más líneas */}
      <span className="mt-auto flex min-h-[2lh] items-end justify-between gap-2 pt-3 text-[0.95rem] leading-tight sm:text-[1.05rem] 2xl:text-[1.15rem]">
        <span className="font-bold text-on-bar">{c.nombre}</span>
        <span
          aria-hidden
          className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#fdeeee] text-brand transition-colors group-hover:bg-brand group-hover:text-on-brand"
        >
          <Flecha className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </span>
      </span>
    </a>
  );
}
