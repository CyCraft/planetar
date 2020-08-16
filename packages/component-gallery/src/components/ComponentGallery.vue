<template>
  <div class="component-gallery">
    <ComponentPickerGrid
      v-if="!filePath"
      :componentFilesList="componentFilesList"
      :formElementPrefix="formElementPrefix"
      :include="include"
      :exclude="exclude"
    />
    <ComponentExpose
      v-if="filePath"
      :interactivePreview="interactivePreviewForFilePath"
      :componentFilesList="componentFilesList"
      :previewBg="previewBgForFilePath"
    />
  </div>
</template>

<style lang="sass" scoped>
@import '@planetar/styles'

// .component-gallery
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
    componentFilesList: { type: Array, required: true },
    /**
     * If you only want to include the interactive preview for certain components, you can pass an array of strings with the component names. Eg. `['Button']` would include the interactive preview ONLY for components with `Button` in its name.
     * @type {string[]}
     */
    interactivePreviewFor: { type: Array, default: () => [] },
    /**
     * If you only want to exclude the interactive preview for certain components, you can pass an array of strings with the component names. Eg. `['Button']` would exclude the interactive preview for ALL components with `Button` in its name.
     * @type {string[]}
     */
    noInteractivePreviewFor: { type: Array, default: () => [] },
    /**
     * You can give certain components a background for the "interactive preview" section, which will be applied like so: `style="background: ~~~"`
     * @type {{ [componentName: string]: string }}
     */
    componentNamePreviewBgMap: { type: Object, default: () => ({}) },
    /**
     * If you want to separate form element atoms from others, you can pass a prefix like 'My' which will separate any component that starts with 'My', eg. 'MyButton', 'MyInput', etc.
     * @example 'My'
     */
    formElementPrefix: { type: String },
    /**
     * An array of strings to exclude certain components that partially match whatever you define. Eg. `['Button']` would exclude any component with `Button` in its name from the grid.
     * @type {string[]}
     * @example ['Button']
     */
    exclude: { type: Array },
    /**
     * An array of strings to include certain components that partially match whatever you define. Eg. `['Button']` would include ONLY components with `Button` in its name.
     * @type {string[]}
     * @example ['Button']
     */
    include: { type: Array },
  },
  computed: {
    filePath() {
      const r = this.$route
      return r.query.filePath
    },
    interactivePreviewForFilePath() {
      const { componentFilesList, filePath, interactivePreviewFor, noInteractivePreviewFor } = this

      function previewIncluded(filePath = '') {
        if (!interactivePreviewFor || !interactivePreviewFor.length) return true
        return interactivePreviewFor.some((incl) => filePath.includes(incl))
      }
      function previewExcluded(filePath = '') {
        if (!noInteractivePreviewFor || !noInteractivePreviewFor.length) return false
        return noInteractivePreviewFor.some((excl) => filePath.includes(excl))
      }
      function filePathOk(filePath = '') {
        return previewIncluded(filePath) && !previewExcluded(filePath)
      }
      return filePathOk(filePath)
    },
    previewBgForFilePath() {
      const { filePath, componentNamePreviewBgMap } = this
      const componentName = (filePath.split('/').slice(-1)[0] || "").replace(/\.vue|\.jsx|\.tsx/, '')
      return componentNamePreviewBgMap[componentName]
    },
  },
}
</script>
