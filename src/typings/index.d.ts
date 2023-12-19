interface QueryData {
  code: string
  name: string
}

interface Reference {
  code: string
  month: string
}

interface Option {
  name: string
  id: number | string
}

interface FipeResponse {
  price: string
  brand: string
  model: string
  modelYear: number
  fuel: string
  codeFipe: string
  referenceMonth: string
  vehicleType: number
  fuelAcronym: string
}

interface Brand extends QueryData {}
interface Model extends QueryData {}
interface Year extends QueryData {}
