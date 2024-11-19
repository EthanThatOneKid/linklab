import Subhosting from "subhosting";

const subhosting = new Subhosting({
  bearerToken: Deno.env.get("DEPLOY_ACCESS_TOKEN"),
});

const organization = await subhosting.organizations.get(
  Deno.env.get("DEPLOY_ORG_ID")!,
);

if (import.meta.main) {
  console.log(organization);
}
