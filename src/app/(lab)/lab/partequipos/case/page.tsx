import { LandingMarca, metadataMarca } from "@/components/partequipos/marca/LandingMarca";
import { getMarca } from "@/components/partequipos/marca/marcas";
import { KitMarca } from "../_kit/KitMarca";

const marca = getMarca("case")!;

export const metadata = metadataMarca(marca);

export default function CasePage() {
  return (
    <>
      <LandingMarca marca={marca} />
      <KitMarca slug="case" />
    </>
  );
}
