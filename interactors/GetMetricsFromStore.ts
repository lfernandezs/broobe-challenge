import MetricsStore from "@/stores/MetricsStore/MetricsStore";
import { makeAutoObservable } from "mobx";


export default class getMetricsFromRemoteFromStore {
    private _metricsStore: MetricsStore;

    constructor(metricsStore: MetricsStore) {
        this._metricsStore = metricsStore;
        makeAutoObservable(this);
    }

    async execute() {
        return await this._metricsStore.all;
    }
}