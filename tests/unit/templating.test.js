import test from "node:test";
import assert from "node:assert/strict";
import { createTemplate } from "../../js/templating.js";

test("replaces a marker with its HTML-escaped value", () => {
  assert.equal(
    createTemplate("<p>{{name}}</p>", { name: '<script>alert(1)</script> & "ok"' }),
    "<p>&lt;script&gt;alert(1)&lt;/script&gt; &amp; &quot;ok&quot;</p>"
  );
});

test("replaces only own properties and removes unknown markers", () => {
  const data = Object.create({ inherited: "unsafe" });
  data.name = "Ada";
  assert.equal(createTemplate("{{name}} {{inherited}} {{missing}}", data), "Ada  ");
});

test("converts null values to empty strings", () => {
  assert.equal(createTemplate("{{value}}", { value: null }), "");
});
