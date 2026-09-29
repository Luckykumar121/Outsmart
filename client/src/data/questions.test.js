import assert from "node:assert/strict";
import { test } from "node:test";
import { QUESTIONS } from "./questions.js";

test("quiz contains exactly twenty different question categories", () => {
  assert.equal(QUESTIONS.length, 20);
  assert.equal(
    new Set(QUESTIONS.map((question) => question.category)).size,
    20,
  );
});

test("every quiz question has options and a valid correct answer", () => {
  for (const question of QUESTIONS) {
    assert.ok(question.prompt.length > 0);
    assert.ok(question.options.length >= 2);
    assert.ok(
      question.answerIndex >= 0 &&
        question.answerIndex < question.options.length,
    );
  }
});
