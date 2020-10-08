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
