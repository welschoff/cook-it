import { SearchBar, Button } from '@rneui/base';
import React, { useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import ingredientData from '../../assets/ingredients.json';
import IngredientList from '@/components/IngredientList';
import IngredientSelection from '../../components/IngredientSelection';
import { Colors } from '@/constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { SearchScreenNavigationProp } from '@/assets/types';
import Macros from '@/components/Macros';

export default function SearchScreen() {
  const navigation = useNavigation<SearchScreenNavigationProp>();

  const [search, setSearch] = useState('');
  const [filteredIngredients, setFilteredIngredients] = useState<string[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [protein, setProtein] = useState({ min: '', max: '' });
  const [carbs, setCarbs] = useState({ min: '', max: '' });
  const [fat, setFat] = useState({ min: '', max: '' });

  const ingredients = ingredientData.zutaten;

  const updateSearch = (search: string) => {
    setSearch(search);
    if (search) {
      const filtered: string[] = ingredients.filter((item) => item.toLowerCase().includes(search.toLowerCase()));
      setFilteredIngredients(filtered);
    } else {
      setFilteredIngredients([]);
    }
  };

  const toggleIngredient = (ingredient: string) => {
    setSelectedIngredients((prevSelected) => {
      if (prevSelected.includes(ingredient)) {
        setSearch('');
        return prevSelected.filter((item) => item !== ingredient);
      } else {
        setSearch('');
        return [...prevSelected, ingredient];
      }
    });
  };

  const userPrompt = {
    ingredients: selectedIngredients.map((ingredient) => ({ name: ingredient })),
    macros: {
      protein: { min: protein.min || '0', max: protein.max || '0' },
      carbs: { min: carbs.min || '0', max: carbs.max || '0' },
      fat: { min: fat.min || '0', max: fat.max || '0' },
    },
  };

  const createRecipe = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/chat', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userPrompt }),
      });

      if (!response.ok) {
        throw new Error('Something went wrong with the recipe request.');
      }

      const data = await response.json();
      navigation.navigate('Recipe', { ...data });

      return data;
    } catch (error) {
      console.error(error);
    } finally {
      setSelectedIngredients([]);
      setLoading(false);
    }
  };

  const handleChange = (field: string, type: 'min' | 'max', value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    switch (field) {
      case 'protein':
        setProtein((prev) => ({ ...prev, [type]: numericValue }));
        break;
      case 'carbs':
        setCarbs((prev) => ({ ...prev, [type]: numericValue }));
        break;
      case 'fat':
        setFat((prev) => ({ ...prev, [type]: numericValue }));
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.header}>
          <Image style={styles.img} source={require('../../assets/images/logo.png')} />
        </View>
        <SearchBar
          placeholder="Type in your ingredients"
          onChangeText={(search) => updateSearch(search)}
          value={search}
          onSubmitEditing={() => setSearch('')}
          inputContainerStyle={{
            backgroundColor: 'white',
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderWidth: 1,
            borderRadius: 50,
          }}
          containerStyle={{
            backgroundColor: 'transparent',
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
        <IngredientSelection selectedIngredients={selectedIngredients} toggleIngredient={toggleIngredient} />
        {/* <AllergenSelection /> */}
      </View>
      <Macros
        proteinMin={protein.min}
        proteinMax={protein.max}
        carbsMin={carbs.min}
        carbsMax={carbs.max}
        fatMin={fat.min}
        fatMax={fat.max}
        handleChange={handleChange} // Die Funktion wird hier übergeben
      />
      <View style={styles.button}>
        <Button
          title="Rezept erstellen"
          loading={loading}
          buttonStyle={{
            backgroundColor: Colors.light.primary,
            borderRadius: 50,
            marginHorizontal: 20,
            marginBottom: 20,
          }}
          titleStyle={{ color: 'black' }}
          loadingProps={{ color: 'black' }}
          type="outline"
          onPress={() => createRecipe()}
          // disabled={selectedIngredients.length === 0 ? true : false}
        ></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 250,
    width: '100%',
    backgroundColor: Colors.light.primary,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    marginBottom: 20,
  },
  img: {
    width: '50%',
    height: '50%',
    objectFit: 'contain',
  },
  recipeView: {
    marginTop: 100,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recipeScreen: {
    flex: 1,
  },
  button: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  numberInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});
