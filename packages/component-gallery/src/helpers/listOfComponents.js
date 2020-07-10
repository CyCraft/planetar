/**
 * Returns an etry with the file category and the entry.
 *
 * @param {string} filePath
 * @returns {['atoms' | 'molecules' | 'atomExamples' | 'moleculeExamples', string]}
 */
function filePathToCategoryPathEntry(filePath) {
  const p = filePath.startsWith('./') ? filePath.slice(2) : filePath
  if (p.startsWith('examples/molecules/') || p.includes('/examples/molecules/')) return ['moleculeExamples', p] // prettier-ignore
  if (p.startsWith('examples/atoms/') || p.includes('/examples/atoms/')) return ['atomExamples', p]
  if (p.startsWith('molecules/') || p.includes('/molecules/')) return ['molecules', p]
  if (p.startsWith('atoms/') || p.includes('/atoms/')) return ['atoms', p]
}

/**
 * @param {string[]} componentFilesList Example: `['./atoms/MyButton.vue']`
 * @returns {{
    atoms: string[],
    atomExamples: string[],
    molecules: string[],
    moleculeExamples: string[],
  }}
 */
export function getComponentPaths(componentFilesList) {
  const base = { atoms: [], atomExamples: [], molecules: [], moleculeExamples: [] }
  return componentFilesList
    .filter((filePath) => !filePath.includes('index.js'))
    .reduce((carry, filePath) => {
      const [category, path] = filePathToCategoryPathEntry(filePath)
      carry[category].push(path)
      return carry
    }, base)
}
