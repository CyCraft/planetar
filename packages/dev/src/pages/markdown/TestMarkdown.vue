<template>
  <q-page padding class="q-gutter-lg">
    <Markdown :exampleDescription="textWall" />
  </q-page>
</template>

<style lang="sass" scoped></style>

<script>
export default {
  name: 'TestMarkdown',
  data() {
    return {
      textWall: `
#Big Title
##Less Big Title
###Even Less Big Title
*italic text* **bold text** ~~strikethrough text~~
* bullet 1
* bullet 2
* bullet 3
\`\`\`js
const a = 1
\`\`\`

an html test:
\`\`\`html
&60;div\>Hi&60;/div\>
&60;br /\>
&60;script lang="js"\>
  const a = 1
&60;/script\>
\`\`\`
`,
    }
  },
}
</script>
