import type { Route } from "@std/http";
import { serveDir } from "@std/http";

/**
 * makeStaticRoute makes a Route for serving static files.
 */
export function makeStaticRoute(): Route {
  return {
    pattern: new URLPattern({ pathname: "/static/(.*)" }),
    handler(request) {
      return serveDir(request, { fsRoot: "./static", urlRoot: "static" });
    },
  };
}
