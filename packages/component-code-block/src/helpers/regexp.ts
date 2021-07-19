export function getTagHtmlFromCodeString(tagName: string, codeString = ''): string {
  const tag = `(<${tagName}(.*?)>([\\w\\W]*?)<\\/${tagName}>)`
  const regex = new RegExp(tag, 'g')
  const parsed = regex.exec(codeString) || []

  return parsed[1] || ''
}
