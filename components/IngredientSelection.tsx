import { Chip } from '@rneui/base';
import { View, StyleSheet, Text } from 'react-native';
import { IngredientProps } from '@/assets/types';
import { Colors } from '@/constants/Colors';

export default function IngredientSelection({ ...props }: IngredientProps) {
  return (
    <View style={styles.container}>
      <View style={styles.selectedIngredientsContainer}>
        {props.selectedIngredients.length > 0 ? <Text>Zutaten:</Text> : <></>}
        <View style={styles.selectedIngredients}>
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
              buttonStyle={{ backgroundColor: Colors.light.primary, margin: 2 }}
              titleStyle={{ color: 'black' }}
            />
          ))}
        </View>
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
    flexDirection: 'column',
  },
  selectedIngredients: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
