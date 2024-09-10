import { CheckBox } from '@rneui/base';
import { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default function Nutritions() {
  const nutritions = ['Laktose', 'Gluten', 'Fruktose', 'Histamin', 'Sorbitin'];

  const [checkedState, setCheckedState] = useState<Record<string, boolean>>(
    nutritions.reduce((state, nutrition) => {
      state[nutrition] = false;
      return state;
    }, {} as Record<string, boolean>)
  );

  const handleCheck = (nutrition: string) => {
    setCheckedState((prevState) => ({
      ...prevState,
      [nutrition]: !prevState[nutrition],
    }));
  };
  return (
    <View style={styles.view}>
      <Text>Food Intolerances:</Text>
      {nutritions.map((nutrition) => (
        <CheckBox
          key={nutrition}
          checked={checkedState[nutrition]}
          onPress={() => handleCheck(nutrition)}
          title={nutrition}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          containerStyle={{ backgroundColor: 'transparent', margin: 0 }}
          checkedColor="black"
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    marginTop: 20,
  },
});
