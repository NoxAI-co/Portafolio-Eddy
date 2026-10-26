import type { Metadata } from "next";
import { MarcasAliadas } from "@/components/partequipos/maquinaria/MarcasAliadas";
import { KitDev } from "../_kit/KitDev";
import { carpetaKitGrupo, leerEstilos, leerSeccionesGrupo, zipCompletoBytes } from "../_kit/leer";

export const metadata: Metadata = {
  title: "Marcas aliadas | Partequipos",
  robots: { index: false, follow: false },
};

// Marcas aliadas sola, para revisarla y copiarla sin el resto de la página.
export default function AliadasPage() {
  const carpeta = carpetaKitGrupo("aliadas");
  return (
    <>
      <main className="flex-1 bg-bar pt-3 sm:pt-5 lg:pt-6">
        <MarcasAliadas />
      </main>
      <KitDev
        secciones={leerSeccionesGrupo("aliadas")}
        estilos={leerEstilos()}
        zipCompleto={zipCompletoBytes(carpeta)}
        carpeta={carpeta}
        subtitulo="Partequipos · Marcas aliadas"
      />
    </>
  );
}
