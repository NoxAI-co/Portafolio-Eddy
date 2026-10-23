import { LabNav } from "./_nav/LabNav";

// Todas las páginas del lab comparten la barra para moverse entre secciones.
export default function PartequiposLabLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <LabNav />
    </>
  );
}
