import Image from "next/image";

// Hero del listado de usados: la excavadora a la izquierda sobre bandas
// diagonales del mismo gris de la superficie, y la banda roja que entra por
// detrás del cucharón. Las bandas son un SVG con `slice` para que el ángulo
// no se deforme al cambiar la proporción de la pantalla. El fondo lo pone el
// panel redondeado que lo contiene (ver CatalogoUsados).
export function UsedHero() {
  return (
    <section className="relative isolate">
      <svg
        aria-hidden
        className="absolute inset-0 -z-10 h-full w-full [mask-image:linear-gradient(180deg,#000_70%,rgb(0_0_0/0.6)_82%,rgb(0_0_0/0.25)_92%,transparent)]"
        viewBox="0 0 1440 640"
        preserveAspectRatio="xMinYMid slice"
      >
        <defs>
          {/* la franja roja es sólida arriba y solo se disuelve hacia abajo,
              donde entra el piso */}
          <linearGradient id="banda-roja" x1="0" y1="0" x2="0.3" y2="1">
            <stop offset="0" stopColor="var(--brand)" />
            <stop offset="0.5" stopColor="var(--brand)" stopOpacity="0.92" />
            <stop offset="0.78" stopColor="var(--brand)" stopOpacity="0.45" />
            <stop offset="1" stopColor="var(--brand)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="pared-fade" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1060" y2="0">
            <stop offset="0.58" stopColor="#fff" />
            <stop offset="0.7" stopColor="#fff" stopOpacity="0.75" />
            <stop offset="0.8" stopColor="#fff" stopOpacity="0.4" />
            <stop offset="0.9" stopColor="#fff" stopOpacity="0.14" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* pared: losas grises alternas, solo detrás de la máquina; se apagan
            antes de llegar a la columna del texto */}
        <mask id="pared-solo-maquina" maskUnits="userSpaceOnUse" x="-200" y="0" width="1840" height="640">
          <rect x="-200" y="0" width="1840" height="640" fill="url(#pared-fade)" />
        </mask>
        <g mask="url(#pared-solo-maquina)">
          {/* losas escalonadas: borde superior horizontal a distintas alturas y
              lados con la misma inclinación de la franja roja; bajan hasta el
              piso, que las tapa */}
          <polygon points="250,0 560,0 1060,640 750,640" fill="#fafaf9" opacity="0.5" />
          <polygon points="0,22 215,22 699,640 484,640" fill="#d3d1ce" opacity="0.35" />
          <polygon points="-70,150 45,150 437,640 322,640" fill="#fafaf9" opacity="0.6" />
          <polygon points="760,100 905,100 1326,640 1181,640" fill="#dedcd9" opacity="0.28" />
          <polygon points="600,250 835,250 1139,640 904,640" fill="#d3d1ce" opacity="0.35" />
        </g>
        <polygon points="45,215 200,215 470,560 315,560" fill="url(#banda-roja)" opacity="0.78" />
      </svg>

      <div className="mx-auto grid max-w-[1400px] items-center gap-x-10 gap-y-6 px-6 pt-8 pb-10 lg:min-h-[calc(100svh-20rem)] lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:px-10 lg:py-10">
        {/* el PNG trae ~11 % de margen transparente a cada lado: el margen
            negativo y la escala se lo comen para que la máquina crezca sin
            empujar el texto. La escala va en el contenedor para que las sombras
            crezcan con ella. */}
        <div className="relative -mx-4 sm:mx-0 lg:-ml-14 lg:origin-[50%_85%] lg:scale-[1.1]">
          <div className="relative mx-auto w-full max-w-[920px]">
            <Piso />
            {/* reflejo: la misma foto volteada sobre la línea donde apoyan las
                orugas (92 % de alto). La máscara se aplica antes del volteo,
                así que deja ver solo la franja del tren de rodaje y la apaga
                pronto: un piso satinado, no un espejo. */}
            <Image
              src="/partequipos/maq-hitachi-zx210.png"
              alt=""
              aria-hidden
              width={1920}
              height={1344}
              sizes="(max-width: 1024px) 100vw, 65vw"
              className="pointer-events-none absolute inset-0 h-auto w-full origin-[50%_92%] -scale-y-100 opacity-[0.13] blur-[1.5px] [mask-image:linear-gradient(180deg,transparent_78%,rgb(0_0_0/0.4)_86%,#000_92%,transparent_92.5%)]"
            />
            <SombraMaquina />
            <Image
              src="/partequipos/maq-hitachi-zx210.png"
              alt="Excavadora Hitachi ZX210 usada"
              width={1920}
              height={1344}
              priority
              sizes="(max-width: 1024px) 100vw, 65vw"
              className="relative h-auto w-full"
            />
          </div>
        </div>

        <div className="relative z-10 max-w-[40rem]">
          <p className="flex items-center gap-3 text-xs font-semibold tracking-wide text-brand-deep ">
            Venta de Maquinaria
          </p>

          <h1 className="mt-4 text-[clamp(2.25rem,4.4vw,3.9rem)] leading-[1.04] font-semibold tracking-[-0.025em] text-on-bar">
            Maquinaria pesada usada
          </h1>
          <p className="mt-5 text-base leading-relaxed text-on-bar-dim lg:text-[1.05rem]">
            Encuentra excavadoras, retrocargadoras, cargadores, minicargadores,
            motoniveladoras y más para construcción, infraestructura y
            movimiento de tierra en Colombia.
          </p>


          <div className="mt-8">
            <a
              href="#listado"
              className="group inline-flex items-center gap-3 rounded-full bg-brand py-3.5 pr-6 pl-5 text-[0.95rem] font-semibold text-on-brand shadow-[0_2px_6px_-2px_rgb(185_28_28/0.45)] transition-colors hover:bg-brand-lift focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brand active:bg-brand-deep"
            >
             
              Ver todo
              <Flecha className="" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// Piso de estudio: la pared (bandas y franja roja) termina en un horizonte a
// la altura del tren de rodaje y debajo arranca un suelo propio, opaco y más
// claro, que se va asentando hacia el frente hasta llegar exactamente al gris
// del panel. Lo que lo hace leerse como piso es el corte de la pared: corto
// (unos 40px de transición, sin línea dura) en vez de un desvanecido largo.
// Vive en la caja de la imagen para que el horizonte siga a la máquina a
// cualquier tamaño. Hacia la izquierda llega al borde del panel (que lo
// recorta); hacia la derecha se apaga poco después de la máquina para que el
// horizonte no cruce por debajo del texto.
function Piso() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute top-[75%] right-[-6%] left-[-100vw] h-[90%] [mask-image:linear-gradient(to_left,transparent_0,rgb(0_0_0/0.12)_40px,rgb(0_0_0/0.35)_90px,rgb(0_0_0/0.65)_150px,rgb(0_0_0/0.88)_210px,#000_260px)] bg-[linear-gradient(180deg,rgb(20_17_15/0)_0%,rgb(20_17_15/0.035)_1.2%,rgb(248_247_245/0.35)_2.4%,rgb(248_247_245/0.75)_4.5%,rgb(248_247_245/0.95)_6.5%,#f8f7f5_8%,#f6f5f3_30%,#f3f2f0_60%,#f1f0ee_100%)]"
    />
  );
}

// Sombras medidas sobre el recorte de la ZX210 (1920×1344): el SVG comparte
// la caja de la imagen, así cada sombra cae exacto bajo su pieza a cualquier
// tamaño. Tres capas, como en una foto de estudio con luz cenital algo
// adelantada: un piso amplio y difuso que se corre hacia atrás, la oclusión
// bajo el tren de rodaje, y un contacto oscuro y apretado donde cada oruga y
// los dientes del balde tocan el suelo. `overflow-visible` evita que el
// desenfoque se corte en seco contra el borde inferior de la caja.
function SombraMaquina() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1920 1344"
      className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
    >
      <defs>
        <filter id="sombra-amplia" x="-50%" y="-300%" width="200%" height="700%">
          <feGaussianBlur stdDeviation="30" />
        </filter>
        <filter id="sombra-media" x="-50%" y="-300%" width="200%" height="700%">
          <feGaussianBlur stdDeviation="13" />
        </filter>
        <filter id="sombra-contacto" x="-50%" y="-300%" width="200%" height="700%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>

      {/* piso: se alarga hacia atrás (derecha), lejos de la luz */}
      <ellipse cx="1250" cy="1252" rx="600" ry="52" fill="#14110f" opacity="0.34" filter="url(#sombra-amplia)" />
      <ellipse cx="470" cy="1286" rx="200" ry="28" fill="#14110f" opacity="0.26" filter="url(#sombra-amplia)" />

      {/* oclusión bajo el tren de rodaje y el balde */}
      <ellipse cx="1210" cy="1240" rx="455" ry="24" fill="#14110f" opacity="0.42" filter="url(#sombra-media)" />
      <ellipse cx="450" cy="1281" rx="130" ry="14" fill="#14110f" opacity="0.38" filter="url(#sombra-media)" />

      {/* contacto: cada oruga y la punta de los dientes */}
      <ellipse cx="935" cy="1231" rx="178" ry="11" fill="#14110f" opacity="0.78" filter="url(#sombra-contacto)" />
      <ellipse
        cx="1380"
        cy="1244"
        rx="290"
        ry="12"
        transform="rotate(-2.4 1380 1244)"
        fill="#14110f"
        opacity="0.8"
        filter="url(#sombra-contacto)"
      />
      <ellipse cx="500" cy="1279" rx="72" ry="8" fill="#14110f" opacity="0.62" filter="url(#sombra-contacto)" />
    </svg>
  );
}

export function Flecha({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={`size-4 shrink-0 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
    </svg>
  );
}

function IconoLupa() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="size-5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      aria-hidden
    >
      <circle cx="8.75" cy="8.75" r="5.75" />
      <path d="m13 13 4 4" />
    </svg>
  );
}
