<template>
  <QSelect class="p-select" v-bind="propsToPass" v-on="$listeners" />
</template>

<style lang="sass">
@import 'node_modules/@planetar/styles/colors'
@import 'node_modules/@planetar/styles/typography'
@import 'node_modules/@planetar/styles/margin-padding'
@import 'node_modules/@planetar/styles/shadows'

/* global styles */
.p-select
  .q-field__control
    border-radius: 8px
  .q-field__control:before
    border: 2px solid $c-stone-light
    background-color: $c-stone-light
    transition: border-color 0.36s cubic-bezier(0.4, 0, 0.2, 1)
  .q-field__control:hover:before
    border-color: $c-blue-ribbon
    background-color: white

.p-select.q-field--focused
  .q-field__control:before
    background-color: white
</style>

<style lang="sass" scoped>
.p-select
  min-width: 150px
</style>

<script>
import { QSelect } from 'quasar'

export default {
  name: 'PSelect',
  components: { QSelect },
  props: {},
  computed: {
    propsToPass () {
      const { $attrs } = this
      const outlined = true
      const dense = true
      return { ...$attrs, outlined, dense }
    }
  },
  methods: {}
}
</script>
