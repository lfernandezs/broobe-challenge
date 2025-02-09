import Metric from "@/entities/Metric/Metric";
import { IMetricProps } from "@/entities/Metric/Metric.types";
import MetricsStore from "@/stores/MetricsStore/MetricsStore";
import { makeAutoObservable } from "mobx";

export default class AddMetricToStore {
    private _metricsStore: MetricsStore;

    constructor(metricsStore: MetricsStore) {
        this._metricsStore = metricsStore;
        makeAutoObservable(this);
    }

    async execute(metricProps: IMetricProps): Promise<string | void> {
        try {
            const metric = new Metric({ ...metricProps, id: this._metricsStore.nextId });
            await this._metricsStore.add(metric);
            return metric.id;
        } catch (error) {
            console.error(error);
        }
    }
}