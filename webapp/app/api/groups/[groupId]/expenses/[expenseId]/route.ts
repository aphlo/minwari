import { NextResponse } from "next/server";
import { deleteExpense } from "@/server/repositories/expenseRepository";
import { getGroup } from "@/server/repositories/groupRepository";

export const runtime = "nodejs";

type Params = { params: Promise<{ groupId: string; expenseId: string }> };

export async function DELETE(_request: Request, { params }: Params) {
  const { groupId, expenseId } = await params;

  try {
    const group = await getGroup(groupId);
    if (!group) {
      return NextResponse.json({ error: "not_found" }, { status: 404 });
    }

    await deleteExpense(groupId, expenseId);
    return new NextResponse(null, { status: 204 });
  } catch {
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
