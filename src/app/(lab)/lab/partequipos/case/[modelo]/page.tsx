import { FichaModelo, metadataModelo, parametrosModelos } from "@/components/partequipos/marca/FichaModelo";

type Props = { params: { modelo: string } };

export const dynamicParams = false;
export const generateStaticParams = () => parametrosModelos("case");
export const generateMetadata = ({ params }: Props) => metadataModelo("case", params.modelo);

export default function Page({ params }: Props) {
  return <FichaModelo marcaSlug="case" slug={params.modelo} />;
}
