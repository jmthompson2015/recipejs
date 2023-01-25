import IV from "../utility/InputValidator.js";

const RecipeData = {};

RecipeData.create = ({ inputs, key, name, outputs, clientProps = {} }) => {
  IV.validateIsArray("inputs", inputs);
  IV.validateIsString("name", name);
  IV.validateIsArray("outputs", outputs);
  const myKey = key || name;

  return Immutable({
    inputs,
    key: myKey,
    name,
    outputs,
    clientProps,
  });
};

Object.freeze(RecipeData);

export default RecipeData;
