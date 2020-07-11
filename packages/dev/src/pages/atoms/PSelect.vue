<template>
  <q-page padding>
    <div class="q-gutter-md">
      <pre>{{ model }}</pre>
      <PSelect v-model="model" :options="['a', 'b']" />
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
