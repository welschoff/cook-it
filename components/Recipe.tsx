import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { RecipeProps } from '@/assets/types';
import React from 'react';

export default function Recipe({ ...props }: RecipeProps) {
  return (
    <SafeAreaView style={styles.container}>
      <Text>{props.title}</Text>
      <View>
        {props.ingredients.map((ingredient, index) => (
          <Text key={index}>{ingredient.name}</Text>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
