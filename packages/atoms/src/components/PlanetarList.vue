<template>
  <QList class="planetar-list" v-bind="propsToPass">
    <QItem
      v-for="item in items"
      :key="item.name"
      :class="[
        '_item',
        item.isDivider ? '_is-divider' : '',
        item.name === value ? '_is-active' : '',
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
@import '@planetar/styles/variables'

/** global styles */
.planetar-list
  .q-hoverable:hover
    +C(background, stone)
    > .q-focus-helper
      opacity: 0 !important
</style>

<style lang="sass" scoped>
@import '@planetar/styles/variables'

.planetar-list
  ._item
    +t-body1()
  ._is-divider
    +C(background, hint)
    color: white
    height: 20px
    min-height: 20px
    +t-caption()
  ._is-active
    +C(background, stone-dark)
</style>

<script>
import { QList, QItem, QItemSection, QBadge } from 'quasar'

export default {
  name: 'PlanetarList',
  components: {
    QList,
    QItem,
    QItemSection,
    QBadge,
  },
  props: {
    /**
     * @type {{ name: string, tag?: string, isDivider?: boolean }[]}
     */
    items: { type: Array, required: true },
    /**
     * Must be used with v-model!
     */
    value: { type: String, default: '' },
  },
  computed: {
    propsToPass() {
      const { $attrs } = this
      return { ...$attrs }
    },
  },
  methods: {},
}
</script>
