const GH_OWNER = 'ShorkiStudios';
const GH_REPO  = 'shorknet-guestbook';
const GH_LABEL = 'guestbook';

export default {
  async fetch(request, env) {
    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ ok: false, error: 'POST only' }), {
        headers: { 'content-type': 'application/json' },
      });
    }

    const form = await request.formData();
    const name  = (form.get('name') || '').trim().slice(0, 60);
    const email = (form.get('email') || '').trim().slice(0, 200);
    const url   = (form.get('url') || '').trim().slice(0, 200);
    const msg   = (form.get('msg') || '').trim().slice(0, 2000);

    if (!name || !msg) {
      return new Response(JSON.stringify({ ok: false, error: 'name and message required' }), {
        headers: { 'content-type': 'application/json' },
      });
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
      return new Response(JSON.stringify({ ok: false, error: 'github api error' }), {
        headers: { 'content-type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'content-type': 'application/json' },
    });
  },
};
