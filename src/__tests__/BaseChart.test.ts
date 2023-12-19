import BaseChart from '@/components/base/Chart/BaseChart.vue'
import { mount } from '@vue/test-utils'
import { expect, describe, it } from 'vitest'

describe('BaseChart', () => {
  it('should render correctly', () => {
    const wrapper = mount(BaseChart, {
      props: {
        finalUrl: 'http://example.com'
      }
    })

    expect(wrapper.get('div[data-testid="chart"')).toBeDefined()
  })
})
