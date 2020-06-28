import Atoms from '@planetar/atoms'
import ApiCard from '@planetar/api-card'
import ExampleCard from '@planetar/example-card'
import ComponentGallery from '@planetar/component-gallery'

export * from '@planetar/atoms'
export * from '@planetar/api-card'
export * from '@planetar/example-card'
export * from '@planetar/component-gallery'

export { version } from '../package.json'

export default {
  install (Vue) {
    Vue.use(Atoms)
    Vue.use(ApiCard)
    Vue.use(ExampleCard)
    Vue.use(ComponentGallery)
  }
}
