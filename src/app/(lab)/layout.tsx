import type { Metadata } from "next";
import { Inter } from "next/font/google";

// Layout raíz propio del lab de Partequipos (route group "(lab)"): no hereda
// el navbar, el tema ni el ancho del portafolio. Los estilos van ya
// compilados con Tailwind v4 en public/partequipos/partequipos.css (ver
// scripts/build-partequipos-css.md) y se cargan con <link> para que el
// Tailwind v3 del portafolio no los procese.
const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Partequipos · Maquinaria pesada",
  robots: { index: false, follow: false },
};

export default function LabLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className="h-full antialiased">
      <head>
        {/* eslint-disable-next-line @next/next/no-css-tags -- CSS precompilado fuera del pipeline de Tailwind v3 */}
        <link rel="stylesheet" href="/partequipos/partequipos.css" />
      </head>
      <body className={`${inter.className} flex min-h-full flex-col`}>{children}</body>
    </html>
  );
}
