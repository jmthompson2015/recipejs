import ResourceFunction from "./ResourceFunction.js";
import TestData from "./TestData.js";

QUnit.module("ResourceFunction");

QUnit.test("toString()", (assert) => {
  // Setup.
  const resourceData = TestData.Resolver.resourceData("alchemicalResin");

  // Run.
  const result = ResourceFunction.toString(resourceData);

  // Verify.
  assert.ok(result);
  assert.equal(result, "Alchemical Resin");
});

const ResourceFunctionTest = {};
export default ResourceFunctionTest;
