function parseComponent(componentCodeString) {
  const { stripJSDocDescription } = this
  const template = getTagHtmlFromCodeString('template', componentCodeString)
  let script = getTagHtmlFromCodeString('script', componentCodeString)
  const style = getTagHtmlFromCodeString('style', componentCodeString)
  const notAVueFile = !template && !script && !style
  if (notAVueFile) {
    script = componentCodeString
    if (stripJSDocDescription) {
      script = script.replace(jsDocBlockNoIndentation, '')
    }
    this.parts.script = codeToHtml(script, 'js')
    this.tabLabels.push('script')
    return
  }
  if (template) {
    this.parts.template = codeToHtml(template, 'html')
    this.tabLabels.push('template')
  }
  if (script) {
    if (stripJSDocDescription) {
      script = script.replace(jsDocBlockNoIndentation, '')
    }
    this.parts.script = codeToHtml(script, 'html')
    this.tabLabels.push('script')
  }
  if (style) {
    this.parts.style = codeToHtml(style, 'html')
    this.tabLabels.push('style')
  }
}
