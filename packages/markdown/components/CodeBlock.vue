<template>
  <div class="code-block" v-html="htmlAsString" />
</template>

<style lang="sass">
@import '../helpers/prismTheme'

.code-block
  pre
    margin: 0
</style>

<script>
import { codeToHtml } from '../helpers/htmlHelpers.js'

export default {
  name: 'CodeBlock',
  props: {
    lang: String,
    /**
     * Because of how Vue parses strings, the forward slash in the closing script tag must be escaped
     * or the component will fail to compile.
     *
     * For more information, see these comments:
     * * https://github.com/vuejs/vue/issues/4625
     * * https://github.com/vuejs/vue-loader/issues/506
     * @example `<div>Hi</div>\n<br />\n<script lang="js">\nconst a = 1\n<\/script>`
     */
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
