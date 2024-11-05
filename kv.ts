export const DENO_KV_PATH_KEY = "DENO_KV_PATH";
let path = undefined;
if (
  (await Deno.permissions.query({ name: "env", variable: DENO_KV_PATH_KEY }))
    .state === "granted"
) {
  path = Deno.env.get(DENO_KV_PATH_KEY);
}

/**
 * kv is a key-value store. This instance is shared across the program.
 *
 * @see
 * https://jsr.io/@deno/kv-oauth/0.11.0/lib/_kv.ts#L2
 */
export const kv = await Deno.openKv(path);
