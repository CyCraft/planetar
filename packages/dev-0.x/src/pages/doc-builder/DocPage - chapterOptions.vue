<template>
  <q-page padding>
    <DocPage
      :chapterOrder="['iframe-example.vue']"
      :chapterOptions="{ 'iframe-example.vue': { iframe: 'https://blitzar-vuetify.web.app' } }"
      pathToChapterFiles="examples/"
      :pathsToApiCardSourceFile="['components/atoms/EfButton.vue']"
      @TOC="log"
    />
  </q-page>
</template>

<style lang="sass" scoped></style>

<script>
export default {
  data() {
    return { log: console.log }
  },
}
</script>
