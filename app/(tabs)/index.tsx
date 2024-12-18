import { SearchBar, Button } from "@rneui/base";
import React, { useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import ingredientData from "../../assets/ingredients.json";
import IngredientList from "@/components/IngredientList";
import IngredientSelection from "../../components/IngredientSelection";
import { Colors } from "@/constants/Colors";
import Recipe from "@/components/Recipe";
import { RecipeProps } from "@/assets/types";

export default function HomeScreen() {
  const [search, setSearch] = useState("");
  const [filteredIngredients, setFilteredIngredients] = useState<string[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [recipeData, setRecipeData] = useState<RecipeProps | undefined>(
    undefined,
  );
  const [loading, setLoading] = useState(false);

  const ingredients = ingredientData.zutaten;

  const updateSearch = (search: string) => {
    setSearch(search);
    if (search) {
      const filtered: string[] = ingredients.filter((item) =>
        item.toLowerCase().includes(search.toLowerCase()),
      );
      setFilteredIngredients(filtered);
    } else {
      setFilteredIngredients([]);
    }
  };

  const toggleIngredient = (ingredient: string) => {
    setSelectedIngredients((prevSelected) => {
      if (prevSelected.includes(ingredient)) {
        setSearch("");
        return prevSelected.filter((item) => item !== ingredient);
      } else {
        setSearch("");
        return [...prevSelected, ingredient];
      }
    });
  };

  const createRecipe = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/chat", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userPrompt: selectedIngredients.join(", ") }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong with the recipe request.");
      }

      const data = await response.json();
      console.log(data);
      setRecipeData(data);
      return data;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setSelectedIngredients([]);
    }
  };

  return (
    <View style={styles.container}>
      {!recipeData && !loading && (
        <View>
          <View style={styles.header}>
            <Image
              style={styles.img}
              source={require("../../assets/images/logo.png")}
            />
          </View>
          <SearchBar
            placeholder="Type in your ingredients"
            onChangeText={(search) => updateSearch(search)}
            value={search}
            onSubmitEditing={() => setSearch("")}
            inputContainerStyle={{
              backgroundColor: "white",
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderWidth: 1,
              borderRadius: 50,
            }}
            containerStyle={{
              backgroundColor: "transparent",
              padding: 0,
              borderTopWidth: 0,
              borderBottomWidth: 0,
            }}
            round
          />
          {filteredIngredients.length > 0 ? (
            <IngredientList
              searchValue={search}
              filteredIngredients={filteredIngredients}
              selectedIngredients={selectedIngredients}
              toggleIngredient={toggleIngredient}
            />
          ) : null}
          <IngredientSelection
            selectedIngredients={selectedIngredients}
            toggleIngredient={toggleIngredient}
          />
          {/* <AllergenSelection /> */}
          <Button
            title="Search"
            onPress={() => createRecipe()}
            disabled={selectedIngredients.length === 0 ? true : false}
          ></Button>
        </View>
      )}

      {loading && (
        <View style={styles.loading}>
          <Button title="Clear" type="clear" loading />
        </View>
      )}

      {recipeData && (
        <View style={styles.recipeView}>
          <Recipe title={recipeData.title} />
          <Button
            title="back"
            onPress={() => setRecipeData(undefined)}
          ></Button>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    height: 250,
    width: "100%",
    backgroundColor: Colors.light.primary,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    marginBottom: 20,
  },
  img: {
    width: "50%",
    height: "50%",
    objectFit: "contain",
  },
  recipeView: {
    marginTop: 100,
  },
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
