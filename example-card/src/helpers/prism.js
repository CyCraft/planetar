import Prism from 'prismjs'

export function prismHighlight (str, lang) {
  if (lang === 'vue') lang = 'html'

  if (Prism.languages[lang] !== void 0) {
    const code = Prism.highlight(str, Prism.languages[lang], lang)
    return `<pre class="language-${lang}"><code>${code}</code></pre>`
  }

  return ''
}
