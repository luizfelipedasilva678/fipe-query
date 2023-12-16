import { BASE_URL } from '@/constants'
import type { Ref } from 'vue'

export function getRequestUrlFor(
  requestFor: 'brands' | 'model' | 'years' | 'fipe',
  requestInfos: Ref<{
    vehicle: string
    brand: string
    model: string
    year: string
  }>
) {
  const hasVehicle = requestInfos.value.vehicle
  const hasBrandAndVehicle = hasVehicle && requestInfos.value.brand
  const hasModelBrandAndVehicle = hasBrandAndVehicle && requestInfos.value.model
  const hasYearModelBrandAndVehicle = hasModelBrandAndVehicle && requestInfos.value.year

  if (hasVehicle && requestFor === 'brands')
    return `${BASE_URL}/${requestInfos.value.vehicle}/brands`

  if (hasBrandAndVehicle && requestFor === 'model')
    return `${BASE_URL}/${requestInfos.value.vehicle}/brands/${requestInfos.value.brand}/models`

  if (hasModelBrandAndVehicle && requestFor === 'years')
    return `${BASE_URL}/${requestInfos.value.vehicle}/brands/${requestInfos.value.brand}/models/${requestInfos.value.model}/years`

  if (hasYearModelBrandAndVehicle && requestFor === 'fipe')
    return `${BASE_URL}/${requestInfos.value.vehicle}/brands/${requestInfos.value.brand}/models/${requestInfos.value.model}/years/${requestInfos.value.year}`

  return ''
}

export function normalizeToOptions<T extends { code: string; name: string }>(
  data: T[] | null | undefined
): Option[] {
  if (!data) return []

  return data.map((option) => ({ id: option.code, name: option.name }))
}
