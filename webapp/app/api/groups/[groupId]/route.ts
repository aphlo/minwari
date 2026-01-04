import { NextResponse } from "next/server";
import { getGroup, updateGroup } from "@/server/repositories/groupRepository";
import type { UpdateGroupRequest } from "@/shared/types/group";

export const runtime = "nodejs";

type Params = { params: Promise<{ groupId: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { groupId } = await params;

  try {
    const group = await getGroup(groupId);
    if (!group) {
      return NextResponse.json({ error: "not_found" }, { status: 404 });
    }
    return NextResponse.json(group);
  } catch {
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: Params) {
  const { groupId } = await params;

  let body: UpdateGroupRequest;
  try {
    body = (await request.json()) as UpdateGroupRequest;
  } catch {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  if (!body.groupName?.trim()) {
    return NextResponse.json({ error: "groupName_required" }, { status: 400 });
  }

  try {
    const existingGroup = await getGroup(groupId);
    if (!existingGroup) {
      return NextResponse.json({ error: "not_found" }, { status: 404 });
    }

    await updateGroup(groupId, {
      name: body.groupName.trim(),
      members: (body.members ?? []).map((m) => m.trim()).filter(Boolean),
    });

    const updatedGroup = await getGroup(groupId);
    return NextResponse.json(updatedGroup);
  } catch {
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
