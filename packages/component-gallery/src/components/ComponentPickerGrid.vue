<template>
  <div class="component-picker">
    <!-- atoms form elements -->
    <div class="t-h3 my-md">Atoms</div>
    <div class="t-h6" v-if="atomsFormElements.length">Form Elements</div>
    <div class="_grid-md py-lg" v-if="atomsFormElements.length">
      <ComponentPickerCard
        v-for="filePath in atomsFormElements"
        :key="filePath"
        :filePath="filePath"
      />
    </div>
    <!-- atoms other -->
    <div class="t-h6" v-if="atomsFormElements.length && atomsOther.length">
      Other
    </div>
    <div class="_grid-md py-lg" v-if="atomsOther.length">
      <ComponentPickerCard
        v-for="filePath in atomsOther"
        :key="filePath"
        :filePath="filePath"
      />
    </div>
    <div
      class="py-lg column no-wrap flex-center"
      v-if="!atomsOther.length && !atomsFormElements.length"
    >
      <div class="t-body1">No components yet! Start building!!</div>
      <h2 style="margin: 16px">🏝</h2>
    </div>
    <!-- molecules -->
    <div class="t-h3 my-md" v-if="molecules.length">Molecules</div>
    <div class="_grid-md py-lg" v-if="molecules.length">
      <ComponentPickerCard
        v-for="filePath in molecules"
        :key="filePath"
        :filePath="filePath"
      />
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import '@planetar/styles/colors'
@import '@planetar/styles/typography'
@import '@planetar/styles/margin-padding'
@import '@planetar/styles/shadows'

.component-picker
  ._grid-md
    display: grid
    grid-gap: 1.6rem
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr))
    grid-auto-flow: row
    grid-template-rows: 1fr
</style>

<script>
import { getComponentPaths } from '../helpers/listOfComponents'
import ComponentPickerCard from './ComponentPickerCard.vue'

export default {
  name: 'ComponentPicker',
  components: { ComponentPickerCard },
  props: {
    /**
     * You need to pass whatever is returned by `require.context('src/components', true, /^\.\/.*(\.vue)$/).keys()`
     * @type {string[]}
     * @example ['./atoms/MyButton.vue']
     * @example require.context('src/components', true, /^\.\/.*(\.vue)$/).keys()
     */
    componentFilesList: { type: Array, required: true },
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
    include: { type: Array }
  },
  data () {
    const { componentFilesList, formElementPrefix, exclude, include } = this
    const { atoms, molecules } = getComponentPaths(componentFilesList)

    function filePathExcluded (filePath = '') {
      if (!exclude || !exclude.length) return false
      return exclude.every(excl => !filePath.includes(excl))
    }
    function filePathIncluded (filePath = '') {
      if (!include || !include.length) return true
      return include.some(incl => filePath.includes(incl))
    }
    function filePathOk (filePath = '') {
      return filePathIncluded(filePath) && !filePathExcluded(filePath)
    }

    const _atoms = atoms.filter(filePathOk)
    const _molecules = molecules.filter(filePathOk)
    const atomsFormElements = !formElementPrefix
      ? []
      : _atoms.filter(filePath => filePath.includes(formElementPrefix))
    const atomsOther = !formElementPrefix
      ? _atoms
      : _atoms.filter(filePath => !filePath.includes(formElementPrefix))

    return {
      atomsFormElements,
      atomsOther,
      molecules: _molecules
    }
  },
  methods: {},
  computed: {}
}
</script>
