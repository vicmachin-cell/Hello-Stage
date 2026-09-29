# Hello Stage — Cloudflare version

This is the quickest hosted proof-of-concept for the Story Mode Stage.

## What this tests

It answers one question only:

**Can ChatGPT call our own MCP tool and render our own image viewer UI?**

No Google Drive yet. No Story Mode changes yet.

## Deploy

1. Create a free Cloudflare account if you do not already have one.
2. Install Node.js 18+ if needed.
3. Unzip this folder.
4. Open a terminal in the folder and run:

   npm install
   npx wrangler login
   npm run deploy

5. Wrangler will print a URL similar to:

   https://hello-stage.YOUR-SUBDOMAIN.workers.dev

Your MCP endpoint is that URL plus `/mcp`:

   https://hello-stage.YOUR-SUBDOMAIN.workers.dev/mcp

## Connect it to ChatGPT

In ChatGPT:

1. Settings → Apps & Connectors.
2. Turn on Developer mode if it is not already enabled.
3. Choose Create.
4. Name it **Hello Stage**.
5. Paste the `/mcp` endpoint from Cloudflare.
6. Choose **No authentication**.
7. Create/save it.

Then come back to the chat and say:

**Use Hello Stage to show the test image.**

If the custom image card/widget appears, the core idea works.

## Next milestone

Only after this succeeds do we replace the test image with a Google Drive file ID and private Drive retrieval.
