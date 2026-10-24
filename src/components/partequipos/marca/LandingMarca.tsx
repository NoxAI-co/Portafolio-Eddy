import type { Metadata } from "next";
import { LineaEquipos } from "./LineaEquipos";
import { MarcaHero } from "./MarcaHero";
import { PildoraMarca } from "./PildoraMarca";
import { ModelosMarca } from "./ModelosMarca";
import type { Marca } from "./marcas";
import { AguilaFondo } from "./mascota/Mascota";
import { FinTransicion } from "./transicion";

// Landing de una marca: píldora de categorías que aparece al bajar, hero,
// cinta de tipos y una sección por tipo con su franja, la máquina y «Ver toda la
// categoría». Si la marca tiene mascota va grande y gris de fondo, como único
// sello; si no, las secciones quedan sobre el gris liso.
export function LandingMarca({ marca }: { marca: Marca }) {
  const contenido = (
    <>
      <LineaEquipos marca={marca} />
      <ModelosMarca marca={marca} detalle />
    </>
  );

  return (
    <main className="flex-1 bg-[#f0f0f0]">
      {/* al volver de una ficha, libera la transición */}
      <FinTransicion />
      <PildoraMarca marca={marca} />
      <MarcaHero marca={marca} />
      {marca.mascota ? <AguilaFondo mascota={marca.mascota}>{contenido}</AguilaFondo> : contenido}
    </main>
  );
}

export const metadataMarca = (marca: Marca): Metadata => ({
  title: `${marca.titulo} | Partequipos`,
  description: marca.presentacion,
  robots: { index: false, follow: false },
});
