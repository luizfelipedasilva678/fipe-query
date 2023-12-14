<script setup lang="ts">
  import { type PropType } from 'vue'

  const emit = defineEmits(['setSelectedOption'])

  defineProps({
    options: { type: Object as PropType<Option[]>, required: true },
    name: { type: String, required: true },
    id: { type: String, required: true },
    label: { type: String, required: true }
  })

  function handleChange(e: Event) {
    emit('setSelectedOption', (e.target as HTMLSelectElement).value)
  }
</script>

<template>
  <div class="flex flex-col">
    <label :for="id"> {{ label }} </label>
    <select
      :name="name"
      :id="id"
      @change="handleChange"
    >
      <template
        v-for="option in options"
        :key="option.id"
      >
        <option>{{ option.name }}</option>
      </template>
    </select>
  </div>
</template>
