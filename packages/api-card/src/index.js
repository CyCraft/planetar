import ApiCard from './components/ApiCard.vue'
import ApiComponentExample from './components/ApiComponentExample.vue'

export { ApiCard, ApiComponentExample }

export default {
  install(Vue) {
    Vue.component(ApiCard.name, ApiCard)
    Vue.component(ApiComponentExample.name, ApiComponentExample)
  },
}
