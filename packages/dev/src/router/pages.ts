/*
 * Export files list for /pages folder
 */

function kebabCase (str: string) {
  const result = str.replace(
    /[A-Z\u00C0-\u00D6\u00D8-\u00DE]/g,
    (match: string) => '-' + match.toLowerCase()
  )
  return str[0] === str[0].toUpperCase() ? result.substring(1) : result
}

function slugify (str: string) {
  return encodeURIComponent(
    String(str)
      .trim()
      .replace(/\s+/g, '-')
  )
}

const pages = require
  // @ts-ignore
  .context('../pages', true, /^\.\/.*\.vue$/)
  .keys()
  .map((page: string) => page.slice(2).replace('.vue', ''))
  .filter((page: string) => page !== 'Index')
  .map((page: string) => ({
    file: page,
    title: page + '.vue',
    path: slugify(kebabCase(page))
  })) as {
  file: string
  title: string
  path: string
}[]

export default pages
