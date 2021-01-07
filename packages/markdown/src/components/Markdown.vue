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
import {
  isExternalLink,
  isSamePageHashLink,
  isSameSiteOtherPageLink,
} from '../helpers/anchorHelpers.js'
import { scroll } from 'quasar'
const { getScrollTarget, setScrollPosition } = scroll

/**
 * @param {string} id the id of an element without `#`
 * @returns {void}
 * @example scrollToElId('api-card')
 */
function scrollToElId(id = '') {
  const el = document.getElementById(id)
  const target = getScrollTarget(el)
  const offset = el.offsetTop
  const duration = 400
  setScrollPosition(target, offset, duration)
}

/**
 * Makes an element scroll to an id on click
 * @param {HTMLElement} el the element to which the click event listener much be attached
 * @param {string} targetId the id to which must be scrolled (without `#`)
 * @returns {void}
 */
function addScrollToIdClickEvent(el, targetId) {
  el.addEventListener('click', (e) => {
    e.preventDefault()
    e.stopPropagation()
    scrollToElId(targetId)
  })
}

export default {
  name: 'Markdown',
  props: {
    /**
     * Your markdown content.
     * @example ## Hello
     */
    content: { type: String },
  },
  mounted() {
    this.$nextTick(() => {
      const anchors = this.$el.querySelectorAll('a')
      anchors.forEach(this.parseAnchorEl)
    })
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
      if (isSamePageHashLink(el)) {
        const targetId = el.href.split('#')[1]
        addScrollToIdClickEvent(el, targetId)
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
            scrollToElId(targetId)
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
