export * from './components/index'

import { DocPage } from './components/index'

export default {
  install(Vue) {
    Vue.component(DocPage.name, DocPage)
  },
}
