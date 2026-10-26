import Image from "next/image";
import type { CSSProperties } from "react";

// Marcas aliadas del grupo: una tarjeta por marca con su logo sobre blanco y,
// debajo, una foto de su negocio teñida con el color de la marca. El tinte va
// en dos capas: el color de la marca multiplicado desde la esquina de abajo y
// un oscurecido al pie, que es el que sostiene el texto blanco (así se lee
// igual sobre el amarillo de ENI que sobre el azul de Express). La foto entra
// con un corte en diagonal arriba. Cada tarjeta abre el sitio de la marca.
type Aliada = {
  id: string;
  nombre: string;
  logo: string;
  foto: string;
  texto: string;
  color: string;
  href: string;
};

const ALIADAS: Aliada[] = [
  {
    id: "partequipos-express",
    logo: "/partequipos/marcas-aliadas/web/logo-partequipos-express.webp",
    foto: "/partequipos/marcas-aliadas/web/foto-partequipos-express.jpg",
    nombre: "Partequipos Express",
    texto: "Soluciones rápidas en repuestos y equipos.",
    color: "#0a5bb0",
    href: "https://partequiposexpress.com/",
  },
  {
    id: "tu-maquinaria",
    logo: "/partequipos/marcas-aliadas/web/logo-tu-maquinaria.webp",
    foto: "/partequipos/marcas-aliadas/web/foto-tu-maquinaria.jpg",
    nombre: "Tu Maquinaria",
    texto: "Especialistas en maquinaria usada.",
    color: "#e8a90e",
    href: "https://tumaquinaria.com.co/",
  },
  {
    id: "partequipos-peru",
    logo: "/partequipos/marcas-aliadas/web/logo-partequipos-peru.webp",
    foto: "/partequipos/marcas-aliadas/web/foto-partequipos-peru.jpg",
    nombre: "Partequipos Perú",
    texto: "Presencia en el mercado peruano.",
    color: "#d4122f",
    href: "https://www.partequipos.pe/",
  },
  {
    id: "maquitecno",
    logo: "/partequipos/marcas-aliadas/web/logo-maquitecno.webp",
    foto: "/partequipos/marcas-aliadas/web/foto-maquitecno.jpg",
    nombre: "Maquitecno",
    texto: "Distribuidor oficial LiuGong.",
    color: "#ec6c0b",
    href: "https://maquitecno.co/",
  },
  {
    id: "eni",
    logo: "/partequipos/marcas-aliadas/web/logo-eni.webp",
    foto: "/partequipos/marcas-aliadas/web/foto-eni.jpg",
    nombre: "Eni Lubricantes",
    texto: "Lubricantes de alto rendimiento.",
    color: "#e6c200",
    href: "https://enicolombiapartequipos.com/",
  },
];

export function MarcasAliadas() {
  return (
    <section
      id="aliadas"
      aria-labelledby="aliadas-titulo"
      className="bg-bar px-3 pb-3 sm:px-5 sm:pb-5 lg:px-6 lg:pb-6"
    >
      <div className="rounded-[1.75rem] bg-[#f1f0ee] px-5 py-10 sm:px-10 lg:rounded-[2rem] lg:px-[5%] lg:py-14">
        <h2
          id="aliadas-titulo"
          className="text-center text-[clamp(1.6rem,6vw,2.2rem)] leading-tight font-semibold tracking-[-0.025em] text-on-bar lg:text-[clamp(2rem,2.4vw,2.6rem)]"
        >
          Marcas aliadas
        </h2>

        {/* filas centradas: con 5 tarjetas en 2 o 3 columnas, la última fila
            corta queda al centro en vez de colgar a la izquierda. En
            teléfono es una tira que se desliza */}
        <ul className="no-scrollbar -mx-5 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 sm:pb-0 lg:gap-5">
          {ALIADAS.map((a) => (
            <li
              key={a.id}
              className="w-[78%] shrink-0 snap-start sm:w-[calc((100%-1rem)/2)] md:w-[calc((100%-2rem)/3)] xl:w-[calc((100%-5rem)/5)]"
            >
              <Tarjeta aliada={a} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Tarjeta({ aliada: a }: { aliada: Aliada }) {
  return (
    <a
      href={a.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${a.nombre}: ${a.texto} (abre su sitio)`}
      className="group flex h-full flex-col overflow-hidden rounded-[14px] bg-white shadow-[0_1px_2px_rgb(16_15_15/0.06),0_6px_16px_-10px_rgb(16_15_15/0.2)] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[var(--aliada)]"
      style={{ "--aliada": a.color } as CSSProperties}
    >
      <span className="flex h-24 items-center justify-center px-7">
        <Image
          src={a.logo}
          alt=""
          width={700}
          height={200}
          sizes="200px"
          className="h-auto max-h-11 w-auto max-w-[82%] object-contain"
        />
      </span>

      {/* el borde de arriba de la foto es un arco: una elipse mucho más
          ancha que la tarjeta, con el centro abajo a la derecha, recorta la
          foto con una curva que sube de izquierda a derecha. Solo toca la
          foto: el texto va al pie */}
      <span className="relative -mt-3 block aspect-[4/3] overflow-hidden [clip-path:ellipse(150%_100%_at_100%_100%)]">
        <Image
          src={a.foto}
          alt=""
          fill
          sizes="(max-width: 640px) 78vw, (max-width: 1280px) 33vw, 20vw"
          className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-[1.05]"
        />
        <span
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(20deg,var(--aliada)_0%,var(--aliada)_25%,transparent_75%)] opacity-85 mix-blend-multiply"
        />
        <span
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_top,rgb(12_10_9/0.88)_0%,rgb(12_10_9/0.7)_30%,rgb(12_10_9/0.25)_55%,transparent_75%)]"
        />

        <span className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
          <span className="text-[15px] leading-snug font-semibold text-balance text-white [text-shadow:0_1px_2px_rgb(0_0_0/0.35)] xl:text-[14px]">{a.texto}</span>
          <span
            aria-hidden
            className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-[#100f0f] transition-colors duration-300 group-hover:bg-[var(--aliada)] group-hover:text-white"
          >
            <svg
              viewBox="0 0 16 16"
              className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 3.5 10.5 8 6 12.5" />
            </svg>
          </span>
        </span>
      </span>
    </a>
  );
}
