import Metric from "@/entities/Metric/Metric";
import { Storage } from "./MetricsStore.types";
import { IMetricProps } from "@/entities/Metric/Metric.types";
import { makeAutoObservable } from "mobx";

export default class MetricsStore {
    _storage: Storage;
    _metrics_ids: string[];
    _currentMetric: Metric | null;

    constructor(rootStore: Storage) {
        this._storage = rootStore;
        this._metrics_ids = [];
        this._currentMetric = null;
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

    get all() {
        return this._metrics_ids.map(id => this._fetch(id));
    }

    get current() {
        return this._currentMetric;
    }

    async find(id: string) {
        if (this._currentMetric && this._currentMetric.id === id) {
            return this._currentMetric;
        }
        else {
            this._currentMetric = await this._fetch(id);
            return this._currentMetric;
        }
    }

    async add(metric: Metric) {
        this._metrics_ids.push(metric.id);
        await this._storage.setItem(metric.id, JSON.stringify(metric.serialize()));
        await this._storage.setItem('metrics_ids', JSON.stringify(this._metrics_ids));
        this._currentMetric = metric
    }
}