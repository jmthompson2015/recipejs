import Immutable from "seamless-immutable";

import IV from "../utility/InputValidator.js";

const RecipeData = {};

RecipeData.create = ({
  inputs,
  fabricators,
  key,
  name,
  outputs,
  clientProps = {},
}) => {
  IV.validateIsArray("inputs", inputs);
  IV.validateIsArray("outputs", outputs);
  const myKey = key || name;

  return Immutable({
    inputs,
    fabricators,
    key: myKey,
    name,
    outputs,
    clientProps,
  });
};

Object.freeze(RecipeData);

export default RecipeData;
