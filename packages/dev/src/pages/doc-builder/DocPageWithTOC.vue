<template>
  <q-page class="example-page">
    <div class="flex no-wrap">
      <div class="_toc mr-lg">
        <TableOfContents :TOC="TOC" />
      </div>
      <DocPage
        :chapterOrder="['CodeBlock examples.vue', 'textWall.md', 'Markdown examples.vue']"
        pathToChapterFiles="pages/doc-builder/helpers"
        pathToApiCardSourceFile="components/atoms/EfButton.vue"
        @TOC="addTOC"
      />
    </div>
  </q-page>
</template>

<style lang="sass" scoped>
.example-page
  ._toc
    top: 15px
    position: sticky
    align-self: flex-start
</style>

<script>
export default {
  data() {
    return { TOC: [] }
  },
  methods: {
    addTOC(TOC) {
      this.TOC = TOC
    },
  },
}
</script>
