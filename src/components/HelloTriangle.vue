<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {initWebGPU,initPipeline,draw} from '../helper/webgpuhelper'

import positionVert from '../shaders/position.vert.wgsl?raw'
import redFrag from '../shaders/red.frag.wgsl?raw'
import * as triangle from '../utils/triangle'
const canvas = ref()
onMounted(async () => {
  const {device,context,format} = await initWebGPU(canvas.value)
  const {pipeline,vertexBuffer} = await initPipeline(device,format,positionVert,redFrag,triangle)
  draw(device,context,pipeline,vertexBuffer,triangle)
})


</script>

<template>
  <canvas ref="canvas"></canvas>
</template>

<style scoped></style>
../helper/webgpuhelper