import type { Metadata } from "next";
import { RepuestosMarcas } from "@/components/partequipos/repuestos/RepuestosMarcas";
import { KitDev } from "../_kit/KitDev";
import { carpetaKitGrupo, leerEstilos, leerSeccionesGrupo, zipCompletoBytes } from "../_kit/leer";

export const metadata: Metadata = {
  title: "Repuestos por marca | Partequipos",
  robots: { index: false, follow: false },
};

// Réplica de /repuestos-maquinaria-pesada-marcas del sitio: solo la cabecera y
// las marcas, sin la barra ni el pie.
export default function RepuestosMarcasPage() {
  const carpeta = carpetaKitGrupo("repuestos-marcas");
  return (
    <>
      <main className="flex-1 bg-[#f0f0f0] pt-3 sm:pt-5 lg:pt-[1.5vw]">
        <RepuestosMarcas />
      </main>
      <KitDev
        secciones={leerSeccionesGrupo("repuestos-marcas")}
        estilos={leerEstilos()}
        zipCompleto={zipCompletoBytes(carpeta)}
        carpeta={carpeta}
        subtitulo="Partequipos · Repuestos por marca"
      />
    </>
  );
}
