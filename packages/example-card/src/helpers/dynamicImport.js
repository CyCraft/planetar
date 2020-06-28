/**
 * Dynamically import components as component or the raw code as string.
 *
 * @param {string} filePath
 * @param {string} extension
 * @param {'component' | 'string' | 'vue-docgen'} importType
 * @returns Either the component to bind with `<component is="" />` or the raw code.
 */
export function dynamicImport (filePath, extension, importType) {
  if (extension === 'vue') {
    if (importType === 'vue-docgen') {
      return import(
        `!!@planetar/vue-simple-docgen-loader!src/${filePath.replace(
          '.vue',
          ''
        )}.vue`
      )
    }
    if (importType === 'string') {
      return import(
        /* webpackChunkName: "component-source-code" */
        /* webpackMode: "lazy-once" */
        `!raw-loader!src/${filePath.replace('.vue', '')}.vue`
      )
    }
    return import(
      /* webpackChunkName: "component" */
      /* webpackMode: "lazy-once" */
      `src/${filePath.replace('.vue', '')}.vue`
    )
  }
  if (extension === 'jsx') {
    if (importType === 'vue-docgen') {
      return import(
        `!!@planetar/vue-simple-docgen-loader!src/${filePath.replace(
          '.jsx',
          ''
        )}.jsx`
      )
    }
    if (importType === 'string') {
      return import(
        /* webpackChunkName: "component-source-code" */
        /* webpackMode: "lazy-once" */
        `!raw-loader!src/${filePath.replace('.jsx', '')}.jsx`
      )
    }
    return import(
      /* webpackChunkName: "component" */
      /* webpackMode: "lazy-once" */
      `src/${filePath.replace('.jsx', '')}.jsx`
    )
  }
  if (extension === 'tsx') {
    if (importType === 'vue-docgen') {
      return import(
        `!!@planetar/vue-simple-docgen-loader!src/${filePath.replace(
          '.tsx',
          ''
        )}.tsx`
      )
    }
    if (importType === 'string') {
      return import(
        /* webpackChunkName: "component-source-code" */
        /* webpackMode: "lazy-once" */
        `!raw-loader!src/${filePath.replace('.tsx', '')}.tsx`
      )
    }
    return import(
      /* webpackChunkName: "component" */
      /* webpackMode: "lazy-once" */
      `src/${filePath.replace('.tsx', '')}.tsx`
    )
  }
  throw new Error(
    'incorrect filePath. Your filepath must end in .vue, .jsx or .tsx'
  )
}
