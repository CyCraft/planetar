import ExampleCard from './components/ExampleCard.vue'
import ExampleSection from './components/ExampleSection.vue'

export { ExampleCard, ExampleSection }

export default {
  install(Vue) {
    Vue.component(ExampleCard.name, ExampleCard)
    Vue.component(ExampleSection.name, ExampleSection)
  },
}
