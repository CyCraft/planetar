import { kebabCase } from 'case-anything'

/**
 * @param {RegExp} regex
 * @param {HTMLElement} targetEl
 * @returns {HTMLElement[]}
 */
export function DOMRegex(regex, targetEl) {
  const output = []
  for (let el of targetEl.querySelectorAll('*')) {
    const classSelector = (el.getAttribute('class') || '')
      .split(' ')
      .map((c) => `.${c}`)
      .join('')
    const querySelector = el.tagName + classSelector
    if (regex.test(querySelector)) output.push(el)
  }
  return output
}

/**
 * Creates a TOC based on "chapter title" elements like H1, H2, H3, ...
 * @param {HTMLElement} targetEl the target element where it should go find all "chapter title" elements like H1, H2, H3, ...
 * @param {string[]} pathsToApiCardSourceFile
 * @returns {{ text: string, id: string, tag: string }[]} An array of objects with info on the H1, H2, H3 tags found on this DocPage after mounting. Emitted when all elements are mounted; it will await any dynamic imports.
 */
export function parseTitleEls(targetEl, pathsToApiCardSourceFile) {
  const titleEls = DOMRegex(/H1|H2|H3/, targetEl)
  const payloadTOC = titleEls.map((el) => {
    const text = el.textContent
    if (!el.id) {
      el.id = kebabCase(text)
    }
    const id = el.id
    const tag = el.tagName
    return { text, id, tag }
  })
  const apiCardCount = pathsToApiCardSourceFile.length
  if (apiCardCount) {
    payloadTOC.push({
      text: apiCardCount === 1 ? 'API Card' : 'API Cards',
      id: 'api-card',
      tag: 'H1',
    })
  }
  return payloadTOC
}
