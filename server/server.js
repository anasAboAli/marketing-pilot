import http from "node:http";
import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT || 3001);
const collections = { clients: join(root, "data/clients.json"), leads: join(root, "data/leads.json") };

async function readCollection(name) { return JSON.parse(await readFile(collections[name], "utf8")); }
async function saveCollection(name, records) { await writeFile(collections[name], JSON.stringify(records, null, 2) + "\n"); }
function send(response, status, body) { response.writeHead(status, { "Content-Type": "application/json; charset=utf-8", "Access-Control-Allow-Origin": "*" }); response.end(JSON.stringify(body)); }
async function body(request) { let raw = ""; for await (const chunk of request) raw += chunk; return raw ? JSON.parse(raw) : {}; }

const server = http.createServer(async (request, response) => {
  if (request.method === "OPTIONS") { response.writeHead(204, { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Content-Type, Authorization", "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS" }); return response.end(); }
  const url = new URL(request.url, `http://${request.headers.host}`);
  const match = url.pathname.match(/^\/api\/(clients|leads)(?:\/(\d+))?$/);
  if (!match) return send(response, 404, { message: "المسار غير موجود" });
  const [, name, id] = match;
  try {
    const records = await readCollection(name);
    if (request.method === "GET") return send(response, 200, id ? records.find((record) => record.id === Number(id)) || { message: "غير موجود" } : records);
    if (request.method === "POST") {
      const input = await body(request);
      if (!input.name) return send(response, 422, { message: "الاسم مطلوب" });
      const record = { id: records.length ? Math.max(...records.map((item) => item.id)) + 1 : 1, ...input };
      records.push(record); await saveCollection(name, records); return send(response, 201, record);
    }
    if (request.method === "DELETE" && id) { const next = records.filter((record) => record.id !== Number(id)); await saveCollection(name, next); return send(response, 200, { success: true }); }
    return send(response, 405, { message: "العملية غير مدعومة" });
  } catch (error) { console.error(error); return send(response, 500, { message: "حدث خطأ في الخادم" }); }
});
server.listen(port, () => console.log(`MarketPilot API running on http://localhost:${port}`));
