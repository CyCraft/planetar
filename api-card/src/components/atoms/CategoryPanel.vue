<template>
  <EasyForm class="planetar-category-panel" :schema="schema" v-bind="$attrs" v-on="$listeners" />
</template>

<style lang="sass">
@import '../../../../styles/colors'
@import '../../../../styles/typography'
@import '../../../../styles/margin-padding'
@import '../../../../styles/shadows'

/* global styles */
.planetar-category-panel
  .easy-form__form
    grid-gap: 6px !important
  .easy-field
    padding: 1em
  .easy-field:not(.easy-field--no-label)
    grid-template-columns: 150px 1fr
    .easy-field__label
      +t-subtitle2
      justify-self: start
      align-self: start
      margin-bottom: 4px
    .easy-field__sub-label
      +t-body2
      grid-column: 2 / 3
      br
        +mt($sm)
        display: block
        content: ""
    .easy-field__component
      grid-column: 2 / 3
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
