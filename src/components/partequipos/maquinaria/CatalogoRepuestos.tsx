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

const W = 1920;
const H = 1344;

// Sección de repuestos: a la izquierda la miniexcavadora Yanmar ViO80 sobre
// el piso, y a la derecha el título y las tarjetas de categoría.
export function CatalogoRepuestos() {
  return (
    <section
      id="repuestos"
      aria-labelledby="repuestos-titulo"
      className="bg-bar px-3 pb-3 sm:px-5 sm:pb-5 lg:px-6 lg:pb-6"
    >
      <div className="relative isolate overflow-hidden rounded-[1.75rem] bg-[#f1f0ee] lg:rounded-[2rem]">

        {/* Distribución por tamaño:
            · teléfono y tablet: título, máquina y tarjetas apiladas.
            · desde portátil (lg+): la máquina a la izquierda y título y
              tarjetas a la derecha. */}
        <div className="grid gap-8 px-5 py-8 sm:px-10 sm:py-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)] lg:grid-rows-[auto_1fr] lg:gap-x-4 lg:gap-y-7 lg:py-12 lg:pr-[4%] lg:pl-4 2xl:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] 2xl:gap-y-9 2xl:pr-[5%] 2xl:pl-6">
          <div className="relative z-10 lg:col-start-2 lg:row-start-1 lg:self-start">
            <p className="text-xs font-semibold tracking-wide text-brand-deep">
              Venta de Repuestos
            </p>
            <h2
              id="repuestos-titulo"
              className="mt-3 text-[clamp(1.6rem,6vw,2.2rem)] leading-tight font-semibold tracking-[-0.025em] text-on-bar lg:text-[clamp(1.6rem,2.3vw,2.4rem)] lg:leading-tight 2xl:text-[clamp(1.6rem,1.9vw,2.4rem)] 2xl:whitespace-nowrap"
            >
              Encuentra Maquinaria y Repuestos Rápido y Fácil
            </h2>
          </div>

          <Maquina />

          <ul className="relative z-10 grid grid-cols-2 gap-3 md:grid-cols-5 lg:col-start-2 lg:row-start-2 lg:gap-3 xl:gap-4">
            {CATEGORIAS.map((c) => (
              <li key={c.id}>
                <TarjetaCategoria categoria={c} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function TarjetaCategoria({ categoria: c }: { categoria: CategoriaRepuesto }) {
  return (
    <a
      href={whatsapp(`Hola, busco repuestos de ${c.nombre.toLowerCase()}.`)}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col items-center rounded-[1.25rem] bg-bar px-2 pt-4 pb-4 text-center sm:px-3 md:px-2 2xl:px-3 2xl:pt-5 2xl:pb-5 shadow-[0_1px_2px_rgb(20_17_15/0.05)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
    >
      <span className="relative block h-20 w-full max-w-[12rem] md:h-16 xl:h-20 2xl:h-32">
        <Image
          src={c.imagen}
          alt=""
          fill
          sizes="200px"
          className="object-contain transition-transform duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-[1.06]"
        />
      </span>
      <span className="mt-3 mb-3 flex min-h-[2lh] items-center text-[0.825rem] leading-snug font-bold tracking-wide [overflow-wrap:anywhere] md:text-[0.765rem] md:tracking-normal lg:text-[0.66rem] xl:text-[0.765rem] 2xl:text-[0.925rem] 2xl:tracking-wide text-on-bar uppercase">
        {c.nombre}
      </span>
      {/* `mt-auto`: el botón queda al pie de la tarjeta, alineado en toda
          la fila aunque un nombre ocupe dos líneas. El texto no se parte:
          en tablet (5 columnas angostas) baja de tamaño en vez de romperse */}
      <span className="mt-auto inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[0.78rem] font-semibold whitespace-nowrap text-brand ring-[1.5px] ring-brand transition-colors group-hover:bg-brand group-hover:text-on-brand md:gap-1 md:px-2.5 md:py-1.5 md:text-[0.66rem] 2xl:gap-1.5 2xl:px-4 2xl:py-2 2xl:text-[0.78rem]">
        Ver todos
        <Flecha className="size-3.5 md:size-3 2xl:size-3.5" />
      </span>
    </a>
  );
}

function Maquina() {
  return (
    // portátil (lg–2xl): toma todo el alto de la sección (sus dos filas) y el
    // ancho sale de la proporción; centrada en su columna (left 50 % y
    // translate), el aire
    // transparente del render sobresale a los lados. Escritorio ancho (2xl+):
    // por ancho, apoyada abajo.
    <div className="relative mx-auto w-full max-w-[34rem] lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:h-full lg:w-auto lg:max-w-none lg:left-1/2 lg:-translate-x-1/2 lg:self-stretch lg:justify-self-start 2xl:left-0 2xl:-mr-[12%] 2xl:-ml-[12%] 2xl:h-auto 2xl:w-[124%] 2xl:translate-x-0 2xl:self-end 2xl:justify-self-auto">
      <div className="relative aspect-[1920/1344] lg:h-full 2xl:h-auto">
        {/* Pared: losas grises y la franja roja de marca, ancladas a la
            máquina para que caigan igual en todos los tamaños (también en
            teléfono). Todas comparten la misma inclinación (~30°), arrancan
            por encima del borde del panel, que las recorta, y terminan en el
            horizonte del piso: van de un borde a otro, sin cortes. Hacia la
            izquierda se apagan para dejar limpio el texto. */}
        {/* en espejo: las losas y la franja bajan desde la izquierda, del
            lado de la máquina, y se apagan hacia el texto de la derecha */}
        <svg
          aria-hidden
          viewBox={`0 0 ${W} ${H}`}
          className="pointer-events-none absolute inset-0 h-full w-full -scale-x-100 overflow-visible"
        >
          <defs>
            <linearGradient id="pared-izq" gradientUnits="userSpaceOnUse" x1="-900" y1="0" x2="250" y2="0">
              <stop offset="0" stopColor="#fff" stopOpacity="0" />
              <stop offset="0.6" stopColor="#fff" stopOpacity="0.6" />
              <stop offset="1" stopColor="#fff" />
            </linearGradient>
            <linearGradient id="banda-roja-rep" gradientUnits="userSpaceOnUse" x1="0" y1="-420" x2="0" y2="560">
              <stop offset="0" stopColor="var(--brand)" />
              <stop offset="0.5" stopColor="var(--brand)" stopOpacity="0.92" />
              <stop offset="0.78" stopColor="var(--brand)" stopOpacity="0.45" />
              <stop offset="1" stopColor="var(--brand)" stopOpacity="0" />
            </linearGradient>
            <mask id="pared-mask" maskUnits="userSpaceOnUse" x="-3000" y="-3000" width="7000" height="5000">
              <rect x="-3000" y="-3000" width="7000" height="5000" fill="url(#pared-izq)" />
            </mask>
          </defs>
          <g mask="url(#pared-mask)">
            <polygon points="887,-2400 1117,-2400 -655,640 -885,640" fill="#d3d1ce" opacity="0.45" />
            <polygon points="1117,-2400 1417,-2400 -355,640 -655,640" fill="#fbfbfa" opacity="0.8" />
            <polygon points="2207,-2400 2437,-2400 665,640 435,640" fill="#d3d1ce" opacity="0.45" />
            <polygon points="2437,-2400 2767,-2400 995,640 665,640" fill="#fbfbfa" opacity="0.85" />
            <polygon points="3407,-2400 3627,-2400 1855,640 1635,640" fill="#d3d1ce" opacity="0.45" />
            <polygon points="3627,-2400 3927,-2400 2155,640 1855,640" fill="#fbfbfa" opacity="0.8" />
          </g>
          {/* franja de marca con el mismo efecto que la del hero de
              maquinaria usada: rojo de marca sólido arriba que se disuelve al
              bajar, y la franja entera al 78 %. El degradado va en el tramo
              visible (del borde del panel al horizonte); por encima se queda
              sólido. */}
          <polygon points="2987,-2400 3177,-2400 1405,640 1215,640" fill="url(#banda-roja-rep)" opacity="0.78" />
        </svg>


        {/* Piso. La cámara mira desde arriba, así que el suelo no es una
            franja al pie: es un plano grande que arranca en un horizonte alto
            (detrás de la cabina) y llena todo lo que queda debajo. La pared
            con las losas y la franja roja solo se ve por encima de ese
            horizonte. El plano se aclara hacia el frente, como un piso de
            estudio iluminado desde arriba. Desde portátil se apaga hacia la
            izquierda para no meterse bajo el texto. */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-[24%] right-[-200%] bottom-[-400%] left-[-200%] lg:right-[-70%] lg:left-[-40%] lg:[mask-image:linear-gradient(to_left,transparent,#000_30%)]"
          style={{
            background:
              "linear-gradient(180deg, rgb(241 240 238 / 0) 0%, rgb(20 17 15 / 0.035) 1.5%, rgb(246 245 243 / 0.85) 4%, #f6f5f3 7%, #f8f7f5 30%, #f9f9f8 60%, #f6f5f3 100%)",
          }}
        />
        {/* el render trae su propia sombra de contacto */}
        <Image
          src="/partequipos/repuestos/yanmar-vio80.webp"
          alt="Miniexcavadora Yanmar ViO80"
          fill
          quality={90}
          sizes="(min-width: 1536px) 54vw, (min-width: 1024px) 50vw, 90vw"
          className="object-contain"
        />

      </div>
    </div>
  );
}
