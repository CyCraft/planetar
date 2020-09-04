<template>
  <q-page padding class="q-gutter-lg">
    <CodeBlockSection filePath="pages/some/path/to.js" />
    <CodeBlockSection filePath="pages/some/path/to.html" />
    <!-- show as html -->
    <CodeBlockSection filePath="pages/some/path/to.vue" />

    <CodeBlockSection filePath="pages/some/path/to.css" />
    <!-- <MarkdownSection filePath="examples/TestInput/Blink.vue" /> -->
    <!-- <MarkdownSection :filePath="filePath" /> -->
  </q-page>
</template>

<style lang="sass" scoped></style>

<script>
export default {
  name: 'TestCodeBlockSection',
}
</script>
