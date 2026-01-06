import { NextResponse } from "next/server";
import { requireAppCheck } from "@/server/lib/appCheck";
import {
  deleteExpense,
  getExpense,
  updateExpense,
} from "@/server/repositories/expenseRepository";
import { getGroup } from "@/server/repositories/groupRepository";
import type { CreateExpenseRequest } from "@/shared/types/group";

export const runtime = "nodejs";

type Params = { params: Promise<{ groupId: string; expenseId: string }> };

export async function GET(request: Request, { params }: Params) {
  const appCheckResponse = await requireAppCheck(request);
  if (appCheckResponse) {
    return appCheckResponse;
  }

  const { groupId, expenseId } = await params;

  try {
    const group = await getGroup(groupId);
    if (!group) {
      return NextResponse.json({ error: "group_not_found" }, { status: 404 });
    }

    const expense = await getExpense(groupId, expenseId);
    if (!expense) {
      return NextResponse.json({ error: "expense_not_found" }, { status: 404 });
    }

    return NextResponse.json(expense);
  } catch {
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: Params) {
  const appCheckResponse = await requireAppCheck(request);
  if (appCheckResponse) {
    return appCheckResponse;
  }

  const { groupId, expenseId } = await params;

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
      return NextResponse.json({ error: "group_not_found" }, { status: 404 });
    }

    const expense = await getExpense(groupId, expenseId);
    if (!expense) {
      return NextResponse.json({ error: "expense_not_found" }, { status: 404 });
    }

    await updateExpense(groupId, expenseId, {
      description: body.description.trim(),
      amount: body.amount,
      paidBy: body.paidBy.trim(),
      splitWith: body.splitWith.map((m) => m.trim()).filter(Boolean),
    });

    return NextResponse.json({ id: expenseId });
  } catch {
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: Params) {
  const appCheckResponse = await requireAppCheck(request);
  if (appCheckResponse) {
    return appCheckResponse;
  }

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
