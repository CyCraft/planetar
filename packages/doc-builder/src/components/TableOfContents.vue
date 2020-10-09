<template>
  <div class="table-of-contents">
    <scrollactive
      class="_toc-wrapper"
      :offset="80"
      :duration="SCROLL_DURATION"
      :modifyUrl="false"
      @itemchanged="tocItemChanged"
    >
      <PlanetarAnchor
        v-for="(tocItem, i) in computedTOC"
        :key="i"
        :content="tocItem.text"
        :href="`#${tocItem.id}`"
        :class="[
          'scrollactive-item',
          '_toc-item',
          tocItem.tag,
          {
            '_has-active-child': tocIdHasActiveChildDic[tocItem.id],
            '_has-active-parent': tocIdHasActiveParentDic[tocItem.id],
            '_has-active-sibling': tocIdHasActiveSiblingDic[tocItem.id],
          },
        ]"
        @click="setUrlHash"
      />
    </scrollactive>
  </div>
</template>

<style lang="sass" scoped>
@import 'node_modules/@planetar/styles'

.table-of-contents
  // ._toc-wrapper
  ._toc-item
    color: inherit
    +pa($sm)
    +pl(1.3em)
    &.H1
      font-size: 1.1em
      line-height: 1.7
      font-weight: 700
      border-left: .25rem solid transparent
    &.H2
      margin-left: 1em
      font-size: 0.95em
      line-height: 1.4
      font-weight: 400
    &.H3
      margin-left: 2em
      font-size: 0.9em
      line-height: 1.4
      font-weight: 500
      height: 0
      +py(0)
      transform: scaleY(0)
      transform-origin: top
      transition: all ease-in-out 160ms
    &.H1._has-active-child,
    &.H1.is-active
      +C(border-left, primary, .25rem solid)
    &.H3._has-active-parent,
    &.H3._has-active-sibling,
    &.H3.is-active
      height: unset
      +py($sm)
      transform: scaleY(1)
</style>

<script>
import VueScrollactive from 'vue-scrollactive'
import Vue from 'vue'
import { mapObject } from 'map-anything'
import { PlanetarAnchor } from '@planetar/atoms'
Vue.use(VueScrollactive)

const SCROLL_DURATION = 600

/**
 * @type {{ text: string, id: string, tag: string }}
 * @returns {number | null}
 */
function tocItemToHNumber(tocItem) {
  return tocItem.tag.includes('H') ? Number(tocItem.tag.replace('H', '')) : null
}

