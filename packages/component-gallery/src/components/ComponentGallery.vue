<template>
  <div class="component-gallery">
    <ComponentPickerGrid
      v-if="!filePath"
      :componentFilesList="componentFilesList"
    />
    <ComponentExpose v-if="filePath" :componentFilesList="componentFilesList" />
  </div>
</template>

<style lang="sass" scoped>
@import '@planetar/styles/colors'
@import '@planetar/styles/typography'
@import '@planetar/styles/margin-padding'
@import '@planetar/styles/shadows'

.component-gallery
  background: $c-stone-light
</style>

<script>
import ComponentPickerGrid from './ComponentPickerGrid.vue'
import ComponentExpose from './ComponentExpose.vue'

export default {
  name: 'ComponentGallery',
  components: { ComponentPickerGrid, ComponentExpose },
  props: {
    /**
     * You need to pass whatever is returned by `require.context('src/components', true, /^\.\/.*(\.vue)$/).keys()`
     * @type {string[]}
     * @example ['./atoms/MyButton.vue']
     * @example require.context('src/components', true, /^\.\/.*(\.vue)$/).keys()
     */
    componentFilesList: { type: Array, required: true }
  },
  computed: {
    filePath () {
      const r = this.$route
      return r.query.filePath
    }
  }
}
</script>
