import assert from "node:assert/strict";
import { IncomingMessage, ServerResponse } from "node:http";
import { Socket } from "node:net";
import test from "node:test";
import { legacyRedirect } from "@/shared/lib/legacyRedirect";
import type { GroupDetail } from "@/shared/types/groupDetail";
import { createReadOnlyHandler } from "./handler";

const detail: GroupDetail = {
  group: {
    id: "abc",
    name: "Trip",
    members: ["A", "B"],
    currency: "JPY",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  expenses: [],
  settlements: [],
  balances: [],
  totalAmount: 0,
};

async function request(
  method: string,
  url: string,
  load: (id: string) => Promise<GroupDetail | null>
) {
  const incoming = new IncomingMessage(new Socket());
  incoming.method = method;
  incoming.url = url;
  const response = new ServerResponse(incoming);
  let body = "";
  response.end = ((chunk?: string) => {
    body = chunk ?? "";
    return response;
  }) as typeof response.end;
  await createReadOnlyHandler(load)(incoming, response);
  return { status: response.statusCode, headers: response.getHeaders(), body };
}

test("returns the complete read-only group payload and disables caching", async () => {
  const result = await request("GET", "/api/groups/abc", async (id) => {
    assert.equal(id, "abc");
    return detail;
  });
  assert.equal(result.status, 200);
  assert.deepEqual(JSON.parse(result.body), detail);
  assert.equal(result.headers["cache-control"], "no-store");
});

test("rejects every write method before reading Firestore, including removed endpoints", async () => {
  for (const method of ["POST", "PUT", "PATCH", "DELETE"]) {
    for (const path of [
      "/api/groups",
      "/api/groups/abc",
      "/api/groups/abc/expenses",
      "/api/groups/abc/expenses/expense",
    ]) {
      const result = await request(method, path, async () => {
        assert.fail("must not access Firestore");
      });
      assert.equal(result.status, 405);
      assert.equal(result.headers.allow, "GET");
    }
  }
});

test("does not expose group enumeration or individual legacy endpoints", async () => {
  for (const path of [
    "/api/groups",
    "/api/groups/abc/expenses",
    "/api/groups/abc/expenses/expense",
  ]) {
    assert.equal(
      (
        await request("GET", path, async () => {
          assert.fail("must not read");
        })
      ).status,
      404
    );
  }
});

test("rejects malformed and path-injecting IDs without reading the database", async () => {
  for (const id of ["%2F", "%ZZ", "abc%2Fdef", "x".repeat(1501)]) {
    const result = await request("GET", `/api/groups/${id}`, async () => {
      assert.fail("must not read");
    });
    assert.equal(result.status, 400);
  }
});

test("distinguishes missing groups from backend failures without leaking internals", async () => {
  assert.equal(
    (await request("GET", "/api/groups/missing", async () => null)).status,
    404
  );
  const failed = await request("GET", "/api/groups/abc", async () => {
    throw new Error("private credential details");
  });
  assert.equal(failed.status, 500);
  assert.deepEqual(JSON.parse(failed.body), { error: "server_error" });
});

test("health checks do not connect to Firestore", async () => {
  const result = await request("GET", "/api/health", async () => {
    assert.fail("must not read");
  });
  assert.equal(result.status, 200);
});

test("preserves old shared links and settlement links on the canonical domain", async () => {
  assert.equal(
    legacyRedirect("/groups/abc"),
    "https://oursplit.aphlo.com/en/groups/?id=abc"
  );
  assert.equal(
    legacyRedirect("/ja/groups/abc/settlement"),
    "https://oursplit.aphlo.com/ja/groups/?id=abc&view=settlement"
  );
  assert.equal(
    legacyRedirect("/ja/groups/abc/expenses/new"),
    "https://oursplit.aphlo.com/ja/groups/?id=abc"
  );
  assert.equal(
    legacyRedirect("/ja/groups?id=abc"),
    "https://oursplit.aphlo.com/ja/groups/?id=abc"
  );
  assert.equal(
    legacyRedirect("/new"),
    "https://oursplit.aphlo.com/en/#download"
  );
  assert.equal(
    legacyRedirect("/ja/terms?source=app"),
    "https://oursplit.aphlo.com/ja/terms/?source=app"
  );
  assert.equal(
    legacyRedirect("//evil.example/ja/privacy"),
    "https://oursplit.aphlo.com/ja/privacy/"
  );
  const result = await request("GET", "/groups/abc", async () => {
    assert.fail("must not read");
  });
  assert.equal(result.status, 301);
  assert.equal(
    result.headers.location,
    "https://oursplit.aphlo.com/en/groups/?id=abc"
  );
});
