import { createServer } from "node:http";
import { existsSync, createReadStream } from "node:fs";
import { extname, join, normalize, resolve } from "node:path";

const port = 8081;
const rootDir = resolve("dist");
const indexFile = join(rootDir, "index.html");

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
};

const sendFile = (response, filePath) => {
  const extension = extname(filePath).toLowerCase();
  const contentType = mimeTypes[extension] || "application/octet-stream";

  response.writeHead(200, { "Content-Type": contentType });
  createReadStream(filePath).pipe(response);
};

const notFound = (response) => {
  response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
  response.end("Build output not found. Run `npm run build:web` first.");
};

createServer((request, response) => {
  if (!existsSync(indexFile)) {
    notFound(response);
    return;
  }

  const requestPath = request.url?.split("?")[0] || "/";
  const relativePath =
    requestPath === "/" ? "index.html" : requestPath.replace(/^\/+/, "");
  const safePath = normalize(relativePath).replace(/^(\.\.[/\\])+/, "");
  const filePath = join(rootDir, safePath);

  if (existsSync(filePath)) {
    sendFile(response, filePath);
    return;
  }

  sendFile(response, indexFile);
}).listen(port, "0.0.0.0", () => {
  console.log(`Production preview running at http://localhost:${port}`);
});
