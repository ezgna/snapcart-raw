import { test } from "node:test";
import assert from "node:assert";

test("health endpoint returns 200", async () => {
  const res = await fetch("http://localhost:3000/api/health");
  assert.strictEqual(res.status, 200);
});

test("health endpoint returns ok status", async () => {
  const res = await fetch("http://localhost:3000/api/health");
  const body = await res.json();
  assert.strictEqual(body.status, "ok");
});
