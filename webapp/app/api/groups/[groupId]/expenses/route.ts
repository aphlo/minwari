import { NextResponse } from "next/server";

import {
  createExpense,
  getExpenses,
} from "@/server/repositories/expenseRepository";
import { getGroup } from "@/server/repositories/groupRepository";
import type { CreateExpenseRequest } from "@/shared/types/group";

export const runtime = "nodejs";

type Params = { params: Promise<{ groupId: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { groupId } = await params;

  try {
    const group = await getGroup(groupId);
    if (!group) {
      return NextResponse.json({ error: "not_found" }, { status: 404 });
    }

    const expenses = await getExpenses(groupId);
    return NextResponse.json(expenses);
  } catch {
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}

export async function POST(request: Request, { params }: Params) {
  const { groupId } = await params;

  let body: CreateExpenseRequest;
  try {
    body = (await request.json()) as CreateExpenseRequest;
  } catch {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  if (!body.description?.trim()) {
    return NextResponse.json(
      { error: "description_required" },
      { status: 400 }
    );
  }

  if (typeof body.amount !== "number" || body.amount <= 0) {
    return NextResponse.json({ error: "invalid_amount" }, { status: 400 });
  }

  if (!body.paidBy?.trim()) {
    return NextResponse.json({ error: "paidBy_required" }, { status: 400 });
  }

  if (!Array.isArray(body.splitWith) || body.splitWith.length === 0) {
    return NextResponse.json({ error: "splitWith_required" }, { status: 400 });
  }

  try {
    const group = await getGroup(groupId);
    if (!group) {
      return NextResponse.json({ error: "not_found" }, { status: 404 });
    }

    const result = await createExpense({
      groupId,
      description: body.description.trim(),
      amount: body.amount,
      paidBy: body.paidBy.trim(),
      splitWith: body.splitWith.map((m) => m.trim()).filter(Boolean),
    });

    return NextResponse.json(result, { status: 201 });
  } catch {
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
