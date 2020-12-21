<template>
  <div class="planetar-tabs">
    <QTabs
      v-model="activeTabIndex"
      dense
      class="bg-stone c-grey-3 _top"
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
      v-model="activeTabIndex"
      animated
      class="_bottom"
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
@import '@planetar/styles/variables'

/** global styles */
</style>

<style lang="sass" scoped>
@import '@planetar/styles/variables'

.planetar-tabs
  min-width: 150px
  display: flex
  flex-direction: column
  > ._top
    min-height: fit-content // required on Safari to prevent _bottom to overtake space the parent div is set to a fixed height.
  > ._bottom
    flex: 1
</style>

<script>
import { QTabs, QTab, QTabPanels, QTabPanel } from 'quasar'

/**
 * This is the main input field.
 */
export default {
  name: 'PlanetarTabs',
  components: { QTabs, QTab, QTabPanels, QTabPanel },
  props: {
    /**
     * The labels of the tabs.
     * @category content
     * @type {string[]}
     * @example ['First Tab', 'Second Tab']
     */
    tabLabels: { type: Array, default: () => [], required: true },
    /**
     * The tab which should be opened initially. Can be used with `.sync`
     * @category content
     * @type {string}
     */
    activeTab: { type: String },
  },
  data() {
    const i = this.tabLabels.findIndex((label) => label === this.activeTab)
    const activeTabIndexInner = Math.max(0, i)
    return { activeTabIndexInner }
  },
  computed: {
    activeTabIndex: {
      get() {
        return this.activeTabIndexInner
      },
      set(newIndex) {
        this.activeTabIndexInner = newIndex
        const activeTab = this.tabLabels[newIndex]
        this.$emit('update:active-tab', activeTab)
      },
    },
    propsToPass() {
      const { $attrs } = this
      return { ...$attrs }
    },
  },
  methods: {},
}
</script>
