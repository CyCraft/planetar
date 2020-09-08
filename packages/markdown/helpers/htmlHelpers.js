import snarkdown from 'snarkdown'
import Prism from 'prismjs'

export function prismHighlight(str, lang) {
  if (Prism.languages[lang] !== void 0) {
    return Prism.highlight(str, Prism.languages[lang], lang)
  }
  return ''
}

export function codeToHtml(str, lang) {
  if (lang === 'vue') lang = 'html'
  const highlightedCode = prismHighlight(str, lang)
  return `<pre class="language-${lang}"><code class="language-${lang}">${highlightedCode}</code></pre>`
}

export function replacer(matchedString, lang, content) {
  content = content.replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  const htmlHighlighted = prismHighlight(content, lang)
  const recreatedBlock = `<pre class="language-${lang}"><code class="language-${lang}">${htmlHighlighted}</code></pre>`
  return recreatedBlock
}

/**
 * @param {string} mdString
 * @returns {string | undefined}
 */
export function mdToHtml(mdString) {
  if (!mdString) return undefined
  const html = snarkdown(mdString)
  const codeBlock = /<pre.+?><code.+?language-(\w+?)".*?>([\s\S]+?)<\/code><\/pre>/g
  const htmlWithHighlighting = html.replace(/&quot;/g, '"').replace(codeBlock, replacer)
  return htmlWithHighlighting
}
