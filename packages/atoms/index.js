export * from './components/index'

import { PInput, PList, PSelect, PToggle, PTabs } from './components/index'

// import { version } from '../package.json'
// export { version }

export default {
  install (Vue) {
    Vue.component(PInput.name, PInput)
    Vue.component(PList.name, PList)
    Vue.component(PSelect.name, PSelect)
    Vue.component(PTabs.name, PTabs)
    Vue.component(PToggle.name, PToggle)
  }
}
