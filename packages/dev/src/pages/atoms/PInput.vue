<template>
  <q-page padding>
    <div class="q-gutter-md">
      <PlanetarInput v-model="model" />
      <PlanetarInput :isCode="true" v-model="model" />
    </div>
  </q-page>
</template>

<style lang="sass" scoped></style>

<script>
export default {
  data() {
    return { model: '' }
  },
}
</script>
