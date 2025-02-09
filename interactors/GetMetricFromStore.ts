import MetricsStore from "@/stores/MetricsStore/MetricsStore";
import { makeAutoObservable } from "mobx";


export default class getMetricFromRemoteFromStore {
    private _metricsStore: MetricsStore;

    constructor(metricsStore: MetricsStore) {
        this._metricsStore = metricsStore;
        makeAutoObservable(this);
    }

    execute(metric_id: string) {
        return this._metricsStore.find(metric_id);
    }
}