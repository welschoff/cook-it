import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { RecipeProps } from '@/assets/types';
import { fonts } from '@/constants/Fonts';
import { Card, Divider, Icon } from '@rneui/base';
import { ScrollView } from 'react-native';
import { Colors } from '@/constants/Colors';

export default function RecipeScreen({ ...props }: RecipeProps) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Icon
          containerStyle={{ alignSelf: 'flex-start' }}
          size={40}
          name="chevron-left"
          onPress={() => props.resetRecipeData()}
        />
        <Text style={fonts.h1}>{props.title}</Text>
        <View>
          <Text style={fonts.h2}>Zutaten:</Text>
          <Divider orientation="horizontal" width={1} color={Colors.light.divider} />
          {props.ingredients.map((ingredient, index) => (
            <View key={index}>
              <View style={styles.ingredients}>
                <Text style={styles.ingredientUnit}>
                  {ingredient.value}&nbsp;{ingredient.unit}
                </Text>
                <Divider orientation="vertical" width={1} color={Colors.light.divider} />
                <Text style={styles.ingredientName}>{ingredient.name}</Text>
              </View>
              <Divider orientation="horizontal" width={1} color={Colors.light.divider} />
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
            <Card>
              <Card.Title>Nährwerte</Card.Title>
              <Text>Kalorien: {props.macros?.calories}</Text>
              <Card.Divider />
              <Text>Eiweiß: {props.macros?.protein}</Text>
              <Card.Divider />
              <Text>Kohlenhydrate: {props.macros?.carbs}</Text>
              <Card.Divider />
              <Text>Fett: {props.macros?.fat}</Text>
            </Card>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  ingredients: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
    padding: 5,
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
