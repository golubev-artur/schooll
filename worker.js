// Cloudflare Worker: прокси к Claude API. Секрет: ANTHROPIC_API_KEY (в браузер не попадает).
// Необязательная переменная ALLOWED_ORIGIN (например https://golubev-artur.github.io): принимать запросы только с сайта.
const cors = o => ({ "Access-Control-Allow-Origin": o || "*", "Access-Control-Allow-Headers": "content-type", "Access-Control-Allow-Methods": "POST,OPTIONS", "Vary": "Origin" });
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
    if (!messages.length || messages[0].role !== "user") messages.unshift({ role: "user", content: "Привет" });
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "content-type": "application/json", "x-api-key": env.ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({ model: env.MODEL || "claude-haiku-4-5-20251001", max_tokens: 500, system, messages }),
    });
    const j = await r.json();
    return new Response(JSON.stringify({ reply: j.content?.[0]?.text || "Не получилось ответить, попробуй ещё раз." }),
      { headers: { ...C, "content-type": "application/json" } });
  },
};
