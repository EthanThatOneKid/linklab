import Subhosting from "subhosting";

export const subhosting = new Subhosting({
  bearerToken: Deno.env.get("DEPLOY_ACCESS_TOKEN"),
});