export default {
  name: 'TableOfContents',
  components: { PlanetarAnchor },
  props: {
    /**
     * @type {{ text: string, id: string, tag: string }[]}
     */
    TOC: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return { SCROLL_DURATION, activeTocId: null, willBecomeActiveTocId: null }
  },
  computed: {
    computedTOC() {
      // check if H1 is the "biggest title", if not, adjust every title
      const hNumbers = this.TOC.filter((t) => t.tag.includes('H') && t.id !== 'api-card').map(
        tocItemToHNumber
      )
      const topLevelTag = Math.min(...hNumbers)
      const adjustBy = 1 - topLevelTag
      return this.TOC.map((tocItem) => {
        // set api-card tag to the topLevelTag
        const item = tocItem.id === 'api-card' ? { ...tocItem, tag: `H${topLevelTag}` } : tocItem
        // don't worry if it's not using an H title
        if (!item.tag.includes('H')) return item
        // adjust all other tags
        const hNumber = tocItemToHNumber(item) + adjustBy
        return { ...item, tag: `H${hNumber}` }
      })
    },
    /**
     * @type {{ [tocId in string]: string }}[]}
     */
    tocIdParentIdDic() {
      const { computedTOC: TOC } = this
      return TOC.reduce((dic, tocItem, currentIndex) => {
        const TOCHead = TOC.slice(0, currentIndex)
        TOCHead.reverse()
        const parentIndex = TOCHead.findIndex((possibleParent) => {
          return tocItemToHNumber(possibleParent) < tocItemToHNumber(tocItem)
        })
        const parentId = parentIndex === -1 ? '' : TOCHead[parentIndex].id
        dic[tocItem.id] = parentId
        return dic
      }, {})
    },
    /**
     * @type {{ [tocId in string]: string[] }}[]}
     */
    tocIdChildrenIdsDic() {
      const { computedTOC: TOC } = this
      return TOC.reduce((dic, tocItem, currentIndex) => {
        const TOCtail = TOC.slice(currentIndex + 1)
        const nextSiblingIndex = TOCtail.findIndex((possibleSibling) => {
          return tocItem.tag === possibleSibling.tag
        })
        const children = nextSiblingIndex === -1 ? TOCtail : TOCtail.slice(0, nextSiblingIndex)
        dic[tocItem.id] = children.map((c) => c.id)
        return dic
      }, {})
    },
    /**
     * @type {{ [tocId in string]: string[] }}[]}
     */
    tocIdSiblingIdsDic() {
      const { computedTOC: TOC, tocIdParentIdDic } = this
      return TOC.reduce((dic, tocItem, currentIndex) => {
        const parentId = tocIdParentIdDic[tocItem.id]
        const parentIndex = !parentId
          ? 0
          : TOC.findIndex((possibleParent) => possibleParent.id === parentId)
        const nextParentIndex = TOC.findIndex((possibleNextParent, index) => {
          if (index <= currentIndex) return false
          return tocItemToHNumber(possibleNextParent) < tocItemToHNumber(tocItem)
        })
        const siblingsAndChildren =
          nextParentIndex === -1 ? TOC.slice(parentIndex) : TOC.slice(parentIndex, nextParentIndex)
        const siblings = siblingsAndChildren.filter((s) => s.tag === tocItem.tag)
        dic[tocItem.id] = siblings.map((s) => s.id)
        return dic
      }, {})
    },
    /**
     * @type {{ [tocId in string]: boolean }}[]}
     */
    tocIdHasActiveChildDic() {
      const { tocIdChildrenIdsDic, activeTocId, willBecomeActiveTocId } = this
      return mapObject(tocIdChildrenIdsDic, (childrenIds) => {
        return childrenIds.includes(activeTocId) || childrenIds.includes(willBecomeActiveTocId)
      })
    },
    /**
     * @type {{ [tocId in string]: boolean }}[]}
     */
    tocIdHasActiveParentDic() {
      const { tocIdParentIdDic, activeTocId, willBecomeActiveTocId } = this
      return mapObject(tocIdParentIdDic, (parentId) => {
        return parentId === activeTocId || parentId === willBecomeActiveTocId
      })
    },
    /**
     * @type {{ [tocId in string]: boolean }}[]}
     */
    tocIdHasActiveSiblingDic() {
      const { tocIdSiblingIdsDic, activeTocId, willBecomeActiveTocId } = this
      return mapObject(tocIdSiblingIdsDic, (siblingIds) => {
        return siblingIds.includes(activeTocId) || siblingIds.includes(willBecomeActiveTocId)
      })
    },
  },
  methods: {
    /**
     * @param {MouseEvent} event
     */
    setUrlHash(event) {
      const activeTocHash = event.srcElement.getAttribute('href')
      const activeTocId = activeTocHash.replace('#', '')
      this.willBecomeActiveTocId = activeTocId
      this.activeTocId = ''
      setTimeout(() => {
        location.hash = activeTocId
      }, SCROLL_DURATION)
    },
    /**
     * @param {ScrollEvent} event
     * @param {newActiveEl | null | undefined} HTMLElement
     * @param {lastActiveEl | null | undefined} HTMLElement
     */
    tocItemChanged(event, newActiveEl, lastActiveEl) {
      if (!newActiveEl) return
      const activeTocId = (newActiveEl.getAttribute('href') || '').replace('#', '')
      this.activeTocId = activeTocId
      this.willBecomeActiveTocId = ''
    },
  },
}
</script>
