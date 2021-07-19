<template>
  <div :class="`code-block language-${lang}`">
    <Prism :language="lang">{{ content }}</Prism>
  </div>
</template>

<style lang="sass">
.code-block
  margin: 0 !important
  > *
    margin: 0 !important
</style>

<script lang="ts">
import { defineComponent } from 'vue'
import Prism from '@cycraft/vue-prism-component'

export default defineComponent({
  name: 'CodeBlock',
  components: { Prism },
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
})
</script>
