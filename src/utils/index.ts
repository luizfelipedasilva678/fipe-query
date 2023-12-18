import { BASE_URL } from '@/constants'

export function getRequestUrlFor(
  requestFor: 'brands' | 'model' | 'years' | 'fipe',
  requestInfos: {
    vehicle: string
    brand: string
    model: string
    year: string
  }
) {
  const hasVehicle = requestInfos.vehicle
  const hasBrandAndVehicle = hasVehicle && requestInfos.brand
  const hasModelBrandAndVehicle = hasBrandAndVehicle && requestInfos.model
  const hasYearModelBrandAndVehicle = hasModelBrandAndVehicle && requestInfos.year

  if (hasVehicle && requestFor === 'brands') return `${BASE_URL}/${requestInfos.vehicle}/brands`

  if (hasBrandAndVehicle && requestFor === 'model')
    return `${BASE_URL}/${requestInfos.vehicle}/brands/${requestInfos.brand}/models`

  if (hasModelBrandAndVehicle && requestFor === 'years')
    return `${BASE_URL}/${requestInfos.vehicle}/brands/${requestInfos.brand}/models/${requestInfos.model}/years`

  if (hasYearModelBrandAndVehicle && requestFor === 'fipe')
    return `${BASE_URL}/${requestInfos.vehicle}/brands/${requestInfos.brand}/models/${requestInfos.model}/years/${requestInfos.year}`

  return ''
}

export function normalizeToOptions<T extends { code: string; name: string }>(
  data: T[] | null | undefined
): Option[] {
  if (!data) return []

  return data.map((option) => ({ id: option.code, name: option.name }))
}
