import test from "node:test";
import assert from "node:assert/strict";
import { validateForm } from "../../js/formValidator.js";

function field({ id, value = "", type = "text", required = false, minlength = null }) {
  const attributes = new Map();
  if (required) attributes.set("required", "");
  if (minlength !== null) attributes.set("minlength", String(minlength));
  const classes = new Set();
  return {
    id, value, type, nextSibling: null,
    classList: { add: (name) => classes.add(name), remove: (name) => classes.delete(name), contains: (name) => classes.has(name) },
    hasAttribute: (name) => attributes.has(name),
    getAttribute: (name) => attributes.get(name) ?? null,
    parentNode: { insertBefore: (element) => document.errors.set(element.id, element) },
    classes
  };
}

function runValidation(fields) {
  const previousDocument = globalThis.document;
  const errors = new Map();
  globalThis.document = {
    errors,
    getElementById: (id) => errors.get(id) ?? null,
    createElement: () => ({
      id: "", textContent: "", classList: { add() {} },
      remove() { errors.delete(this.id); }
    })
  };
  try {
    return { valid: validateForm({ querySelectorAll: () => fields }), errors };
  } finally {
    if (previousDocument === undefined) delete globalThis.document;
    else globalThis.document = previousDocument;
  }
}

test("accepts a form when required, email and minimum length rules pass", () => {
  const fields = [
    field({ id: "name", value: "Caio", required: true }),
    field({ id: "email", value: "caio@example.com", type: "email", required: true }),
    field({ id: "message", value: "Olá!", minlength: 3 })
  ];
  const result = runValidation(fields);
  assert.equal(result.valid, true);
  assert.equal(result.errors.size, 0);
});

test("shows the required-field error", () => {
  const name = field({ id: "name", required: true });
  const result = runValidation([name]);
  assert.equal(result.valid, false);
  assert.equal(result.errors.get("name-error").textContent, "Este campo é obrigatório.");
  assert.equal(name.classes.has("error"), true);
});

test("rejects an invalid email address", () => {
  const result = runValidation([field({ id: "email", value: "sem-arroba", type: "email" })]);
  assert.equal(result.valid, false);
  assert.equal(result.errors.get("email-error").textContent, "O formato do e-mail é inválido.");
});

test("rejects values shorter than minlength", () => {
  const result = runValidation([field({ id: "message", value: "oi", minlength: 3 })]);
  assert.equal(result.valid, false);
  assert.equal(result.errors.get("message-error").textContent, "É necessário no mínimo 3 caracteres.");
});
