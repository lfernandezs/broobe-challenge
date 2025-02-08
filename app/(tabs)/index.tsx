import React, { useState } from 'react';
import CATEGORIES from '@/constants/categories';
import STRATEGIES from '@/constants/strategies';
import { StyleSheet, View } from 'react-native';
import {
  Button,
  Checkbox,
  RadioButton,
  Searchbar,
  SegmentedButtons,
  Text,
} from 'react-native-paper';

export default function HomeScreen() {

  const [url, setUrl] = useState('');
  const [selectedCategories, setCategories] = useState(
    Object.fromEntries(CATEGORIES.map((category) => [category.value, false]))
  )
  const [selectedStrategy, setStrategy] = useState('mobile');

  return (
    <View style={styles.container}>
      <Searchbar
        // TODO: regex to validate URL
        placeholder="Enter the website URL"
        onChangeText={(text) => setUrl(text)}
        value={url}
      />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        {CATEGORIES.map((category) => (
          <View key={category.name} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Checkbox
              status={selectedCategories[category.value] ? 'checked' : 'unchecked'}
              onPress={() => setCategories({
                ...selectedCategories,
                [category.value]: !selectedCategories[category.value]
              })}
            />
            <Text>{category.name}</Text>
          </View>))
        }
      </View>

      <SegmentedButtons
        value={selectedStrategy}
        onValueChange={(value) => setStrategy(value)}
        buttons={STRATEGIES.map((strategy) => (
          {
            label: strategy.name,
            value: strategy.value
          }))}
      />

      <Button>
        Save metrics
      </Button>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
  },
});
