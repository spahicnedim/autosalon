import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({} as any));

    const pathsInput: string[] | undefined = Array.isArray(body?.paths)
      ? body.paths
      : undefined;

    const singlePath: string | undefined =
      typeof body?.path === "string" && body.path ? body.path : undefined;

    // Backward compatible: if neither provided, default to home page
    let paths: string[] = pathsInput ?? (singlePath ? [singlePath] : ["/"]);

    // If home page is requested, also revalidate /cars by default, as requested
    if (paths.includes("/")) {
      paths = Array.from(new Set([...paths, "/cars"]));
    }

    for (const p of paths) {
      // Only revalidate absolute app paths
      if (typeof p === "string" && p.startsWith("/")) {
        revalidatePath(p);
      }
    }

    return NextResponse.json({ revalidated: true, paths });
  } catch (error: any) {
    return NextResponse.json(
      { revalidated: false, error: error?.message || "Failed to revalidate" },
      { status: 500 }
    );
  }
}
