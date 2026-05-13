import http from "http";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function loadStartInstance() {
  const assetsDir = path.join(__dirname, "dist/server/assets");
  
  // Find the start-*.js file dynamically
  const files = fs.readdirSync(assetsDir);
  const startFile = files.find((f) => f.startsWith("start-") && f.endsWith(".js"));
  
  if (!startFile) {
    throw new Error(`No start-*.js file found in ${assetsDir}`);
  }

  const module = await import(path.join(assetsDir, startFile));
  return module.startInstance;
}

async function startServer() {
  try {
    const startInstance = await loadStartInstance();

    const server = http.createServer(async (req, res) => {
      try {
        const url = new URL(req.url || "/", `http://${req.headers.host}`);
        let body = undefined;

        if (req.method !== "GET" && req.method !== "HEAD") {
          body = await new Promise((resolve, reject) => {
            let data = "";
            req.on("data", (chunk) => {
              data += chunk;
            });
            req.on("end", () => resolve(data));
            req.on("error", reject);
          });
        }

        const request = new Request(url.toString(), {
          method: req.method,
          headers: new Headers(req.headers),
          body,
        });

        const response = await startInstance.handler(request);

        res.statusCode = response.status;
        for (const [key, value] of response.headers) {
          res.setHeader(key, value);
        }

        res.end(await response.text());
      } catch (error) {
        console.error("Handler error:", error);
        res.statusCode = 500;
        res.setHeader("content-type", "text/html; charset=utf-8");
        res.end(
          `<html><body><h1>500 Server Error</h1><pre>${error.message}</pre></body></html>`
        );
      }
    });

    const port = process.env.PORT || 3000;
    server.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
