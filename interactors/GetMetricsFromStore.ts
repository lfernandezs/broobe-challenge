import MetricsStore from "@/stores/MetricsStore/MetricsStore";
import { makeAutoObservable } from "mobx";


export default class getMetricFromRemoteFromStore {
    private _metricsStore: MetricsStore;

    constructor(metricsStore: MetricsStore) {
        this._metricsStore = metricsStore;
        makeAutoObservable(this);
    }

    execute() {
        return this._metricsStore.all;
    }
}