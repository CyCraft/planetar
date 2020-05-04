<template>
  <EasyForm :schema="schema" />
</template>

<style lang="sass">
@import '../../../../styles/colors'
@import '../../../../styles/typography'
@import '../../../../styles/margin-padding'
@import '../../../../styles/shadows'

/* global styles */
</style>

<style lang="sass" scoped>
@import '../../../../styles/colors'
@import '../../../../styles/typography'
@import '../../../../styles/margin-padding'
@import '../../../../styles/shadows'
</style>

<script>
import vue from 'vue'
import { EasyForm } from 'quasar-ui-easy-forms'
// import { PInput, PToggle, PSelect } from '../../../../atoms'
import PInput from '../../../../atoms/PInput.vue'
import PSelect from '../../../../atoms/PSelect.vue'
import PToggle from '../../../../atoms/PToggle.vue'

// used in EasyForm
vue.component('PInput', PInput)
vue.component('PToggle', PToggle)
vue.component('PSelect', PSelect)

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
