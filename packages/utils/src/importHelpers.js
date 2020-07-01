/**
 * Dynamically import files as component; raw code as string; or Vue Docgen JSON.
 * Supports `.vue`, `.jsx` & `.tsx` files.
 *
 * @param {string} filePath Relative from the project's 'src' folder.
 * @param {'vue' | 'jsx' | 'tsx'} extension The extension without `.`, eg. `'vue'`
 * @param {'component' | 'string' | 'vue-docgen'} importType
 * @example dynamicImport('examples/MyBtn/Example1.vue', 'vue', 'component')
 *   .then(componentExport => doSomething(componentExport))
 * @example <component :is="importedComponent" />
 * @returns {Promise<any>}
 */
export function dynamicImport (filePath, extension, importType) {
  if (extension === 'vue') {
    if (importType === 'vue-docgen') {
      return import(`!!@planetar/vue-simple-docgen-loader!src/${filePath.replace('.vue', '')}.vue`)
    }
    if (importType === 'string') {
      new Promise((resolve, reject) => {
        return import(
          /* webpackChunkName: "component-source-code" */
          /* webpackMode: "lazy-once" */
          `!raw-loader!src/${filePath.replace('.vue', '')}.vue`
        )
          .then(raw => resolve(raw.default))
          .catch(reject)
      })
    }
    return import(
      /* webpackChunkName: "component" */
      /* webpackMode: "lazy-once" */
      `src/${filePath.replace('.vue', '')}.vue`
    )
  }
  if (extension === 'jsx') {
    if (importType === 'vue-docgen') {
      return import(`!!@planetar/vue-simple-docgen-loader!src/${filePath.replace('.jsx', '')}.jsx`)
    }
    if (importType === 'string') {
      new Promise((resolve, reject) => {
        return import(
          /* webpackChunkName: "component-source-code" */
          /* webpackMode: "lazy-once" */
          `!raw-loader!src/${filePath.replace('.jsx', '')}.jsx`
        )
          .then(raw => resolve(raw.default))
          .catch(reject)
      })
    }
    return import(
      /* webpackChunkName: "component" */
      /* webpackMode: "lazy-once" */
      `src/${filePath.replace('.jsx', '')}.jsx`
    )
  }
  if (extension === 'tsx') {
    if (importType === 'vue-docgen') {
      return import(`!!@planetar/vue-simple-docgen-loader!src/${filePath.replace('.tsx', '')}.tsx`)
    }
    if (importType === 'string') {
      new Promise((resolve, reject) => {
        return import(
          /* webpackChunkName: "component-source-code" */
          /* webpackMode: "lazy-once" */
          `!raw-loader!src/${filePath.replace('.tsx', '')}.tsx`
        )
          .then(raw => resolve(raw.default))
          .catch(reject)
      })
    }
    return import(
      /* webpackChunkName: "component" */
      /* webpackMode: "lazy-once" */
      `src/${filePath.replace('.tsx', '')}.tsx`
    )
  }
  throw new Error('incorrect filePath. Your filepath must end in .vue, .jsx or .tsx')
}
