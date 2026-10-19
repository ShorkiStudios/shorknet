const GH_OWNER = 'ShorkiStudios';
const GH_REPO  = 'shorknet-guestbook';
const GH_LABEL = 'guestbook';

const ALLOWED_ORIGINS = [
  'https://shorknet.net',
  'https://www.shorknet.net',
];

function corsHeaders(request) {
  const origin = request.headers.get('Origin') || '';
  const allow = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allow,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Vary': 'Origin',
  };
}

function json(request, obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'content-type': 'application/json', ...corsHeaders(request) },
  });
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(request) });
    }

    if (request.method !== 'POST') {
      return json(request, { ok: false, error: 'POST only' });
    }

    const form = await request.formData();
    const name  = (form.get('name') || '').trim().slice(0, 60);
    const email = (form.get('email') || '').trim().slice(0, 200);
    const url   = (form.get('url') || '').trim().slice(0, 200);
    const msg   = (form.get('msg') || '').trim().slice(0, 2000);

    if (!name || !msg) {
      return json(request, { ok: false, error: 'name and message required' });
    }

    let meta = '';
    if (url)   meta += 'url: ' + url + '\n';
    if (email) meta += 'email: ' + email + '\n';
    const body = meta ? meta + '\n' + msg : msg;

    const ghRes = await fetch(
      'https://api.github.com/repos/' + GH_OWNER + '/' + GH_REPO + '/issues',
      {
        method: 'POST',
        headers: {
          'Authorization': 'token ' + env.GH_TOKEN,
          'Content-Type': 'application/json',
          'User-Agent': 'shorknet-guestbook-worker',
        },
        body: JSON.stringify({
          title: name,
          body: body,
          labels: [GH_LABEL],
        }),
      }
    );

    if (!ghRes.ok) {
      return json(request, { ok: false, error: 'github api error' });
    }

    return json(request, { ok: true });
  },
};
