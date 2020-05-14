<template>
  <div class="planetar-api-component-example column flex-center">
    <template v-if="exampleComponent && apiCardReady">
      <div class="t-h6 mb-lg" @click="togglePreviewStyle">Interactive preview</div>
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

<script>
import ApiCard from './ApiCard.vue'
import { evaluateObject } from '../helpers/evaluateString'

function dynamicImportComponent (filePath, extension) {
  if (extension === 'vue') {
    return import(
      /* webpackChunkName: "component" */
      /* webpackMode: "lazy-once" */
      `src/${filePath.replace('.vue', '')}.vue`
    )
  }
  if (extension === 'jsx') {
    return import(
      /* webpackChunkName: "component" */
      /* webpackMode: "lazy-once" */
      `src/${filePath.replace('.jsx', '')}.jsx`
    )
  }
  if (extension === 'tsx') {
    return import(
      /* webpackChunkName: "component" */
      /* webpackMode: "lazy-once" */
      `src/${filePath.replace('.tsx', '')}.tsx`
    )
  }
  throw new Error('incorrect filePath. Your filepath must end in .vue, .jsx or .tsx')
}

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
    const extensions = ['.vue', '.jsx', '.tsx']
    if (extensions.every(ext => !filePath.includes(ext))) return
    const extension = filePath.split('.').slice(-1)[0]
    dynamicImportComponent(filePath, extension).then(componentExport => {
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
