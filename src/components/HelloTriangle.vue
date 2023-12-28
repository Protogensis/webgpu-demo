<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {initWebGPU,draw} from '../utils/webgpuhelper'
const canvas = ref()
onMounted(async () => {
  const {device,context} = await initWebGPU(canvas.value)
  draw(device,context)
})


</script>

<template>
  <canvas ref="canvas"></canvas>
</template>

<style scoped></style>
