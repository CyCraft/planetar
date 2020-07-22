const { parse } = require('vue-docgen-api')
const { generate } = require('escodegen')
const toAst = require('to-ast')

function loaderDocgen(source) {
  const callback = this.async()
  const cb = callback ? callback : () => null
  asyncLoader
    .call(this, source)
    .then((res) => cb(undefined, res))
    .catch((e) => {
      throw e
    })
}

async function asyncLoader(source) {
  const file = this.request.split('!').pop()
  try {
    if (!file.match(/\.vue|\.tsx|\.jsx/)) {
      throw new Error('Your file needs to be .vue|.jsx|.tsx')
    }
    const docs = await parse(file)
    return `
      if (module.hot) {
          module.hot.accept([])
      }
      module.exports = ${generate(toAst(docs))}
  `
  } catch (error) {
    console.error(`[vue-docgen-loader] error during import of file: ${file}\nerror:`, error)
    return `module.exports = {}`
  }
}
module.exports = loaderDocgen
