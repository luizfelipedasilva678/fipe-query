<script lang="ts" setup>
  defineProps({
    isLoading: { type: Boolean, required: true },
    showBlock: { type: Boolean, required: false, default: true }
  })
</script>

<template>
  <template v-if="showBlock">
    <template v-if="isLoading">
      <slot name="skeleton"></slot>
    </template>
    <template v-else>
      <slot></slot>
    </template>
  </template>
</template>
