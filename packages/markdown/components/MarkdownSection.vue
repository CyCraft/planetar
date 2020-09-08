<template>
  <Markdown class="markdown-section" :content="content" />
</template>

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
    const { filePath } = this
    const extension = filePath.split('.').slice(-1)[0]
    dynamicImport(filePath, extension, 'string').then((markdownContent) => {
      this.content = markdownContent
    })
  },
  data() {
    return {
      content: '',
    }
  },
}
</script>
