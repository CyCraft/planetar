<template>
  <q-page padding class="q-gutter-lg">
    <h6>JavaScript</h6>
    <CodeBlock lang="js" content="const a = 1" />
    <!-- <CodeBlock lang="js">const a = 1</CodeBlock> -->

    <h6>HTML</h6>
    <CodeBlock lang="html" :content="htmlContent" />

    <h6>CSS</h6>
    <CodeBlock lang="css" :content="`.hello {
  color: goldenrod;
}`" />
    <!-- <CodeBlock lang="css">
      .hello {
      color: goldenrod;
      }
    </CodeBlock>-->
  </q-page>
</template>

<style lang="sass" scoped></style>

<script>
import { dynamicImport } from '@planetar/utils'

/**
 * tabLabels: 'template, script, style'
 * parts is the parsed html
 */
export default {
  created() {},
  data() {
    return {
      htmlContent: `&62;div>Hi&62;/div>\n&62;br />\n&62;script lang="js">\nconst a = 1\n&62;/script>`,
    }
  },
}
</script>
