export type IngredientProps = {
  searchValue?: string;
  filteredIngredients?: string[];
  selectedIngredients: string[];
  toggleIngredient: (ingredient: string) => void;
};
