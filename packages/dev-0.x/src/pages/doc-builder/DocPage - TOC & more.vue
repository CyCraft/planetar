<template>
  <q-page class="example-page">
    <div class="flex no-wrap">
      <div class="_toc mr-lg">
        <TableOfContents :TOC="TOC" />
      </div>
      <DocPage
        :chapterOrder="chapterOrder"
        pathToChapterFiles="pages/doc-builder/helpers/more-test-chapters"
        :pathsToApiCardSourceFile="['components/atoms/EfButton.vue']"
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
import PreviewCode from './helpers/PreviewCode.vue'
import vue from 'vue'
vue.component(PreviewCode.name, PreviewCode)

const chapterOrder = [
  'Basics.md',
  'Basics - Basic Example.vue',
  'Basics - Advanced Example.vue',
  'Frameworks.md',
  'Frameworks - Quasar Framework.vue',
]

export default {
  data() {
    return { TOC: [], chapterOrder }
  },
  methods: {
    addTOC(TOC) {
      this.TOC = TOC
    },
  },
}
</script>
