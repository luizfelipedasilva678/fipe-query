import useFetch from '@/composables/useFetch'
import { expect, describe, it, vi, type MockInstance, beforeEach } from 'vitest'
import { ref, nextTick, toValue } from 'vue'
import { withSetup } from './utils/withSetup'
import { nextTwoTick } from './utils/nextTwoTick'

global.fetch = vi.fn().mockImplementation(() =>
  Promise.resolve({
    ok: true,
    json() {
      return Promise.resolve({
        test: 1
      })
    }
  })
)

describe('useFetch', () => {
  let fetchSpy: MockInstance = undefined as any
  let abortController: AbortController = undefined as any
  const URL = 'https://example.com?text'

  beforeEach(() => {
    fetchSpy = vi.spyOn(global, 'fetch')
    abortController = new AbortController()
  })

  it('should call fetch', async () => {
    const url = ref('')
    useFetch(url)
    url.value = URL

    await nextTick()

    expect(fetchSpy).toHaveBeenCalledTimes(1)
  })

  it('should call fetch  with correct url and abortController signal', async () => {
    const url = ref('')
    useFetch(url)
    url.value = URL

    await nextTick()

    expect(fetchSpy).toBeCalledWith(URL, {
      signal: abortController.signal
    })
  })

  it('should not call fetch', async () => {
    const url = ref('')
    useFetch(url)

    await nextTick()

    expect(fetchSpy).toHaveBeenCalledTimes(0)
  })

  it('should return data correctly', async () => {
    const url = ref('')
    const [{ data }] = withSetup(() => useFetch(url))
    url.value = URL

    await nextTwoTick()

    expect(toValue(data)).toEqual({ test: 1 })
  })

  it('should return isLoading value correctly', async () => {
    const url = ref('')
    const [{ isLoading }] = withSetup(() => useFetch(url))
    url.value = URL

    await nextTwoTick()

    expect(isLoading.value).toBe(false)
  })
})
