import RecipeFunction from "./RecipeFunction.js";
import TestData from "./TestData.js";

QUnit.module("RecipeFunction");

const round4 = (value) => Math.round(value * 10000.0) / 10000.0;

QUnit.test("findByOutput() Dres Lantern, Stationary", (assert) => {
  // Setup.
  const outputKey = "dresLanternStationary";

  // Run.
  const result = RecipeFunction.findByOutput(outputKey, TestData.Resolver);

  // Verify.
  assert.ok(result, `result = ${JSON.stringify(result)}`);
  assert.equal(result.length, 1);

  const recipe = R.head(result);
  assert.ok(recipe, `recipe0 = ${JSON.stringify(recipe)}`);
  assert.ok(recipe.outputs);
  assert.equal(R.head(recipe.outputs).resourceKey, outputKey);
  assert.ok(recipe.inputs);
  assert.equal(recipe.inputs.length, 3);
  assert.equal(recipe.inputs[0].resourceKey, "alchemicalResin");
  assert.equal(recipe.inputs[1].resourceKey, "regulus");
  assert.equal(recipe.inputs[2].resourceKey, "obsidian");
});

QUnit.test("inputValue()", (assert) => {
  // Setup.
  const outputKey = "dresLanternStationary";
  const recipes = RecipeFunction.findByOutput(outputKey, TestData.Resolver);
  const recipe = R.head(recipes);

  // Run.
  const result = RecipeFunction.inputValue(recipe, TestData.Resolver);

  // Verify.
  assert.equal(result, 84, `result = ${result}`);
});

QUnit.test("outputInputRatio()", (assert) => {
  // Setup.
  const outputKey = "dresLanternStationary";
  const recipes = RecipeFunction.findByOutput(outputKey, TestData.Resolver);
  const recipe = R.head(recipes);

  // Run.
  const result = round4(
    RecipeFunction.outputInputRatio(recipe, TestData.Resolver)
  );

  // Verify.
  assert.equal(result, 1.4643, `result = ${result}`);
});

QUnit.test("outputValue()", (assert) => {
  // Setup.
  const outputKey = "dresLanternStationary";
  const recipes = RecipeFunction.findByOutput(outputKey, TestData.Resolver);
  const recipe = R.head(recipes);

  // Run.
  const result = RecipeFunction.outputValue(recipe, TestData.Resolver);

  // Verify.
  assert.equal(result, 123, `result = ${result}`);
});

QUnit.test("toString()", (assert) => {
  // Setup.
  const recipeData = TestData.Resolver.recipeData("dresLanternRecipe");

  // Run.
  const result = RecipeFunction.toString(recipeData, TestData.Resolver);

  // Verify.
  assert.ok(result);
  assert.equal(
    result,
    "Dres Lantern, Stationary x1 \u2190 Alchemical Resin x6 + Regulus x3 + Obsidian x8"
  );
});

QUnit.test("toString() showName", (assert) => {
  // Setup.
  const recipeData = TestData.Resolver.recipeData("dresLanternRecipe");
  const showName = true;

  // Run.
  const result = RecipeFunction.toString(
    recipeData,
    TestData.Resolver,
    showName
  );

  // Verify.
  assert.ok(result);
  assert.equal(
    result,
    "Formula: Dres Lantern, Stationary: Dres Lantern, Stationary x1" +
      " \u2190 Alchemical Resin x6 + Regulus x3 + Obsidian x8"
  );
});

const RecipeFunctionTest = {};
export default RecipeFunctionTest;
