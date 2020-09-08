export * from './components/index'

import { Markdown, MarkdownSection, CodeBlock, CodeBlockSection } from './components/index'

export default {
  install(Vue) {
    Vue.component(Markdown.name, Markdown)
    Vue.component(MarkdownSection.name, MarkdownSection)
    Vue.component(CodeBlock.name, CodeBlock)
    Vue.component(CodeBlockSection.name, CodeBlockSection)
  },
}
