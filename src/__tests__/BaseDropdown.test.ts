import BaseDropdown from '@/components/base/Dropdown/BaseDropdown.vue'
import { VueWrapper, mount } from '@vue/test-utils'
import { it, describe, beforeAll, expect } from 'vitest'

describe('BaseDropdown', () => {
  let wrapper: VueWrapper

  beforeAll(() => {
    wrapper = mount(BaseDropdown, {
      props: {
        id: 'test',
        label: 'Teste',
        name: 'test',
        options: [
          { name: 'Value 1', id: 1 },
          { name: 'Value 2', id: 2 }
        ]
      }
    })
  })

  it('should render correctly', () => {
    expect(wrapper.get('[data-testid="base-dropdown"')).toBeDefined()
  })

  it('should render label correctly', () => {
    expect(wrapper.get('label[for="test"]')).toBeDefined()
  })

  it('should render select correctly', () => {
    expect(wrapper.get('select[id="test"]')).toBeDefined()
  })

  it('should emit event correctly', () => {
    wrapper.get('select').trigger('change')

    expect(wrapper.emitted().optionChange).toBeDefined()
  })
})
