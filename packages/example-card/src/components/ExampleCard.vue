<template>
  <PlanetarTabs
    class="planetar-example-card"
    :id="kebabCase(fileName) + `-example-card`"
    :tabLabels="tabLabels"
  >
    <template v-for="(tabLabel, index) in tabLabels" v-slot:[index]>
      <div class="pa-lg" v-if="tabLabel === 'example' && exampleComponent" :key="tabLabel + index">
        <component :is="exampleComponent" />
      </div>
      <div v-else-if="parts[tabLabel]" class="_planetar-code t-body1" :key="tabLabel + index">
        <pre>
          {{ typeof parts[tabLabel] }}
        {{ parts[tabLabel] }}
      </pre>
      </div>
      <!-- v-html="parts[tabLabel]" -->
      <!-- <CodeBlock
        v-else-if="parts[tabLabel]"
        :parts="parts"
        :tabLabel="tabLabel"
        :key="tabLabel + index"
      />-->
    </template>
  </PlanetarTabs>
</template>

<style lang="sass">
/** global styles */
@import '../helpers/prismTheme.scss'
@import '@planetar/styles'

.planetar-example-card
  border: thin solid $c-stone-dark
  min-height: 127px
  ._planetar-code > pre
    margin: 0
</style>

<script>
import { kebabCase } from 'case-anything'
import { PlanetarTabs } from '@planetar/atoms'
import { codeToHtml } from '../helpers/htmlHelpers'
import { getTagHtmlFromCodeString, jsDocBlockNoIndentation } from '../helpers/regexp'
import { dynamicImport } from '@planetar/utils'

export default {
  name: 'ExampleCard',
  components: { PlanetarTabs },
  props: {
    /**
     * Relative from the `src` folder.
     * @example 'examples/MyBtn/Example1.vue'
     */
    filePath: { type: String, required: true },
    /**
     * When `true` the JSDoc above the default export will be stripped from displayed source code in the script tab.
     */
    stripJSDocDescription: { type: Boolean, default: false },
  },
  created() {
    const { parseComponent, filePath } = this
    const extension = filePath.split('.').slice(-1)[0]
    dynamicImport(filePath, extension, 'component').then((componentExport) => {
      this.exampleComponent = componentExport.default
    })
    dynamicImport(filePath, extension, 'string').then((componentString) => {
      parseComponent(componentString)
    })
  },
  data() {
    const { propsSeparateTab, filePath } = this
    const fileName = filePath
      .split('/')
      .slice(-1)[0]
      .replace(/\.vue|\.tsx|\.jsx/, '')
    return {
      fileName,
      activeTab: 'example',
      tabLabels: ['example'],
      exampleComponent: null,
      parts: {
        template: '',
        script: '',
        style: '',
      },
    }
  },
  computed: {},
  methods: {
    kebabCase,
    parseComponent(componentCodeString) {
      const { stripJSDocDescription } = this
      const template = getTagHtmlFromCodeString('template', componentCodeString)
      let script = getTagHtmlFromCodeString('script', componentCodeString)
      const style = getTagHtmlFromCodeString('style', componentCodeString)
      const notAVueFile = !template && !script && !style
      if (notAVueFile) {
        script = componentCodeString
        if (stripJSDocDescription) {
          script = script.replace(jsDocBlockNoIndentation, '')
        }
        this.parts.script = codeToHtml(script, 'js')
        this.tabLabels.push('script')
        return
      }
      if (template) {
        this.parts.template = codeToHtml(template, 'html')
        this.tabLabels.push('template')
      }
      if (script) {
        if (stripJSDocDescription) {
          script = script.replace(jsDocBlockNoIndentation, '')
        }
        this.parts.script = codeToHtml(script, 'html')
        this.tabLabels.push('script')
      }
      if (style) {
        this.parts.style = codeToHtml(style, 'html')
        this.tabLabels.push('style')
      }
    },
  },
}
</script>
