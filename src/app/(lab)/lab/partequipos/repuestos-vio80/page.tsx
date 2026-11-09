import type { Metadata } from "next";
import { FichaModeloRepuestos } from "@/components/partequipos/repuestos/FichaModeloRepuestos";
import { FICHA_VIO80 } from "@/components/partequipos/repuestos/fichas";
import { KitDev } from "../_kit/KitDev";
import {
  carpetaKitGrupo,
  leerEstilos,
  leerSeccionesGrupo,
  zipCompletoBytes,
} from "../_kit/leer";

export const metadata: Metadata = {
  title: "Repuestos Miniexcavadora YANMAR VIO80-1 | Partequipos",
  robots: { index: false, follow: false },
};

// Variante de la ficha de repuestos para la Miniexcavadora YANMAR VIO80-1: el mismo diseño que la
// del CX350B, con los datos y colores de su marca.
export default function RepuestosVIO80Page() {
  const carpeta = carpetaKitGrupo("ficha-repuestos");
  return (
    <>
      <main className="flex-1 bg-white">
        <FichaModeloRepuestos ficha={FICHA_VIO80} />
      </main>
      <KitDev
        secciones={leerSeccionesGrupo("ficha-repuestos")}
        estilos={leerEstilos()}
        zipCompleto={zipCompletoBytes(carpeta)}
        carpeta={carpeta}
        subtitulo="Partequipos · Ficha de repuestos de un modelo"
      />
    </>
  );
}
