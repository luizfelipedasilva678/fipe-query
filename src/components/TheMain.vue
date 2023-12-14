<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { BASE_URL, VEHICLES } from '@/constants/index'
  import BaseDropdown from '@/components/base/BaseDropdown.vue'
  import useFetch from '@/composables/useFetch'

  const url = computed(() => {
    if (!vehicle.value) return ''

    return `${BASE_URL}/${vehicle.value}/marcas`
  })
  const vehicle = ref('')
  const { data } = useFetch(url)

  function setBrand(option: string) {
    vehicle.value = option
  }
</script>

<template>
  <main class="flex items-center justify-center flex-col">
    {{ data }}
    <BaseDropdown
      :options="VEHICLES"
      :id="'vehicle'"
      :label="'Selecione o tipo de veículo'"
      :name="'vehicle'"
      :placeholder="'Selecione um tipo de veículo'"
      @option-change="setBrand"
    />
  </main>
</template>
