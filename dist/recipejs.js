(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.RecipeJS = factory());
})(this, (function () { 'use strict';

  /* eslint no-console: ["error", { allow: ["error"] }] */

  const InputValidator = {
    EMPTY: " is null or empty.",
    NULL: " is null.",
    UNDEFINED: " is undefined.",

    validateInRange(objectName, object, low, high) {
      this.validateIsNumber(objectName, object);

      if (object < low || high < object) {
        console.error(new Error().stack);
        throw new Error(
          `${objectName} is out of range [${low}, ${high}]: ${object}`
        );
      }
    },

    validateIsArray(objectName, object) {
      if (!Array.isArray(object)) {
        console.error(new Error().stack);
        throw new Error(`${objectName} is not an array: ${object}`);
      }
    },

    validateIsBoolean(objectName, object) {
      if (typeof object !== "boolean") {
        console.error(new Error().stack);
        throw new Error(`${objectName} is not a boolean: ${object}`);
      }
    },

    validateIsFunction(objectName, object) {
      if (typeof object !== "function") {
        console.error(new Error().stack);
        throw new Error(`${objectName} is not a function: ${object}`);
      }
    },

    validateIsNumber(objectName, object) {
      if (typeof object !== "number") {
        console.error(new Error().stack);
        throw new Error(`${objectName} is not a number: ${object}`);
      }
    },

    validateIsString(objectName, object) {
      if (typeof object !== "string") {
        console.error(new Error().stack);
        throw new Error(`${objectName} is not a string: ${object}`);
      }
    },

    validateNotEmpty(objectName, object) {
      if (Array.isArray(object)) {
        if (object.length === 0) {
          // Empty array.
          console.error(new Error().stack);
          throw new Error(objectName + InputValidator.EMPTY);
        }
      } else if (!Number.isNaN(parseFloat(object)) && Number.isFinite(object)) ; else if (object === true || object === false) ; else if (!object) {
        console.error(new Error().stack);
        throw new Error(objectName + InputValidator.EMPTY);
      }
    },

    validateNotIncludesNil(objectName, object) {
      this.validateNotNil(objectName, object);
      this.validateIsArray(objectName, object);
      object.forEach((element) => {
        this.validateNotNil(`${objectName} element`, element);
      });
    },

    validateNotNil(objectName, object) {
      if (object === undefined) {
        console.error(new Error().stack);
        throw new Error(objectName + InputValidator.UNDEFINED);
      }

      if (object === null) {
        console.error(new Error().stack);
        throw new Error(objectName + InputValidator.NULL);
      }
    },
  };

  const IngredientData = {};

  IngredientData.create = ({ amount = 1, resourceKey, clientProps = {} }) => {
    InputValidator.validateIsString("resourceKey", resourceKey);

    return Immutable({
      amount,
      resourceKey,
      clientProps,
    });
  };

  Object.freeze(IngredientData);

  const RecipeData = {};

  RecipeData.create = ({ inputs, key, name, outputs, clientProps = {} }) => {
    InputValidator.validateIsArray("inputs", inputs);
    InputValidator.validateIsString("name", name);
    InputValidator.validateIsArray("outputs", outputs);
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

  const ResourceData = {};

  ResourceData.create = ({
    imageUrl,
    key,
    name,
    value = 0,
    clientProps = {},
  }) => {
    InputValidator.validateIsString("name", name);
    const myKey = key || name;

    return Immutable({
      imageUrl,
      key: myKey,
      name,
      value,
      clientProps,
    });
  };

  Object.freeze(ResourceData);

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
    InputValidator.validateNotNil("ingredientData", ingredientData);
    InputValidator.validateNotNil("resolver", resolver);

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
    InputValidator.validateNotNil("ingredientData", ingredientData);
    InputValidator.validateNotNil("resolver", resolver);

    if (Array.isArray(ingredientData)) {
      return arrayToValue(ingredientData, resolver);
    }

    const { amount, resourceKey } = ingredientData;
    const resourceData = resolver.resourceData(resourceKey);
    const baseValue = R.isNil(resourceData) ? 0 : resourceData.value;

    return R.isNil(baseValue) || R.isNil(amount) ? null : baseValue * amount;
  };

  const RecipeFunction = {};

  RecipeFunction.accept = (recipe, visitor) => visitor.visit(recipe);

  RecipeFunction.findByOutput = (resourceKey, resolver) => {
    InputValidator.validateIsString("resourceKey", resourceKey);
    InputValidator.validateNotNil("resolver", resolver);

    const filterFunction = (output) => output.resourceKey === resourceKey;
    const reduceFunction = (accum, r) => {
      const matches = R.filter(filterFunction, r.outputs);
      return matches.length > 0 ? R.append(r, accum) : accum;
    };
    const recipes1 = R.reduce(reduceFunction, [], resolver.recipeValues());

    return recipes1;
  };

  RecipeFunction.inputValue = (recipeData, resolver) => {
    InputValidator.validateNotNil("recipeData", recipeData);
    InputValidator.validateNotNil("resolver", resolver);

    const reduceFunction = (accum, input) => {
      const value = IngredientFunction.value(input, resolver);

      return value ? accum + value : accum;
    };

    return R.reduce(reduceFunction, 0, recipeData.inputs);
  };

  RecipeFunction.outputInputRatio = (recipeData, resolver) => {
    InputValidator.validateNotNil("recipeData", recipeData);
    InputValidator.validateNotNil("resolver", resolver);

    const outputValue = RecipeFunction.outputValue(recipeData, resolver);
    const inputValue = RecipeFunction.inputValue(recipeData, resolver);

    return outputValue && inputValue ? outputValue / inputValue : null;
  };

  RecipeFunction.outputValue = (recipeData, resolver) => {
    InputValidator.validateNotNil("recipeData", recipeData);
    InputValidator.validateNotNil("resolver", resolver);

    const reduceFunction = (accum, output) => {
      const value = IngredientFunction.value(output, resolver);

      return value ? accum + value : accum;
    };

    return R.reduce(reduceFunction, 0, recipeData.outputs);
  };

  RecipeFunction.toString = (recipeData, resolver, showName) => {
    InputValidator.validateNotNil("recipeData", recipeData);
    InputValidator.validateNotNil("resolver", resolver);

    const { inputs, name, outputs } = recipeData;
    const prefix = showName && name ? `${name}: ` : "";
    return `${prefix}${IngredientFunction.toString(
    outputs,
    resolver
  )} \u2190 ${IngredientFunction.toString(inputs, resolver)}`;
  };

  const ResourceFunction = {};

  ResourceFunction.toString = (resourceData) => {
    InputValidator.validateNotNil("resourceData", resourceData);

    return resourceData.name;
  };

  // import BooleanOperator from "./artifact/BooleanOperator.js";

  // import FilterUI from "./view/FilterUI.js";
  // import FilterGroupUI from "./view/FilterGroupUI.js";

  class RecipeJS {}

  // FilterJS.BooleanOperator = BooleanOperator;
  // FilterJS.ClauseType = ClauseType;
  // FilterJS.NumberOperator = NumberOperator;
  // FilterJS.StringOperator = StringOperator;
  RecipeJS.InputValidator = InputValidator;

  // FilterJS.Clause = Clause;
  // FilterJS.Filter = Filter;
  // FilterJS.FilterGroup = FilterGroup;
  RecipeJS.IngredientData = IngredientData;
  RecipeJS.RecipeData = RecipeData;
  RecipeJS.ResourceData = ResourceData;

  RecipeJS.IngredientFunction = IngredientFunction;
  RecipeJS.RecipeFunction = RecipeFunction;
  RecipeJS.ResourceFunction = ResourceFunction;

  return RecipeJS;

}));
