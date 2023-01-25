import IngredientData from "./IngredientData.js";
import RecipeData from "./RecipeData.js";

QUnit.module("RecipeData");

QUnit.test("create()", (assert) => {
  // Setup.
  const input0 = IngredientData.create({ resourceKey: "inputKey0" });
  const input1 = IngredientData.create({ resourceKey: "inputKey1" });
  const inputs = [input0, input1];
  const key = "someKey";
  const name = "someName";
  const output0 = IngredientData.create({ resourceKey: "outputKey0" });
  const outputs = [output0];

  // Run.
  const result = RecipeData.create({ inputs, key, name, outputs });

  // Verify.
  assert.ok(result);
  assert.equal(result.inputs.length, inputs.length);
  assert.equal(R.head(result.inputs), R.head(inputs));
  assert.equal(result.key, key);
  assert.equal(result.name, name);
  assert.equal(result.outputs.length, outputs.length);
  assert.equal(R.head(result.outputs), R.head(outputs));
  assert.ok(result.clientProps);
});

const RecipeDataTest = {};
export default RecipeDataTest;
