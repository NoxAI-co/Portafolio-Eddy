// Lo que la landing dice del archivo que se descarga. Un solo lugar para
// actualizarlo con cada versión nueva de la app.

export const DESCARGA = {
  /** Dónde está el APK. Cambia cuando se publique en otro lugar. */
  url: "/sabaneta360/Sabaneta360.apk",
  /** El nombre con el que se guarda en el teléfono. */
  archivo: "Sabaneta360.apk",
  version: "0.1.0",
  /** La etapa de la app. Se muestra después del número ("0.0.4 beta");
   *  cuando salga la versión estable, se deja vacío. */
  etapa: "beta",
  /** minSdk 24 del APK (aapt dump badging). */
  androidMinimo: "Android 7.0",
};

/** La versión como se lee en la página: "0.0.4 beta". */
export const VERSION = [DESCARGA.version, DESCARGA.etapa].filter(Boolean).join(" ");
