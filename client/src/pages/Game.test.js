import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const source = readFileSync(new URL("./Game.jsx", import.meta.url), "utf8");

test("question timer is set to 30 seconds", () => {
  assert.match(source, /export const QUESTION_TIME_LIMIT = 30;/);
  assert.match(source, /useState\(QUESTION_TIME_LIMIT\)/);
  assert.match(source, /setTime\(QUESTION_TIME_LIMIT\)/);
});
