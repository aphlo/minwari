import { NextResponse } from "next/server";
import { requireAppCheck } from "@/server/lib/appCheck";
import { createGroupUsecase } from "@/server/usecases/createGroup";
import type { CreateGroupRequest } from "@/shared/types/group";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const appCheckResponse = await requireAppCheck(request);
  if (appCheckResponse) {
    return appCheckResponse;
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
      currency: body?.currency,
    });
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === "groupName_required") {
      return NextResponse.json({ error: "invalid_request" }, { status: 400 });
    }
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
