<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { getRequestUrlFor, normalizeToOptions } from '@/utils'
  import { VEHICLES } from '@/constants'
  import BaseDropdown from '@/components/base/BaseDropdown.vue'
  import useFetch from '@/composables/useFetch'

  const queryInfos = ref({
    vehicle: '',
    brand: '',
    model: '',
    year: ''
  })

  const brandsRequestUrl = computed(() => getRequestUrlFor('brands', queryInfos))
  const modelsRequestUrl = computed(() => getRequestUrlFor('model', queryInfos))
  const yearsRequestUrl = computed(() => getRequestUrlFor('years', queryInfos))
  const fipeRequestUrl = computed(() => getRequestUrlFor('fipe', queryInfos))

  const { data: brands } = useFetch<Brand[]>(brandsRequestUrl)
  const { data: models } = useFetch<Model[]>(modelsRequestUrl)
  const { data: years } = useFetch<Year[]>(yearsRequestUrl)
  const { data: fipe } = useFetch<FipeResponse>(fipeRequestUrl)

  function setVehicle(selectedVehicle: string) {
    queryInfos.value.vehicle = selectedVehicle
  }

  function setBrand(selectedBrand: string) {
    queryInfos.value.brand = selectedBrand
  }

  function setModel(selectedModel: string) {
    queryInfos.value.model = selectedModel
  }

  function setYear(selectedYear: string) {
    queryInfos.value.year = selectedYear
  }
</script>

<template>
  <main class="flex items-center justify-center flex-col">
    {{ fipe }}

    <BaseDropdown
      :options="VEHICLES"
      :id="'vehicle'"
      :label="'Selecione o tipo de veículo'"
      :name="'vehicle'"
      :placeholder="'Selecione um tipo de veículo'"
      @option-change="setVehicle"
    />

    <template v-if="queryInfos.vehicle !== ''">
      <BaseDropdown
        :options="normalizeToOptions(brands)"
        :id="'brand'"
        :label="'Selecione a marca'"
        :name="'brand'"
        :placeholder="'Selecione uma marca'"
        @option-change="setBrand"
      />
    </template>

    <template v-if="queryInfos.brand !== ''">
      <BaseDropdown
        :options="normalizeToOptions(models)"
        :id="'model'"
        :label="'Selecione o modelo'"
        :name="'model'"
        :placeholder="'Selecione um modelo'"
        @option-change="setModel"
      />
    </template>

    <template v-if="queryInfos.model !== ''">
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
