import { IMetricProps } from "@/entities/Metric/Metric.types";
import fetchMetrics from "@/services/fetchMetrics";

const getMetricFromRemote = (url: string, selectedCategories: string[], selectedStrategy: string): Promise<void | IMetricProps> => {
    return fetchMetrics(url, selectedCategories, selectedStrategy)
        .then((data) => {
            return {
                id: data.id,
                url: data.lighthouseResult.requestedUrl,
                accessibility_metric: data.lighthouseResult.categories?.accessibility?.score,
                best_practices_metric: data.lighthouseResult.categories?.best_practices?.score,
                performance_metric: data.lighthouseResult.categories?.performance?.score,
                seo_metric: data.lighthouseResult.categories?.seo?.score,
                pwa_metric: data.lighthouseResult.categories?.pwa?.score,
                strategy_id: data.strategy_id,
                created_at: data.created_at,
            }
        })
        .catch((error) => console.error(error))
}

export default getMetricFromRemote;