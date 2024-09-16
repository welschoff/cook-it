import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { RecipeProps } from '@/assets/types';
import { fonts } from '@/constants/Fonts';
import { Card } from '@rneui/base';
import { ScrollView } from 'react-native';
import { Colors } from '@/constants/Colors';

export default function RecipeScreen({ ...props }: RecipeProps) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={fonts.h1}>{props.title}</Text>
        <View>
          <Text style={fonts.h2}>Zutaten:</Text>
          {props.ingredients.map((ingredient, index) => (
            <View style={styles.ingredients} key={index}>
              <Text style={styles.ingredientUnit}>
                {ingredient.value}&nbsp;{ingredient.unit}
              </Text>
              <Text style={styles.ingredientName}>{ingredient.name}</Text>
            </View>
          ))}
          <View style={styles.instructions}>
            <Text style={fonts.h2}>Kochanleitung:</Text>
            {props.instructions?.map((instruction, index) => (
              <Card key={index} containerStyle={{ backgroundColor: Colors.light.primary, borderRadius: 10 }}>
                <Text style={fonts.h3}>
                  <Text style={fonts.h1}>{index + 1}.&nbsp;</Text>
                  {instruction}
                </Text>
              </Card>
            ))}
          </View>
          <View>
            <Text style={fonts.h2}>Nährwerte</Text>
            <Text>Kalorien: {props.macros?.calories}</Text>
            <Text>Eiweiß: {props.macros?.protein}</Text>
            <Text>Kohlenhydrate: {props.macros?.carbs}</Text>
            <Text>Fett: {props.macros?.fat}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ingredients: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
  },
  ingredientUnit: {
    textAlign: 'right',
    flex: 1,
  },
  ingredientName: {
    flex: 1,
  },
  instructions: {
    marginTop: 20,
  },
});
