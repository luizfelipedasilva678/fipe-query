import BaseChartSkeletonVue from '@/components/base/Chart/BaseChartSkeleton.vue'
import { VueWrapper, mount } from '@vue/test-utils'
import { describe, it, expect, beforeAll } from 'vitest'

describe('BaseDropdownSkeleton', () => {
  let wrapper: VueWrapper

  beforeAll(() => {
    wrapper = mount(BaseChartSkeletonVue)
  })

  it('should render correctly', () => {
    expect(wrapper.get('[data-testid="chart-skeleton"]')).toBeDefined()
  })
})
