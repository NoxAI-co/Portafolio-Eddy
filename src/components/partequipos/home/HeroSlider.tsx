"use client";

import { getImageProps } from "next/image";
import { NavSecciones } from "./NavSecciones";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from "react";

// Slider del home de Partequipos, con la forma y el efecto del sitio: cinco
// fotos a sangre en una tarjeta redondeada que se relevan con un fundido
// (la nueva entra encima de la anterior) mientras se acercan muy despacio, un
// velo oscuro para el texto, el texto circular que gira, flechas, pausa y
// puntos cuyo relleno marca el tiempo del pase. La primera lleva el título
// grande en Anton, la excavadora vista desde arriba cruzándolo y el párrafo
// en un panel de vidrio. Debajo, montada sobre el borde, la barra para
// navegar por las secciones (NavSecciones). Sin parallax. Las medidas y tiempos están en
// scripts/partequipos.css (.hs-*).
type Diapositiva = {
  titulo: string;
  /** El título solo se ve en las que lo muestran; las demás lo dejan para
   * lectores de pantalla. */
  tituloVisible: boolean;
  textoCircular: string;
  parrafo?: string;
  fondo: string;
  fondoMovil: string;
  frontal?: { src: string; alt: string; ancho: number; alto: number };
};

const H = "/partequipos/hero";

const DIAPOSITIVAS: Diapositiva[] = [
  {
    titulo: "Hitachi LANDCROS",
    tituloVisible: true,
    textoCircular: "Fuerza. Tradición. Respaldo.",
    parrafo:
      "En Partequipos encuentras maquinaria Hitachi LANDCROS, diseñada para ofrecer rendimiento, precisión y confiabilidad en cada operación.",
    fondo: `${H}/hitachi.webp`,
    fondoMovil: `${H}/hitachi-movil.webp`,
    frontal: {
      src: `${H}/hitachi-maquina.webp`,
      alt: "Excavadora Hitachi LANDCROS vista desde arriba",
      ancho: 1618,
      alto: 694,
    },
  },
  {
    titulo: "Case",
    tituloVisible: false,
    textoCircular: "Versatilidad. Fuerza. Experiencia.",
    fondo: `${H}/case.webp`,
    fondoMovil: `${H}/case-movil.webp`,
  },
  {
    titulo: "Dynapac",
    tituloVisible: false,
    textoCircular: "Precisión. Compactación. Desempeño.",
    fondo: `${H}/dynapac.webp`,
    fondoMovil: `${H}/dynapac-movil.webp`,
  },
  {
    titulo: "LiuGong",
    tituloVisible: false,
    textoCircular: "Potencia. Productividad. Capacidad.",
    fondo: `${H}/liugong.webp`,
    fondoMovil: `${H}/liugong-movil.webp`,
  },
  {
    titulo: "Yanmar",
    tituloVisible: false,
    textoCircular: "Precisión. Ingeniería. Detalle.",
    fondo: `${H}/yanmar.webp`,
    fondoMovil: `${H}/yanmar-movil.webp`,
  },
];

const MOVIMIENTO = "(prefers-reduced-motion: reduce)";
const suscribir = (avisar: () => void) => {
  const mq = window.matchMedia(MOVIMIENTO);
  mq.addEventListener("change", avisar);
  return () => mq.removeEventListener("change", avisar);
};

