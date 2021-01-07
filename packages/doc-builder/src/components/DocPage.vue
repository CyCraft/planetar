<template>
  <div class="doc-page">
    <template v-for="(filePath, i) in filesList">
      <ExampleSection
        class="mb-xxxl"
        v-if="filePath.endsWith('.vue')"
        :filePath="filePath"
        :hideTitle="true"
        v-bind="chapterOptions[filePath.replace(pathToChapterFiles, '')] || {}"
        :key="filePath + i"
        @mounted="() => mountCount++"
      />
      <MarkdownSection
        class="mb-xxxl"
        v-if="filePath.endsWith('.md')"
        :filePath="filePath"
        v-bind="chapterOptions[filePath.replace(pathToChapterFiles, '')] || {}"
        :key="filePath + i"
        @mounted="() => mountCount++"
      />
    </template>
    <!-- api card section -->
    <div v-if="pathsToApiCardSourceFile.length" id="api-card">
      <ApiComponentExample
        class="mb-xxxl"
        v-for="path in pathsToApiCardSourceFile"
        :key="path"
        :filePath="path"
        @mounted="() => mountCountApiCards++"
      />
    </div>
  </div>
</template>

<style lang="sass" scoped>
// $

// .doc-page
</style>

<script>
import { parseTitleEls } from '../helpers/domHelpers'
import { ExampleSection } from '@planetar/example-card'
import { MarkdownSection } from '@planetar/markdown'
import { ApiComponentExample } from '@planetar/api-card'
import { scrollToElId } from '@planetar/utils'

export default {
  name: 'DocPage',
  components: { ExampleSection, MarkdownSection, ApiComponentExample },
  props: {
    /**
     * A path to a folder that will hold the files for this DocPage. It must be relative to the "src" folder.
     * @example 'pages/landing-page'
     */
    pathToChapterFiles: { type: String, required: true },
    /**
     * The file names (with extension) inside the "pathToChapterFiles". These files will become your rendered doc page.
     *
     * The files array can be a combination of .vue and .md files. Whenever it's a .vue file, it's rendered with <ExampleSection />. Whenever it's an .md file, it's rendered with <MarkdownSection />.
     * @type {string[]}
     */
    chapterOrder: { type: Array, required: true },
    /**
     * (optional) An array of paths to the Vue files to generate API Cards for at the bottom of the doc page.
     * @type {string[]}
     * @example ['components/atoms/MyButton.vue']
     */
    pathsToApiCardSourceFile: { type: Array, default: () => [] },
    /**
     * (optional) If you want to pass extra props to either the `ExampleSection` or `MarkdownSection` you can do so with the filename from `chapterOrder` as key and the props as value.
     * @type {Record<string, Record<string, any>>}
     */
    chapterOptions: { type: Object, default: () => ({}) },
  },
  data() {
    return { mountCount: 0, mountCountApiCards: 0 }
  },
  watch: {
    mountCount(count) {
      const allChaptersMounted = count >= this.filesList.length
      if (allChaptersMounted) {
        const payloadTOC = parseTitleEls(this.$el, this.pathsToApiCardSourceFile)
        this.$emit('TOC', payloadTOC)
      }
      const allApiCardsMounted = this.mountCountApiCards >= this.pathsToApiCardSourceFile.length
      if (allChaptersMounted && allApiCardsMounted) this.scrollToHashInUrl()
    },
    mountCountApiCards(count) {
      const allChaptersMounted = this.mountCount >= this.filesList.length
      const allApiCardsMounted = count >= this.pathsToApiCardSourceFile.length
      if (allChaptersMounted && allApiCardsMounted) this.scrollToHashInUrl()
    },
  },
  computed: {
    /**
     * A list that combines `pathToChapterFiles` with each file in the `chapterOrder`.
     */
    filesList() {
      const { pathToChapterFiles, chapterOrder } = this
      const parentPath = pathToChapterFiles.endsWith('/')
        ? pathToChapterFiles
        : `${pathToChapterFiles}/`
      return chapterOrder.flatMap((chapter) => {
        if (!chapter.endsWith('.md') && !chapter.endsWith('.vue')) return []
        const filename = chapter[0] === '/' ? chapter.slice(1) : chapter
        return parentPath + filename
      })
    },
  },
  methods: {
    scrollToHashInUrl() {
      const hash = document.location.hash.replace('#', '')
      if (hash) this.$nextTick(() => scrollToElId(hash))
    },
  },
}
</script>
