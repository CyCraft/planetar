<template>
  <div class="q-gutter-md">
    <TestInput class="text-bold" :isBlinking="true" v-model="model" />
    <TestInput class="text-bold" :isSearch="true" v-model="model" />
    <TestInput class="text-bold" color="secondary" v-model="model" />
  </div>
</template>

<script>
import TestInput from '../../components/TestInput'

/**
 * This example has all three examples!
 */
export default {
  components: { TestInput },
  data () {
    return {
      model: ''
    }
  }
}
</script>
