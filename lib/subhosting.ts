import Subhosting from "subhosting";

const subhosting = new Subhosting({
  bearerToken: Deno.env.get("DEPLOY_ACCESS_TOKEN"),
});

// deno run -A lib/subhosting.ts
if (import.meta.main) {
  const projects = await subhosting.organizations.projects.list(
    Deno.env.get("DEPLOY_ORG_ID")!,
  );
  console.log({ projects });

  const project = await subhosting.organizations.projects.create(
    Deno.env.get("DEPLOY_ORG_ID")!,
    { description: "[TEST]" },
  );
  console.log({ project });
}
