<template>
  <div :id="kebabCase(exampleTitle) + `-example`">
    <div class="t-h6 mb-md" v-if="!hideTitle && exampleTitle">{{ spaceCase(exampleTitle) }}</div>
    <Markdown v-if="exampleDescription" class="mb-lg t-body1" :content="exampleDescription" />
    <ExampleCard
      :filePath="filePath"
      :stripJSDocDescription="true"
      @mounted="() => dynamicImports++"
    />
  </div>
</template>

<style lang="sass">
/** global styles */
@import 'node_modules/@planetar/styles'
</style>

<script>
import { kebabCase, spaceCase } from 'case-anything'
import { dynamicImport } from '@planetar/utils'
import { Markdown } from '@planetar/markdown'
import ExampleCard from './ExampleCard.vue'

export default {
  name: 'ExampleSection',
  components: { ExampleCard, Markdown },
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
    dynamicImport(filePath, extension, 'vue-docgen').then((vueDocgen) => {
      this.dynamicImports++
      parseDescription(vueDocgen)
    })
  },
  watch: {
    dynamicImports(count) {
      if (count > 1) this.$nextTick(() => this.$emit('mounted'))
    },
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
      dynamicImports: 0,
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
