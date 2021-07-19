import snarkdown from 'snarkdown'
import { languages, highlight } from 'prismjs'

export function prismHighlight(str: string, lang: string): string {
  if (!str || !lang || languages[lang] === undefined) {
    console.error('something went wrong', str, lang)
    return ''
  }
  return highlight(str, languages[lang], lang)
}

export function codeToHtml(str: string, lang: string): string {
  if (lang === 'vue') lang = 'html'
  const highlightedCode = prismHighlight(str, lang)
  return `<pre class="language-${lang}"><code class="language-${lang}">${highlightedCode}</code></pre>`
}

export function replacer(matchedString: string, lang: string, content: string): string {
  content = content.replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  const htmlHighlighted = prismHighlight(content, lang)
  const recreatedBlock = `<pre class="language-${lang}"><code class="language-${lang}">${htmlHighlighted}</code></pre>`
  return recreatedBlock
}

export function mdToHtml(mdString: string): string | undefined {
  if (!mdString) return undefined
  const html = snarkdown(mdString)
  const codeBlock = /<pre.+?><code.+?language-(\w+?)".*?>([\s\S]+?)<\/code><\/pre>/g
  const htmlWithHighlighting = html.replace(/&quot;/g, '"').replace(codeBlock, replacer)
  return htmlWithHighlighting
}
