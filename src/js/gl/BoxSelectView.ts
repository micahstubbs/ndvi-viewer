import * as REGL from 'regl'
import { mat4 } from 'gl-matrix'
import RootStore from '@app/models/RootStore'

import vert from '@app/gl/shaders/outlineVert'
import frag from '@app/gl/shaders/outlineFrag'

interface IUniforms {
  selectedColor: number[]
  unselectedColor: number[]
  model: REGL.Mat4
  view: REGL.Mat4
  projection: REGL.Mat4
  scale: number
  selectedBBoxLngLat: number[]
}

interface IAttributes {
  position: number[]
}

interface IProps {
  view: REGL.Mat4
  projection: REGL.Mat4
  scale: number
  vertices: number[][]
  linesLength: number
  selectedBBoxLngLat: number[]
}

class BoxSelectView {
  renderer: any
  ctx: REGL.Regl
  rootStore: RootStore

  constructor ({
    ctx,
    rootStore,
  }: {
    ctx: REGL.Regl,
    rootStore?: RootStore,
  }) {
    this.ctx = ctx
    this.rootStore = rootStore

    this.renderer = ctx<IUniforms, IAttributes, IProps>({
      frag: frag(),
      vert: vert(),
      attributes: {
        position: ctx.prop<IProps, 'vertices'>('vertices'),
      },
      uniforms: {
        selectedColor: [1, 1, 1, 1],
        unselectedColor: [1, 1, 1, 1],
        model: mat4.fromTranslation([], [0, 0, 0]),
        view: ctx.prop<IProps, 'view'>('view'),
        projection: ctx.prop<IProps, 'projection'>('projection'),
        scale: ctx.prop<IProps, 'scale'>('scale'),
        selectedBBoxLngLat: ctx.prop<IProps, 'selectedBBoxLngLat'>('selectedBBoxLngLat'),
      },
      depth: {
        enable: false,
      },
      count: ctx.prop<IProps, 'linesLength'>('linesLength'),
      primitive: 'lines',
    })
  }

  render () {
    this.renderer({
      ...(this.rootStore.camera.renderInfo),
      vertices: this.rootStore.selectedBox.outline,
      linesLength: this.rootStore.selectedBox.outline.length,
      selectedBBoxLngLat: this.rootStore.selectedBox.array,
    })
  }
}

export default BoxSelectView
