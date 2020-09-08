<template>
  <div class="markdown">
    <slot>
      <div class="mb-lg t-body1" v-html="mdAsString" />
    </slot>
  </div>
</template>

<style lang="sass">
/** global styles */
@import '../helpers/prismTheme.scss'
</style>

<script>
import {
  prismHighlight,
  codeToHtml,
  mdToHtml,
  replacer,
} from '@planetar/markdown/helpers/htmlHelpers.js'

export default {
  name: 'Markdown',
  props: {
    exampleDescription: String,
  },
  computed: {
    mdAsString() {
      const { exampleDescription } = this
      return mdToHtml(exampleDescription)
    },
  },
}
</script>
