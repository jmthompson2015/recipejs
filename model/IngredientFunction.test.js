import IngredientData from "../state/IngredientData.js";

import IngredientFunction from "./IngredientFunction.js";
import TestData from "./TestData.js";

QUnit.module("IngredientFunction");

QUnit.test("toString() ingredient", (assert) => {
  // Setup.
  const amount = 5;
  const resourceKey = "alchemicalResin";
  const ingredientData = IngredientData.create({ amount, resourceKey });

  // Run.
  const result = IngredientFunction.toString(ingredientData, TestData.Resolver);

  // Verify.
  assert.ok(result);
  assert.equal(result, "Alchemical Resin x5");
});

QUnit.test("toString() ingredients", (assert) => {
  // Setup.
  const amount0 = 5;
  const resourceKey0 = "alchemicalResin";
  const ingredientData0 = IngredientData.create({
    amount: amount0,
    resourceKey: resourceKey0,
  });
  const amount1 = 2;
  const resourceKey1 = "bast";
  const ingredientData1 = IngredientData.create({
    amount: amount1,
    resourceKey: resourceKey1,
  });
  const ingredients = [ingredientData0, ingredientData1];

  // Run.
  const result = IngredientFunction.toString(ingredients, TestData.Resolver);

  // Verify.
  assert.ok(result);
  assert.equal(result, "Alchemical Resin x5 + Bast x2");
});

QUnit.test("value() ingredient", (assert) => {
  // Setup.
  const amount = 5;
  const resourceKey = "alchemicalResin";
  const ingredientData = IngredientData.create({ amount, resourceKey });

  // Run.
  const result = IngredientFunction.value(ingredientData, TestData.Resolver);

  // Verify.
  assert.equal(result, 40, `result = ${result}`);
});

QUnit.test("value() ingredients", (assert) => {
  // Setup.
  const amount0 = 5;
  const resourceKey0 = "alchemicalResin";
  const ingredientData0 = IngredientData.create({
    amount: amount0,
    resourceKey: resourceKey0,
  });
  const amount1 = 2;
  const resourceKey1 = "bast";
  const ingredientData1 = IngredientData.create({
    amount: amount1,
    resourceKey: resourceKey1,
  });
  const ingredients = [ingredientData0, ingredientData1];

  // Run.
  const result = IngredientFunction.value(ingredients, TestData.Resolver);

  // Verify.
  assert.ok(result);
  assert.equal(result, 44, `result = ${result}`);
});

const IngredientFunctionTest = {};
export default IngredientFunctionTest;
