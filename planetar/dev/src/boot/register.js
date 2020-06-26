import Vue from 'vue'
import VuePlugin from 'ui' // "ui" is aliased in quasar.conf.js
import EfButton from '../components/atoms/EfButton.vue'

Vue.use(VuePlugin)
Vue.component('EfButton', EfButton)
