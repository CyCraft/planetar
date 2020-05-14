<template>
  <QInput
    :class="['p-input', isCode ? '_is-code' : '']"
    v-bind="propsToPass"
    v-on="$listeners"
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
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </QIcon>
    </template>
  </QInput>
</template>

<style lang="sass">
@import '../styles/colors'
@import '../styles/typography'
@import '../styles/margin-padding'
@import '../styles/shadows'

/* global styles */
.p-input
  .q-field__control
    border-radius: 8px
  .q-field__control:before
    border: 2px solid $c-stone-light
    background-color: $c-stone-light
    transition: border-color 0.36s cubic-bezier(0.4, 0, 0.2, 1)
  .q-field__control:hover:before
    border-color: $c-blue-ribbon
    background-color: white
  &.q-field--focused
    .q-field__control:before
      background-color: white
    .q-field__control:after
      border-color: $c-blue-ribbon


.p-input._is-code
  .q-field__native
    color: white // the text colour
  .q-field__control:before
    border: 2px solid $c-lucy-black
    background-color: $c-lucy-black
    transition: border-color 0.36s cubic-bezier(0.4, 0, 0.2, 1)
  .q-field__control:hover:before
    border-color: $c-sail-dark
  &.q-field--focused
    .q-field__control:after
      border-color: $c-sail-dark
</style>

<style lang="sass" scoped>
.p-input
  min-width: 150px
</style>

<script>
import { QInput, QIcon } from 'quasar'

/**
 * This is the main input field. Uses <QInput /> under the hood.
 */
export default {
  name: 'PInput',
  components: { QInput, QIcon },
  props: {
    /**
     * When `true` it will have a dark background.
     * @category state
     * @type {boolean}
     */
    isCode: { type: Boolean },
    /**
     * When `true`, shows a search icon.
     * @category content
     * @category state
     * @type {boolean}
     */
    isSearch: { type: Boolean }
  },
  computed: {
    propsToPass () {
      const { $attrs, isSearch } = this
      const type = isSearch ? 'search' : $attrs.type
      const outlined = true
      const dense = true
      return { ...$attrs, type, outlined, dense }
    }
  },
  methods: {}
}
</script>
