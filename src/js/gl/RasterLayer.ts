import * as regl from 'regl'
import RasterView from '@app/gl/RasterView'
import RootStore from '@app/models/RootStore'
import constants from '@app/constants'

class RasterLayer {
  canvas: HTMLCanvasElement
  ctx: any
  rasterView: RasterView
  rootStore: RootStore
  rasterTexture: any

  constructor ({
    canvas,
    rootStore,
  }: {
    canvas: HTMLCanvasElement,
    rootStore?: RootStore
  }) {
    this.canvas = canvas
    this.rootStore = rootStore

    this.ctx = regl({
      canvas: this.canvas,
      optionalExtensions: [
        'OES_texture_float',
        'webgl_color_buffer_float',
      ],
      attributes: { alpha: false },
    })

    this.rasterTexture = this.ctx.texture({
      ...(constants.DATA_TEXTURE_OPTIONS),
      radius: constants.DATA_TEXTURE_SIZE,
    })

    this.rootStore.rasterSubimages.forEach(({ width, height, data, x, y }) => {
      this.rasterTexture.subimage({ width, height, data }, x, y)
    })

    this.rasterView = new RasterView({
      rootStore,
      rasterLayer: this,
    })
  }
}

export default RasterLayer
