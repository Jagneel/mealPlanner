import axios from 'axios';

export const fetchRecipes = async (
  dietaryPreferences: string[],
  allergies: string[],
  minProtein: string,
  dishType: string,
) => {
  const apiKey = '57b95d143d474f74a905a576378bfb50'; // Replace with your actual API key
  const url = 'https://api.spoonacular.com/recipes/complexSearch?&addRecipeNutrition=true';

  const params: Record<string, string> = {
    apiKey: apiKey,
    diet: dietaryPreferences.join(','),
    intolerances: allergies.join(','),
    minProtein: minProtein,
    type: dishType,
    number: '10'
  };

  const config = {
    params: params,
  };

  try {
    console.log(`Request URL: ${url}?${new URLSearchParams(params).toString()}`);

    const response = await axios.get(url, config);

    const recipes = response.data;
    return recipes; // Return the fetched recipes
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error; // Re-throw the error to handle it in the calling component
  }
};

// https://api.spoonacular.com/recipes/complexSearch?apiKey=57b95d143d474f74a905a576378bfb50&addRecipeNutrition=true&minProtein=50&dishType=lunch&number=10

// https://api.spoonacular.com/recipes/complexSearch?apiKey=57b95d143d474f74a905a576378bfb50&diet=&intolerances=Fish%2CEgg&minProtein=20&dishType=breakfast&number=10