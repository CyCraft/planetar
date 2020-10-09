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
      <CodeBlock
        class="t-body1"
        v-else-if="parts[tabLabel]"
        lang="html"
        :content="parts[tabLabel]"
        :key="tabLabel + index"
      />
    </template>
  </PlanetarTabs>
</template>

<style lang="sass">
/** global styles */
@import 'node_modules/@planetar/styles'

.planetar-example-card
  +C(border, stone-dark, thin solid)
  min-height: 127px
</style>

<script>
import { kebabCase } from 'case-anything'
import { PlanetarTabs } from '@planetar/atoms'
import { dynamicImport } from '@planetar/utils'
import { CodeBlock } from '@planetar/markdown'
import { getTagHtmlFromCodeString, jsDocBlockNoIndentation } from '../helpers/regexp'

export default {
  name: 'ExampleCard',
  components: { PlanetarTabs, CodeBlock },
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
    this.lang = extension
    dynamicImport(filePath, extension, 'component').then((componentExport) => {
      this.dynamicImports++
      this.exampleComponent = componentExport.default
    })
    dynamicImport(filePath, extension, 'string').then((componentString) => {
      this.dynamicImports++
      parseComponent(componentString)
    })
  },
  watch: {
    dynamicImports(count) {
      if (count > 1) this.$nextTick(() => this.$emit('mounted'))
    },
  },
  data() {
    const { propsSeparateTab, filePath } = this
    const fileName = filePath
      .split('/')
      .slice(-1)[0]
      .replace(/\.vue|\.tsx|\.jsx/, '')
    return {
      dynamicImports: 0,
      fileName,
      activeTab: 'example',
      tabLabels: ['example'],
      lang: '',
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
        this.parts.script = script
        this.tabLabels.push('script')
        return
      }
      if (template) {
        this.parts.template = template
        this.tabLabels.push('template')
      }
      if (script) {
        if (stripJSDocDescription) {
          script = script.replace(jsDocBlockNoIndentation, '')
        }
        this.parts.script = script
        this.tabLabels.push('script')
      }
      if (style) {
        this.parts.style = style
        this.tabLabels.push('style')
      }
    },
  },
}
</script>
