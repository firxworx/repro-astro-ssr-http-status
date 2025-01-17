# Astro SSR Fault HTTP Status Reproduction

2025-01-16 - `repro-astro-ssr-http-status`

## Issue

### Summary

Middleware uses `context.rewrite(...)` to attempt matching a different route pattern.

If the match is successful then the resulting page is returned to the client but still has the wrong HTTP response type.

So far on this minimal example with latest versions the issue is not reproducible.

The issue occurred on a project with minimal integrations. Those will be added back in branches to see if the issue can be reproduced.

### Scenario

Middleware conditionally responds to `context.routePattern` value `/404`.

If the request `url.pathname` meets certain conditions then it attempts `context.rewrite(...)` to try matching for the pathname under the dynamic route path `src/pages/[locale]`.

In the middleware if a match is found then the `Response` obtained from the awaited `context.rewrite(...)` call has HTTP status 200.

If the middleware returns this response the client/browser receives a 404 status even though the page was rendered.

## Commands

This repo originated from the template _Astro Starter Kit: Basics_.

Run commands from project root.

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |
