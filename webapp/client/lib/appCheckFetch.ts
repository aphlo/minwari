"use client";

import { getAppCheckToken } from "./appCheck";

export async function appCheckFetch(
  input: RequestInfo | URL,
  init: RequestInit = {}
) {
  const token = await getAppCheckToken();
  const headers = new Headers(init.headers);
  headers.set("X-Firebase-AppCheck", token);

  return fetch(input, {
    ...init,
    headers,
  });
}
