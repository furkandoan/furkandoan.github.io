import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../dist/", import.meta.url));
const port = Number(process.env.PORT || 4322);
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".svg": "image/svg+xml", ".pdf": "application/pdf", ".woff2": "font/woff2", ".png": "image/png", ".jpg": "image/jpeg", ".xml": "application/xml; charset=utf-8", ".txt": "text/plain; charset=utf-8" };
try { await stat(resolve(root, "index.html")); }
catch { console.error("dist/index.html bulunamadı. Önce pnpm build çalıştırın."); process.exit(1); }
const server = createServer(async (req, res) => {
  try {
    if (req.method !== "GET" && req.method !== "HEAD") { res.writeHead(405); res.end(); return; }
    const pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
    if (pathname.split("/").some((part) => part.startsWith(".")) || pathname.includes("\\")) throw new Error("Invalid path");
    let file = resolve(root, "." + pathname, pathname.endsWith("/") ? "index.html" : "");
    if (!file.startsWith(root.endsWith(sep) ? root : root + sep)) throw new Error("Invalid path");
    if ((await stat(file)).isDirectory()) file = resolve(file, "index.html");
    const data = await readFile(file);
    res.writeHead(200, { "Content-Type": types[extname(file)] || "application/octet-stream", "X-Content-Type-Options": "nosniff", "Cache-Control": "no-cache" });
    res.end(req.method === "HEAD" ? undefined : data);
  } catch { res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" }); res.end("Sayfa bulunamadı."); }
});
server.on("error", (error) => {
  console.error(error.code === "EADDRINUSE" ? `Port ${port} kullanımda. Önce http://127.0.0.1:${port}/ adresini deneyin; başka bir uygulama açıksa PORT=4323 npm start ile alternatif port kullanın.` : error.message);
  process.exitCode = 1;
});
server.listen(port, "127.0.0.1", () => console.log(`Ana sayfa hazır: http://127.0.0.1:${port}/\nBu pencereyi açık tutun. Durdurmak için Control + C.`));
