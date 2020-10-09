<template>
  <q-page padding class="q-gutter-lg">
    <h6>Prop</h6>
    <Markdown :content="textWall" />
    <h6>Slot</h6>
    <Markdown>{{ textWall }}</Markdown>
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
<div>Hi</div>
<br />
<script>
  const a = 1
<\/script>
\`\`\`

1. this is a self closing tag: \`&#60;br /&#62;\`
2. this is a self closing tag: \`&lt;br /&gt;\`
3. this is a self closing tag: \`&LT;br /&GT;\`
4. this is a self closing tag: \`<br />\`
5. this is a self closing tag: \`<script>\`
6. this is a self closing tag: \`<script />\`
`,
    }
  },
}
</script>
