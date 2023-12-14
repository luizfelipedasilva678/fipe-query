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
  <div class="flex flex-col">
    <label :for="id"> {{ label }} </label>
    <select
      :name="name"
      :id="id"
      @change="handleChange"
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
        <option>{{ option.name }}</option>
      </template>
    </select>
  </div>
</template>
