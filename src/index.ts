import { createMcpHandler } from "agents/mcp";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

const WIDGET_URI = "ui://widget/hello-stage.html";

const widgetHtml = `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<style>
  html,body{margin:0;background:#111;color:#eee;font-family:system-ui,sans-serif}
  .wrap{min-height:360px;display:grid;place-items:center;padding:18px;box-sizing:border-box}
  .card{width:min(100%,900px);background:#181818;border:1px solid #333;border-radius:18px;padding:14px;box-sizing:border-box}
  img{display:block;width:100%;max-height:70vh;object-fit:contain;border-radius:12px;background:#222}
  .cap{padding:10px 4px 0;font-size:14px;color:#bbb}
</style>
</head>
<body>
<div class="wrap">
  <div class="card">
    <img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80" alt="Hello Stage test image" />
    <div class="cap">Hello Stage — custom UI rendered by our MCP app</div>
  </div>
</div>
</body>
</html>`;

function createServer() {
  const server = new McpServer({ name: "Hello Stage", version: "0.1.0" });

  server.registerResource(
    "hello-stage-widget",
    WIDGET_URI,
    {},
    async () => ({
      contents: [{
        uri: WIDGET_URI,
        mimeType: "text/html+skybridge",
        text: widgetHtml,
      }],
    }),
  );

  server.registerTool(
    "show_image",
    {
      title: "Show an image on Hello Stage",
      description: "Opens the Hello Stage custom image viewer. Use this when the user asks to test the Story Mode image stage.",
      annotations: { readOnlyHint: true },
      _meta: {
        "openai/outputTemplate": WIDGET_URI,
        "openai/toolInvocation/invoking": "Opening Hello Stage",
        "openai/toolInvocation/invoked": "Hello Stage opened"
      }
    },
    async () => ({
      content: [{ type: "text", text: "Hello Stage rendered." }]
    }),
  );

  return server;
}

export default {
  async fetch(req: Request, env: unknown, ctx: ExecutionContext) {
    const url = new URL(req.url);
    if (url.pathname.startsWith("/mcp")) {
      const server = createServer();
      return createMcpHandler(server)(req, env, ctx);
    }
    return new Response("Hello Stage MCP server is running. Use /mcp in ChatGPT.", {
      headers: { "content-type": "text/plain; charset=utf-8" }
    });
  },
} satisfies ExportedHandler;
