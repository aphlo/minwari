import { NextResponse } from "next/server";
import { requireAppCheck } from "@/server/lib/appCheck";
import { getGroup, updateGroup } from "@/server/repositories/groupRepository";
import { defaultCurrency, isSupportedCurrency } from "@/shared/lib/currency";
import type { UpdateGroupRequest } from "@/shared/types/group";

export const runtime = "nodejs";

type Params = { params: Promise<{ groupId: string }> };

export async function GET(request: Request, { params }: Params) {
  const appCheckResponse = await requireAppCheck(request);
  if (appCheckResponse) {
    return appCheckResponse;
  }

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
  const appCheckResponse = await requireAppCheck(request);
  if (appCheckResponse) {
    return appCheckResponse;
  }

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

    if (body.currency && !isSupportedCurrency(body.currency)) {
      return NextResponse.json({ error: "invalid_currency" }, { status: 400 });
    }

    const resolvedCurrency = body.currency
      ? body.currency
      : (existingGroup.currency ?? defaultCurrency);

    await updateGroup(groupId, {
      name: body.groupName.trim(),
      members: (body.members ?? []).map((m) => m.trim()).filter(Boolean),
      currency: resolvedCurrency,
    });

    const updatedGroup = await getGroup(groupId);
    return NextResponse.json(updatedGroup);
  } catch {
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
