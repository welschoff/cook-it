import { ListItem } from '@rneui/base';
import { FlatList, StyleSheet } from 'react-native';
import { IngredientProps } from '@/assets/types';

export default function IngredientList({ ...props }: IngredientProps) {
  return (
    <FlatList
      data={props.searchValue ? props.filteredIngredients : []}
      keyExtractor={(item) => item}
      extraData={props.selectedIngredients}
      renderItem={({ item }) => (
        <ListItem
          key={item}
          bottomDivider
          onPress={() => props.toggleIngredient(item)}
          containerStyle={{
            backgroundColor: props.selectedIngredients.includes(item) ? '#D1F8A4' : '',
          }}
        >
          <ListItem.Content style={styles.listItem}>
            <ListItem.Title>{item}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      )}
    ></FlatList>
  );
}

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
