<template>
  <div class="component-code-block">
    <NTabs class="component-code-block__tabs" type="line" :tabsPadding="16" paneStyle="padding: 0">
      <NTabPane v-for="(tab, index) in tabs" :key="tab" :name="tab" :tab="tab">
        <div
          class="component-code-block__component"
          v-if="tab === 'example' && component"
          :key="tab + index"
        >
          <component :is="component" />
        </div>
        <CodeBlock v-else-if="parts[tab]" lang="html" :content="parts[tab]" :key="tab + index" />
      </NTabPane>
    </NTabs>
  </div>
</template>

<style lang="sass">
.component-code-block
  --border-color: #efeff5
  --active-color: #42b983
  min-height: 100px
  border: thin solid var(--border-color)
  border-radius: 6px
  overflow: hidden

  .component-code-block__tabs
    --tab-border-color: var(--border-color) !important
    --tab-text-color-active: var(--active-color) !important
    --bar-color: var(--active-color) !important
    --tab-text-color-hover: var(--active-color) !important

  .component-code-block__component
    padding: 1rem
</style>

<script lang="ts">
import { NTabs, NTabPane } from 'naive-ui'
import { defineComponent, ref, reactive, shallowRef } from 'vue'
import CodeBlock from './CodeBlock.vue'
import { getTagHtmlFromCodeString } from './helpers/regexp'

/**
 * Changing the colors of the border and the active tab can be done by tweaking these CSS variables:
 * ```sass
 * .component-code-block
 *   --border-color: #efeff5
 *   --active-color: #42b983
 * ```
 */
export default defineComponent({
  name: 'ComponentCodeBlock',
  components: { NTabs, NTabPane, CodeBlock },
  props: {
    importComponentInstanceFn: { type: Function, required: true },
    importComponentRawFn: { type: Function, required: true },
  },
  setup(props) {
    const tabs = ref(['example'])
    const parts = reactive({
      template: '',
      script: '',
      style: '',
    })
    const component = shallowRef(null)

    props.importComponentInstanceFn().then((res) => {
      component.value = res.default
    })

    props.importComponentRawFn().then((res) => {
      parseComponent(res.default)
    })

    function parseComponent(componentCodeString = '') {
      const template = getTagHtmlFromCodeString('template', componentCodeString)
      let script = getTagHtmlFromCodeString('script', componentCodeString)
      const style = getTagHtmlFromCodeString('style', componentCodeString)
      const notAVueFile = !template && !script && !style
      if (notAVueFile) {
        script = componentCodeString
        parts.script = script
        tabs.value.push('script')
        return
      }
      if (template) {
        parts.template = template
        tabs.value.push('template')
      }
      if (script) {
        parts.script = script
        tabs.value.push('script')
      }
      if (style) {
        parts.style = style
        tabs.value.push('style')
      }
    }

    return {
      tabs,
      parts,
      component,
    }
  },
})
</script>
