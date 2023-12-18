import { getRequestUrlFor, normalizeToOptions } from '@/utils'
import { expect, it, describe } from 'vitest'
import { BASE_URL } from '@/constants/index'

describe('getRequestUrlFor', () => {
  const options = {
    vehicle: '',
    brand: '',
    model: '',
    year: ''
  }

  it('should return a empty string', () => {
    expect(getRequestUrlFor('brands', options)).toBe('')
  })

  it('should return brands url', () => {
    options.vehicle = 'cars'

    expect(getRequestUrlFor('brands', options)).toBe(`${BASE_URL}/${options.vehicle}/brands`)
  })

  it('should return models url', () => {
    options.brand = '22'

    expect(getRequestUrlFor('model', options)).toBe(
      `${BASE_URL}/${options.vehicle}/brands/${options.brand}/models`
    )
  })

  it('should return years url', () => {
    options.model = '655'

    expect(getRequestUrlFor('years', options)).toBe(
      `${BASE_URL}/${options.vehicle}/brands/${options.brand}/models/${options.model}/years`
    )
  })

  it('should return fipe url', () => {
    options.year = '1995-1'

    expect(getRequestUrlFor('fipe', options)).toBe(
      `${BASE_URL}/${options.vehicle}/brands/${options.brand}/models/${options.model}/years/${options.year}`
    )
  })
})

describe('normalizeToOptions', () => {
  it('should return an array of options', () => {
    const desnomalizedOptions = [
      {
        code: '1',
        name: 'Value 1'
      },
      {
        code: '2',
        name: 'Value 2'
      },
      {
        code: '3',
        name: 'Value 3'
      }
    ]

    expect(normalizeToOptions(desnomalizedOptions)).toEqual([
      {
        id: '1',
        name: 'Value 1'
      },
      {
        id: '2',
        name: 'Value 2'
      },
      {
        id: '3',
        name: 'Value 3'
      }
    ])
  })
})
