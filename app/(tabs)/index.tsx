if (__DEV__) {
  require("../../ReactotronConfig");
}

import React, { useEffect, useState } from 'react';
import CATEGORIES from '@/constants/categories';
import STRATEGIES from '@/constants/strategies';
import { ScrollView, StyleSheet, View } from 'react-native';
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
import ScoreChart from '@/components/ScoreChart/ScoreChart';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { set } from 'mobx';

const HomeScreen = () => {

  const [url, setUrl] = useState('');
  const [isCategorySelected, setCategories] = useState(
    Object.fromEntries(CATEGORIES.map((category) => [category.value, false]))
  )
  const [selectedStrategy, setStrategy] = useState('mobile');
  const [metricProps, setMetricProps]: [Metric | null, any] = useState(null);
  const [current, setHistory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const selectedCategories = Object.entries(isCategorySelected)
    .filter(([_, isSelected]) => isSelected)
    .map(([category, _]) => category)

  const { metricsStore } = useRootStore();
  const addMetricToStore = new AddMetricToStore(metricsStore);

  const validateUrl = (url: string) => {
    const urlPattern = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    if (!url) return false;
    if (!url.match(urlPattern)) {
      console.log(url);
      return false;
    }
    return true;
  }

  const addProtocol = (url: string) => {
    if (url.match('http(s)?:\/\/')) return url;
    return `https://${url}`;
  }

  const onSearch = () => {
    setError('');
    if (!validateUrl(url)) {
      setError('Invalid URL');
      return;
    }
    let urlWithProtocol = addProtocol(url);
    setUrl(urlWithProtocol);
    setIsLoading(true);
    getMetricFromRemote(urlWithProtocol, selectedCategories, selectedStrategy)
      .then((data) => setMetricProps(data))
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  }

  const onSaveMetric = async () => {
    if (!metricProps) return;
    await addMetricToStore.execute(metricProps);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAwareScrollView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Searchbar
            placeholder="Enter the website URL"
            onChangeText={(text) => setUrl(text.toLowerCase())}
            value={url}
            onIconPress={onSearch}
          />

          <View style={styles.categoryContainer}>
            {CATEGORIES.map((category) => (
              <View key={category.name} style={styles.checkboxContainer}>
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
            style={styles.button}
            value={selectedStrategy}
            onValueChange={(value) => setStrategy(value)}
            buttons={STRATEGIES.map((strategy) => (
              {
                label: strategy.name,
                value: strategy.value
              }))}
          />

          {isLoading && <ActivityIndicator style={styles.loading} animating={true} />}

          {error && <Text style={styles.error}>{error}</Text>}
          <View style={styles.chartsContainer}>
            {metricProps && selectedCategories.map((category) => (
              <ScoreChart key={category} title={category} score={metricProps[`${category}_metric`]} />
            ))}
          </View>

          {metricProps && <Button mode='contained' compact style={styles.button} onPress={onSaveMetric}>
            Save metric
          </Button>
          }
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },

  chartsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },

  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
    marginVertical: 8,
    marginRight: 15,
    justifyContent: 'flex-start',
  },

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  loading: {
    marginVertical: 20,
  },

  button: {
    marginVertical: 20,
    width: '50%',
  },

  error: {
    color: 'red',
    marginVertical: 20,
  },
});

export default observer(HomeScreen);
