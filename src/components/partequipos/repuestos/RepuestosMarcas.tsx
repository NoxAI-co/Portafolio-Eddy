// Repuestos por marca, como la página del sitio: una cabecera oscura con el
// título centrado y, debajo, un recuadro blanco con una baldosa por marca
// (cuatro por fila desde lg, dos en teléfono; la fila corta queda al centro).
// Cada baldosa lleva a la página de repuestos de esa marca en el sitio.
const SITIO = "https://partequipos.vercel.app/repuestos-maquinaria-pesada-colombia/repuestos-maquinaria-pesada-marcas";

type MarcaRepuesto = { nombre: string; logo: string; slug: string; fondo: string; alto?: boolean };

// Orden y enlaces del sitio. Cada baldosa va del color de su marca, tomado de
// los píxeles de su propio logo (Bobcat, de su sitio: #ff3600). Encima, el
// logo en blanco (`-blanco.webp`): a Hitachi se le quitaron las placas naranjas
// y a Hyundai la caja blanca, así su texto queda en blanco sobre el color. Case
// va sobre crema y Caterpillar sobre su amarillo, los dos con su logo original.
// Hitachi es el único logo en dos pisos: lleva más alto para que pese como los
// demás.
const MARCAS: MarcaRepuesto[] = (
  [
    ["Bobcat", "bobcat-blanco", "bobcat", "#ff3600"],
    ["Case Construction", "case", "case-construction", "#f3e7cc"],
    ["Caterpillar", "caterpillar", "caterpillar", "#ffcd11"],
    ["Doosan", "doosan-blanco", "doosan", "#005eb7"],
    ["Hitachi LANDCROS", "hitachi-landcros-blanco", "hitachi", "#f37021"],
    ["Hyundai", "hyundai-blanco", "hyundai", "#2c4b97"],
    ["Kobelco", "kobelco-blanco", "kobelco", "#17b0bc"],
    ["Komatsu", "komatsu-blanco", "komatsu", "#000099"],
    ["Link-Belt", "link-belt-blanco", "link-belt", "#e51b24"],
    ["LiuGong", "liugong-blanco", "liugong", "#002568"],
    ["Okada", "okada-blanco", "okada", "#0070b3"],
    ["Volvo", "volvo-blanco", "volvo", "#25277c"],
    ["Yanmar", "yanmar-blanco", "yanmar", "#e20d1a"],
  ] as const
).map(([nombre, archivo, slug, fondo]) => ({
  nombre,
  slug,
  fondo,
  logo: `/partequipos/repuestos/marcas/${archivo}.webp`,
  alto: slug === "hitachi",
}));

// Dónde empieza la última fila cuando queda corta, para centrarla. En la
// rejilla de 8 columnas (cada baldosa ocupa 2) una fila de 1 arranca en la 4,
// de 2 en la 3 y de 3 en la 2; en teléfono (4 columnas) una sola va en la 2.
const INICIO_LG: Record<number, string> = { 1: "lg:col-start-4", 2: "lg:col-start-3", 3: "lg:col-start-2" };

function centrado(i: number, total: number) {
  const restoLg = total % 4;
  const clases = [];
  if (restoLg && i === total - restoLg) clases.push(INICIO_LG[restoLg]);
  if (total % 2 && i === total - 1) clases.push("max-lg:col-start-2");
  return clases.join(" ");
}

export function RepuestosMarcas() {
  return (
    <section
      id="marcas-repuestos"
      aria-labelledby="marcas-repuestos-titulo"
      className="flex flex-col gap-3 px-3 pb-3 sm:gap-4 sm:px-5 sm:pb-5 lg:gap-[1.5vw] lg:px-[1.5vw] lg:pb-[1.5vw]"
    >
      <header className="flex min-h-[35vh] flex-col items-center justify-center rounded-[1.75rem] bg-[#a20f14] px-6 py-12 text-center text-white sm:rounded-[1.875rem] sm:px-12">
        <h1 id="marcas-repuestos-titulo" className="m-0 flex flex-col items-center gap-2.5">
          <span className="text-[1.125rem] leading-tight font-bold text-balance sm:text-xl">
            Repuestos para maquinaria pesada
          </span>
          <span className="block text-[clamp(2.5rem,10vw,2.75rem)] leading-[1.2] font-semibold tracking-[-0.015em] md:text-[2.5rem] lg:text-[3.4375rem]">
            Marcas
          </span>
        </h1>
      </header>

      <div className="rounded-[1.75rem] bg-bar p-6 pb-11 sm:rounded-[1.875rem] sm:p-10 sm:pb-14 lg:p-[3.125rem] lg:pb-[4.25rem]">
        <ul className="mx-auto grid max-w-[77.5rem] grid-cols-4 gap-x-3 gap-y-8 sm:gap-x-5 sm:gap-y-10 lg:grid-cols-8">
          {MARCAS.map((m, i) => (
            <li key={m.slug} className={`col-span-2 flex min-w-0 ${centrado(i, MARCAS.length)}`}>
              <Baldosa marca={m} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// Baldosa 3:2 del color de su marca, con el logo al centro. «Ver más», en
// rojo de marca, va montado sobre la línea de abajo: centrado y a caballo
// del borde, mitad dentro y mitad fuera (por eso las filas llevan más
// espacio entre ellas). Un anillo blanco lo despega de la baldosa, que en
// Bobcat, Link-Belt y Yanmar también es roja. Al pasar el cursor el logo se
// recoge un poco y el botón pasa a tinta.
function Baldosa({ marca: m }: { marca: MarcaRepuesto }) {
  return (
    <a
      href={`${SITIO}/repuestos-para-maquinaria-pesada-${m.slug}/`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Ver más repuestos ${m.nombre} (se abre en otra pestaña)`}
      style={{ backgroundColor: m.fondo }}
      className="group relative flex aspect-[3/2] w-full items-center justify-center rounded-[1.25rem] p-3 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-on-bar sm:p-5"
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- logos pequeños, ya optimizados */}
      <img
        src={m.logo}
        alt=""
        loading="lazy"
        className={`${m.alto ? "h-[50%]" : "h-[34%]"} w-[68%] -translate-y-[6%] object-contain transition-transform duration-300 group-hover:scale-90 group-focus-visible:scale-90 motion-reduce:transition-none`}
      />
      <span
        aria-hidden
        className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-full bg-brand ring-4 ring-bar px-5 py-2.5 text-sm leading-none font-semibold whitespace-nowrap text-on-brand transition-colors duration-300 group-hover:bg-on-bar group-focus-visible:bg-on-bar motion-reduce:transition-none sm:px-7 sm:py-3 sm:text-[0.9375rem]"
      >
        Ver más
      </span>
    </a>
  );
}
