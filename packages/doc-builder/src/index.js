import DocPage from './components/DocPage.vue'
import TableOfContents from './components/TableOfContents.vue'

export { DocPage, TableOfContents }

export default {
  install(Vue) {
    Vue.component(DocPage.name, DocPage)
    Vue.component(TableOfContents.name, TableOfContents)
  },
}
