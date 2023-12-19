import { ref, type Ref, watch, toValue } from 'vue'

const useFetch = <T>(urlRef: Ref<string>, immediate?: boolean) => {
  let controller: AbortController | undefined = undefined
  const isLoading = ref(false)
  const data = ref<T | null>(null) as Ref<T | null>
  const error = ref<undefined | any>(undefined)

  const abort = () => {
    controller?.abort()
    controller = new AbortController()
  }

  watch(
    urlRef,
    () => {
      abort()
      data.value = null
      error.value = undefined
      isLoading.value = true
      const url = toValue(urlRef)

      if (!url) {
        isLoading.value = false
        return
      }

      fetch(url, {
        signal: controller?.signal
      })
        .then((response) => {
          if (!response.ok) throw new Error(response.statusText)

          return response.json() as T
        })
        .then((responseData) => {
          data.value = responseData
        })
        .catch((fetchError) => {
          error.value = fetchError.message || fetchError.name
        })
        .finally(() => {
          isLoading.value = false
        })
    },
    {
      immediate: !!immediate
    }
  )

  return {
    data,
    error,
    isLoading,
    abort
  }
}

export default useFetch
