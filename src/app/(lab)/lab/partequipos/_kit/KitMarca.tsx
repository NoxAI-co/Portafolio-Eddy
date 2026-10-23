import { getMarca } from "@/components/partequipos/marca/marcas";
import { KitDev } from "./KitDev";
import { carpetaKitMarca, leerEstilos, leerSeccionesMarca, zipCompletoBytes } from "./leer";

// Kit para desarrollo de una landing de marca: lo mismo que el de la página
// principal, con las secciones de la landing y solo las imágenes de la marca.
// El código se lee en el build, así que es exactamente el que renderiza.
export function KitMarca({ slug }: { slug: string }) {
  const carpeta = carpetaKitMarca(slug);
  return (
    <KitDev
      secciones={leerSeccionesMarca(slug)}
      estilos={leerEstilos()}
      zipCompleto={zipCompletoBytes(carpeta)}
      carpeta={carpeta}
      subtitulo={`Partequipos · ${getMarca(slug)!.nombre}`}
    />
  );
}
