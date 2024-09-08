import { SearchBar, Chip } from '@rneui/base';
import { ListItem } from '@rneui/themed';
import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import ingredientData from '../../assets/ingredients.json';

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

  const addIngredient = (ingredient: string) => {
    setSelectedIngredients((prevSelected) => {
      if (prevSelected.includes(ingredient)) {
        return prevSelected.filter((item) => item !== ingredient);
      } else {
        return [...prevSelected, ingredient];
      }
    });
  };

  return (
    <View style={styles.view}>
      <SearchBar
        placeholder="Zutaten. . ."
        onChangeText={(search) => updateSearch(search)}
        value={search}
        onSubmitEditing={() => setSearch('')}
        inputContainerStyle={{ backgroundColor: 'white' }}
        round
      ></SearchBar>
      <FlatList
        data={search ? filteredIngredients : []}
        keyExtractor={(item) => item}
        extraData={selectedIngredients}
        renderItem={({ item }) => (
          <ListItem
            key={item}
            bottomDivider
            onPress={() => addIngredient(item)}
            containerStyle={{
              backgroundColor: selectedIngredients.includes(item)
                ? '#D1F8A4'
                : '',
            }}
          >
            <ListItem.Content style={styles.listItem}>
              <ListItem.Title>{item}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        )}
      ></FlatList>
      <Text style={styles.h1}>ausgewählte Zutaten:</Text>
      <View style={styles.selectedIngredientsContainer}>
        {selectedIngredients.map((ingredient, index) => (
          <Chip
            key={index}
            title={ingredient}
            icon={{
              name: 'close',
              type: 'font-awesome',
              size: 20,
              color: 'black',
              onPress: () =>
                setSelectedIngredients((prevIngredients) =>
                  prevIngredients.filter((_, i) => i !== index)
                ),
            }}
            iconRight
            containerStyle={{
              alignSelf: 'flex-start',
            }}
            buttonStyle={{ backgroundColor: '#D1F8A4', margin: 2 }}
            titleStyle={{ color: 'black' }}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  h1: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  view: {
    marginTop: 80,
  },
  selectedIngredientsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
