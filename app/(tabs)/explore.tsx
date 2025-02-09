import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, Platform, View, Text } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useRootStore } from '@/providers/RootStoreProvider';
import Metric from '@/entities/Metric/Metric';
import { ThemedText } from '@/components/ThemedText';
import { Button, Icon } from 'react-native-paper';
import { observer } from 'mobx-react-lite';
import getMetricsFromRemoteFromStore from '@/interactors/GetMetricsFromStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const History = () => {
  const { metricsStore } = useRootStore();
  const getMetricsFromStore = new getMetricsFromRemoteFromStore(metricsStore);
  const [metrics, setMetrics] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const metrics = await getMetricsFromStore.execute();
      setMetrics(metrics);
      setLoading(false);
    }
    fetchData();
  }, [metricsStore.metrics]);

  const onDelete = async (id: string) => {
    await metricsStore.delete(id);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAwareScrollView style={{ flex: 1 }}>
        {!loading && <View style={{ margin: 16 }}>
          <ThemedText style={styles.title}>History</ThemedText>
          {metrics.map((metric: Metric, index: number) => (
            <View key={metric.id} style={styles.metricCard}>
              <View style={styles.titleContainer}>
                <ThemedText style={styles.metricId}>#{index + 1}</ThemedText>
                <Button style={styles.button} icon={"trash-can"} onPress={() => onDelete(metric.id)} />
              </View>
              <View>
                <ThemedText style={{ fontSize: 18, color: 'grey' }}>{metric.url}</ThemedText>
                {/* <ThemedText style={{ color: '#808080' }}>{metric.created_at}</ThemedText> */}
              </View>
              <View style={styles.categoriesContainer}>
                {metric.accessibility_metric &&
                  <View style={styles.categoryContainer}>
                    <ThemedText style={styles.categoryTitle}>Accessibility</ThemedText>
                    <ThemedText>{metric.accessibility_metric}</ThemedText>
                  </View>
                }
                {metric.best_practices_metric &&
                  <View style={styles.categoryContainer}>
                    <ThemedText style={styles.categoryTitle}>Best Practices</ThemedText>
                    <ThemedText>{metric.best_practices_metric}</ThemedText>
                  </View>
                }
                {metric.performance_metric &&
                  <View style={styles.categoryContainer}>
                    <ThemedText style={styles.categoryTitle}>Performance</ThemedText>
                    <ThemedText>{metric.performance_metric}</ThemedText>
                  </View>
                }
                {metric.pwa_metric &&
                  <View style={styles.categoryContainer}>
                    <ThemedText style={styles.categoryTitle}>PWA</ThemedText>
                    <ThemedText>{metric.pwa_metric}</ThemedText>
                  </View>
                }
                {metric.seo_metric &&
                  <View style={styles.categoryContainer}>
                    <ThemedText style={styles.categoryTitle}>SEO</ThemedText>
                    <ThemedText>{metric.seo_metric}</ThemedText>
                  </View>
                }
              </View>
            </View>
          ))}
        </View>}
      </KeyboardAwareScrollView>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  metricId: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 16,
  },
  metricCard: {
    borderRadius: 8,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
  },
  categoriesContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  categoryContainer: {
    flex: 1,
  },
  categoryTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  button: {
  },
  buttonIcon: {
    marginRight: 8,
  },
});

export default observer(History);