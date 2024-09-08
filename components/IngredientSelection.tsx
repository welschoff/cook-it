import { Chip } from '@rneui/base';
import { View, StyleSheet, Text } from 'react-native';
import { IngredientProps } from '@/assets/types';

export default function IngredientSelection({ ...props }: IngredientProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.h1}>ausgewählte Zutaten:</Text>
      <View style={styles.selectedIngredientsContainer}>
        {props.selectedIngredients.map((ingredient) => (
          <Chip
            key={ingredient}
            title={ingredient}
            icon={{
              name: 'close',
              type: 'font-awesome',
              size: 20,
              color: 'black',
              onPress: () => props.toggleIngredient(ingredient),
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
  container: {
    marginTop: 20,
  },
  h1: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  selectedIngredientsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
