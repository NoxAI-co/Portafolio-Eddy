import type { Metadata } from "next";
import { FichaModeloRepuestos } from "@/components/partequipos/repuestos/FichaModeloRepuestos";
import { FICHA_CX350B } from "@/components/partequipos/repuestos/fichas";
import { KitDev } from "../_kit/KitDev";
import {
  carpetaKitGrupo,
  leerEstilos,
  leerSeccionesGrupo,
  zipCompletoBytes,
} from "../_kit/leer";

export const metadata: Metadata = {
  title: "Repuestos Excavadora CASE CX350B | Partequipos",
  robots: { index: false, follow: false },
};

// Réplica de la ficha de repuestos de la Excavadora CASE CX350B del sitio,
// sin la barra ni el pie, para rediseñarla.
export default function RepuestosCx350bPage() {
  const carpeta = carpetaKitGrupo("ficha-repuestos");
  return (
    <>
      <main className="flex-1 bg-white">
        <FichaModeloRepuestos ficha={FICHA_CX350B} />
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
