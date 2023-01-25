import InputValidator from "./utility/InputValidator.js";

import IngredientData from "./state/IngredientData.js";
import RecipeData from "./state/RecipeData.js";
import ResourceData from "./state/ResourceData.js";

import IngredientFunction from "./model/IngredientFunction.js";
import RecipeFunction from "./model/RecipeFunction.js";
import ResourceFunction from "./model/ResourceFunction.js";

class RecipeJS {}

RecipeJS.InputValidator = InputValidator;

RecipeJS.IngredientData = IngredientData;
RecipeJS.RecipeData = RecipeData;
RecipeJS.ResourceData = ResourceData;

RecipeJS.IngredientFunction = IngredientFunction;
RecipeJS.RecipeFunction = RecipeFunction;
RecipeJS.ResourceFunction = ResourceFunction;

export default RecipeJS;
