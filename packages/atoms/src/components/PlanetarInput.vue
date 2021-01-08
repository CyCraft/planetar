<template>
  <QInput
    :class="['planetar-input', isCode ? '_is-code' : '']"
    v-bind="propsToPass"
    v-on="$listeners"
  >
    <template v-slot:append v-if="isSearch">
      <QIcon class="c-blue-zodiac">
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
@import '@planetar/styles/variables'

/** global styles */
.planetar-input
  .q-field__control
    border-radius: 8px
    +C(background-color, stone-light)
  .q-field__control:before
    +C(border, stone-light, 2px solid)
    transition: border-color 0.36s cubic-bezier(0.4, 0, 0.2, 1)
  .q-field__control:hover
    background-color: white
  .q-field__control:hover:before
    +C(border-color, primary)
  &.q-field--focused
    .q-field__control
      background-color: white
    .q-field__control:after
      +C(border-color, primary)

.planetar-input._is-code
  .q-field__native
    color: white // the text colour
  .q-field__control
    +C(background-color, lucy-black)
  .q-field__control:before
    +C(border, lucy-black, 2px solid)
    transition: border-color 0.36s cubic-bezier(0.4, 0, 0.2, 1)
  .q-field__control:hover:before
    +C(border-color, sail-dark)
  &.q-field--focused
    .q-field__control:after
      +C(border-color, sail-dark)
</style>

<style lang="sass" scoped>
.planetar-input
  min-width: 150px
</style>

<script>
import { QInput, QIcon } from 'quasar'

/**
 * This is the main input field. Uses <QInput /> under the hood.
 */
export default {
  name: 'PlanetarInput',
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
    isSearch: { type: Boolean },
  },
  computed: {
    propsToPass() {
      const { $attrs, isSearch } = this
      const type = isSearch ? 'search' : $attrs.type
      const outlined = true
      const dense = true
      return { ...$attrs, type, outlined, dense }
    },
  },
  methods: {},
}
</script>