export function HeroSlider() {
  const total = DIAPOSITIVAS.length;
  const [actual, setActual] = useState(0);
  const [saliente, setSaliente] = useState<number | null>(null);
  const [aviso, setAviso] = useState("");
  const reducido = useSyncExternalStore(suscribir, () => window.matchMedia(MOVIMIENTO).matches, () => false);
  const [eleccion, setEleccion] = useState<boolean | null>(null);
  // con movimiento reducido arranca en pausa; el botón manda después
  const pausado = eleccion ?? reducido;
  const inicioToque = useRef<number | null>(null);

  const ir = useCallback(
    (i: number, anunciar = false) => {
      const n = (i + total) % total;
      if (n === actual) return;
      setSaliente(actual);
      setActual(n);
      if (anunciar) setAviso(`Diapositiva ${n + 1} de ${total}: ${DIAPOSITIVAS[n].titulo}`);
    },
    [actual, total],
  );

  // la anterior queda debajo, entera, hasta que la nueva termina de entrar
  useEffect(() => {
    if (saliente === null) return;
    const t = window.setTimeout(() => setSaliente(null), 1300);
    return () => window.clearTimeout(t);
  }, [saliente, actual]);

  const d = DIAPOSITIVAS[actual];

  return (
    <section
      id="slider"
      className="hs"
      aria-roledescription="carrusel"
      aria-label="Marcas de maquinaria Partequipos"
      data-pausado={pausado || undefined}
      data-con-nav
    >
      <div
        className="hs-tarjeta"
        onPointerDown={(e) => (inicioToque.current = e.clientX)}
        onPointerUp={(e) => {
          if (inicioToque.current === null) return;
          const dx = e.clientX - inicioToque.current;
          inicioToque.current = null;
          if (Math.abs(dx) > 50) ir(actual + (dx < 0 ? 1 : -1), true);
        }}
      >
        <div className="hs-marco" id="hs-diapositivas">
          {DIAPOSITIVAS.map((s, i) => (
            <div
              key={s.titulo}
              className="hs-capa-fondo"
              data-estado={i === actual ? "activa" : i === saliente ? "saliente" : undefined}
              aria-hidden={i !== actual}
            >
              <Fondo diapositiva={s} prioridad={i === 0} />
            </div>
          ))}
        </div>

        {/* texto y máquina de cada diapositiva, apilados: se ve el de la
            activa y los demás se apagan con el mismo fundido del fondo */}
        {DIAPOSITIVAS.map((s, i) => (
          <div
            key={s.titulo}
            className="hs-capa-texto"
            data-activa={i === actual || undefined}
            data-maquina={s.frontal ? "sobre" : undefined}
            aria-hidden={i !== actual}
            style={
              {
                "--hs-letras": s.titulo.length,
                "--hs-palabra": Math.max(...s.titulo.split(" ").map((p) => p.length)),
              } as CSSProperties
            }
          >
            <div className="hs-titulo-caja">
              <h2 className={`hs-titulo ${i === actual ? "hs-entra" : ""}`} data-oculto={!s.tituloVisible || undefined}>
                <span className="hs-titulo-linea">{s.titulo}</span>
              </h2>
            </div>
            {/* copia invisible que reserva el alto del título en el flujo
                (desde 1025 px el título va posicionado arriba) */}
            <div className="hs-titulo hs-reserva" aria-hidden>
              <span className="hs-titulo-linea">{s.titulo}</span>
            </div>
            {s.frontal && (
              <div className="hs-maquina">
                {/* eslint-disable-next-line @next/next/no-img-element -- la máquina recortada va tal cual */}
                <img
                  src={s.frontal.src}
                  alt={s.frontal.alt}
                  width={s.frontal.ancho}
                  height={s.frontal.alto}
                  className="hs-frontal"
                />
              </div>
            )}
          </div>
        ))}

        <div className="hs-circular" aria-hidden>
          <svg viewBox="0 0 100 100" focusable="false">
            <defs>
              <path id="hs-circulo" d="M 50,50 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" />
            </defs>
            <text>
              <textPath href="#hs-circulo" textLength="249">
                {d.textoCircular}{" "}
              </textPath>
            </text>
          </svg>
        </div>

        <div className="hs-fila">
          <div className="hs-flechas">
            <button
              type="button"
              className="hs-flecha"
              aria-label="Diapositiva anterior"
              aria-controls="hs-diapositivas"
              onClick={() => ir(actual - 1, true)}
            >
              <svg viewBox="0 0 320 512" fill="none" aria-hidden focusable="false">
                <path d="M246 84 76 256l170 172" stroke="currentColor" strokeWidth="80" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              className="hs-flecha"
              aria-label="Diapositiva siguiente"
              aria-controls="hs-diapositivas"
              onClick={() => ir(actual + 1, true)}
            >
              <svg viewBox="0 0 320 512" fill="none" aria-hidden focusable="false">
                <path d="M74 84l170 172-170 172" stroke="currentColor" strokeWidth="80" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              className="hs-flecha hs-pausa"
              aria-label={pausado ? "Reanudar el pase de diapositivas" : "Pausar el pase de diapositivas"}
              aria-controls="hs-diapositivas"
              onClick={() => setEleccion(!pausado)}
            >
              <svg viewBox="0 0 24 24" aria-hidden focusable="false">
                {pausado ? (
                  <path fill="currentColor" d="M8 5.5v13a.8.8 0 0 0 1.2.7l10.4-6.5a.8.8 0 0 0 0-1.4L9.2 4.8a.8.8 0 0 0-1.2.7Z" />
                ) : (
                  <path fill="currentColor" d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />
                )}
              </svg>
            </button>
            <ul className="hs-puntos">
              {DIAPOSITIVAS.map((s, i) => (
                <li key={s.titulo}>
                  <button
                    type="button"
                    className="hs-punto"
                    aria-label={`Diapositiva ${i + 1} de ${total}: ${s.titulo}`}
                    aria-current={i === actual || undefined}
                    aria-controls="hs-diapositivas"
                    onClick={() => ir(i, true)}
                  >
                    {/* el relleno del punto activo es el reloj del pase:
                        al terminar su animación pasa a la siguiente, así
                        la pausa lo detiene justo donde va */}
                    {i === actual && (
                      <span
                        key={actual}
                        className="hs-progreso"
                        onAnimationEnd={() => !pausado && ir(actual + 1)}
                      />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="hs-vidrio" data-visible={Boolean(d.parrafo) || undefined} aria-hidden={!d.parrafo}>
          <div className="hs-textos-vidrio">
            {DIAPOSITIVAS.map((s, i) =>
              s.parrafo ? (
                <p key={s.titulo} className={`hs-parrafo ${i === actual ? "hs-entra" : ""}`} aria-hidden={i !== actual}>
                  {s.parrafo}
                </p>
              ) : null,
            )}
          </div>
        </div>
      </div>
      <NavSecciones />
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {aviso}
      </p>
    </section>
  );
}

// Foto de fondo con su versión vertical para teléfono (art direction con
// <picture>, optimizada por next/image).
function Fondo({ diapositiva: s, prioridad }: { diapositiva: Diapositiva; prioridad: boolean }) {
  const comun = { alt: "", fill: true, quality: 80, priority: prioridad };
  const {
    props: { srcSet: escritorio, ...resto },
  } = getImageProps({ ...comun, src: s.fondo, sizes: "97vw" });
  const {
    props: { srcSet: movil },
  } = getImageProps({ ...comun, src: s.fondoMovil, sizes: "100vw" });
  return (
    <picture>
      <source media="(max-width: 767px)" srcSet={movil} sizes="100vw" />
      <source media="(min-width: 768px)" srcSet={escritorio} sizes="97vw" />
      {/* eslint-disable-next-line jsx-a11y/alt-text -- alt vacío en `resto`: decorativa */}
      <img {...resto} className="hs-fondo" />
    </picture>
  );
}
