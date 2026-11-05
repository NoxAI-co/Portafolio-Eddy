import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

// Layout raíz propio de Sabaneta 360 (route group "(sabaneta)"): no hereda el
// navbar, el tema ni el Tailwind del portafolio. Los estilos viven en el CSS
// module de la página. Inter es la misma tipografía de la app.
const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://eddys.dev"),
  title: "Sabaneta 360 · Descarga la app",
  description:
    "El patrimonio de Sabaneta en tu teléfono: fichas, rutas y el mapa del inventario municipal. Descárgala para Android.",
  icons: {
    icon: [{ url: "/sabaneta360/icono-app.png", type: "image/png" }],
    apple: [{ url: "/sabaneta360/icono-1024.png" }],
  },
  openGraph: {
    title: "Sabaneta 360",
    description:
      "El patrimonio de Sabaneta en tu teléfono. Descárgala para Android.",
    url: "/sabaneta360",
    siteName: "Sabaneta 360",
    locale: "es_CO",
    type: "website",
    images: [{ url: "/sabaneta360/compartir.png", width: 1200, height: 630 }],
  },
  alternates: { canonical: "/sabaneta360" },
};

export const viewport: Viewport = {
  themeColor: "#00403C",
};

export default function SabanetaLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      {/* Sin el margen por defecto del navegador: el teal llega a los bordes. */}
      <body className={inter.className} style={{ margin: 0 }}>
        {children}
      </body>
    </html>
  );
}
