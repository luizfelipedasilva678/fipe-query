import { BASE_URL } from '@/constants'
import type { Ref } from 'vue'

export function getRequestUrlFor(
  queryFor: 'brands' | 'model' | 'years' | 'fipe',
  queryInfos: Ref<{
    vehicle: string
    brand: string
    model: string
    year: string
  }>
) {
  const hasVehicle = queryInfos.value.vehicle
  const hasBrandAndVehicle = hasVehicle && queryInfos.value.brand
  const hasModelBrandAndVehicle = hasBrandAndVehicle && queryInfos.value.model
  const hasYearModelBrandAndVehicle = hasModelBrandAndVehicle && queryInfos.value.year

  if (hasVehicle && queryFor === 'brands') return `${BASE_URL}/${queryInfos.value.vehicle}/brands`
  if (hasBrandAndVehicle && queryFor === 'model')
    return `${BASE_URL}/${queryInfos.value.vehicle}/brands/${queryInfos.value.brand}/models`
  if (hasModelBrandAndVehicle && queryFor === 'years')
    return `${BASE_URL}/${queryInfos.value.vehicle}/brands/${queryInfos.value.brand}/models/${queryInfos.value.model}/years`
  if (hasYearModelBrandAndVehicle && queryFor === 'fipe')
    return `${BASE_URL}/${queryInfos.value.vehicle}/brands/${queryInfos.value.brand}/models/${queryInfos.value.model}/years/${queryInfos.value.year}`

  return ''
}

export function normalizeToOptions<T extends { code: string; name: string }>(
  data: T[] | null | undefined
): Option[] {
  if (!data) return []

  return data.map((option) => ({ id: option.code, name: option.name }))
}
