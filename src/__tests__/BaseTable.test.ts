import BaseTableVue from '@/components/base/BaseTable.vue'
import { VueWrapper, mount } from '@vue/test-utils'
import { describe, it, expect, beforeAll } from 'vitest'

describe('BaseTable', () => {
  let wrapper: VueWrapper

  beforeAll(() => {
    wrapper = mount(BaseTableVue, {
      props: {
        data: {
          vehicleType: 1,
          price: 'R$ 102.565,00',
          brand: 'Agrale',
          model: 'MARRUÁ AM 100 2.8 CD TDI Diesel',
          modelYear: 2012,
          fuel: 'Diesel',
          codeFipe: '060004-0',
          referenceMonth: 'dezembro de 2023',
          fuelAcronym: 'D'
        }
      }
    })
  })

  it('should render correctly', () => {
    expect(wrapper.get('[data-testid="fipe-response"]')).toBeDefined()
  })

  it('should render price correctly', () => {
    expect(wrapper.findAll('td')[0].element.textContent).toBe('R$ 102.565,00')
  })

  it('should render brand correctly', () => {
    expect(wrapper.findAll('td')[1].element.textContent).toBe('Agrale')
  })

  it('should render model correctly', () => {
    expect(wrapper.findAll('td')[2].element.textContent).toBe('MARRUÁ AM 100 2.8 CD TDI Diesel')
  })

  it('should render year correctly', () => {
    expect(wrapper.findAll('td')[3].element.textContent).toBe('2012')
  })

  it('should render fuel correctly', () => {
    expect(wrapper.findAll('td')[4].element.textContent).toBe('Diesel')
  })

  it('should render fipe code correctly', () => {
    expect(wrapper.findAll('td')[5].element.textContent).toBe('060004-0')
  })
})
