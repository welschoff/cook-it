export type IngredientProps = {
  searchValue?: string;
  filteredIngredients?: string[];
  selectedIngredients: string[];
  toggleIngredient: (ingredient: string) => void;
};

export type Ingredient = {
  name: string;
  value: string | number;
  unit: string;
};

export type Macros = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

export type RecipeProps = {
  title: string;
  ingredients: Ingredient[];
  nutritional_style?: 'vegetarian' | 'vegan' | 'omnivore';
  portions?: number;
  instructions?: string[];
  meal_type?: 'breakfast' | 'lunch' | 'dinner';
  macros?: Macros;
  cooking_time?: number;
  risky_intolerances?: string[];
  intolerance_warnings?: string;
};
