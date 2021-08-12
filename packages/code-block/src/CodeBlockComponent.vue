<template>
  <div class="code-block-component">
    <NTabs class="code-block-component__tabs" type="line" :tabsPadding="16" paneStyle="padding: 0">
      <NTabPane v-for="(tab, index) in tabs" :key="tab" :name="tab" :tab="tab">
        <div
          class="code-block-component__component"
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
.code-block-component
  --c-active: #42b983
  --c-text: #1f2225
  --c-border: #efeff5
  min-height: 100px
  border: thin solid var(--c-border)
  border-radius: 6px
  overflow: hidden

  .code-block-component__tabs
    --tab-text-color-active: var(--c-active) !important
    --bar-color: var(--c-active) !important
    --tab-text-color-hover: var(--c-active) !important
    --tab-text-color: var(--c-text) !important
    --tab-border-color: var(--c-border) !important

  .code-block-component__component
    padding: 1rem
</style>

<script lang="ts">
import { NTabs, NTabPane } from 'naive-ui'
import { defineComponent, ref, reactive, shallowRef } from 'vue'
import CodeBlock from './CodeBlock.vue'
import { getTagHtmlFromCodeString } from './helpers/regexp'

/**
 * Changing the colors of the border and the active tab can be done by tweaking these CSS variables:
 * ```css
 * .code-block-component {
 *   --c-active: #42b983;
 *   --c-text: #1f2225;
 *   --c-border: #efeff5;
 * }
 * ```
 */
export default defineComponent({
  name: 'CodeBlockComponent',
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
