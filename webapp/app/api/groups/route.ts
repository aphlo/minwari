import { NextResponse } from "next/server";
import type { CreateGroupRequest } from "@/shared/types/group";
import { getAdminAuth } from "@/server/lib/firebaseAdmin";
import { createGroupUsecase } from "@/server/usecases/createGroup";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const authHeader = request.headers.get("authorization") ?? "";
  if (!authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const idToken = authHeader.replace("Bearer ", "").trim();
  if (!idToken) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  let decoded: { uid: string };
  try {
    decoded = await getAdminAuth().verifyIdToken(idToken);
  } catch {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  let body: CreateGroupRequest;
  try {
    body = (await request.json()) as CreateGroupRequest;
  } catch {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  try {
    const result = await createGroupUsecase({
      groupName: body?.groupName ?? "",
      members: Array.isArray(body?.members) ? body.members : [],
      createdByUid: decoded.uid,
    });
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === "groupName_required") {
      return NextResponse.json({ error: "invalid_request" }, { status: 400 });
    }
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
