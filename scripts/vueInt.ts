import * as fs from 'fs-extra'

const folders = [
  'packages/api-card',
  'packages/atoms',
  'packages/component-gallery',
  'packages/doc-builder',
  'packages/example-card',
  'packages/markdown',
]

const attributesObject = folders.reduce((carry, folder) => {
  const attributes = fs.readJsonSync(`${folder}/vetur/attributes.json`)
  return { ...carry, ...attributes }
}, {} as Record<string, any>)

const tagsObject = folders.reduce((carry, folder) => {
  const tags = fs.readJsonSync(`${folder}/vetur/tags.json`)
  return { ...carry, ...tags }
}, {} as Record<string, any>)

fs.writeFileSync(
  'packages/planetar/vetur/attributes.json',
  JSON.stringify(attributesObject, undefined, 2)
)
fs.writeFileSync('packages/planetar/vetur/tags.json', JSON.stringify(tagsObject, undefined, 2))
