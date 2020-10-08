<template>
  <div class="doc-page">
    <template v-for="(filePath, i) in filesList">
      <ExampleSection
        class="mb-xxxl"
        v-if="filePath.endsWith('.vue')"
        :filePath="filePath"
        hideTitle
        :key="filePath + i"
        @mounted="() => mountCount++"
      />
      <MarkdownSection
        class="mb-xxxl"
        v-if="filePath.endsWith('.md')"
        :filePath="filePath"
        :key="filePath + i"
        @mounted="() => mountCount++"
      />
    </template>
    <!-- api card section -->
    <div v-if="pathToApiCardSourceFile" class="mb-xxxl">
      <ApiComponentExample id="api-card" :filePath="pathToApiCardSourceFile" />
    </div>
  </div>
</template>

<style lang="sass" scoped>
// $

// .doc-page
</style>

<script>
import { kebabCase } from 'case-anything'
import { DOMRegex } from '../helpers/domHelpers'
import { ExampleSection } from '@planetar/example-card'
import { MarkdownSection } from '@planetar/markdown'
import { ApiComponentExample } from '@planetar/api-card'

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
     * (optional) A path to a vue file to generate an API Card at the bottom of the doc page.
     * @example 'components/atoms/MyButton.vue'
     */
    pathToApiCardSourceFile: { type: String },
  },
  data() {
    return { mountCount: 0 }
  },
  watch: {
    mountCount(count) {
      if (count >= this.filesList.length) {
        const titleEls = DOMRegex(/H1|H2|H3/, this.$el)
        this.parseTitleEls(titleEls)
      }
    },
  },
  computed: {
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
    /**
     * @param {HTMLElement[]} titleEls
     */
    parseTitleEls(titleEls) {
      const payloadTOC = titleEls.map((el) => {
        const text = el.innerText
        if (!el.id) {
          el.id = kebabCase(text)
        }
        const id = el.id
        const tag = el.tagName
        return { text, id, tag }
      })
      if (this.pathToApiCardSourceFile) {
        payloadTOC.push({
          text: 'API Card',
          id: 'api-card',
          tag: 'H1',
        })
      }
      /**
       * An array of objects with info on the H1, H2, H3 tags found on this DocPage after mounting. Emitted when all elements are mounted; it will await any dynamic imports.
       * @param {{ text: string, id: string, tag: string }[]}
       */
      this.$emit('TOC', payloadTOC)
    },
  },
}
</script>
