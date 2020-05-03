import { version } from '../package.json'

import ExampleCard from './components/ExampleCard'

export { version, ExampleCard }

export default {
  version,

  ExampleCard,

  install (Vue) {
    Vue.component(ExampleCard.name, ExampleCard)
  }
}
