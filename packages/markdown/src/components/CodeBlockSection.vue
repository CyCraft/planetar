<template>
  <CodeBlock class="code-block-section" :lang="lang" :content="content" />
</template>

<script>
import { dynamicImport } from '@planetar/utils'
import CodeBlock from './CodeBlock'

export default {
  name: 'CodeBlockSection',
  components: { CodeBlock },
  props: {
    /**
     * Relative from the `src` folder.
     * @example 'examples/MyBtn/Example1.vue'
     */
    filePath: { type: String, required: true },
  },
  created() {
    const { filePath } = this
    const extension = filePath.split('.').slice(-1)[0]
    this.lang = extension
    dynamicImport(filePath, extension, 'string').then((markdownContent) => {
      this.content = markdownContent
    })
  },
  data() {
    return {
      content: '',
      lang: '',
    }
  },
}
</script>
