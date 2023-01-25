import ResourceData from "./ResourceData.js";

QUnit.module("ResourceData");

QUnit.test("create()", (assert) => {
  // Setup.
  const imageUrl = "some/url";
  const key = "someKey";
  const name = "someName";
  const value = 2;

  // Run.
  const result = ResourceData.create({ imageUrl, key, name, value });

  // Verify.
  assert.ok(result);
  assert.equal(result.imageUrl, imageUrl);
  assert.equal(result.key, key);
  assert.equal(result.name, name);
  assert.equal(result.value, value);
  assert.ok(result.clientProps);
});

const ResourceDataTest = {};
export default ResourceDataTest;
