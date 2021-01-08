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
import { scrollToElId } from '@planetar/utils'
import { mdToHtml } from '../helpers/htmlHelpers.js'
import {
  isExternalLink,
  isSamePageHashLink,
  isSameSiteOtherPageLink,
} from '../helpers/anchorHelpers.js'

export default {
  name: 'Markdown',
  props: {
    /**
     * Your markdown content.
     * @example ## Hello
     */
    content: { type: String },
  },
  watch: {
    content: {
      immediate: true,
      handler(content) {
        this.$nextTick(() => {
          const el = this.$el
          if (!content || !el) return
          const anchors = el.querySelectorAll('a')
          anchors.forEach(this.parseAnchorEl)
        })
      },
    },
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
    /**
     * attaches custom scrolling behaviour to anchor elements that point to same site hash tags
     * @param {HTMLElement} el
     */
    parseAnchorEl(el) {
      console.log(`el → `, el)
      console.log(`isSamePageHashLink(el) → `, isSamePageHashLink(el))
      console.log(`isSameSiteOtherPageLink(el) → `, isSameSiteOtherPageLink(el))
      console.log(`!isExternalLink(el) → `, !isExternalLink(el))
      if (isSamePageHashLink(el)) {
        const targetId = el.href.split('#')[1]
        el.addEventListener('click', (e) => {
          scrollToElId(targetId, this.$router, e)
        })
        // todo: set route query
        return
      }
      if (isSameSiteOtherPageLink(el)) {
        const targetId = el.href.split('#')[1]
        const pathname = el.pathname
        const router = this.$router
        if (!router) return
        el.addEventListener('click', async (e) => {
          e.preventDefault()
          e.stopPropagation()
          await router.push(pathname)
          // todo: set route query
          if (targetId) {
            await new Promise((resolve) => setTimeout(resolve, 100))
            scrollToElId(targetId, router, e)
          }
        })
        return
      }
      if (!isExternalLink(el)) {
        // the anchor link does not point to the same page with hash
        // not to the same site other page
        // and not to another domain
        // so it's a same site same page non-hash link...
        // if Vue router exists, for now do nothing:
        const router = this.$router
        if (!router) return
        el.addEventListener('click', async (e) => {
          if (router) {
            e.preventDefault()
            e.stopPropagation()
            // todo: set route query
          }
        })
      }
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
