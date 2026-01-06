import assert from "node:assert/strict";
import test from "node:test";
import {
  requireAppCheck,
  type VerifyTokenFn,
  verifyAppCheck,
} from "./appCheck";

const createRequest = (token?: string) =>
  new Request("http://localhost/api/test", {
    headers: token ? { "X-Firebase-AppCheck": token } : undefined,
  });

test("verifyAppCheck returns required when token is missing", async () => {
  let called = false;
  const verifyToken: VerifyTokenFn = async () => {
    called = true;
  };

  const result = await verifyAppCheck(createRequest(), verifyToken);

  assert.equal(called, false);
  assert.deepEqual(result, {
    ok: false,
    status: 403,
    error: "app_check_required",
  });
});

test("verifyAppCheck returns invalid when verifier throws", async () => {
  const verifyToken: VerifyTokenFn = async () => {
    throw new Error("invalid");
  };

  const result = await verifyAppCheck(createRequest("bad-token"), verifyToken);

  assert.deepEqual(result, {
    ok: false,
    status: 403,
    error: "app_check_invalid",
  });
});

test("verifyAppCheck returns ok when verifier resolves", async () => {
  const verifyToken: VerifyTokenFn = async () => {};

  const result = await verifyAppCheck(createRequest("good-token"), verifyToken);

  assert.deepEqual(result, { ok: true });
});

test("requireAppCheck returns response when token is missing", async () => {
  const response = await requireAppCheck(createRequest());

  assert.ok(response);
  assert.equal(response.status, 403);
  const payload = await response.json();
  assert.deepEqual(payload, { error: "app_check_required" });
});

test("requireAppCheck returns null when verifier resolves", async () => {
  const verifyToken: VerifyTokenFn = async () => {};

  const response = await requireAppCheck(
    createRequest("good-token"),
    verifyToken
  );

  assert.equal(response, null);
});
