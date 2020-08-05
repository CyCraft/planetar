export * from './components/index'

import {
  PlanetarInput,
  PlanetarList,
  PlanetarSelect,
  PlanetarToggle,
  PlanetarTabs,
} from './components/index'

export default {
  install(Vue) {
    Vue.component(PlanetarInput.name, PlanetarInput)
    Vue.component(PlanetarList.name, PlanetarList)
    Vue.component(PlanetarSelect.name, PlanetarSelect)
    Vue.component(PlanetarTabs.name, PlanetarTabs)
    Vue.component(PlanetarToggle.name, PlanetarToggle)
  },
}
