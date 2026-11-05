import Image from "next/image";
import { CATEGORIAS } from "./categorias";
import { DESCARGA, VERSION } from "./descarga";
import { ANDROID_PATH, QR_PATH, QR_SIZE } from "./marcas";
import s from "./sabaneta.module.css";

// Los íconos del inventario patrimonial, tal como los usa la app. El 7 no
// existe en el catálogo.
const ICONOS = [
  1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41,
  42, 43, 44, 45, 46, 47, 48, 49, 50,
];
const FILA_A = ICONOS.filter((_, i) => i % 2 === 0);
const FILA_B = ICONOS.filter((_, i) => i % 2 === 1);

const icono = (n: number) =>
  `/sabaneta360/iconos/icono-${String(n).padStart(2, "0")}.webp`;

// Lo que se hace en el mapa, en el orden en que aparece al bajar.
const MAPA = [
  {
    titulo: "Mira qué hay cerca",
    texto: "Cada lugar del inventario aparece con su ícono, alrededor de ti.",
  },
  {
    titulo: "Filtra o busca",
    texto: "Por categoría, por nombre, por vereda. El mapa muestra solo eso.",
  },
  {
    titulo: "Abre la ficha",
    texto: "Toca un lugar y lee su historia, sus fotos y su estado.",
  },
];

const PASOS = [
  {
    titulo: "Descarga el archivo",
    texto: `Toca «Descargar para Android». Se guarda como ${DESCARGA.archivo}.`,
  },
  {
    titulo: "Permite la instalación",
    texto:
      "Ábrelo. Si Android lo pide, permite instalar apps desde tu navegador.",
  },
  {
    titulo: "Abre Sabaneta 360",
    texto: "Queda en tu pantalla de inicio, como cualquier otra app.",
  },
];

// Sobre el verde del pie van en su versión para fondo oscuro, salvo los
// Vigías, cuyo verde ya se lee sobre oscuro (igual que en la app).
const ALIADOS = [
  { archivo: "vigias", nombre: "Vigías Guardianes del Patrimonio de Sabaneta", alto: 64 },
  { archivo: "culturas-oscuro", nombre: "Ministerio de las Culturas, las Artes y los Saberes", alto: 80 },
  { archivo: "alcaldia-oscuro", nombre: "Alcaldía de Sabaneta", alto: 92 },
  { archivo: "barquerena-oscuro", nombre: "Casa de la Cultura La Barquereña", alto: 66 },
];

function Descargar({ tono }: { tono: "claro" | "oscuro" }) {
  return (
    <a
      className={`${s.descargar} ${tono === "oscuro" ? s.descargarOscuro : ""}`}
      href={DESCARGA.url}
      download={DESCARGA.archivo}
    >
      <svg className={s.android} viewBox="0 0 24 24" aria-hidden="true">
        <path d={ANDROID_PATH} />
      </svg>
      <span>Descargar para Android</span>
      <svg className={s.flecha} viewBox="0 0 16 16" aria-hidden="true">
        <path d="M8 2.5v9M4 8l4 4 4-4" />
      </svg>
    </a>
  );
}

