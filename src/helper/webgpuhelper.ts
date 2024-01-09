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
    alphaMode: 'opaque',
  })
  return { device, context, format }
}

/**
 * 载入渲染管线
 * @param device
 * @param format
 * @param vert
 * @param frag
 * @param geo
 * @returns
 */
async function initPipeline(device: GPUDevice, format: GPUTextureFormat, vert: string, frag: string,geo:any) {
  const descriptor: GPURenderPipelineDescriptor = {
    label: 'Basci Pipelibe',
    layout: 'auto',
    vertex: {
      module: device.createShaderModule({
        code: vert,
      }),
      entryPoint: 'main',
      buffers: [
        {
          arrayStride: 3 * 4, // 3 float32,
          attributes: [
            {
              // position xyz
              shaderLocation: 0,
              offset: 0,
              format: 'float32x3',
            },
          ],
        },
      ],
    },

    fragment: {
      module: device.createShaderModule({
        code: frag,
      }),
      entryPoint: 'main',
      targets: [
        {
          format: format,
        },
      ],
    },
    primitive: {
      topology: 'triangle-list', // try point-list, line-list, line-strip, triangle-strip?
    },
  }
  const pipeline = await device.createRenderPipelineAsync(descriptor)

  const vertexBuffer = device.createBuffer({
    label: 'GPUBuffer store vertex',
    size: geo.vertex.byteLength,
    usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
    //mappedAtCreation: true
  })
  device.queue.writeBuffer(vertexBuffer, 0, geo.vertex)
  // create color buffer

  return {pipeline, vertexBuffer}
}

function draw(device: GPUDevice, context: GPUCanvasContext, pipleline: GPURenderPipeline,vertexBuffer:GPUBuffer,geo:any) {
  const encoder = device.createCommandEncoder()
  const pass = encoder.beginRenderPass({
    colorAttachments: [
      {
        view: context.getCurrentTexture().createView(),
        loadOp: 'clear',
        clearValue: { r: 0.15, g: 0.18, b: 0.2, a: 1 },
        storeOp: 'store',
      },
    ],
  })
  pass.setPipeline(pipleline)
  pass.setVertexBuffer(0,vertexBuffer)
  pass.draw(geo.vertex)
  pass.end()

  device.queue.submit([encoder.finish()])
}

export { initWebGPU, initPipeline, draw }
