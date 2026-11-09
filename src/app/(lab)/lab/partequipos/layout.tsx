import { EspacioNavbar } from "./_nav/EspacioNavbar";
import { LabNav } from "./_nav/LabNav";

// Todas las páginas del lab llevan arriba el espacio que ocupa la barra del
// sitio (para validar cómo se acomoda cada página debajo de ella) y comparten
// la barra para moverse entre secciones.
export default function PartequiposLabLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <EspacioNavbar />
      {children}
      <LabNav />
    </>
  );
}
