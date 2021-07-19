<template>
  <div :class="`code-block language-${lang}`" v-html="htmlAsString" />
</template>

<style lang="sass">
.code-block
  > *
    margin: 0 !important
</style>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { codeToHtml } from './helpers/htmlHelpers'

export default defineComponent({
  name: 'CodeBlock',
  props: {
    lang: { type: String /* as PropType<'html' | 'js' | 'css'> */, required: true },
    /**
     * Because of how Vue parses strings, the forward slash in the closing script tag must be escaped
     * or the component will fail to compile.
     *
     * For more information, see these comments:
     * * https://github.com/vuejs/vue/issues/4625
     * * https://github.com/vuejs/vue-loader/issues/506
     * @example `<div>Hi</div>\n<br />\n<script>\nconst a = 1\n<\/script>`
     */
    content: { type: String, required: true },
  },
  setup(props) {
    const htmlAsString = computed(() => {
      return codeToHtml(props.content, props.lang)
    })

    return { htmlAsString }
  },
})
</script>
