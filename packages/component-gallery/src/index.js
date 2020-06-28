import { version } from '../package.json'
// from this package
import ComponentGallery from './components/ComponentGallery.vue'
import ComponentExpose from './components/ComponentExpose.vue'
import ComponentPickerGrid from './components/ComponentPickerGrid.vue'
import ComponentPickerCard from './components/ComponentPickerCard.vue'
// from other packages
// import { ApiCard, ApiComponentExample } from '@planetar/api-card'
// import { ExampleCard, ExampleSection } from '@planetar/example-card'

export {
  // from this package
  version,
  ComponentGallery,
  ComponentExpose,
  ComponentPickerGrid,
  ComponentPickerCard
  // from other packages
  // ApiCard,
  // ApiComponentExample,
  // ExampleCard,
  // ExampleSection
}

export default {
  // from this package
  version,
  ComponentGallery,
  ComponentExpose,
  ComponentPickerGrid,
  ComponentPickerCard,
  // from other packages
  // ApiCard,
  // ApiComponentExample,
  // ExampleCard,
  // ExampleSection,

  install (Vue) {
    // from this package
    Vue.component(ComponentGallery.name, ComponentGallery)
    Vue.component(ComponentExpose.name, ComponentExpose)
    Vue.component(ComponentPickerGrid.name, ComponentPickerGrid)
    Vue.component(ComponentPickerCard.name, ComponentPickerCard)
    // from other packages
    // Vue.component(ApiCard.name, ApiCard)
    // Vue.component(ApiComponentExample.name, ApiComponentExample)
    // Vue.component(ExampleCard.name, ExampleCard)
    // Vue.component(ExampleSection.name, ExampleSection)
  }
}
