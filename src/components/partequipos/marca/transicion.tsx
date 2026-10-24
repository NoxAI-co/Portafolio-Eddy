"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLayoutEffect, type ComponentProps } from "react";

// Transición de vista entre la tarjeta de un modelo y su ficha. Next 14 no la
// trae, así que se usa la API del navegador: startViewTransition toma la foto
// de la página actual, navega y espera a que la nueva esté montada (la avisa
// <FinTransicion />) para animar entre las dos.
//
// Solo dos elementos llevan nombre de transición, y solo mientras dura: el de
// origen (la foto en la que se hizo clic) y el de destino en la página nueva.
// Con nombres fijos, las demás tarjetas que aparecen en las dos páginas
// también volarían de un lado a otro. Sin la API o con movimiento reducido se
// navega normal.

const NOMBRE = "foto-modelo";

let pendiente: (() => void) | null = null;

const espera = (ms: number) => new Promise((r) => window.setTimeout(r, ms));

// los tipos del DOM de este TypeScript aún no traen viewTransitionName
const nombrar = (el: HTMLElement | null, nombre: string) => el?.style.setProperty("view-transition-name", nombre);

type Transicion = { finished: Promise<void> };
type ConTransicion = Document & { startViewTransition?: (cb: () => Promise<void>) => Transicion };

export function EnlaceTransicion({
  href,
  origen,
  destino,
  onClick,
  ...props
}: ComponentProps<typeof Link> & {
  href: string;
  /** Selector del elemento de esta página que se transforma. */
  origen?: string;
  /** Selector del elemento de la página nueva en el que se convierte. */
  destino?: string;
}) {
  const router = useRouter();
  return (
    <Link
      href={href}
      {...props}
      onClick={(e) => {
        onClick?.(e);
        const doc = document as ConTransicion;
        // nueva pestaña, ventana o descarga: lo maneja el navegador
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        if (!doc.startViewTransition || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        e.preventDefault();

        const desde = origen ? document.querySelector<HTMLElement>(origen) : null;
        nombrar(desde, NOMBRE);
        let hasta: HTMLElement | null = null;

        const t = doc.startViewTransition(
          () =>
            new Promise<void>((listo) => {
              const fin = async () => {
                pendiente = null;
                // Next baja al ancla después de esta captura: se baja antes,
                // para que el destino (la tarjeta) ya esté a la vista
                const ancla = new URL(href, location.href).hash.slice(1);
                if (ancla) document.getElementById(decodeURIComponent(ancla))?.scrollIntoView({ block: "start" });
                hasta = destino ? document.querySelector<HTMLElement>(destino) : null;
                nombrar(hasta, NOMBRE);
                // la captura de destino se toma al resolver: si su foto aún no
                // carga, viajaría una caja vacía y la foto aparecería al final
                const img = hasta?.querySelector("img");
                if (img && !img.complete) await Promise.race([img.decode().catch(() => {}), espera(600)]);
                listo();
              };
              pendiente = fin;
              // si la página nueva tarda, no se deja la pantalla congelada
              window.setTimeout(() => pendiente === fin && fin(), 1500);
              router.push(href);
            }),
        );
        t.finished.finally(() => {
          nombrar(desde, "");
          nombrar(hasta, "");
        });
      }}
    />
  );
}

// Va en las páginas de destino: al montarse libera la transición en curso.
export function FinTransicion() {
  useLayoutEffect(() => {
    pendiente?.();
  });
  return null;
}
