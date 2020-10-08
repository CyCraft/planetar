<template>
  <QSelect class="planetar-select" v-bind="propsToPass" v-on="$listeners" />
</template>

<style lang="sass">
@import '@planetar/styles'

/** global styles */
.planetar-select
  .q-field__control
    border-radius: 8px
    +c(background-color, stone-light)
  .q-field__control:before
    +c(border, stone-light, 2px solid)
    transition: border-color 0.36s cubic-bezier(0.4, 0, 0.2, 1)
  .q-field__control:hover
    background-color: white
  .q-field__control:hover:before
    +c(border-color, primary)

.planetar-select.q-field--focused
  .q-field__control
    background-color: white
</style>

<style lang="sass" scoped>
.planetar-select
  min-width: 150px
</style>

<script>
import { QSelect } from 'quasar'

export default {
  name: 'PlanetarSelect',
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
