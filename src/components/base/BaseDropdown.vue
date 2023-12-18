<script setup lang="ts">
  import { type PropType } from 'vue'

  const emit = defineEmits(['optionChange'])

  defineProps({
    options: { type: Object as PropType<Option[]>, required: true },
    name: { type: String, required: true },
    id: { type: String, required: true },
    label: { type: String, required: true },
    placeholder: { type: String, required: false }
  })

  function handleChange(e: Event) {
    emit('optionChange', (e.target as HTMLSelectElement).value)
  }
</script>

<template>
  <div
    class="flex flex-col w-full mb-4 max-w-2xl"
    data-testid="base-dropdown"
  >
    <label
      :for="id"
      class="mb-2"
    >
      {{ label }}
    </label>
    <select
      :name="name"
      :id="id"
      @change="handleChange"
      class="block cursor-pointer w-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    >
      <option
        value=""
        disabled
        selected
      >
        {{ placeholder ? placeholder : 'Selecione uma opção' }}
      </option>
      <template
        v-for="option in options"
        :key="option.id"
      >
        <option :value="option.id">{{ option.name }}</option>
      </template>
    </select>
  </div>
</template>
