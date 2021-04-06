<template>
  <PlanetarTabs
    :class="`planetar-example-card planetar-example-card--${activeTab}`"
    :style="iframeHeight && activeTab === 'example' ? `height: ${iframeHeight}` : ''"
    :id="kebabCase(fileName) + `-example-card`"
    :tabLabels="tabLabels"
    :activeTab.sync="activeTab"
  >
    <template v-for="(tabLabel, index) in tabLabels" v-slot:[index]>
      <div class="pa-lg" v-if="tabLabel === 'example' && exampleComponent" :key="tabLabel + index">
        <component :is="exampleComponent" />
      </div>
      <iframe
        v-if="tabLabel === 'example' && iframe"
        style="width: 100%; height: 100%"
        :src="iframe"
        frameborder="0"
        :key="tabLabel + index"
      />
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
@import '@planetar/styles/variables'

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
    /**
     * If you want to host the actual example that's being rendered somewhere else and render it via iframe instead -- to be able to isolate all CSS -- you can do this by passing the iframe URL.
     */
    iframe: { type: String },
    /**
     * The height you want to pass to the iframe. If pixels it must include 'px'.
     * @example '800px'
     */
    iframeHeight: { type: String },
  },
  created() {
    const { parseComponent, filePath, iframe } = this
    const extension = filePath.split('.').slice(-1)[0]
    this.lang = extension
    dynamicImport(filePath, extension, 'string').then((componentString) => {
      parseComponent(componentString)
      this.dynamicImports++
    })
    if (iframe) return
    dynamicImport(filePath, extension, 'component').then((componentExport) => {
      this.exampleComponent = componentExport.default
      this.dynamicImports++
    })
  },
  watch: {
    dynamicImports(count) {
      const requiredImportsCount = this.iframe ? 1 : 2
      if (count >= requiredImportsCount) this.$nextTick(() => this.$emit('mounted'))
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
