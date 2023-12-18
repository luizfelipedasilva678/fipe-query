import BaseTableSkeleton from '@/components/base/BaseTableSkeleton.vue'
import { VueWrapper, mount } from '@vue/test-utils'
import { describe, it, expect, beforeAll } from 'vitest'

describe('BaseDropdownSkeleton', () => {
  let wrapper: VueWrapper<any>

  beforeAll(() => {
    wrapper = mount(BaseTableSkeleton)
  })

  it('should render correctly', () => {
    expect(wrapper.get('[data-testid="table-skeleton"]')).toBeDefined()
  })
})
