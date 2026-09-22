import { test } from "node:test";
import assert from "node:assert/strict";
import { committed, complete, blocked, feasible, completions } from "../src/data/allocation.mjs";
test("complete allocation respects capacity and cluster constraints", () => {
  assert.ok(feasible(complete));
  assert.equal(Object.keys(complete).length, 6);
  for (const [agent, slot] of Object.entries(committed)) assert.equal(complete[agent], slot);
});
test("b2 to s3 preserves exactly two completions", () => {
  assert.equal(completions({ ...committed, b2: "s3" }).length, 2);
});
test("b2 to s2 is locally feasible but has no complete extension", () => {
  assert.ok(feasible({ ...committed, b2: "s2" }));
  assert.equal(completions({ ...committed, b2: "s2" }).length, 0);
  assert.ok(feasible(blocked));
  assert.equal(Object.keys(blocked).length, 5);
  assert.equal(completions(blocked).length, 0);
});
