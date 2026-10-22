import { createRootRoute, createRoute, createRouter } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";
import { getRouter } from "@/router";
import { sitemapStaticPaths, sitemapXML } from "@/lib/sitemap";

const origin = "https://yoshino-river-paddle-tours.lovable.app";

describe("Sitemap", () => {
  it("includes the public homepage and excludes the sitemap endpoint", () => {
    expect(sitemapStaticPaths(getRouter())).toEqual(["/"]);
  });

  it("automatically includes new eligible routes and excludes private subtrees", () => {
    const root = createRootRoute({ staticData: { sitemap: false } });
    const publicPage = createRoute({ getParentRoute: () => root, path: "/tour", staticData: { sitemap: true } });
    const privateLayout = createRoute({ getParentRoute: () => root, path: "/private", staticData: { sitemap: "exclude-subtree" } });
    const privatePage = createRoute({ getParentRoute: () => privateLayout, path: "/details", staticData: { sitemap: true } });
    const excluded = createRoute({ getParentRoute: () => root, path: "/checkout", staticData: { sitemap: false } });
    const router = createRouter({ routeTree: root.addChildren([publicPage, privateLayout.addChildren([privatePage]), excluded]) });
    expect(sitemapStaticPaths(router)).toEqual(["/tour"]);
  });

  it("uses the published origin and omits unverified modification dates", () => {
    const xml = sitemapXML(origin, [{ path: "/" }]);
    expect(xml).toContain(`<loc>${origin}/</loc>`);
    expect(xml).not.toContain("<lastmod>");
  });

  it("rejects URLs that could point outside the public site", () => {
    expect(() => sitemapXML(origin, [{ path: "//other.example/tour" }])).toThrow("Invalid sitemap path");
  });
});