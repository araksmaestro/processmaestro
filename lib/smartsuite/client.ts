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

// Transient statuses worth retrying: rate-limit + gateway/service errors.
const RETRYABLE_STATUS = new Set([429, 500, 502, 503, 504]);
const MAX_ATTEMPTS = 3;

/**
 * fetch with bounded retry + exponential backoff for transient failures (429,
 * 5xx, and network errors/timeouts). A non-retryable non-2xx (e.g. 401/404) is
 * returned as-is for the caller to handle. Retry-After is honoured on 429.
 * Keeps a single flaky read from blanking a page — the caller still sees a
 * successful Response most of the time.
 */
async function fetchWithRetry(url: string, init: RequestInit): Promise<Response> {
  let lastError: unknown;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const res = await fetch(url, init);
      if (res.ok || !RETRYABLE_STATUS.has(res.status)) return res;
      lastError = new Error(`${res.status} ${res.statusText}`);
      if (attempt < MAX_ATTEMPTS) {
        const retryAfter = Number(res.headers.get("retry-after"));
        const backoff = 300 * 2 ** (attempt - 1) + Math.floor(Math.random() * 150);
        await sleep(retryAfter > 0 ? Math.min(retryAfter * 1000, 4000) : backoff);
      }
    } catch (err) {
      // Network error / timeout — retry.
      lastError = err;
      if (attempt < MAX_ATTEMPTS) {
        await sleep(300 * 2 ** (attempt - 1) + Math.floor(Math.random() * 150));
      }
    }
  }
  throw lastError instanceof Error ? lastError : new Error(String(lastError));
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** POST the records/list endpoint for a table. */
export async function listRecords<T = Record<string, unknown>>(
  tableId: string,
  body: Record<string, unknown>,
  revalidateSeconds = 300
): Promise<ListResponse<T>> {
  try {
    const res = await fetchWithRetry(`${BASE_URL}/applications/${tableId}/records/list/`, {
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
 * GET a single record by id. Used to resolve linked-record ids to display
 * values — SmartSuite rejects filtering the `id` field in records/list, so
 * per-id GET is the working path for a targeted lookup.
 */
export async function getRecord<T = Record<string, unknown>>(
  tableId: string,
  recordId: string,
  revalidateSeconds = 300
): Promise<T> {
  try {
    const res = await fetchWithRetry(
      `${BASE_URL}/applications/${tableId}/records/${recordId}/`,
      { headers: buildHeaders(), next: { revalidate: revalidateSeconds } }
    );
    if (!res.ok) {
      throw new Error(`records/${recordId} ${tableId} → ${res.status} ${res.statusText}`);
    }
    return (await res.json()) as T;
  } catch (err) {
    throw new Error(
      `SmartSuite getRecord failed: ${err instanceof Error ? err.message : String(err)}`
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
  // Same retry policy as record reads: a transient 429/5xx on a file fetch would
  // otherwise surface as a broken image (the proxy returns 404), which is the very
  // failure class the resilience pass set out to eliminate.
  const res = await fetchWithRetry(
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
    const fileRes = await fetchWithRetry(url, { cache: "no-store" });
    if (!fileRes.ok) throw new Error(`file fetch ${handle} → ${fileRes.status}`);
    return fileRes;
  }
  return res;
}
