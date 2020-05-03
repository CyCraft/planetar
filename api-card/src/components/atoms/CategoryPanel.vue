<template>
  <EasyForm :schema="schema" />
</template>

<style lang="sass">
@import '../../../../../styles/colors'
@import '../../../../../styles/typography'
@import '../../../../../styles/margin-padding'
@import '../../../../../styles/shadows'

/* global styles */
</style>

<style lang="sass" scoped>
@import '../../../../../styles/colors'
@import '../../../../../styles/typography'
@import '../../../../../styles/margin-padding'
@import '../../../../../styles/shadows'
</style>

<script>
import vue from 'vue'
import { EasyForm } from 'quasar-ui-easy-forms'
import { QInput, QToggle, QSelect } from 'quasar'

// used in EasyForm
vue.component('QInput', QInput)
vue.component('QToggle', QToggle)
vue.component('QSelect', QSelect)

export default {
  name: 'CategoryPanel',
  components: { EasyForm },
  props: {
    schema: { type: Array, required: true },
  },
  data () {
    return {}
  },
  computed: {},
  methods: {},
}
</script>
