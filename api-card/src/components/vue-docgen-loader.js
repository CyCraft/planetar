const vueDocgenApi = require('vue-docgen-api')
const { parse } = vueDocgenApi
const escodegen = require('escodegen')
const { generate } = escodegen
const toAst = require('to-ast')

function loaderDocgen (source) {
  const callback = this.async()
  const cb = callback ? callback : () => null
  asyncLoader
    .call(this, source)
    .then(res => cb(undefined, res))
    .catch(e => {
      throw e
    })
}

async function asyncLoader (source) {
  const file = this.request.split('!').pop()
  try {
    const docs = await parse(file)
    return `
          if (module.hot) {
              module.hot.accept([])
          }
          module.exports = ${generate(toAst(docs))}
      `
  } catch (error) {
    throw error
  }
}
module.exports = loaderDocgen
