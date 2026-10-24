import { FichaModelo, metadataModelo, parametrosModelos } from "@/components/partequipos/marca/FichaModelo";

type Props = { params: { modelo: string } };

export const dynamicParams = false;
export const generateStaticParams = () => parametrosModelos("yanmar");
export const generateMetadata = ({ params }: Props) => metadataModelo("yanmar", params.modelo);

export default function Page({ params }: Props) {
  return <FichaModelo marcaSlug="yanmar" slug={params.modelo} />;
}
