<script setup lang="ts">
  import { ref, watch } from 'vue'
  import useGetChartData from '@/composables/useGetChartData'
  import Chart from 'chart.js/auto'
  import BaseChartSkeleton from '@/components/base/Chart/BaseChartSkeleton.vue'

  const props = defineProps({
    finalUrl: { type: String, required: true, default: null }
  })

  let chart: Chart | undefined = undefined
  const { chartData, error, isLoading } = useGetChartData(props)
  const canvas = ref<null | HTMLCanvasElement>(null)

  watch([() => canvas.value, () => chartData.value], () => {
    if (canvas.value && chartData.value) {
      if (chart) chart.destroy()

      chart = new Chart(canvas.value, {
        type: 'line',
        options: {
          responsive: true
        },
        data: {
          labels: chartData.value.labels,
          datasets: [
            {
              label: 'Variação dos preços nos 6 últimos meses',
              data: chartData.value.data,
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1
            }
          ]
        }
      })
    }
  })
</script>

<template>
  <template v-if="isLoading">
    <BaseChartSkeleton />
  </template>

  <div
    v-show="chartData && !error"
    class="w-full max-w-2xl mt-4 mb-4"
    data-testid="chart"
  >
    <canvas
      ref="canvas"
      id="price-variations"
    ></canvas>
  </div>
</template>
