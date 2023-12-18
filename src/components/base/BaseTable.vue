<script setup lang="ts">
  import { type PropType } from 'vue'

  defineProps({
    data: { type: Object as PropType<FipeResponse | null>, required: true }
  })
</script>

<template>
  <table
    v-if="data"
    class="w-full max-w-2xl dark:bg-gray-700 rounded-b-lg p-2"
    data-testid="fipe-response"
  >
    <caption class="text-center text-white dark:bg-gray-700 rounded-t-lg px-2.5 text-lg">
      Dados retornados da sua consulta
    </caption>
    <tr class="border-solid border-b-2 border-white">
      <th class="text-left p-2 text-white">Preço</th>
      <td class="text-right p-2 text-white">{{ data.price }}</td>
    </tr>
    <tr class="border-solid border-b-2 border-white">
      <th class="text-left p-2 text-white">Marca</th>
      <td class="text-right p-2 text-white">{{ data.brand }}</td>
    </tr>
    <tr class="border-solid border-b-2 border-white">
      <th class="text-left p-2 text-white">Modelo</th>
      <td class="text-right p-2 text-white">{{ data.model }}</td>
    </tr>
    <tr class="border-solid border-b-2 border-white">
      <th class="text-left p-2 text-white">Ano do modelo</th>
      <td class="text-right p-2 text-white">{{ data.modelYear }}</td>
    </tr>
    <tr class="border-solid border-b-2 border-white">
      <th class="text-left p-2 text-white">Tipo de combustível</th>
      <td class="text-right p-2 text-white">{{ data.fuel }}</td>
    </tr>
    <tr>
      <th class="text-left p-2 text-white">Código Fipe</th>
      <td class="text-right p-2 text-white">{{ data.codeFipe }}</td>
    </tr>
  </table>
</template>
