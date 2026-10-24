import { FichaModelo, metadataModelo, parametrosModelos } from "@/components/partequipos/marca/FichaModelo";

type Props = { params: { modelo: string } };

export const dynamicParams = false;
export const generateStaticParams = () => parametrosModelos("hitachi");
export const generateMetadata = ({ params }: Props) => metadataModelo("hitachi", params.modelo);

export default function Page({ params }: Props) {
  return <FichaModelo marcaSlug="hitachi" slug={params.modelo} />;
}
