<template>
  <QList class="p-list" v-bind="propsToPass">
    <QItem
      v-for="item in items"
      :key="item.name"
      :class="[
        '_item',
        item.isDivider ? '_is-divider' : '',
        item.name === value ? '_is-active' : ''
      ]"
      :clickable="!item.isDivider"
      @click="() => $emit('input', item.name)"
    >
      <QItemSection>{{ item.name }}</QItemSection>
      <QItemSection side v-if="item.tag">
        <QBadge color="sail">{{ item.tag }}</QBadge>
      </QItemSection>
    </QItem>
  </QList>
</template>

<style lang="sass">
@import '../styles/colors'
@import '../styles/typography'
@import '../styles/margin-padding'
@import '../styles/shadows'

/* global styles */
.p-list
  .q-hoverable:hover
    background: $c-stone
    > .q-focus-helper
      opacity: 0 !important
</style>

<style lang="sass" scoped>
@import '../styles/colors'
@import '../styles/typography'
@import '../styles/margin-padding'
@import '../styles/shadows'

.p-list
  ._item
    +t-body1
  ._is-divider
    +t-caption
    background: $c-hint
    color: white
    height: 20px
    min-height: 20px
  ._is-active
    background: $c-stone-dark
</style>

<script>
import { QList, QItem, QItemSection, QBadge } from 'quasar'

export default {
  name: 'PList',
  components: {
    QList,
    QItem,
    QItemSection,
    QBadge
  },
  props: {
    /**
     * @type {{ name: string, tag?: string, isDivider?: boolean }[]}
     */
    items: { type: Array, required: true },
    /**
     * Must be used with v-model!
     */
    value: { type: String, default: '' }
  },
  computed: {
    propsToPass () {
      const { $attrs } = this
      return { ...$attrs }
    }
  },
  methods: {}
}
</script>
