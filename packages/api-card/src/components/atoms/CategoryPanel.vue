<template>
  <BlitzForm
    class="planetar-category-panel"
    :schema="schemaCalculated"
    :mode="mode"
    v-bind="$attrs"
    v-on="$listeners"
    labelPosition="left"
    :key="isPlainObject($attrs.value) ? String($attrs.value.value) : '_'"
  />
</template>

<style lang="sass">
@import 'node_modules/@planetar/styles/variables'

/** global styles */
.planetar-category-panel
  pre, code
    background-color: transparentize($c-stone, 0.3)
    padding: 0.2em 0.6em
    border-radius: 4px
  /** Spacing and layout */
  .blitz-form__form
    grid-gap: 6px !important
    > .blitz-field
      padding: 1em
      > .blitz-field__label
        justify-self: start
        align-self: start
        margin-bottom: 4px
        min-width: 150px
      > .blitz-field__sub-label
        grid-row: 1 / 2
      > .blitz-field__component,
      > .q-field
        grid-row: 2 / 3
        grid-column: 2 / 3
  /** Typography */
  .blitz-field__label
    +t-subtitle2()
  .blitz-field__sub-label
    grid-column: 2 / 3
    +t-body2()
    br
      +mt($sm)
      display: block
      content: ""
    li
      +mb($md)
</style>

<script>
import vue from 'vue'
import { BlitzForm } from '@blitzar/form'
import { isPlainObject } from 'is-what'
import { PlanetarInput, PlanetarToggle, PlanetarSelect } from '@planetar/atoms'

// used in BlitzForm
vue.component('PlanetarInput', PlanetarInput)
vue.component('PlanetarToggle', PlanetarToggle)
vue.component('PlanetarSelect', PlanetarSelect)

export default {
  name: 'CategoryPanel',
  components: { BlitzForm },
  props: {
    schema: { type: Array, required: true },
    /**
     * @type {'edit' | 'view' | 'raw'}
     */
    mode: { type: String, default: 'edit' },
  },
  data() {
    return {}
  },
  computed: {
    schemaCalculated() {
      if (this.mode === 'edit') return this.schema
      return this.schema.map((s) => ({ ...s, component: undefined }))
    },
  },
  methods: { isPlainObject },
}
</script>
