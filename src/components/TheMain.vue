<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { getRequestUrlFor, normalizeToOptions } from '@/utils'
  import { VEHICLES } from '@/constants'
  import BaseDropdown from '@/components/base/BaseDropdown.vue'
  import useFetch from '@/composables/useFetch'

  const requestInfos = ref({
    vehicle: '',
    brand: '',
    model: '',
    year: ''
  })

  const brandsRequestUrl = computed(() => getRequestUrlFor('brands', requestInfos))
  const modelsRequestUrl = computed(() => getRequestUrlFor('model', requestInfos))
  const yearsRequestUrl = computed(() => getRequestUrlFor('years', requestInfos))
  const fipeRequestUrl = computed(() => getRequestUrlFor('fipe', requestInfos))

  const { data: brands } = useFetch<Brand[]>(brandsRequestUrl)
  const { data: models } = useFetch<Model[]>(modelsRequestUrl)
  const { data: years } = useFetch<Year[]>(yearsRequestUrl)
  const { data: fipe } = useFetch<FipeResponse>(fipeRequestUrl)

  function setVehicle(selectedVehicle: string) {
    if (requestInfos.value.vehicle !== '') {
      requestInfos.value.brand = ''
      requestInfos.value.model = ''
      requestInfos.value.year = ''
    }

    requestInfos.value.vehicle = selectedVehicle
  }

  function setBrand(selectedBrand: string) {
    if (requestInfos.value.brand !== '') {
      requestInfos.value.model = ''
      requestInfos.value.year = ''
    }

    requestInfos.value.brand = selectedBrand
  }

  function setModel(selectedModel: string) {
    if (requestInfos.value.model !== '') {
      requestInfos.value.year = ''
    }

    requestInfos.value.model = selectedModel
  }

  function setYear(selectedYear: string) {
    requestInfos.value.year = selectedYear
  }
</script>

<template>
  <main class="flex items-center justify-center flex-col max-w-7xl ml-auto mr-auto mt-4 p-2">
    <BaseDropdown
      :options="VEHICLES"
      :id="'vehicle'"
      :label="'Selecione o tipo de veículo'"
      :name="'vehicle'"
      :placeholder="'Selecione um tipo de veículo'"
      @option-change="setVehicle"
    />

    <template v-if="requestInfos.vehicle !== ''">
      <BaseDropdown
        :options="normalizeToOptions(brands)"
        :id="'brand'"
        :label="'Selecione a marca'"
        :name="'brand'"
        :placeholder="'Selecione uma marca'"
        @option-change="setBrand"
      />
    </template>

    <template v-if="requestInfos.brand !== ''">
      <BaseDropdown
        :options="normalizeToOptions(models)"
        :id="'model'"
        :label="'Selecione o modelo'"
        :name="'model'"
        :placeholder="'Selecione um modelo'"
        @option-change="setModel"
      />
    </template>

    <template v-if="requestInfos.model !== ''">
      <BaseDropdown
        :options="normalizeToOptions(years)"
        :id="'year'"
        :label="'Selecione o ano'"
        :name="'year'"
        :placeholder="'Selecione o ano'"
        @option-change="setYear"
      />
    </template>
  </main>
</template>
