async function initWebGPU(canvas: HTMLCanvasElement) {
  if (!navigator.gpu) {
    throw new Error('WebGPU is not supported')
  }

  const adapter = await navigator.gpu.requestAdapter()

  const device = await adapter?.requestDevice()

  if (!device) throw new Error('device not found')

  const context = canvas.getContext('webgpu')
  if (!context) throw new Error()

  const format = navigator.gpu.getPreferredCanvasFormat()
  context.configure({
    device,
    format,
  })
  return {device,context}
}

function draw(device: GPUDevice,context:GPUCanvasContext) {
  const encoder = device.createCommandEncoder()

  const pass = encoder.beginRenderPass({
    colorAttachments: [
      {
        view: context.getCurrentTexture().createView(),
        loadOp: 'clear',
        clearValue: { r: 0.4, g: 0.4, b: 0.4, a: 1 }, 
        storeOp: 'store',
      },
    ],
  })
  pass.end()

  device.queue.submit([encoder.finish()]);
}

export { initWebGPU,draw }
