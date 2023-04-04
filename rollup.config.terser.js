const { terser } = require("rollup-plugin-terser");

export default {
  input: "RecipeJS.js",
  output: {
    file: "./dist/recipejs.min.js",
    name: "RecipeJS",
  },
  plugins: [terser()],
};
