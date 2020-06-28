import { version } from '../package.json'
import ComponentGallery from './components/ComponentGallery.vue'
import ComponentExpose from './components/ComponentExpose.vue'
import ComponentPickerGrid from './components/ComponentPickerGrid.vue'
import ComponentPickerCard from './components/ComponentPickerCard.vue'

export { version, ComponentGallery, ComponentExpose, ComponentPickerGrid, ComponentPickerCard }

export default {
  install (Vue) {
    Vue.component(ComponentGallery.name, ComponentGallery)
    Vue.component(ComponentExpose.name, ComponentExpose)
    Vue.component(ComponentPickerGrid.name, ComponentPickerGrid)
    Vue.component(ComponentPickerCard.name, ComponentPickerCard)
  },
}
