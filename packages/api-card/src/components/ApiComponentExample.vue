<template>
  <div class="planetar-api-component-example">
    <div class="text-h6 mb-lg _interactive-preview-title" @click="togglePreviewStyle">
      Interactive preview
    </div>
    <div
      v-if="exampleComponent && apiCardMounted"
      class="_interactive-preview-section"
      style="width: 100%"
    >
      <component :is="exampleComponent" v-bind="propsToBind" v-model="model" />
      <div class="_bg" v-if="previewBg" :style="`background: ${previewBg}`"></div>
    </div>

    <div class="text-h6 my-lg">Info card</div>
    <div class="px-xs" style="width: 100%">
      <ApiCard :filePath="filePath" v-model="propsStringified" @mounted="onApiCardMounted" />
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import '@planetar/styles/variables'

.planetar-api-component-example
  +flex-center()
  ._interactive-preview-section
    position: relative
    +flex-center()
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
  ._interactive-preview-title
    cursor: ew-resize
  ._interactive-preview-title:hover + ._interactive-preview-section > *:first-child
    position: relative
  ._interactive-preview-title:hover + ._interactive-preview-section > *:first-child::after
    content: ''
    position: absolute
    top: -10px
    bottom: -10px
    left: -10px
    right: -10px
    +C(border, stone-dark, 3px dashed)
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
      apiCardMounted: false,
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
    onApiCardMounted() {
      this.apiCardMounted = true
      this.$emit('mounted')
    },
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
