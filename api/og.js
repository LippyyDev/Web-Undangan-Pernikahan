// api/og.js – Vercel Serverless Function
// Generates an HTML page with dynamic Open Graph meta tags
// based on the ?to= query parameter (guest slug), queried from Firestore REST API.

export const config = {
  runtime: 'edge',
};

const FIREBASE_PROJECT_ID = 'web-undangan-tenrypalli';
const FIREBASE_API_KEY = 'AIzaSyCsjGZCtXEapLz_U_Eapq_sHYpJMIOZnZg';

// Firestore REST endpoint to query guests by slug
async function getGuestNameBySlug(slug) {
  const url = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents:runQuery?key=${FIREBASE_API_KEY}`;

  const body = JSON.stringify({
    structuredQuery: {
      from: [{ collectionId: 'guests' }],
      where: {
        fieldFilter: {
          field: { fieldPath: 'slug' },
          op: 'EQUAL',
          value: { stringValue: slug },
        },
      },
      limit: 1,
    },
  });

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
  });

  if (!res.ok) return null;

  const data = await res.json();
  const doc = data?.[0]?.document;
  if (!doc) return null;

  return doc.fields?.nama?.stringValue || null;
}

export default async function handler(req) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('to') || '';

  let guestName = null;
  if (slug) {
    guestName = await getGuestNameBySlug(slug.trim());
  }

  const title = guestName
    ? `Undangan Nikah Tenry & Palli – Untuk ${guestName}`
    : 'Undangan Nikah Tenry & Palli';

  const description = guestName
    ? `Kepada Yth. ${guestName}, kami mengundang Anda untuk hadir pada acara pernikahan kami. Merupakan suatu kehormatan apabila berkenan hadir untuk memberikan doa restu.`
    : 'Tanpa mengurangi rasa hormat, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk hadir pada acara pernikahan kami.';

  const siteUrl = 'https://undangan-pernikahan-tenry-palli.vercel.app';
  const pageUrl = slug ? `${siteUrl}/?to=${slug}` : siteUrl;
  const imageUrl = `${siteUrl}/FOTO1.jpeg`;

  const html = `<!doctype html>
<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <meta name="description" content="${description}" />

    <!-- Open Graph / WhatsApp / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${pageUrl}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${imageUrl}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="${pageUrl}" />
    <meta property="twitter:title" content="${title}" />
    <meta property="twitter:description" content="${description}" />
    <meta property="twitter:image" content="${imageUrl}" />

    <!-- Redirect ke halaman utama setelah meta dibaca -->
    <meta http-equiv="refresh" content="0; url=${pageUrl}" />
    <script>window.location.replace("${pageUrl}");</script>
  </head>
  <body>
    <p>Mengalihkan ke undangan... <a href="${pageUrl}">Klik di sini jika tidak dialihkan otomatis.</a></p>
  </body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
