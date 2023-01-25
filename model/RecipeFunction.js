import IV from "../utility/InputValidator.js";

import IngredientFunction from "./IngredientFunction.js";

const RecipeFunction = {};

RecipeFunction.accept = (recipe, visitor) => visitor.visit(recipe);

RecipeFunction.findByOutput = (resourceKey, resolver) => {
  IV.validateIsString("resourceKey", resourceKey);
  IV.validateNotNil("resolver", resolver);

  const filterFunction = (output) => output.resourceKey === resourceKey;
  const reduceFunction = (accum, r) => {
    const matches = R.filter(filterFunction, r.outputs);
    return matches.length > 0 ? R.append(r, accum) : accum;
  };
  const recipes1 = R.reduce(reduceFunction, [], resolver.recipeValues());

  return recipes1;
};

RecipeFunction.inputValue = (recipeData, resolver) => {
  IV.validateNotNil("recipeData", recipeData);
  IV.validateNotNil("resolver", resolver);

  const reduceFunction = (accum, input) => {
    const value = IngredientFunction.value(input, resolver);

    return value ? accum + value : accum;
  };

  return R.reduce(reduceFunction, 0, recipeData.inputs);
};

RecipeFunction.outputInputRatio = (recipeData, resolver) => {
  IV.validateNotNil("recipeData", recipeData);
  IV.validateNotNil("resolver", resolver);

  const outputValue = RecipeFunction.outputValue(recipeData, resolver);
  const inputValue = RecipeFunction.inputValue(recipeData, resolver);

  return outputValue && inputValue ? outputValue / inputValue : null;
};

RecipeFunction.outputValue = (recipeData, resolver) => {
  IV.validateNotNil("recipeData", recipeData);
  IV.validateNotNil("resolver", resolver);

  const reduceFunction = (accum, output) => {
    const value = IngredientFunction.value(output, resolver);

    return value ? accum + value : accum;
  };

  return R.reduce(reduceFunction, 0, recipeData.outputs);
};

RecipeFunction.toString = (recipeData, resolver, showName) => {
  IV.validateNotNil("recipeData", recipeData);
  IV.validateNotNil("resolver", resolver);

  const { inputs, name, outputs } = recipeData;
  const prefix = showName && name ? `${name}: ` : "";
  return `${prefix}${IngredientFunction.toString(
    outputs,
    resolver
  )} \u2190 ${IngredientFunction.toString(inputs, resolver)}`;
};

export default RecipeFunction;
