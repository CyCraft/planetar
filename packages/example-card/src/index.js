import { version } from '../package.json'

import ExampleCard from './components/ExampleCard.vue'
import ExampleSection from './components/ExampleSection.vue'

export { version, ExampleCard, ExampleSection }

export default {
  version,

  ExampleCard,
  ExampleSection,

  install(Vue) {
    Vue.component(ExampleCard.name, ExampleCard)
    Vue.component(ExampleSection.name, ExampleSection)
  },
}
