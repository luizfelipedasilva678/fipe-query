import BaseDropdownSkeleton from '@/components/base/BaseDropdownSkeleton.vue'
import { VueWrapper, mount } from '@vue/test-utils'
import { describe, it, expect, beforeAll } from 'vitest'

describe('BaseDropdownSkeleton', () => {
  let wrapper: VueWrapper<any>

  beforeAll(() => {
    wrapper = mount(BaseDropdownSkeleton)
  })

  it('should render correctly', () => {
    expect(wrapper.get('[data-testid="dropdown-skeleton"]')).toBeDefined()
  })
})
