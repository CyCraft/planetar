<template>
  <q-page padding>
    <ComponentGallery
      :componentFilesList="
        require.context('src/components', true, /^\.\/.*(\.vue)$/).keys()
      "
      :componentNamePreviewBgMap="{'EfButton': 'grey'}"
    />
  </q-page>
</template>

<script>
import Vue from 'vue'
import EfButton from '../../components/atoms/EfButton.vue'

Vue.component('EfButton', EfButton)
export default {
  name: 'PageComponentGallery',
}
</script>
