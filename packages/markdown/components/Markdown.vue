<template>
  <div class="markdown">
    <div v-html="mdAsString" />
  </div>
</template>

<style lang="sass">
/** global styles */
@import '../helpers/prismTheme.scss'
</style>

<script>
import { isArray } from 'is-what'
import { mdToHtml } from '../helpers/htmlHelpers.js'

export default {
  name: 'Markdown',
  props: {
    /**
     * Your markdown content.
     * @example ## Hello
     */
    content: { type: String },
  },
  methods: {
    /**
     * @param {VNode[]} nodes
     * @returns {string}
     */
    getTextFromSlot(nodes) {
      if (!isArray(nodes)) return ''
      const [node] = nodes
      return (node && node.text) || ''
    },
  },
  computed: {
    mdAsString() {
      const { content, $slots, getTextFromDefaultSlot, getTextFromSlot } = this
      const _content = getTextFromSlot($slots.default) || content || ''
      return mdToHtml(_content)
    },
  },
}
</script>
