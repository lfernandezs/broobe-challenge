if (__DEV__) {
  require("../../ReactotronConfig");
}

import React, { useEffect, useState } from 'react';
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
import getMetricFromRemote from '@/interactors/GetMetricFromRemote';
import AddMetricToStore from '@/interactors/AddMetricToStore';
import { useRootStore } from '@/providers/RootStoreProvider';
import { observer } from 'mobx-react-lite';
import Metric from '@/entities/Metric/Metric';

const HomeScreen = () => {

  const [url, setUrl] = useState('');
  const [isCategorySelected, setCategories] = useState(
    Object.fromEntries(CATEGORIES.map((category) => [category.value, false]))
  )
  const [selectedStrategy, setStrategy] = useState('mobile');
  const [metric, setMetric]: [Metric | null, any] = useState(null);
  const [current, setHistory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const selectedCategories = Object.entries(isCategorySelected)
    .filter(([_, isSelected]) => isSelected)
    .map(([category, _]) => category)

  const { metricsStore } = useRootStore();
  const addMetricToStore = new AddMetricToStore(metricsStore);

  const onSearch = () => {
    setIsLoading(true);
    getMetricFromRemote(url, selectedCategories, selectedStrategy)
      .then((data) => setMetric(data))
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  }

  const onSaveMetric = async () => {
    if (!metric) return;
    await addMetricToStore.execute(metric);
  }

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

      {metric && selectedCategories.map((category) => (
        <View key={category}>
          <Text>{metric.id} - {metric.url} - {metric.accessibility_metric} - {metric.best_practices_metric}</Text>
        </View>
      ))}

      <Button onPress={onSaveMetric}>
        Save metric
      </Button>

      <Text>Saved Metric</Text>
      {metricsStore.current && <Text>{JSON.stringify(metricsStore.current)}</Text>}
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

export default observer(HomeScreen);
