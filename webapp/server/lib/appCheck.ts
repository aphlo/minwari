import { getAppCheck } from "firebase-admin/app-check";
import { NextResponse } from "next/server";
import { getAdminApp } from "./firebaseAdmin";

type AppCheckVerification =
  | { ok: true }
  | {
      ok: false;
      status: number;
      error: "app_check_required" | "app_check_invalid";
    };

export type VerifyTokenFn = (token: string) => Promise<unknown>;

export async function verifyAppCheck(
  request: Request,
  verifyToken?: VerifyTokenFn
): Promise<AppCheckVerification> {
  const token = request.headers.get("X-Firebase-AppCheck");
  if (!token) {
    return { ok: false, status: 403, error: "app_check_required" };
  }

  try {
    const appCheck = getAppCheck(getAdminApp());
    const verifier = verifyToken ?? appCheck.verifyToken.bind(appCheck);
    await verifier(token);
    return { ok: true };
  } catch {
    return { ok: false, status: 403, error: "app_check_invalid" };
  }
}

export async function requireAppCheck(
  request: Request,
  verifyToken?: VerifyTokenFn
) {
  const result = await verifyAppCheck(request, verifyToken);
  if (result.ok) {
    return null;
  }

  return NextResponse.json({ error: result.error }, { status: result.status });
}
