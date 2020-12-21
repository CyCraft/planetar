<template>
  <div :id="kebabCase(exampleTitle) + `-example`">
    <div class="text-h6 mb-md" v-if="!hideTitle && exampleTitle">{{ spaceCase(exampleTitle) }}</div>
    <Markdown v-if="exampleDescription" class="mb-lg t-body1" :content="exampleDescription" />
    <ExampleCard
      :filePath="filePath"
      :stripJSDocDescription="true"
      :iframe="iframe"
      :iframeHeight="iframeHeight"
      @mounted="() => dynamicImports++"
    />
  </div>
</template>

<style lang="sass">
/** global styles */
@import '@planetar/styles/variables'
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
    /**
     * If you want to host the actual example that's being rendered somewhere else and render it via iframe instead -- to be able to isolate all CSS -- you can do this by passing the iframe URL.
     */
    iframe: { type: String },
    /**
     * The height you want to pass to the iframe. If pixels it must include 'px'.
     * @example '800px'
     */
    iframeHeight: { type: String },
  },
  created() {
    const { parseComponent, filePath, parseDescription, iframe } = this
    const extension = filePath.split('.').slice(-1)[0]
    if (iframe) return
    dynamicImport(filePath, extension, 'vue-docgen').then((vueDocgen) => {
      this.dynamicImports++
      parseDescription(vueDocgen)
    })
  },
  watch: {
    dynamicImports(count) {
      const requiredImportsCount = this.iframe ? 1 : 2
      if (count >= requiredImportsCount) this.$nextTick(() => this.$emit('mounted'))
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
