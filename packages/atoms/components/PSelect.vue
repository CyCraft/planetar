<template>
  <QSelect class="p-select" v-bind="propsToPass" v-on="$listeners" />
</template>

<style lang="sass">
@import '@planetar/styles'

/** global styles */
.p-select
  .q-field__control
    border-radius: 8px
    background-color: $c-stone-light
  .q-field__control:before
    border: 2px solid $c-stone-light
    transition: border-color 0.36s cubic-bezier(0.4, 0, 0.2, 1)
  .q-field__control:hover
    background-color: white
  .q-field__control:hover:before
    border-color: $c-blue-ribbon

.p-select.q-field--focused
  .q-field__control
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
    propsToPass() {
      const { $attrs } = this
      const outlined = true
      const dense = true
      return { ...$attrs, outlined, dense }
    },
  },
  methods: {},
}
</script>
