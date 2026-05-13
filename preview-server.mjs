import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import ts from "typescript";

const workspaceRoot = process.cwd();
const schoolsFile = path.join(workspaceRoot, "src", "data", "schools.ts");

function loadSchools() {
  const source = fs.readFileSync(schoolsFile, "utf8");
  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  }).outputText;

  const moduleExports = {};
  const sandbox = {
    module: { exports: moduleExports },
    exports: moduleExports,
    require: (specifier) => {
      throw new Error(`Unexpected import in schools dataset: ${specifier}`);
    },
    console,
  };

  try {
    vm.runInNewContext(transpiled, sandbox, { filename: "schools.ts" });
  } catch (err) {
    throw new Error(`Failed to evaluate transpiled schools.ts: ${err.message}`);
  }

  // Prefer named exports, fall back to default export if present
  const exportsObj = sandbox.module.exports || sandbox.exports || {};
  return exportsObj;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function renderPage() {
  const { schools, fieldLabels, typeLabels } = loadSchools();
  const grouped = schools.reduce((accumulator, school) => {
    (accumulator[school.type] ||= []).push(school);
    return accumulator;
  }, {});

  const sectionHtml = Object.entries(grouped)
    .map(([type, items]) => `
      <section class="section">
        <div class="section-head">
          <h2>${escapeHtml(typeLabels[type])}</h2>
          <span>${items.length} kooli</span>
        </div>
        <div class="grid">
          ${items
            .map(
              (school) => `
                <article class="card">
                  <div class="card-top">
                    <div>
                      <h3>${escapeHtml(school.name)}</h3>
                      <p class="muted">${escapeHtml(school.city)} · ${school.acceptsAfter9 ? "pärast 9. klassi" : "pärast gümnaasiumi"}</p>
                    </div>
                    <a href="${escapeHtml(school.website)}" target="_blank" rel="noreferrer">Veeb</a>
                  </div>
                  <p>${escapeHtml(school.description)}</p>
                  <div class="tags">
                    ${school.professions
                      .map(
                        (profession) => `
                          <span class="tag">
                            ${escapeHtml(profession.name)} · ${escapeHtml(fieldLabels[profession.field])}
                          </span>
                        `,
                      )
                      .join("")}
                  </div>
                </article>
              `,
            )
            .join("")}
        </div>
      </section>
    `)
    .join("");

  return `<!doctype html>
  <html lang="et">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>ÕpiEesti eelvaade</title>
      <style>
        :root {
          color-scheme: dark;
          --bg: #0f172a;
          --panel: rgba(15, 23, 42, 0.72);
          --border: rgba(148, 163, 184, 0.18);
          --text: #e2e8f0;
          --muted: #94a3b8;
          --accent: #38bdf8;
        }
        * { box-sizing: border-box; }
        body {
          margin: 0;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          background:
            radial-gradient(circle at top, rgba(56, 189, 248, 0.18), transparent 36%),
            linear-gradient(180deg, #020617 0%, var(--bg) 100%);
          color: var(--text);
        }
        .wrap { max-width: 1200px; margin: 0 auto; padding: 40px 20px 60px; }
        .hero {
          border: 1px solid var(--border);
          background: var(--panel);
          backdrop-filter: blur(18px);
          border-radius: 24px;
          padding: 28px;
          margin-bottom: 28px;
        }
        h1 { margin: 0 0 10px; font-size: clamp(2rem, 4vw, 3.5rem); }
        .lead { color: var(--muted); margin: 0; line-height: 1.6; }
        .section { margin-top: 28px; }
        .section-head {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 12px;
          margin-bottom: 14px;
        }
        .section-head h2 { margin: 0; font-size: 1.2rem; }
        .section-head span, .muted { color: var(--muted); }
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 16px;
        }
        .card {
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 18px;
          background: rgba(15, 23, 42, 0.86);
        }
        .card h3 { margin: 0 0 6px; }
        .card p { margin: 0; line-height: 1.55; }
        .card-top { display: flex; justify-content: space-between; gap: 12px; margin-bottom: 12px; }
        .card-top a {
          color: white;
          text-decoration: none;
          background: linear-gradient(135deg, #0ea5e9, #8b5cf6);
          border-radius: 999px;
          padding: 8px 12px;
          white-space: nowrap;
          font-size: 0.9rem;
        }
        .tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 14px; }
        .tag {
          border: 1px solid rgba(56, 189, 248, 0.25);
          color: #bae6fd;
          background: rgba(8, 47, 73, 0.5);
          border-radius: 999px;
          padding: 6px 10px;
          font-size: 0.82rem;
        }
      </style>
    </head>
    <body>
      <div class="wrap">
        <div class="hero">
          <h1>ÕpiEesti eelvaade</h1>
          <p class="lead">Kõik koolid ja erialad laaditakse otse failist <strong>src/data/schools.ts</strong>. See on kerge lokaalne browser-preview, et saaksid kohe näha lisatud Estonian koolide kataloogi.</p>
        </div>
        ${sectionHtml}
      </div>
    </body>
  </html>`;
}

const server = http.createServer((request, response) => {
  if (request.url !== "/") {
    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }

  response.writeHead(200, { "content-type": "text/html; charset=utf-8" });
  response.end(renderPage());
});

server.listen(4173, "127.0.0.1", () => {
  console.log("Preview server running at http://127.0.0.1:4173");
});