<template>
  <div class="api-card">
    <div class="_top">
      <div class="t-h4">{{ title }}</div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import '../../../../styles/colors'
@import '../../../../styles/typography'
@import '../../../../styles/margin-padding'
@import '../../../../styles/shadows'
.api-card
  +shadow-3()
  min-width: 100px
  min-height: 100px
  ._top
    border-bottom: 1px $c-stone-dark solid
</style>

<script>
export default {
  name: 'ApiCard',
  props: {
    title: { type: String, required: true },
  },
  computed: {},
  methods: {},
}
</script>
