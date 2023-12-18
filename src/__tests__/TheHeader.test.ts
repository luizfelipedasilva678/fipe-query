import TheHeader from '@/components/TheHeader.vue'
import { mount } from '@vue/test-utils'
import { expect, describe, it } from 'vitest'

describe('The header', () => {
  it('should render correctly', () => {
    const wrapper = mount(TheHeader)

    expect(wrapper.get('p.text-2xl.text-center.text-white')).toBeDefined()
  })
})
