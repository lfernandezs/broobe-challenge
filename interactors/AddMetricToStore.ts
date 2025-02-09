import Metric from "@/entities/Metric/Metric";
import MetricsStore from "@/stores/MetricsStore/MetricsStore";
import { makeAutoObservable } from "mobx";

export default class AddMetricToStore {
    private _metricsStore: MetricsStore;

    constructor(metricsStore: MetricsStore) {
        this._metricsStore = metricsStore;
        makeAutoObservable(this);
    }

    async execute(metric: Metric): Promise<string> {
        await this._metricsStore.add(metric);
        return metric.id;
    }
}