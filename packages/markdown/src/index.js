import Markdown from './components/Markdown.vue'
import MarkdownSection from './components/MarkdownSection.vue'
import CodeBlock from './components/CodeBlock.vue'
import CodeBlockSection from './components/CodeBlockSection.vue'

export { Markdown, MarkdownSection, CodeBlock, CodeBlockSection }

export default {
  install(Vue) {
    Vue.component(Markdown.name, Markdown)
    Vue.component(MarkdownSection.name, MarkdownSection)
    Vue.component(CodeBlock.name, CodeBlock)
    Vue.component(CodeBlockSection.name, CodeBlockSection)
  },
}
