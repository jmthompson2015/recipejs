import IngredientData from "../state/IngredientData.js";
import RecipeData from "../state/RecipeData.js";
import ResourceData from "../state/ResourceData.js";

const TestData = {};

const resourceCollection = {
  alchemicalResin: ResourceData.create({
    name: "Alchemical Resin",
    value: 8,
  }),
  bast: ResourceData.create({ name: "Bast", value: 2 }),
  dresLanternStationary: ResourceData.create({
    name: "Dres Lantern, Stationary",
    value: 123,
  }),
  obsidian: ResourceData.create({ name: "Obsidian", value: 3 }),
  regulus: ResourceData.create({ name: "Regulus", value: 4 }),
};

const createRecipe0 = () => {
  const ingredient0 = IngredientData.create({
    amount: 6,
    resourceKey: "alchemicalResin",
  });
  const ingredient1 = IngredientData.create({
    amount: 3,
    resourceKey: "regulus",
  });
  const ingredient2 = IngredientData.create({
    amount: 8,
    resourceKey: "obsidian",
  });
  const inputs = [ingredient0, ingredient1, ingredient2];
  const ingredient3 = IngredientData.create({
    resourceKey: "dresLanternStationary",
  });
  const outputs = [ingredient3];

  return RecipeData.create({
    inputs,
    name: "Formula: Dres Lantern, Stationary",
    outputs,
  });
};

const recipe0 = createRecipe0();
const recipeCollection = { dresLanternRecipe: recipe0 };

TestData.Resolver = {
  recipeData: (key) => recipeCollection[key],
  recipeKeys: () => Object.keys(recipeCollection),
  recipeValues: () => Object.values(recipeCollection),

  resourceData: (key) => resourceCollection[key],
};

export default TestData;
