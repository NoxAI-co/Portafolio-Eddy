import { FichaModelo, metadataModelo, parametrosModelos } from "@/components/partequipos/marca/FichaModelo";

type Props = { params: { modelo: string } };

export const dynamicParams = false;
export const generateStaticParams = () => parametrosModelos("dynapac");
export const generateMetadata = ({ params }: Props) => metadataModelo("dynapac", params.modelo);

export default function Page({ params }: Props) {
  return <FichaModelo marcaSlug="dynapac" slug={params.modelo} />;
}
