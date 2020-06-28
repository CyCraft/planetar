import Vue from 'vue'
import Atoms from '@planetar/atoms'
import ApiCard from '@planetar/api-card'
import ExampleCard from '@planetar/example-card'

export default ({ Vue }) => {
  Vue.use(Atoms)
  Vue.use(ApiCard)
  Vue.use(ExampleCard)
}
