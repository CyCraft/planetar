<template>
  <div class="test-tabs">
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
        :name="String(index)"
        :label="label"
        no-caps
      />
    </QTabs>
    <QTabPanels v-model="activeTab" animated class="flex-1" v-bind="propsToPass" v-on="$listeners">
      <QTabPanel
        v-for="(label, index) in tabLabels"
        :key="label + index"
        :name="String(index)"
        class="no-padding full-height"
      >
        <!--
          @slot Tab Panels are automatically added by adding them with their "index" number of each label passed in the 'tabLabels' prop.
          @example <div v-slot:0>first panel</div><div v-slot:1>second panel</div>
        -->
        <slot :name="String(index)">
          {{ defaultContent[index] }}
        </slot>
      </QTabPanel>
    </QTabPanels>
  </div>
</template>

<style lang="sass">
@import '@planetar/styles'

/* global styles */
</style>

<style lang="sass" scoped>
@import '@planetar/styles'

.test-tabs
  min-width: 150px
  display: flex
  flex-direction: column
</style>

<script>
import { QTabs, QTab, QTabPanels, QTabPanel } from 'quasar'

/**
 * This is a wrapper around QTabs and QTabPanels to automatically generate the QTabs above the panels.
 * @example {defaultContent: { '0': '🍍' }}
 */
export default {
  name: 'TestTabs',
  components: {
    QTabs,
    QTab,
    QTabPanels,
    QTabPanel,
  },
  props: {
    /**
     * The active tab index as string. To use with v-model. You can also use the initialTabIndex.
     * @category model
     * @type {string}
     * @example '0'
     */
    value: {
      type: [String],
      default: '0',
    },
    /**
     * The labels of the tabs.
     * @category content
     * @type {string[]}
     * @example ['First Tab', 'Second Tab']
     */
    tabLabels: {
      type: [Array],
      required: true,
      // default: () => [],
    },
    /**
     * The tab index which should be opened initially.
     * @category content
     * @type {number}
     * @example 0
     */
    initialTabIndex: {
      type: [Number],
      default: 0,
    },
    /**
     * A string literal test prop
     * @category testprops
     * @type {'a' | 'b'}
     */
    stringLiteral: {
      type: [String],
      default: 'a',
    },
    /**
     * A primitive literal test prop
     * @category testprops
     * @type {null | '' | 0}
     */
    primitiveLiteral: {
      type: [Number, null, String],
    },
    /**
     * A number literal test prop
     * @category testprops
     * @type {0 | 1 | 2}
     */
    numberLiteral: {
      type: [Number],
    },
    /**
     * An object literal test prop
     * @category testprops
     * @type {{a: 1} | {b: 1}}
     */
    objectLiteral: {
      type: [Object],
    },
    /**
     * A function test prop
     * @category testprops
     * @type {(a: number) => {awesome: number}}
     * @example a => ({ awesome: a })
     */
    fn: {
      type: Function,
      default: a => ({ awesome: a }),
    },
    /**
     * A complicated object test prop
     * @category testprops
     * @type {{name: string, id: string, items: string[]}}
     * @example {name: 'Mexcelsior', id: 'm', items: ['a', 'b']}
     */
    complicatedObject: {
      type: Object,
      default: () => ({ name: '', id: '', items: [] }),
    },
    /**
     * @category content
     * @type {{[index: string]: string}}
     */
    defaultContent: {
      type: Object,
      default: () => ({ '0': 'hi!' }),
    },
  },
  data () {
    const innerActiveTab = String(this.value) || String(this.initialTabIndex)
    return { innerActiveTab }
  },
  computed: {
    activeTab: {
      get () {
        return this.innerActiveTab
      },
      set (newTab) {
        this.innerActiveTab = String(newTab)
        /**
         * Triggers when the tab changes
         * @property {string|number} newValue new tab index as string
         */
        this.$emit('input', String(newTab))
      },
    },
    propsToPass () {
      const { $attrs } = this
      return { ...$attrs }
    },
  },
  methods: {},
}
</script>
