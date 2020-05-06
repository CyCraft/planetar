<template>
  <PTabs
    class="planetar-example-card"
    :id="kebabCase(fileName) + `-example`"
    :tabLabels="tabLabels"
  >
    <template v-for="(tabLabel, index) in tabLabels" v-slot:[index]>
      <div class="ma-lg" v-if="tabLabel === 'example' && exampleComponent">
        <component :is="exampleComponent" />
      </div>
      <div
        v-else-if="parts[tabLabel]"
        class="_planetar-code"
        v-html="parts[tabLabel]"
      />
    </template>
  </PTabs>
</template>

<style lang="sass">
/* global styles */
@import '../helpers/prismTheme.scss'
@import '../../../styles/colors'
@import '../../../styles/typography'
@import '../../../styles/margin-padding'
@import '../../../styles/shadows'

.planetar-example-card
  border: thin solid $c-stone-dark
  min-height: 127px
  ._planetar-code > pre
    margin: 0
</style>

<script>
import { kebabCase } from 'case-anything'
import PTabs from '../../../atoms/PTabs.vue'
import { prismHighlight } from '../helpers/prism'
import { getTagHtmlFromCodeString } from '../helpers/regexp'

export default {
  name: 'ExampleCard',
  components: { PTabs },
  props: {
    /**
     * Relative from the `src` folder.
     * @example 'examples/MyBtn/Example1.vue'
     */
    filePath: { type: String, required: true }
  },
  created () {
    const { parseComponent, filePath } = this
    import(
      /* webpackChunkName: "component" */
      /* webpackMode: "lazy-once" */
      `src/${filePath.replace('.vue', '')}.vue`
    ).then(componentExport => {
      this.exampleComponent = componentExport.default
    })
    import(
      /* webpackChunkName: "component-source" */
      /* webpackMode: "lazy-once" */
      `!raw-loader!src/${filePath.replace('.vue', '')}.vue`
    ).then(componentString => {
      parseComponent(componentString.default)
    })
  },
  data () {
    const { propsSeparateTab, filePath } = this
    const fileName = filePath
      .split('/')
      .slice(-1)[0]
      .replace('.vue', '')
    return {
      fileName,
      activeTab: 'example',
      tabLabels: ['example'],
      exampleComponent: null,
      parts: {
        template: '',
        script: '',
        style: ''
      }
    }
  },
  computed: {},
  methods: {
    kebabCase,
    prismHighlight,
    parseComponent (componentCodeString) {
      const template = getTagHtmlFromCodeString('template', componentCodeString)
      const script = getTagHtmlFromCodeString('script', componentCodeString)
      const style = getTagHtmlFromCodeString('style', componentCodeString)
      this.parts.template = prismHighlight(template, 'html')
      this.parts.script = prismHighlight(script, 'html')
      this.parts.style = prismHighlight(style, 'html')
      this.tabLabels.push(
        ...['template', 'script', 'style'].filter(type => this.parts[type])
      )
    }
  }
}
</script>
