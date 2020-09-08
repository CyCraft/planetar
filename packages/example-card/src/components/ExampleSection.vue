<template>
  <div :id="kebabCase(exampleTitle) + `-example`">
    <div class="t-h6 mb-md" v-if="!hideTitle">{{ spaceCase(exampleTitle) }}</div>
    <Markdown :exampleDescription="exampleDescription" />
    <ExampleCard :filePath="filePath" :stripJSDocDescription="true" />
  </div>
</template>

<style lang="sass">
/** global styles */
@import '@planetar/styles'
</style>

<script>
import { kebabCase, spaceCase } from 'case-anything'
import ExampleCard from './ExampleCard.vue'
import { dynamicImport } from '@planetar/utils'

export default {
  name: 'ExampleSection',
  components: { ExampleCard },
  props: {
    /**
     * Relative from the `src` folder.
     * @example 'examples/MyBtn/Example1.vue'
     */
    filePath: { type: String, required: true },
    /**
     * By default the filename is shown as title above the example. Can be overwritten with the title prop.
     */
    title: { type: String },
    /**
     * By default a title is shown above the example. Can be hidden with hideTitle.
     */
    hideTitle: { type: Boolean },
  },
  created() {
    const { parseComponent, filePath, parseDescription } = this
    const extension = filePath.split('.').slice(-1)[0]
    dynamicImport(filePath, extension, 'vue-docgen').then(parseDescription)
  },
  data() {
    const { filePath, title } = this
    const fileName = filePath
      .split('/')
      .slice(-1)[0]
      .replace('.vue', '')
      .replace('.jsx', '')
      .replace('.tsx', '')
    const exampleTitle = title || fileName
    return {
      exampleTitle,
      exampleDescription: '',
    }
  },
  computed: {},
  methods: {
    kebabCase,
    spaceCase,
    parseDescription(vueDocgen) {
      const { description: descriptionMd } = vueDocgen
      this.exampleDescription = descriptionMd
    },
  },
}
</script>
