<template>
  <q-page padding>
    <div class="q-ma-md column flex-center">
      <h6 class="q-mb-md">Interactive preview</h6>
      <PInput v-bind="props" v-model="model" />
    </div>
    <div class="q-ma-md column flex-center">
      <h6 class="q-mb-md">Info card</h6>
      <ApiCard filePath="components/PInput.vue" v-model="props" style="width: 600px" />
    </div>
  </q-page>
</template>

<style lang="sass" scoped>
.directive-target
  width: 50px
  height: 50px
</style>

<script>
import PInput from '../components/PInput'
export default {
  components: { PInput },
  data () {
    return { props: {}, model: '' }
  },
}
</script>
