<template>
  <div
    class="component-picker-card"
    @click="
      () =>
        $router.push({
          path: $router.currentRoute.path,
          query: { filePath }
        })
    "
    :clickable="true"
  >
    <!-- prettier-ignore -->
    <div class="text-h6 text-wrap-all">{{
      filePath.replace(/atoms\/|molecules\/|\.vue|\.jsx|\.tsx/g, '')
    }}</div>
  </div>
</template>

<style lang="sass" scoped>
@import '@planetar/styles/colors'
@import '@planetar/styles/typography'
@import '@planetar/styles/margin-padding'
@import '@planetar/styles/shadows'

.component-picker-card
  +shadow-1()
  +pa($lg)
  border-radius: 18px
  background: white
  cursor: pointer
</style>

<script>
export default {
  name: 'ComponentPickerCard',
  props: {
    filePath: { type: String }
  },
  data () {
    return {}
  },
  computed: {},
  methods: {}
}
</script>
