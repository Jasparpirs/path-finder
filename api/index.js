import { createStart } from "@tanstack/react-start";

// Import the compiled server from build output
import { startInstance } from "../dist/server/assets/server-*.js";

// Vercel serverless function handler
export default async function handler(request, response) {
  try {
    // TanStack Start uses fetch-like adapter; Vercel passes Node req/res
    // Create a standard Request object from the Node request
    const url = new URL(request.url, `http://${request.headers.host}`);
    const body =
      request.method !== "GET" && request.method !== "HEAD"
        ? await new Promise((resolve, reject) => {
            let data = "";
            request.on("data", (chunk) => {
              data += chunk;
            });
            request.on("end", () => resolve(data));
            request.on("error", reject);
          })
        : undefined;

    const fetchRequest = new Request(url, {
      method: request.method,
      headers: request.headers,
      body,
    });

    // Call the TanStack start handler
    const fetchResponse = await startInstance.handler(fetchRequest);

    // Copy response headers
    for (const [key, value] of fetchResponse.headers) {
      response.setHeader(key, value);
    }

    response.status(fetchResponse.status);
    response.send(await fetchResponse.text());
  } catch (error) {
    console.error("Handler error:", error);
    response.status(500).json({ error: error.message });
  }
}
