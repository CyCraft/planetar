<template>
  <div class="p-tabs">
    <QTabs
      v-model="activeTab"
      dense
      class="bg-stone c-grey-3"
      active-color="primary"
      indicator-color="stone"
      align="left"
      narrow-indicator
    >
      <QTab
        v-for="(label, index) in tabLabels"
        :key="label + index"
        :name="index"
        :label="label"
        no-caps
      />
    </QTabs>
    <QTabPanels
      v-model="activeTab"
      animated
      class="flex-1"
      v-bind="propsToPass"
      v-on="$listeners"
    >
      <QTabPanel
        v-for="(label, index) in tabLabels"
        :key="label + index"
        :name="index"
        class="no-padding full-height"
      >
        <!--
          @slot Tab Panels are automatically added by adding them with their "index" number of each label passed in the 'tabLabels' prop. Eg. `<div v-slot:0>first panel</div><div v-slot:1>second panel</div>`
        -->
        <slot :name="index" />
      </QTabPanel>
    </QTabPanels>
  </div>
</template>

<style lang="sass">
@import '../styles/colors'
@import '../styles/typography'
@import '../styles/margin-padding'
@import '../styles/shadows'

/* global styles */
</style>

<style lang="sass" scoped>
@import '../styles/colors'
@import '../styles/typography'
@import '../styles/margin-padding'
@import '../styles/shadows'

.p-tabs
  min-width: 150px
  display: flex
  flex-direction: column
</style>

<script>
import { QTabs, QTab, QTabPanels, QTabPanel } from 'quasar'

/**
 * This is the main input field.
 */
export default {
  name: 'PTabs',
  components: {
    QTabs,
    QTab,
    QTabPanels,
    QTabPanel
  },
  props: {
    /**
     * The labels of the tabs.
     * @category content
     * @type {string[]}
     * @example ['First Tab', 'Second Tab']
     */
    tabLabels: {
      type: [Array],
      default: () => [],
      required: true
    },
    /**
     * The tab index which should be opened initially.
     * @category content
     * @type {number}
     */
    initialTabIndex: {
      type: [Number],
      default: 0
    }
  },
  data () {
    const activeTab = this.initialTabIndex
    return { activeTab }
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
