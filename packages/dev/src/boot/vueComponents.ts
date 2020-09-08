import Atoms from '@planetar/atoms'
import ApiCard from '@planetar/api-card'
import ExampleCard from '@planetar/example-card'
import ComponentGallery from '@planetar/component-gallery'
import Markdown from '@planetar/markdown'
import { boot } from 'quasar/wrappers'

export default boot(({ Vue }) => {
  Vue.use(Atoms)
  Vue.use(ApiCard)
  Vue.use(ExampleCard)
  Vue.use(ComponentGallery)
  Vue.use(Markdown)
})
