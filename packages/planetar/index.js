import ApiCard from '@planetar/api-card'
import Atoms from '@planetar/atoms'
import ComponentGallery from '@planetar/component-gallery'
import DocBuilder from '@planetar/doc-builder'
import ExampleCard from '@planetar/example-card'
import Markdown from '@planetar/markdown'

export * from '@planetar/api-card'
export * from '@planetar/atoms'
export * from '@planetar/component-gallery'
export * from '@planetar/doc-builder'
export * from '@planetar/example-card'
export * from '@planetar/markdown'

export default {
  install(Vue) {
    Vue.use(ApiCard)
    Vue.use(Atoms)
    Vue.use(ComponentGallery)
    Vue.use(DocBuilder)
    Vue.use(ExampleCard)
    Vue.use(Markdown)
  },
}
