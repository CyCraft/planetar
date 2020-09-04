<template>
  <div class="markdown-section">
    <Markdown :exampleDescription="exampleDescription" />
    <!-- <Markdown :exampleDescription="textWall" /> -->
    <!-- <ExampleCard :filePath="filePath" :stripJSDocDescription="true" /> -->
  </div>
</template>

<style lang="sass" scoped>
// $

// .component-name
</style>

<script>
import { dynamicImport } from '@planetar/utils'

export default {
  name: 'MarkdownSection',
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
    dynamicImport(filePath, extension, 'string').then((markdownContent) => {
      console.log('markdownContent: ', markdownContent)
      // this.exampleDescription = markdownContent.description
      this.setDescription(markdownContent)
    })
  },
  data() {
    return {
      exampleDescription: '',
    }
  },
  computed: {},
  methods: {
    setDescription(markdownContent) {
      this.exampleDescription = markdownContent
    },
  },
}
</script>
