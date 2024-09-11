import { View, Text } from "react-native";
import { RecipeProps } from "@/assets/types";

export default function Recipe({ ...props }: RecipeProps) {
  return (
    <View>
      <Text>{props.title}</Text>
    </View>
  );
}
