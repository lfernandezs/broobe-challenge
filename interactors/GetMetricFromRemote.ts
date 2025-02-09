import Metric from "@/entities/Metric/Metric";
import fetchMetrics from "@/services/fetchMetrics";

const getMetricFromRemote = (url: string, selectedCategories: string[], selectedStrategy: string): Promise<void | Metric> => {
    return fetchMetrics(url, selectedCategories, selectedStrategy)
        .then((data) => {
            const metric = new Metric(data);
            return metric;
        })
        .catch((error) => console.error(error))
}

export default getMetricFromRemote;