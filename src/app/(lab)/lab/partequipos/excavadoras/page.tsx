import type { Metadata } from "next";
import { ExcavadorasNuevas } from "@/components/partequipos/categoria/ExcavadorasNuevas";
import { FinTransicion } from "@/components/partequipos/marca/transicion";
import { KitDev } from "../_kit/KitDev";
import { carpetaKitGrupo, leerEstilos, leerSeccionesGrupo, zipCompletoBytes } from "../_kit/leer";

export const metadata: Metadata = {
  title: "Excavadora nueva | Partequipos",
  description: "Excavadoras nuevas Case Construction e Hitachi en Colombia.",
  robots: { index: false, follow: false },
};

export default function ExcavadorasPage() {
  const carpeta = carpetaKitGrupo("excavadoras");
  return (
    <>
      <FinTransicion />
      <ExcavadorasNuevas />
      <KitDev
        secciones={leerSeccionesGrupo("excavadoras")}
        estilos={leerEstilos()}
        zipCompleto={zipCompletoBytes(carpeta)}
        carpeta={carpeta}
        subtitulo="Partequipos · Excavadoras nuevas"
      />
    </>
  );
}
