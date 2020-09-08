<template>
  <div class="code-block-section">
    <CodeBlock :lang="lang" :content="exampleDescription" />
  </div>
</template>

<script>
import { dynamicImport } from '@planetar/utils'

export default {
  name: 'CodeBlockSection',
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
    this.lang = extension
    dynamicImport(filePath, extension, 'string').then((markdownContent) => {
      this.setDescription(markdownContent)
    })
  },
  data() {
    return {
      exampleDescription: '',
      lang: '',
    }
  },
  methods: {
    setDescription(markdownContent) {
      this.exampleDescription = markdownContent
    },
  },
}
</script>
