<template>
  <QInput
    :class="['test-input', { 'animate-blink': isBlinking }]"
    :color="color"
    v-bind="propsToPass"
    v-on="$listeners"
    v-model="model"
  >
    <template v-slot:append v-if="isSearch">
      <QIcon class="c-primary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-search"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </QIcon>
    </template>
  </QInput>
</template>

<style lang="sass">
@import 'node_modules/@planetar/styles/variables'

/** global styles */
.animate-blink
  animation: blink 1.3s infinite
@keyframes blink
  from
    opacity: 1.0
  80%
    opacity: 1.0
  93%
    opacity: 0
  to
    opacity: 1.0
</style>

<style lang="sass" scoped>
@import 'node_modules/@planetar/styles/variables'

.test-input
  min-width: 150px
</style>

<script>
import { QInput, QIcon } from 'quasar'

/**
 * @typedef MyStringLitteral
 * @type {'a' | 'b'}
 */

/**
 * This is the main input field.
 */
export default {
  name: 'TestInput',
  components: {
    QInput,
    QIcon,
  },
  props: {
    /**
     * @type {MyStringLitteral}
     */
    myStringLitteral: { type: String },
    /**
     * To be used with v-model
     * @category model
     */
    value: {
      type: String,
    },
    /**
     * @type {'primary' | 'secondary'}
     */
    color: { type: String },
    /**
     * When `true`, shows a search icon.
     * @category content
     * @type {boolean}
     * @example true
     */
    isSearch: {
      type: [Boolean],
      default: false,
    },
    /**
     * This would make the button blink
     * @category animation
     * @type {boolean}
     * @example true
     */
    isBlinking: {
      type: [Boolean],
      default: false,
    },
    /**
     * An array
     * @category model
     * @type {string[]}
     * @example ['a']
     */
    anArray: {
      type: Array,
      default: () => [],
    },
    /**
     * An array
     * @category model
     * @type {string[]}
     * @example ['a']
     * @example ['b']
     */
    anotherArray: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return { innerValue: '' }
  },
  watch: {
    value: {
      immediate: true,
      handler(newValue) {
        this.innerValue = newValue
      },
    },
  },
  computed: {
    propsToPass() {
      const { $attrs, isSearch } = this
      const type = isSearch ? 'search' : $attrs.type
      const outlined = true
      const dense = true
      return { ...$attrs, type, outlined, dense }
    },
    model: {
      get() {
        return this.innerValue
      },
      set(v) {
        this.innerValue = v
        /**
         * @param {number | string} value The input value
         * @param {Vue} this The emitting vue component's instance
         */
        this.$emit('input', v, this)
      },
    },
  },
  methods: {},
}
</script>
