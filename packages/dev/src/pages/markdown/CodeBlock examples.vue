<template>
  <q-page padding class="q-gutter-lg">
    <h6>JavaScript</h6>
    <CodeBlock lang="js" content="const a = 1" />

    <h6>TypeScript</h6>
    <CodeBlock lang="ts" content="const a: number = 1" />

    <h6>HTML</h6>
    <CodeBlock lang="html" :content="htmlContent" />

    <h6>CSS</h6>
    <CodeBlock lang="css" :content="`.hello {
  color: goldenrod;
}`" />
  </q-page>
</template>

<style lang="sass" scoped></style>

<script>
export default {
  created() {},
  data() {
    return {
      // Note: the final / in the closing script tag breaks the following string
      htmlContent: `<div>Hi</div>\n<br />\n<script lang="js">\nconst a = 1\n<\/script>`,
    }
  },
}
</script>
