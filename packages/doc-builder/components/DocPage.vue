<template>
  <div class="doc-page">
    <template v-for="(filename, i) in chapterOrder">
      <ExampleSection :key="filename + i" />
      <MarkdownSection :key="filename + i" />
    </template>
    <!-- <div v-for="eg in pageSections" :key="routeName + eg" class="mb-xxxl">
      <h1 :id="eg">{{ spaceCase(pascalCase(eg)) }}</h1>
      <div class="column items-strech">
        <ExampleSection
          :filePath="`pages/${routeName}/${eg}.vue`"
          style="width: 100%"
          :hideTitle="true"
        />
      </div>
    </div> -->
    <!-- api card section -->
    <!-- <div class="mb-xxxl">
      <ApiComponentExample id="api-card" :filePath="filePathToCarbonCopySourceCode" />
    </div> -->
  </div>
</template>

<style lang="sass" scoped>
// $

// .doc-page
</style>

<script>
export default {
  name: 'DocPage',
  props: {
    /**
     * A path to a folder that will hold the files for this DocPage. It must be relative to the "src" folder.
     * @example 'pages/landing-page'
     */
    pathToDocPageFolder: { type: String, required: true },
    /**
     * The file names (with extension) inside the "pathToDocPageFolder". These files will become your rendered doc page.
     *
     * The files array can be a combination of .vue and .md files. Whenever it's a .vue file, it's rendered with <ExampleSection />. Whenever it's an .md file, it's rendered with <MarkdownSection />.
     * @type {string[]}
     */
    chapterOrder: { type: Array, required: true },
  },
  computed: {},
  methods: {},
}
</script>
