<template>
  <PInput class="text-bold" :isSearch="isSearch" v-model="model" />
</template>

<style lang="sass" scoped>
.text-bold
  font-weight: 700
</style>

<script>
import PInput from '../../components/PInput'

export default {
  components: { PInput },
  data () {
    return {
      isSearch: true,
      model: ''
    }
  }
}
</script>
