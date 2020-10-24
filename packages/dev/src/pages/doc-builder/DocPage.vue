<template>
  <q-page padding>
    <DocPage
      :chapterOrder="['CodeBlock examples.vue', 'textWall.md', 'Markdown examples.vue']"
      pathToChapterFiles="pages/doc-builder/helpers"
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
