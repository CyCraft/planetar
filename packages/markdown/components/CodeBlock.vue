<template>
  <div class="code-block _planetar-code t-body1">
    <div class="_planetar-code t-body1" v-html="htmlAsString" />
  </div>
</template>

<script>
import { codeToHtml } from '../helpers/htmlHelpers.js'

export default {
  name: 'CodeBlock',
  props: {
    lang: String,
    content: String,
  },
  computed: {
    htmlAsString() {
      const { content, lang } = this
      return codeToHtml(content, lang)
    },
  },
}
</script>
