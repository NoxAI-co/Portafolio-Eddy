import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductSheet } from "@/components/partequipos/ProductSheet";
import { EQUIPOS, getEquipo } from "@/components/partequipos/equipos";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return EQUIPOS.map((e) => ({ slug: e.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const equipo = getEquipo(params.slug);
  if (!equipo) return {};
  const nombre = `${equipo.tipo} ${equipo.marca} ${equipo.modelo}`;
  return {
    title:
      equipo.condicion === "nueva"
        ? `${nombre} | Maquinaria nueva | Partequipos`
        : `${nombre} ${equipo.anio} | Partequipos`,
    description:
      equipo.condicion === "nueva"
        ? `${nombre}. ${equipo.linea} ${equipo.resumen}`
        : `${nombre}, año ${equipo.anio}, ${equipo.horas} horas. ${equipo.resumen}`,
  };
}

export default function EquipoPage({ params }: Props) {
  const equipo = getEquipo(params.slug);
  if (!equipo) notFound();

  return (
    <main>
      <ProductSheet equipo={equipo} />
    </main>
  );
}
