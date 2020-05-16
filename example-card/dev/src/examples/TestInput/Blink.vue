<template>
  <TestInput class="text-bold" :isBlinking="true" v-model="model" />
</template>

<style lang="sass" scoped>
.text-bold
  font-weight: 700
</style>

<script>
import TestInput from '../../components/TestInput'

/**
 * This example is blinking.
 * ```js
 * const code = ({ b }) => ['a', b, { c: 1 }]
 * ```
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
