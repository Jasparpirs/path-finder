import http from "http";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Dynamically import the compiled start instance
// This will load all the route handlers and middleware from the build
async function startServer() {
  // Import the start.js which exports startInstance
  const { startInstance } = await import(
    "./dist/server/assets/start-D4mdwD77.js"
  );

  // Create HTTP server and pass fetch requests to TanStack handler
  const server = http.createServer(async (req, res) => {
    try {
      const url = new URL(req.url || "/", `http://${req.headers.host}`);
      let body = undefined;

      // Read body if present
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

      // Create fetch-compatible request
      const request = new Request(url.toString(), {
        method: req.method,
        headers: new Headers(req.headers),
        body,
      });

      // Get response from TanStack handler
      const response = await startInstance.handler(request);

      // Set status and headers
      res.statusCode = response.status;
      for (const [key, value] of response.headers) {
        res.setHeader(key, value);
      }

      // Send body
      res.end(await response.text());
    } catch (error) {
      console.error("Handler error:", error);
      res.statusCode = 500;
      res.setHeader("content-type", "text/html; charset=utf-8");
      res.end(
        `<html><body><h1>500 Server Error</h1><p>${error.message}</p></body></html>`
      );
    }
  });

  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
