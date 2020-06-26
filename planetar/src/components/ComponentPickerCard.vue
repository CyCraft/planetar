<template>
  <q-card
    class="component-picker-card pa-lg cursor-pointer"
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
  </q-card>
</template>

<style lang="sass" scoped>
@import '../../../styles/colors'
@import '../../../styles/typography'
@import '../../../styles/margin-padding'
@import '../../../styles/shadows'

// .component-picker-card
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
