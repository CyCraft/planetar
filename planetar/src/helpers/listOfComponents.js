/**
 * @param {string[]} componentFilesList Example: `['./atoms/MyButton.vue']`
 * @returns {{
    atoms: string[],
    atomExamples: string[],
    molecules: string[],
    moleculeExamples: string[],
  }}
 */
export function getComponentPaths (componentFilesList) {
  const components = componentFilesList
    .filter(filePath => !filePath.includes('index.js'))
    .map(filePath => (filePath.startsWith('./') ? filePath.slice(2) : filePath))

  const atoms = components.filter(filePath => filePath.startsWith('atoms/'))
  const molecules = components.filter(
    filePath =>
      filePath.startsWith('molecules/') || filePath.includes('/molecules/')
  )
  const atomExamples = components.filter(
    filePath =>
      filePath.startsWith('examples/atoms/') ||
      filePath.includes('/examples/atoms/')
  )
  const moleculeExamples = components.filter(
    filePath =>
      filePath.startsWith('examples/molecules/') ||
      filePath.includes('/examples/molecules/')
  )
  return { atoms, atomExamples, molecules, moleculeExamples }
}
