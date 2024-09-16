import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { fonts } from '@/constants/Fonts';
import { Card, Divider, Icon } from '@rneui/base';
import { ScrollView } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { RecipeProps } from '@/assets/types';

export default function RecipeScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const { ...data } = route.params as RecipeProps;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Icon
          containerStyle={{ alignSelf: 'flex-start' }}
          size={40}
          name="chevron-left"
          onPress={() => navigation.goBack()}
        />
        <Text style={fonts.h1}>{data.title}</Text>
        <View>
          <Text style={fonts.h2}>Zutaten:</Text>
          <Divider orientation="horizontal" width={1} color={Colors.light.divider} />
          {data.ingredients.map((ingredient, index) => (
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
            {data.instructions?.map((instruction, index) => (
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
              <Text>Kalorien: {data.macros?.calories}</Text>
              <Card.Divider />
              <Text>Eiweiß: {data.macros?.protein}</Text>
              <Card.Divider />
              <Text>Kohlenhydrate: {data.macros?.carbs}</Text>
              <Card.Divider />
              <Text>Fett: {data.macros?.fat}</Text>
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
