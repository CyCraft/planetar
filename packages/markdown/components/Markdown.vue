<template>
  <div class="markdown">
    <slot>
      <div class="mb-lg t-body1" v-html="mdToHtml(exampleDescription)" />
    </slot>
  </div>
</template>

<script>
import snarkdown from 'snarkdown'
import Prism from 'prismjs'

export default {
  name: 'Markdown',
  props: {
    exampleDescription: String,
  },
  methods: {
    /**
     * @param {string} mdString
     * @returns {string | undefined}
     */
    mdToHtml(mdString) {
      if (!mdString) return undefined
      const html = snarkdown(mdString)
      const codeBlock = /<pre.+?><code.+?language-(\w+?)".*?>([\s\S]+?)<\/code><\/pre>/g
      const htmlWithHighlighting = html
        .replace(/&quot;/g, '"')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(codeBlock, this.replacer)
      return htmlWithHighlighting
    },

    replacer(matchedString, lang, content) {
      const htmlHighlighted = this.prismHighlight(content, lang)
      const recreatedBlock = `<pre class="language-${lang}"><code class="language-${lang}">${htmlHighlighted}</code></pre>`
      return recreatedBlock
    },

    parseDescription(vueDocgen) {
      const { description: descriptionMd } = vueDocgen
      const descriptionHtml = this.mdToHtml(descriptionMd)
      this.exampleDescription = descriptionHtml
    },

    prismHighlight(str, lang) {
      if (Prism.languages[lang] !== void 0) {
        return Prism.highlight(str, Prism.languages[lang], lang)
      }
      return ''
    },
  },
}
</script>
