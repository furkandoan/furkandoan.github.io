import type { APIRoute } from "astro";
import { localUrl } from "../lib/urls";
export const GET: APIRoute = ({ site }) => new Response(`User-agent: *\nAllow: /\n\nSitemap: ${new URL(localUrl("sitemap.xml"), site)}\n`, {headers:{"Content-Type":"text/plain; charset=utf-8"}});
