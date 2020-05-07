import { version } from '../package.json'

import ApiCard from './components/ApiCard.vue'
import ApiComponentExample from './components/ApiComponentExample.vue'

export { version, ApiCard, ApiComponentExample }

export default {
  version,

  ApiCard,
  ApiComponentExample,

  install (Vue) {
    Vue.component(ApiCard.name, ApiCard)
    Vue.component(ApiComponentExample.name, ApiComponentExample)
  },
}
