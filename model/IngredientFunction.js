import IV from "../utility/InputValidator.js";

const IngredientFunction = {};

const arrayToString = (array, resolver) => {
  const reduceFunction = (accum, ingredientData) =>
    `${accum}${IngredientFunction.toString(ingredientData, resolver)} + `;
  const string = R.reduce(reduceFunction, "", array);

  return string.substring(0, string.length - " + ".length);
};

const arrayToValue = (array, resolver) => {
  const reduceFunction = (accum, ingredientData) =>
    accum + IngredientFunction.value(ingredientData, resolver);

  return R.reduce(reduceFunction, 0, array);
};

IngredientFunction.toString = (ingredientData, resolver) => {
  IV.validateNotNil("ingredientData", ingredientData);
  IV.validateNotNil("resolver", resolver);

  if (Array.isArray(ingredientData)) {
    return arrayToString(ingredientData, resolver);
  }

  const { amount, resourceKey } = ingredientData;
  const resourceData = resolver.resourceData(resourceKey);

  return R.isNil(resourceData) || R.isNil(amount)
    ? null
    : `${resourceData.name} x${amount}`;
};

IngredientFunction.value = (ingredientData, resolver) => {
  IV.validateNotNil("ingredientData", ingredientData);
  IV.validateNotNil("resolver", resolver);

  if (Array.isArray(ingredientData)) {
    return arrayToValue(ingredientData, resolver);
  }

  const { amount, resourceKey } = ingredientData;
  const resourceData = resolver.resourceData(resourceKey);
  const baseValue = R.isNil(resourceData) ? 0 : resourceData.value;

  return R.isNil(baseValue) || R.isNil(amount) ? null : baseValue * amount;
};

export default IngredientFunction;
