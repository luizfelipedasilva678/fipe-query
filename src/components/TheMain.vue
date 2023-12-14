<script setup lang="ts">
  import { ref } from 'vue'
  import { VEHICLES } from '@/constants/index'
  import BaseDropdown from '@/components/base/BaseDropdown.vue'

  const brand = ref('')

  function setBrand(option: Option) {
    brand.value = option.name
  }
</script>

<template>
  <main class="flex items-center justify-center flex-col">
    <BaseDropdown
      :options="VEHICLES"
      :id="'vehicle'"
      :label="'Selecione o tipo de veículo'"
      :name="'vehicle'"
      @set-selected-option="setBrand"
    />
  </main>
</template>
