<template>
  <div class="component-expose">
    <router-link class="_back t-button" :to="$router.currentRoute.path">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-chevron-left"
      >
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
      back</router-link
    >
    <ApiComponentExample class="ma-lg" :filePath="`components/${filePath}`" />
    <ExampleSection
      v-for="exampleFilePath in exampleFilePaths"
      :key="exampleFilePath"
      :filePath="`components/examples/${exampleFilePath}`"
    />
  </div>
</template>

<style lang="sass" scoped>
@import '../../../styles/colors'
@import '../../../styles/typography'
@import '../../../styles/margin-padding'
@import '../../../styles/shadows'

.component-expose
  ._back
    display: flex
    align-items: center
    text-decoration: none
    color: $c-blue-ribbon
</style>

<script>
import { ApiComponentExample } from '@planetar/api-card'
import { ExampleSection } from '@planetar/example-card'
import { getComponentPaths } from '../helpers/listOfComponents'
export default {
  name: 'ComponentExpose',
  props: {
    /**
     * You need to pass whatever is returned by `require.context('src/components', true, /^\.\/.*(\.vue)$/).keys()`
     * @type {string[]}
     * @example ['./atoms/MyButton.vue']
     * @example require.context('src/components', true, /^\.\/.*(\.vue)$/).keys()
     */
    componentFilesList: { type: Array, required: true }
  },
  components: { ApiComponentExample, ExampleSection },
  computed: {
    filePath () {
      const r = this.$route
      return r.query.filePath
    },
    exampleFilePaths () {
      const { componentFilesList } = this
      const { atomExamples, moleculeExamples } = getComponentPaths(
        componentFilesList
      )
      const examplePaths = atomExamples
        .concat(moleculeExamples)
        .map(p => p.replace('examples/', ''))
      const examplePathArrays = examplePaths.map(p => p.split('/'))
      const componentPathArray = this.filePath.split('/')
      const [folder, component] = componentPathArray
      const componentExamples = examplePathArrays
        .filter(([_folder, _component]) => {
          return (
            _folder === folder &&
            _component.split('.')[0] === component.split('.')[0]
          )
        })
        .map(pathArray => pathArray.join('/'))
      return componentExamples
    }
  }
}
</script>
