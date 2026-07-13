// SmartSuite base fetch wrapper. SERVER-SIDE ONLY.
// Reads credentials from process.env (never NEXT_PUBLIC — the key must not
// reach the client bundle). All external calls are wrapped with meaningful errors.
import type { ListResponse } from "./types";

const BASE_URL = "https://app.smartsuite.com/api/v1";

function buildHeaders(): HeadersInit {
  const key = process.env.SMARTSUITE_API_KEY;
  const account = process.env.SMARTSUITE_ACCOUNT_ID;
  if (!key || !account) {
    throw new Error(
      "SmartSuite credentials missing. Set SMARTSUITE_API_KEY and SMARTSUITE_ACCOUNT_ID in .env.local (run `vercel env pull .env.local`)."
    );
  }
  return {
    // NOTE: SmartSuite uses `Token` for ALL endpoints (records and files), not `Bearer`.
    Authorization: `Token ${key}`,
    "Account-Id": account,
    "Content-Type": "application/json",
  };
}

/** POST the records/list endpoint for a table. */
export async function listRecords<T = Record<string, unknown>>(
  tableId: string,
  body: Record<string, unknown>,
  revalidateSeconds = 300
): Promise<ListResponse<T>> {
  try {
    const res = await fetch(`${BASE_URL}/applications/${tableId}/records/list/`, {
      method: "POST",
      headers: buildHeaders(),
      body: JSON.stringify(body),
      next: { revalidate: revalidateSeconds },
    });
    if (!res.ok) {
      throw new Error(`records/list ${tableId} → ${res.status} ${res.statusText}`);
    }
    return (await res.json()) as ListResponse<T>;
  } catch (err) {
    throw new Error(
      `SmartSuite listRecords failed: ${err instanceof Error ? err.message : String(err)}`
    );
  }
}

/**
 * Resolve a file field handle to a streamable Response of the file bytes.
 * The `get_url/` endpoint (with Token auth) serves the file content directly;
 * in case a deployment returns a JSON `{ url }` instead, we follow that once.
 * Returns the raw fetch Response so the proxy route can stream the body.
 */
export async function fetchFile(handle: string): Promise<Response> {
  const res = await fetch(
    `${BASE_URL}/shared-files/${encodeURIComponent(handle)}/get_url/`,
    { headers: buildHeaders(), cache: "no-store" }
  );
  if (!res.ok) {
    throw new Error(`get_url ${handle} → ${res.status} ${res.statusText}`);
  }
  const contentType = res.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    const data = (await res.json()) as { url?: string } | string;
    const url = typeof data === "string" ? data : data.url;
    if (!url) throw new Error(`get_url ${handle} returned no url`);
    const fileRes = await fetch(url, { cache: "no-store" });
    if (!fileRes.ok) throw new Error(`file fetch ${handle} → ${fileRes.status}`);
    return fileRes;
  }
  return res;
}
