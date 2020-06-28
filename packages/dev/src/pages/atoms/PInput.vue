<template>
  <q-page padding>
    <PInput v-model="model" />
  </q-page>
</template>

<style lang="sass" scoped></style>

<script>
export default {
  data () {
    return { model: '' }
  }
}
</script>
