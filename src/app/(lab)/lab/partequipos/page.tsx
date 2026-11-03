import type { Metadata } from "next";
import { UsedHero } from "@/components/partequipos/maquinaria/UsedHero";
import { CatalogoUsados } from "@/components/partequipos/maquinaria/CatalogoUsados";
import { MaquinariaNueva } from "@/components/partequipos/maquinaria/MaquinariaNueva";
import { MarcasRepuestos } from "@/components/partequipos/maquinaria/MarcasRepuestos";
import { MarcasSlider } from "@/components/partequipos/maquinaria/MarcasSlider";
import { CatalogoRepuestos } from "@/components/partequipos/maquinaria/CatalogoRepuestos";
import { BannerCotizar } from "@/components/partequipos/maquinaria/BannerCotizar";
import { HeroSlider } from "@/components/partequipos/home/HeroSlider";
import { EspacioNavbar } from "./_nav/EspacioNavbar";
import { KitDev } from "./_kit/KitDev";
import { leerEstilos, leerSecciones, zipCompletoBytes } from "./_kit/leer";

export const metadata: Metadata = {
  title: "Maquinaria pesada usada | Partequipos",
  description:
    "Excavadoras, retrocargadoras, cargadores, minicargadores y motoniveladoras usadas en Colombia.",
};

export default function PartequiposPage() {
  return (
    <>
      <main>
        {/* arriba, el espacio que ocupa la barra del sitio, para validar cómo
            se acomoda el slider debajo */}
        <EspacioNavbar />
        <HeroSlider />
        <MaquinariaNueva />
        <CatalogoUsados hero={<UsedHero />} />
        <MarcasSlider />
        <CatalogoRepuestos />
        <MarcasRepuestos />
        <BannerCotizar />
      </main>
      {/* el código se lee en el build: lo que se copia es exactamente lo que
          renderiza esta página */}
      <KitDev secciones={leerSecciones()} estilos={leerEstilos()} zipCompleto={zipCompletoBytes()} />
    </>
  );
}
