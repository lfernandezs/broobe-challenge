import Metric from "@/entities/Metric/Metric";
import { Storage } from "./MetricsStore.types";
import { IMetricProps } from "@/entities/Metric/Metric.types";
import { makeAutoObservable } from "mobx";

export default class MetricsStore {
    _storage: Storage;
    _metrics_ids: string[];

    constructor(rootStore: Storage) {
        this._storage = rootStore;
        this._metrics_ids = [];
        makeAutoObservable(this);

        this._init();
    }

    async _init() {
        const keys = await this._storage.getItem('metrics_ids');
        if (keys) {
            this._metrics_ids = JSON.parse(keys);
        }
    }

    async _fetch(id: string) {
        const jsonValue = await this._storage.getItem(id);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    }

    get metrics() {
        return this._metrics_ids;
    }

    get all() {
        return Promise.all(this.metrics.map(async (id) => {
            return await this.find(id);
        }));
    }

    get nextId() {
        return (this.metrics.length + 1).toString();
    }

    async find(id: string) {
        try {
            return await this._fetch(id);
        } catch (e) {
            console.error(e);
        }
    }

    async add(metric: Metric) {
        const metric_id = (this.metrics.length + 1).toString();
        this._metrics_ids = [...this._metrics_ids, metric_id];
        try {
            await this._storage.setItem(metric_id, JSON.stringify(metric.serialize()));
            await this._storage.setItem('metrics_ids', JSON.stringify(this._metrics_ids));
        } catch (e) {
            console.error(e);
        }
    }

    async delete(id: string) {
        this._metrics_ids = [...this._metrics_ids.filter((metric_id) => metric_id !== id)];
        try {
            await this._storage.removeItem(id);
            await this._storage.setItem('metrics_ids', JSON.stringify(this._metrics_ids));
        } catch (e) {
            console.error(e);
        }
    }
}