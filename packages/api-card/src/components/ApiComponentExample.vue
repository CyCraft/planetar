<template>
  <div class="planetar-api-component-example column flex-center">
    <template v-if="exampleComponent && apiCardReady">
      <div class="t-h6 mb-lg cursor-ew-resize" @click="togglePreviewStyle">Interactive preview</div>
      <component :is="exampleComponent" v-bind="propsToBind" v-model="model" />
    </template>
    <div class="t-h6 my-lg">Info card</div>
    <ApiCard
      :filePath="filePath"
      v-model="propsStringified"
      @ready="() => (apiCardReady = true)"
      style="width: 100%"
    />
  </div>
</template>

<style lang="sass">
.cursor-ew-resize
  cursor: ew-resize
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
  },
  created () {
    const { filePath } = this
    const extension = filePath.split('.').slice(-1)[0]
    dynamicImport(filePath, extension, 'component').then(componentExport => {
      this.exampleComponent = componentExport.default
    })
  },
  data () {
    return {
      exampleComponent: null,
      propsStringified: {},
      model: undefined,
      previewStyle: '',
      apiCardReady: false,
    }
  },
  watch: {
    model (newValue) {
      const newVal = JSON.stringify(newValue)
      if (this.propsStringified.value === newVal) return
      this.$set(this.propsStringified, 'value', newVal)
    },
    propsToBind ({ value }) {
      this.model = value
    },
  },
  computed: {
    propsToBind () {
      const { propsStringified, previewStyle } = this
      const style = previewStyle
      const propsEvaluated = evaluateObject(propsStringified)
      return { style, ...propsEvaluated }
    },
  },
  methods: {
    togglePreviewStyle () {
      if (this.previewStyle === '') {
        this.previewStyle = 'width:100%'
      } else {
        this.previewStyle = ''
      }
    },
  },
}
</script>
