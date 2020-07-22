<template>
  <div :id="kebabCase(fileName) + `-example`">
    <div class="t-h6 mb-md">{{ spaceCase(fileName) }}</div>
    <div class="mb-lg" v-if="exampleDescription" v-html="exampleDescription"></div>
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
import { mdToHtml } from '../helpers/htmlHelpers'
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
  },
  created() {
    const { parseComponent, filePath, parseDescription } = this
    const extension = filePath.split('.').slice(-1)[0]
    dynamicImport(filePath, extension, 'vue-docgen').then(parseDescription)
  },
  data() {
    const { filePath } = this
    const fileName = filePath
      .split('/')
      .slice(-1)[0]
      .replace('.vue', '')
      .replace('.jsx', '')
      .replace('.tsx', '')
    return {
      fileName,
      exampleDescription: '',
    }
  },
  computed: {},
  methods: {
    kebabCase,
    spaceCase,
    parseDescription(vueDocgen) {
      const { description: descriptionMd } = vueDocgen
      const descriptionHtml = mdToHtml(descriptionMd)
      this.exampleDescription = descriptionHtml
    },
  },
}
</script>
