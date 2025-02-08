import fetchMetrics from "@/services/fetchMetrics"

const getMetrics = (url: string, selectedCategories: string[], selectedStrategy: string): Promise<void | { [key: string]: { score: number } }> => {
    return fetchMetrics(url, selectedCategories, selectedStrategy)
        .then((data) => {
            const metrics = data.lighthouseResult.categories
            const result = Object.fromEntries(selectedCategories.map((category) => [category, { score: 0 }]))
            console.log('result', result)
            console.log('metrics', metrics)
            for (const category in metrics) {
                console.log('category', category)
                result[category].score = metrics[category].score
            }
            return result
        })
        .catch((error) => console.error(error))
}

export default getMetrics;