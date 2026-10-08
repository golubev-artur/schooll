// Cloudflare Worker: прокси для ИИ-репетитора.
// 1) Сначала Claude (секрет ANTHROPIC_API_KEY). 2) Если Claude не ответил, а в воркер добавлена привязка Workers AI (имя AI), отвечает бесплатная модель Cloudflare.
// Ошибки возвращаются в поле error / claudeError, чтобы их видно было на странице «Родителю».
const cors = o => ({ "Access-Control-Allow-Origin": o || "*", "Access-Control-Allow-Headers": "content-type", "Access-Control-Allow-Methods": "POST,OPTIONS", "Vary": "Origin" });

async function viaClaude(env, system, messages) {
  if (!env.ANTHROPIC_API_KEY) throw new Error("секрет ANTHROPIC_API_KEY не задан");
  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "content-type": "application/json", "x-api-key": env.ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01" },
    body: JSON.stringify({ model: env.MODEL || "claude-haiku-4-5-20251001", max_tokens: 500, system, messages }),
  });
  const j = await r.json().catch(() => ({}));
  const t = j.content && j.content[0] && j.content[0].text;
  if (!t) throw new Error((j.error && (j.error.message || j.error.type)) || ("HTTP " + r.status));
  return t;
}

async function viaCloudflare(env, system, messages) {
  if (!env.AI) throw new Error("привязка Workers AI (AI) не добавлена");
  const out = await env.AI.run("@cf/meta/llama-3.3-70b-instruct-fp8-fast", {
    messages: [{ role: "system", content: system }, ...messages], max_tokens: 500,
  });
  const t = out && (out.response || (out.result && out.result.response));
  if (!t) throw new Error("пустой ответ Workers AI");
  return t;
}

export default {
  async fetch(req, env) {
    const origin = req.headers.get("Origin") || "";
    const allowed = env.ALLOWED_ORIGIN || "https://golubev-artur.github.io";
    if (origin && origin !== allowed) return new Response("forbidden", { status: 403 });
    const C = cors(origin || allowed);
    if (req.method === "OPTIONS") return new Response(null, { headers: C });
    let body;
    try { body = await req.json(); } catch { return new Response("bad request", { status: 400, headers: C }); }
    const system = String(body.system || "").slice(0, 6000);
    const messages = (Array.isArray(body.messages) ? body.messages : []).slice(-12)
      .map(m => ({ role: m.role === "user" ? "user" : "assistant", content: String(m.content || "").slice(0, 2000) }));
    while (messages.length && messages[0].role !== "user") messages.shift();
    if (!messages.length) messages.push({ role: "user", content: "Привет" });
    const H = { ...C, "content-type": "application/json" };
    let claudeError = "";
    try {
      return new Response(JSON.stringify({ reply: await viaClaude(env, system, messages), via: "claude" }), { headers: H });
    } catch (e) { claudeError = String(e.message || e).slice(0, 300); }
    try {
      return new Response(JSON.stringify({ reply: await viaCloudflare(env, system, messages), via: "cloudflare", claudeError }), { headers: H });
    } catch (e) {
      return new Response(JSON.stringify({ error: "Claude: " + claudeError + " | Cloudflare AI: " + String(e.message || e).slice(0, 200) }), { headers: H });
    }
  },
};