export default function Sabaneta360() {
  return (
    <main className={s.pagina}>
      {/* El encabezado: las ondas de la marca, el logotipo y la descarga. Las
          pantallas de la app salen de él y bajan sobre la sección siguiente. */}
      <header className={s.encabezado}>
        <div className={s.ondas} aria-hidden="true" />
        <div className={s.grano} aria-hidden="true" />

        <div className={s.encabezadoContenido}>
          <h1 className={s.marca}>
            <Image
              src="/sabaneta360/logotipo.webp"
              alt="Sabaneta 360 · Patrimonio y Memoria"
              width={862}
              height={190}
              priority
              className={s.logotipo}
            />
          </h1>
          <p className={s.lema}>El patrimonio de Sabaneta, en tu bolsillo.</p>
          <Descargar tono="oscuro" />
          <p className={s.ficha}>Versión {VERSION} · {DESCARGA.androidMinimo} o superior</p>
        </div>

        <div className={s.telefonos}>
          <figure className={`${s.telefono} ${s.izquierda}`}>
            <Image
              src="/sabaneta360/app-patrimonio.webp"
              alt="La pantalla Patrimonio de la app"
              width={780}
              height={1688}
            />
          </figure>
          <figure className={`${s.telefono} ${s.centro}`}>
            <Image
              src="/sabaneta360/app-inicio.webp"
              alt="La pantalla de bienvenida de Sabaneta 360"
              width={780}
              height={1688}
              priority
            />
          </figure>
          <figure className={`${s.telefono} ${s.derecha}`}>
            <Image
              src="/sabaneta360/app-rutas.webp"
              alt="La pantalla Rutas de la app"
              width={780}
              height={1688}
            />
          </figure>
        </div>
      </header>

      {/* Qué trae: una frase, los íconos del inventario y lo que significan. */}
      <section className={s.inventario}>
        <p className={s.frase}>
          Fichas, rutas y el mapa del patrimonio del municipio.
        </p>

        <div className={s.cinta} aria-hidden="true">
          {[FILA_A, FILA_B].map((fila, f) => (
            <div key={f} className={`${s.fila} ${f === 1 ? s.filaInversa : ""}`}>
              {[...fila, ...fila].map((n, i) => (
                <Image key={i} src={icono(n)} alt="" width={64} height={64} />
              ))}
            </div>
          ))}
        </div>

        {/* Las categorías del inventario: un ícono, su nombre y qué hay en
            ella. Es el color que se ve en los íconos de la cinta. */}
        <ul className={s.categorias}>
          {CATEGORIAS.map((c) => (
            <li key={c.nombre}>
              <Image src={icono(c.icono)} alt="" width={48} height={48} />
              <h2>{c.nombre}</h2>
              <p>{c.texto}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* El mapa: el teléfono se queda quieto mientras bajas, se endereza y,
          al llegar al último paso, la ficha de un lugar sube sobre él. Sin
          soporte de animación por scroll, todo se ve igual, solo quieto. */}
      <section className={s.mapa} aria-labelledby="mapa-titulo">
        <div className={s.mapaFijo}>
          <div className={s.mapaTelefonos}>
            <figure className={`${s.telefono} ${s.mapaPrincipal}`}>
              <Image
                src="/sabaneta360/app-mapa.webp"
                alt="El mapa de la app con los lugares del inventario"
                width={780}
                height={1688}
              />
            </figure>
            <figure className={`${s.telefono} ${s.mapaFicha}`}>
              <Image
                src="/sabaneta360/app-ficha.webp"
                alt="La ficha de María Auxiliadora en la app"
                width={780}
                height={1688}
              />
            </figure>
          </div>

          <div className={s.mapaTexto}>
            <h2 id="mapa-titulo" className={s.mapaTitulo}>
              Todo el patrimonio, en un mapa.
            </h2>
            <ol className={s.mapaPasos}>
              {MAPA.map((m) => (
                <li key={m.titulo}>
                  <h3>{m.titulo}</h3>
                  <p>{m.texto}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Cómo instalarla, y el QR para quien llega desde el computador. */}
      <section className={s.instalar}>
        <div className={s.panel}>
          <h2 className={s.titulo}>Cómo instalarla</h2>
          <ol className={s.pasos}>
            {PASOS.map((p, i) => (
              <li key={p.titulo}>
                <span className={s.numero}>{i + 1}</span>
                <h3>{p.titulo}</h3>
                <p>{p.texto}</p>
              </li>
            ))}
          </ol>
          <div className={s.cierre}>
            <div className={s.cierreDescarga}>
              <Descargar tono="claro" />
              <p className={s.fichaCierre}>
                Versión {VERSION} · {DESCARGA.androidMinimo} o superior
              </p>
            </div>
            <div className={s.qr}>
              <svg
                viewBox={`-2 -2 ${QR_SIZE + 4} ${QR_SIZE + 4}`}
                role="img"
                aria-label="Código QR de esta página"
              >
                <rect x={-2} y={-2} width={QR_SIZE + 4} height={QR_SIZE + 4} fill="#fff" rx={2} />
                <path d={QR_PATH} />
              </svg>
              <p>¿Estás en el computador? Escanéalo con tu teléfono Android.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className={s.pie}>
        <ul className={s.aliados}>
          {ALIADOS.map((a) => (
            <li key={a.archivo}>
              <Image
                src={`/sabaneta360/aliados/${a.archivo}.png`}
                alt={a.nombre}
                width={a.alto * 3}
                height={a.alto}
                unoptimized
                style={{ height: a.alto, width: "auto" }}
              />
            </li>
          ))}
        </ul>
        <p className={s.creditos}>
          Un proyecto de los Vigías del Patrimonio de Sabaneta, con el apoyo
          del Programa Nacional de Estímulos.
        </p>
        <p className={s.firma}>
          Diseño y desarrollo de la aplicación:{" "}
          <a href="/">Eddy Santiago Giraldo Hincapié</a>
        </p>
      </footer>
    </main>
  );
}
