import type { NextRequest } from "next/server";
import { fetchFile } from "@/lib/smartsuite/client";

export const dynamic = "force-dynamic";

// Same-origin proxy for SmartSuite file-field images. Keeps the API key
// server-side and gives next/image a same-origin src (no remotePatterns needed).
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ handle: string }> }
) {
  try {
    const { handle } = await params;
    if (!handle) return new Response("Not found", { status: 404 });

    const fileRes = await fetchFile(handle);
    if (!fileRes.ok || !fileRes.body) {
      return new Response("Not found", { status: 404 });
    }

    const contentType = fileRes.headers.get("content-type") ?? "application/octet-stream";
    return new Response(fileRes.body, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
