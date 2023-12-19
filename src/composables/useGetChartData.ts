import { BASE_URL } from '@/constants'
import { ref, toRef, watch } from 'vue'
import useFetch from './useFetch'

const useGetChartData = (props: { readonly finalUrl: string }) => {
  const { data } = useFetch<Reference[]>(toRef(`${BASE_URL}/references`), true)
  const chartData = ref<{ data: number[]; labels: string[] } | null>()
  const isLoading = ref(false)
  const error = ref<undefined | any>(undefined)

  watch(
    () => props.finalUrl,
    async () => {
      chartData.value = null
      error.value = null
      isLoading.value = false

      if (props.finalUrl === '') return

      try {
        isLoading.value = true
        const referencesMonths = data.value
          ? data.value
              .slice(0, 6)
              .sort((a, b) => Number(a.code) - Number(b.code))
              .map((reference) => fetch(`${props.finalUrl}?reference=${reference.code}`))
          : []

        const fipeResponseByMonthsReferences = await Promise.all(referencesMonths).then(
          (responses) =>
            Promise.all(responses.map((response) => response.json()) as Promise<FipeResponse>[])
        )

        chartData.value = {
          data: fipeResponseByMonthsReferences.map(
            (reference) => Number(reference.price.replace(/R\$|\.|,/g, '')) / 100
          ),
          labels: fipeResponseByMonthsReferences.map((reference) => reference.referenceMonth)
        }
      } catch (err) {
        error.value = err
      } finally {
        isLoading.value = false
      }
    }
  )

  return { chartData, isLoading, error }
}

export default useGetChartData
