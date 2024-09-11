export type IngredientProps = {
  searchValue?: string;
  filteredIngredients?: string[];
  selectedIngredients: string[];
  toggleIngredient: (ingredient: string) => void;
};

export type RecipeProps = {
  title: string;
};
