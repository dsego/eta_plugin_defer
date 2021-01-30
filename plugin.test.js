import { assertEquals } from "https://deno.land/std@0.83.0/testing/asserts.ts";
import { regex } from "./plugin.js";

Deno.test("regex matches file name", () => {
  const found = `deferFile("./foo.eta")`.match(regex);
  assertEquals(found[1], "./foo.eta");
  assertEquals(found[2], "");
});

Deno.test("regex matches params", () => {
  const found = `deferFile("./foo.eta", { foo: "bar" })`.match(regex);
  assertEquals(found[1], `./foo.eta`);
  assertEquals(found[2], ` { foo: "bar" }`);
});

Deno.test("regex handles single quotes", () => {
  const found = `deferFile('./foo.eta', { foo: 'bar' })`.match(regex);
  assertEquals(found[1], `./foo.eta`);
  assertEquals(found[2], ` { foo: 'bar' }`);
});

Deno.test("regex handles backticks", () => {
  const found = "deferFile(`./foo.eta`, { foo: `bar` })".match(regex);
  assertEquals(found[1], `./foo.eta`);
  assertEquals(found[2], " { foo: `bar` }");
});

Deno.test("regex handles newlines", () => {
  const found = `deferFile("./foo.eta", {\n  foo: 'bar' \n})`.match(regex);
  assertEquals(found[1], "./foo.eta");
  assertEquals(found[2], " {\n  foo: 'bar' \n}");
});
