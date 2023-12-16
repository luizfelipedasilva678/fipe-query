<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { getRequestUrlFor, normalizeToOptions } from '@/utils'
  import { VEHICLES } from '@/constants'
  import BaseDropdown from '@/components/base/BaseDropdown.vue'
  import BaseDropdownSkeleton from '@/components/base/BaseDropdownSkeleton.vue'
  import BaseConditionalRender from './base/BaseConditionalRender.vue'
  import BaseTableSkeleton from './base/BaseTableSkeleton.vue'
  import useFetch from '@/composables/useFetch'
  import BaseTable from './base/BaseTable.vue'

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

  const { data: brands, isLoading: isBrandsLoading } = useFetch<Brand[]>(brandsRequestUrl)
  const { data: models, isLoading: isModelsLoading } = useFetch<Model[]>(modelsRequestUrl)
  const { data: years, isLoading: isYearsLoading } = useFetch<Year[]>(yearsRequestUrl)
  const { data: fipe, isLoading: isFipeResponseLoading } = useFetch<FipeResponse>(fipeRequestUrl)

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

    <BaseConditionalRender
      :is-loading="isBrandsLoading"
      :show-block="requestInfos.vehicle !== ''"
    >
      <template #skeleton>
        <BaseDropdownSkeleton />
      </template>
      <BaseDropdown
        :options="normalizeToOptions(brands)"
        :id="'brand'"
        :label="'Selecione a marca'"
        :name="'brand'"
        :placeholder="'Selecione uma marca'"
        @option-change="setBrand"
      />
    </BaseConditionalRender>

    <BaseConditionalRender
      :is-loading="isModelsLoading"
      :show-block="requestInfos.brand !== ''"
    >
      <template #skeleton>
        <BaseDropdownSkeleton />
      </template>
      <BaseDropdown
        :options="normalizeToOptions(models)"
        :id="'model'"
        :label="'Selecione o modelo'"
        :name="'model'"
        :placeholder="'Selecione um modelo'"
        @option-change="setModel"
      />
    </BaseConditionalRender>

    <BaseConditionalRender
      :is-loading="isYearsLoading"
      :show-block="requestInfos.model !== ''"
    >
      <template #skeleton>
        <BaseDropdownSkeleton />
      </template>
      <BaseDropdown
        :options="normalizeToOptions(years)"
        :id="'year'"
        :label="'Selecione o ano'"
        :name="'year'"
        :placeholder="'Selecione o ano'"
        @option-change="setYear"
      />
    </BaseConditionalRender>

    <BaseConditionalRender :is-loading="isFipeResponseLoading">
      <template #skeleton>
        <BaseTableSkeleton />
      </template>
      <BaseTable :data="fipe" />
    </BaseConditionalRender>
  </main>
</template>
