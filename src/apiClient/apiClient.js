const API_KEY = process.env.REACT_APP_VEG_API_KEY;

export const apiCLient = {
  baseUrl: "https://api.spoonacular.com/recipes/",
  apiKey: `&apiKey=${API_KEY}`,
  home: {
    endpoint: "random?",
    params: "number=60",
  },
  recipeList: {
    endpoint: "complexSearch?query=",
    params: "&number=100&diet=vegetarian",
  },
  singleRecipe: {
    endpoint: "information?",
    params: "includeNutrition=true",
  },
};
