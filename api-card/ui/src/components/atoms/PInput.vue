<template>
  <QInput class="p-input" v-bind="propsToPass" v-on="$listeners">
    <template v-slot:append v-if="isSearch">
      <QIcon :name="`img:${require('../../../../../assets/icons/feather/search.svg')}`" />
    </template>
  </QInput>
</template>

<style lang="sass">
@import '../../../../../styles/colors'
@import '../../../../../styles/typography'
@import '../../../../../styles/margin-padding'
@import '../../../../../styles/shadows'

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

.p-input.q-field--focused
  .q-field__control:before
    background-color: white
  // .q-field__control:after
  //   height: inherit
  //   border-radius: inherit
  //   border: 2px solid transparent
  //   transition: border-color 0.36s cubic-bezier(0.4, 0, 0.2, 1)
</style>

<style lang="sass" scoped>
@import '../../../../../styles/colors'
@import '../../../../../styles/typography'
@import '../../../../../styles/margin-padding'
@import '../../../../../styles/shadows'

.t-input
  min-width: 150px
</style>

<script>
import { QInput, QIcon } from 'quasar'

export default {
  name: 'PInput',
  components: {
    QInput,
    QIcon,
  },
  props: {
    isSearch: { type: Boolean },
  },
  computed: {
    propsToPass () {
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
