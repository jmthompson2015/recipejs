import IV from "../utility/InputValidator.js";

const IngredientData = {};

IngredientData.create = ({ amount = 1, resourceKey, clientProps = {} }) => {
  IV.validateIsString("resourceKey", resourceKey);

  return Immutable({
    amount,
    resourceKey,
    clientProps,
  });
};

Object.freeze(IngredientData);

export default IngredientData;
