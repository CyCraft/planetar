<template>
  <div class="planetar-api-component-example">
    <div class="t-h6 mb-lg cursor-ew-resize" @click="togglePreviewStyle">Interactive preview</div>
    <div
      v-if="exampleComponent && apiCardReady"
      class="_interactive-preview-section"
      style="width: 100%"
    >
      <component :is="exampleComponent" v-bind="propsToBind" v-model="model" />
      <div class="_bg" v-if="previewBg" :style="`background: ${previewBg}`"></div>
    </div>

    <div class="t-h6 my-lg">Info card</div>
    <div class="px-xs" style="width: 100%">
      <ApiCard
        :filePath="filePath"
        v-model="propsStringified"
        @ready="() => (apiCardReady = true)"
      />
    </div>
  </div>
</template>

<style lang="sass">
.cursor-ew-resize
  cursor: ew-resize

.planetar-api-component-example
  +flex-center
  ._interactive-preview-section
    position: relative
    +flex-center
    > *
      z-index: 2
    ._bg
      z-index: 1
      position: absolute
      border-radius: 4px
      top: -16px
      bottom: -16px
      left: 0
      right: 0
    // transform: scale(10)
</style>

<script>
import ApiCard from './ApiCard.vue'
import { dynamicImport } from '@planetar/utils'
import { evaluateObject } from '../helpers/evaluateString'

export default {
  name: 'ApiComponentExample',
  components: { ApiCard },
  props: {
    /**
     * Relative from the `src` folder.
     * @example 'examples/MyBtn/Example1.vue'
     */
    filePath: { type: String, required: true },
    /**
     * Background color for the interactive preview section
     * @example 'black'
     */
    previewBg: { type: String },
  },
  created() {
    const { filePath } = this
    const extension = filePath.split('.').slice(-1)[0]
    dynamicImport(filePath, extension, 'component').then((componentExport) => {
      this.exampleComponent = componentExport.default
    })
  },
  data() {
    return {
      exampleComponent: null,
      propsStringified: {},
      model: undefined,
      previewStyle: '',
      apiCardReady: false,
    }
  },
  watch: {
    model(newValue) {
      const newVal = JSON.stringify(newValue)
      if (this.propsStringified.value === newVal) return
      this.$set(this.propsStringified, 'value', newVal)
    },
    propsToBind({ value }) {
      this.model = value
    },
  },
  computed: {
    propsToBind() {
      const { propsStringified, previewStyle } = this
      const style = previewStyle
      const propsEvaluated = evaluateObject(propsStringified)
      return { style, ...propsEvaluated }
    },
  },
  methods: {
    togglePreviewStyle() {
      if (this.previewStyle === '') {
        this.previewStyle = 'width:100%'
      } else {
        this.previewStyle = ''
      }
    },
  },
}
</script>
