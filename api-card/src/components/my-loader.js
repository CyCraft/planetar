// import { loader } from 'webpack'
// import { parse } from 'vue-docgen-api'
// import { generate } from 'escodegen'
// import toAst from 'to-ast'
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
  const docs = await parse(file)
  return `
        if (module.hot) {
            module.hot.accept([])
        }
        module.exports = ${generate(toAst(vsgDocs))}
    `
}
module.exports = loaderDocgen

// module.exports = {
//     default: loaderDocgen,
//     asyncLoader
// }

// export default function(this: loader.LoaderContext, source: string) {
//     const callback = this.async()
//     const cb = callback ? callback : () => null
//     asyncLoader
//         .call(this, source)
//         .then(res => cb(undefined, res))
//         .catch(e => {
//             throw e
//         })
// }

// export async function asyncLoader(this: loader.LoaderContext, source: string): Promise<string>{
//     const file = this.request.split('!').pop() as string
//     const docs = await parse(file);
//     return `
//         if (module.hot) {
//             module.hot.accept([])
//         }
//         module.exports = ${generate(toAst(vsgDocs))}
//     `;
// }
