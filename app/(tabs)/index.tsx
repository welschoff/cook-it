import { SearchBar } from '@rneui/base';
import React, { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  SafeAreaView,
} from 'react-native';
import ingredientData from '../../assets/ingredients.json';
import IngredientList from '@/components/IngredientList';
import IngredientSelection from '../../components/IngredientSelection';
import AllergenSelection from '@/components/AllergenSelection';
import { Colors } from '@/constants/Colors';

export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const [filteredIngredients, setFilteredIngredients] = useState<string[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  const ingredients = ingredientData.zutaten;

  const updateSearch = (search: string) => {
    setSearch(search);
    if (search) {
      const filtered: string[] = ingredients.filter((item) =>
        item.toLowerCase().includes(search.toLowerCase())
      );
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.img}
          source={require('../../assets/images/logo.png')}
        />
      </View>
      <View style={styles.search}>
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
      </View>
      <ScrollView>
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
        <AllergenSelection />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    height: 250,
    width: '100%',
    backgroundColor: Colors.light.primary,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
  img: {
    width: '50%',
    height: '50%',
    objectFit: 'contain',
  },
  search: {
    marginTop: 200,
  },
});
