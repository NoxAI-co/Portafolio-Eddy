import type { Metadata } from "next";
import { MaquinariaNueva } from "@/components/partequipos/maquinaria/MaquinariaNueva";
import { KitDev } from "../_kit/KitDev";
import { carpetaKitGrupo, leerEstilos, leerSeccionesGrupo, zipCompletoBytes } from "../_kit/leer";

export const metadata: Metadata = {
  title: "Maquinaria pesada nueva | Partequipos",
  robots: { index: false, follow: false },
};

// Maquinaria pesada nueva sola, para revisarla y copiarla sin el resto de la
// página.
export default function NuevaPage() {
  const carpeta = carpetaKitGrupo("nueva");
  return (
    <>
      <main className="flex-1 bg-bar">
        <MaquinariaNueva />
      </main>
      <KitDev
        secciones={leerSeccionesGrupo("nueva")}
        estilos={leerEstilos()}
        zipCompleto={zipCompletoBytes(carpeta)}
        carpeta={carpeta}
        subtitulo="Partequipos · Maquinaria pesada nueva"
      />
    </>
  );
}
