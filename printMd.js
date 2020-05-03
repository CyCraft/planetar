import snarkdown from 'snarkdown'
import Prism from 'prismjs'

export function printMd (mdString = '') {
  return mdString
}

export function printCode (codeString = '', lang) {
  return prismHighlight(codeString, lang)
}

export default function prismHighlight (str, lang) {
  if (!lang) {
    lang = 'js' // default language
  } else if (lang === 'vue') {
    lang = 'html'
  }

  if (Prism.languages[lang] !== void 0) {
    const code = Prism.highlight(str, Prism.languages[lang], lang)

    return `<pre class="language-${lang}"><code>${code}</code></pre>`
  }

  return ''
}
