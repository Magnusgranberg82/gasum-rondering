// ══════════════════════════════════════════════════════════════════
// GASUM RONDERING — KONFIGURATION
// ══════════════════════════════════════════════════════════════════
// Denna fil innehåller dina privata nycklar för Google Drive-synk.
//
// VIKTIGT:
//   - Ladda ALDRIG upp denna fil till ett publikt GitHub-repo
//     utan att ha fyllt i dina riktiga nycklar
//   - Om du av misstag publicerar nycklar — återkalla dem direkt
//     i Google Cloud Console och skapa nya
//   - Filen behöver bara skapas/ändras EN gång
//   - När appen (index.html) uppdateras berörs inte denna fil
//
// Instruktioner:
//   1. Ersätt värdena nedan med dina riktiga nycklar
//   2. Spara filen
//   3. Ladda upp till GitHub (samma mapp som index.html)
//   4. Klart — appen hämtar nycklarna automatiskt
// ══════════════════════════════════════════════════════════════════

window.GDRIVE_CONFIG = {

  // Google API-nyckel
  // Hämtas från: console.cloud.google.com → APIs & Services → Credentials
  apiKey: 'AIzaSyA5sviIoPYGwagJnp8JX9-0iZQKfQYM9wk',

  // Google Drive Fil-ID (JSON-datafilen)
  // Hämtas från URL:en i Google Drive: /d/[DETTA_ÄR_FIL_ID]/
  fileId: '1mVCJRz3Y-D1KAg0pbeb_huLgf98omj3NQiHd7mcpuho',

  // OAuth 2.0 Client ID
  // Hämtas från: console.cloud.google.com → APIs & Services → Credentials
  clientId: '213880128400-qt8suoc80nles038b63tjrfdhn1mb9ui.apps.googleusercontent.com',

};
