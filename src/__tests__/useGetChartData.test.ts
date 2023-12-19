import useGetChartData from '@/composables/useGetChartData'
import { BASE_URL } from '@/constants'
import { it, describe, expect, vi } from 'vitest'
import { ref, toValue } from 'vue'
import { nextTwoTick } from './utils/nextTwoTick'
import { withSetup } from './utils/withSetup'

global.fetch = vi.fn().mockImplementation((argument) => {
  return Promise.resolve({
    ok: true,
    json() {
      if (argument === `${BASE_URL}/references`) {
        return Promise.resolve([
          {
            code: '304',
            month: 'dezembro/2023'
          },
          {
            code: '303',
            month: 'novembro/2023'
          },
          {
            code: '302',
            month: 'outubro/2023'
          }
        ])
      }

      return Promise.resolve([])
    }
  })
})

describe('useGetChartData', () => {
  const fetchSpy = vi.spyOn(global, 'fetch')

  it('should call fetch', async () => {
    const props = ref({ finalUrl: '' })
    withSetup(() => useGetChartData(toValue(props)))
    props.value.finalUrl = 'http://example.com'

    await nextTwoTick()

    expect(fetchSpy).toBeCalled()
  })
})
