// middleware.js – Vercel Edge Middleware (non-Next.js / Vite)
// Intercepts requests from social media crawlers (WhatsApp, FB, Telegram, etc.)
// and returns a pre-rendered HTML page with dynamic OG meta tags.
// Regular users are passed through as normal to the React SPA.

export const config = {
  matcher: '/',
};

const FIREBASE_PROJECT_ID = 'web-undangan-tenrypalli';
const FIREBASE_API_KEY = 'AIzaSyCsjGZCtXEapLz_U_Eapq_sHYpJMIOZnZg';

const BOT_AGENTS = [
  'whatsapp',
  'facebookexternalhit',
  'twitterbot',
  'telegrambot',
  'linkedinbot',
  'slackbot',
  'discordbot',
  'googlebot',
  'bingbot',
  'applebot',
  'ia_archiver',
  'crawler',
  'spider',
];

function isCrawler(userAgent = '') {
  const ua = userAgent.toLowerCase();
  return BOT_AGENTS.some((bot) => ua.includes(bot));
}

async function getGuestNameBySlug(slug) {
  try {
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
    return doc?.fields?.nama?.stringValue || null;
  } catch {
    return null;
  }
}

function escapeHtml(str = '') {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export default async function middleware(request) {
  const url = new URL(request.url);
  const slug = url.searchParams.get('to') || '';
  const userAgent = request.headers.get('user-agent') || '';

  // Hanya proses jika dari crawler DAN ada parameter ?to=
  if (!isCrawler(userAgent) || !slug.trim()) {
    // Pengguna biasa → lanjut ke SPA React seperti biasa
    return; // undefined = pass through di Vercel Edge Middleware
  }

  // Ambil nama tamu dari Firestore REST API
  const guestName = await getGuestNameBySlug(slug.trim());

  const title = guestName
    ? `Undangan Nikah Tenry & Palli – Untuk ${guestName}`
    : 'Undangan Nikah Tenry & Palli';

  const description = guestName
    ? `Kepada Yth. ${guestName}, kami dengan penuh suka cita mengundang Anda untuk hadir pada acara pernikahan kami. Merupakan suatu kehormatan dan kebahagiaan apabila berkenan hadir memberikan doa restu.`
    : 'Tanpa mengurangi rasa hormat, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk hadir pada acara pernikahan kami.';

  const siteUrl = 'https://undangan-pernikahan-tenry-palli.vercel.app';
  const pageUrl = `${siteUrl}/?to=${encodeURIComponent(slug)}`;
  const imageUrl = `${siteUrl}/FOTO1.jpeg`;

  const safeTitle = escapeHtml(title);
  const safeDesc = escapeHtml(description);

  const html = `<!doctype html>
<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${safeTitle}</title>
    <meta name="description" content="${safeDesc}" />

    <!-- Open Graph / WhatsApp / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${pageUrl}" />
    <meta property="og:title" content="${safeTitle}" />
    <meta property="og:description" content="${safeDesc}" />
    <meta property="og:image" content="${imageUrl}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:locale" content="id_ID" />

    <!-- Twitter / X -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${safeTitle}" />
    <meta name="twitter:description" content="${safeDesc}" />
    <meta name="twitter:image" content="${imageUrl}" />
  </head>
  <body>
    <h1>${safeTitle}</h1>
    <p>${safeDesc}</p>
  </body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}
