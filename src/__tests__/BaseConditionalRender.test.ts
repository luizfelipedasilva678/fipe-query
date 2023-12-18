import BaseConditionalRenderVue from '@/components/base/BaseConditionalRender.vue'
import { mount } from '@vue/test-utils'
import { it, describe, expect } from 'vitest'

const Loading = {
  template: `
        <p data-testid="loading">Loading...</p>
    `
}

const Default = {
  template: `
          <p data-testid="loaded">Loaded</p>
      `
}

describe('BaseConditionalRender', () => {
  it('should show skeleton', () => {
    const wrapper = mount(BaseConditionalRenderVue, {
      props: {
        isLoading: true,
        showBlock: true
      },
      slots: {
        skeleton: Loading,
        default: Default
      }
    })

    expect(wrapper.get('p[data-testid="loading"]')).toBeDefined()
  })

  it('should show loaded content', () => {
    const wrapper = mount(BaseConditionalRenderVue, {
      props: {
        isLoading: false,
        showBlock: true
      },
      slots: {
        skeleton: Loading,
        default: Default
      }
    })

    expect(wrapper.get('p[data-testid="loaded"]')).toBeDefined()
  })
})
