import { IMetricProps } from "./Metric.types";

export default class Metric {
    _id: IMetricProps['id'];
    _url: IMetricProps['url'];
    _accessibility_metric: IMetricProps['accessibility_metric'];
    _best_practices_metric: IMetricProps['best_practices_metric'];
    _performance_metric: IMetricProps['performance_metric'];
    _seo_metric: IMetricProps['seo_metric'];
    _pwa_metric: IMetricProps['pwa_metric'];
    _strategy_id: IMetricProps['strategy_id'];
    _created_at: IMetricProps['created_at'];

    constructor(data: IMetricProps) {
        this._id = data.id;
        this._url = data.url;
        this._accessibility_metric = data?.accessibility_metric;
        this._best_practices_metric = data?.best_practices_metric;
        this._performance_metric = data?.performance_metric;
        this._seo_metric = data?.seo_metric;
        this._pwa_metric = data?.pwa_metric;
        this._strategy_id = data?.strategy_id;
        this._created_at = data?.created_at;
    }

    get id() {
        return this._id;
    }

    get url() {
        return this._url;
    }

    get accessibility_metric() {
        return this._accessibility_metric;
    }

    get best_practices_metric() {
        return this._best_practices_metric;
    }

    get performance_metric() {
        return this._performance_metric;
    }

    get seo_metric() {
        return this._seo_metric;
    }

    get pwa_metric() {
        return this._pwa_metric;
    }

    get strategy_id() {
        return this._strategy_id;
    }

    get created_at() {
        return this._created_at;
    }

    serialize() {
        return {
            id: this.id,
            url: this.url,
            accessibility_metric: this.accessibility_metric,
            best_practices_metric: this.best_practices_metric,
            performance_metric: this.performance_metric,
            seo_metric: this.seo_metric,
            pwa_metric: this.pwa_metric,
            strategy_id: this.strategy_id,
            created_at: this.created_at
        }
    }
}