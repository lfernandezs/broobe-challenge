export interface IMetricProps {
    id: string
    url: string
    accessibility_metric: categoryMetric
    pwa_metric: categoryMetric
    performance_metric: categoryMetric
    seo_metric: categoryMetric
    best_practices_metric: categoryMetric
    strategy_id: string
    created_at: Date
    updated_at: Date
}

export interface categoryMetric {
    score: number
}