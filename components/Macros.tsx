import { View, Text, TextInput, StyleSheet } from 'react-native';

interface MacroProps {
  proteinMin: string;
  proteinMax: string;
  carbsMin: string;
  carbsMax: string;
  fatMin: string;
  fatMax: string;
  handleChange: (field: string, type: 'min' | 'max', value: string) => void;
}

export default function Macros({ ...probs }: MacroProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Proteine (g)</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={probs.proteinMin}
          onChangeText={(value) => probs.handleChange('protein', 'min', value)}
          placeholder="Min"
        />
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={probs.proteinMax}
          onChangeText={(value) => probs.handleChange('protein', 'max', value)}
          placeholder="Max"
        />
      </View>
      <Text style={styles.label}>Kohlenhydrate (g)</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={probs.carbsMin}
          onChangeText={(value) => probs.handleChange('carbs', 'min', value)}
          placeholder="Min"
        />
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={probs.carbsMax}
          onChangeText={(value) => probs.handleChange('carbs', 'max', value)}
          placeholder="Max"
        />
      </View>
      <Text style={styles.label}>Fette (g)</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={probs.fatMin}
          onChangeText={(value) => probs.handleChange('fat', 'min', value)}
          placeholder="Min"
        />
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={probs.fatMax}
          onChangeText={(value) => probs.handleChange('fat', 'max', value)}
          placeholder="Max"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    flex: 1,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  result: {
    marginTop: 20,
  },
});
