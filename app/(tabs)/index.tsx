if (__DEV__) {
  require("../../ReactotronConfig");
}

import React, { useState } from 'react';
import CATEGORIES from '@/constants/categories';
import STRATEGIES from '@/constants/strategies';
import { StyleSheet, View } from 'react-native';
import {
  ActivityIndicator,
  Button,
  Checkbox,
  RadioButton,
  Searchbar,
  SegmentedButtons,
  Text,
} from 'react-native-paper';
import getMetrics from '@/interactors/getMetrics';

export default function HomeScreen() {

  const [url, setUrl] = useState('');
  const [isCategorySelected, setCategories] = useState(
    Object.fromEntries(CATEGORIES.map((category) => [category.value, false]))
  )
  const [selectedStrategy, setStrategy] = useState('mobile');
  const [metrics, setMetrics] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const selectedCategories = Object.entries(isCategorySelected)
    .filter(([_, isSelected]) => isSelected)
    .map(([category, _]) => category)

  const onSearch = () => {
    setIsLoading(true);
    getMetrics(url, selectedCategories, selectedStrategy)
      .then((data) => setMetrics(data))
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  }

  console.log('metrics', metrics);
  return (
    <View style={styles.container}>
      <Searchbar
        // TODO: regex to validate URL
        placeholder="Enter the website URL"
        onChangeText={(text) => setUrl(text)}
        value={url}
        onIconPress={onSearch}
      />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        {CATEGORIES.map((category) => (
          <View key={category.name} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Checkbox
              status={isCategorySelected[category.value] ? 'checked' : 'unchecked'}
              onPress={() => setCategories({
                ...isCategorySelected,
                [category.value]: !isCategorySelected[category.value]
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

      {isLoading && <ActivityIndicator animating={true} />}

      {error && <Text>{error}</Text>}

      {metrics && Object.entries(metrics).map(([category, data]) => (
        <View key={category}>
          <Text>{category}: {data.score}</Text>
        </View>
      ))}

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
