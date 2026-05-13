import { startInstance } from "../dist/server/assets/start-D4mdwD77.js";
import { renderErrorPage } from "../src/lib/error-page.js";

export default async function handler(request, response) {
  try {
    // Build a standard fetch Request from Node req
    const url = new URL(request.url, `http://${request.headers.host}`);

    // Read body if present
    let body = undefined;
    if (request.method !== "GET" && request.method !== "HEAD") {
      body = await new Promise((resolve, reject) => {
        let data = "";
        request.on("data", (chunk) => {
          data += chunk;
        });
        request.on("end", () => resolve(data));
        request.on("error", reject);
      });
    }

    // Create fetch Request
    const fetchRequest = new Request(url.toString(), {
      method: request.method,
      headers: new Headers(request.headers),
      body,
    });

    // Get response from TanStack Start handler
    const fetchResponse = await startInstance.handler(fetchRequest);

    // Copy status and headers
    response.statusCode = fetchResponse.status;
    for (const [key, value] of fetchResponse.headers) {
      response.setHeader(key, value);
    }

    // Send response body
    response.end(await fetchResponse.text());
  } catch (error) {
    console.error("API handler error:", error);
    response.statusCode = 500;
    response.setHeader("content-type", "text/html; charset=utf-8");
    response.end(renderErrorPage());
  }
}
