import DocPage from './components/DocPage.vue'

export { DocPage }

export default {
  install(Vue) {
    Vue.component(DocPage.name, DocPage)
  },
}
