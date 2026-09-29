// Cloudflare Worker: прокси к Claude API. Секрет: ANTHROPIC_API_KEY (в браузер не попадает).
const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "content-type", "Access-Control-Allow-Methods": "POST,OPTIONS" };
export default {
  async fetch(req, env) {
    if (req.method === "OPTIONS") return new Response(null, { headers: CORS });
    const { messages = [], system = "" } = await req.json();
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "content-type": "application/json", "x-api-key": env.ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({ model: env.MODEL || "claude-haiku-4-5-20251001", max_tokens: 500, system,
        messages: messages.slice(-12).map(m => ({ role: m.role === "user" ? "user" : "assistant", content: String(m.content).slice(0, 2000) })) }),
    });
    const j = await r.json();
    return new Response(JSON.stringify({ reply: j.content?.[0]?.text || "Не получилось ответить, попробуй ещё раз." }),
      { headers: { ...CORS, "content-type": "application/json" } });
  },
};
