<template>
  <q-page padding>
    <div class="q-ma-md column flex-center">
      <h6 class="q-mb-md">Interactive preview</h6>
      <PTabs v-bind="props" :tabLabels="['test 1', 'Hello World!　🌏']" style="width: 800px">
        <template v-slot:0>
          Blue
        </template>
        <template v-slot:1>
          Diamonds
        </template>
      </PTabs>
    </div>
    <div class="q-ma-md column flex-center">
      <h6 class="q-mb-md">Info card</h6>
      <ApiCard filePath="components/PTabs.vue" v-model="props" style="width: 600px" />
    </div>
  </q-page>
</template>

<style lang="sass" scoped>
.directive-target
  width: 50px
  height: 50px
</style>

<script>
import PTabs from '../components/PTabs'
export default {
  components: { PTabs },
  data () {
    return { props: {}, model: '' }
  },
}
</script>
