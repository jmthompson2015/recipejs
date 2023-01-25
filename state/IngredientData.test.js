import IngredientData from "./IngredientData.js";

QUnit.module("IngredientData");

QUnit.test("create()", (assert) => {
  // Setup.
  const resourceKey = "carbon";
  const amount = 2;

  // Run.
  const result = IngredientData.create({ amount, resourceKey });

  // Verify.
  assert.ok(result);
  assert.equal(result.amount, amount);
  assert.equal(result.resourceKey, resourceKey);
  assert.ok(result.clientProps);
});

const IngredientDataTest = {};
export default IngredientDataTest;
