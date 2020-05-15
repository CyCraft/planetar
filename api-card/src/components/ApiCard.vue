<template>
  <div class="planetar-api-card" :id="kebabCase(fileName) + `-api`">
    <div class="_top">
      <div class="t-h4 mr-md">{{ fileName }} API</div>
      <PInput v-model="searchValue" :isSearch="true" :debounce="300" />
    </div>
    <div class="_bottom">
      <PList class="_tabs" v-model="activeTab" :items="categoryPListItems" />
      <QTabPanels class="_tab-panels" v-model="activeTab" animated vertical>
        <QTabPanel
          v-for="(schema, category) in categorySchemaMapFiltered"
          :name="category"
          :key="category"
          class="_tab-panel"
        >
          <CategoryPanel v-model="propsObject" :schema="schema" :mode="value ? 'edit' : 'view'" />
        </QTabPanel>
      </QTabPanels>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import '../../../styles/colors'
@import '../../../styles/typography'
@import '../../../styles/margin-padding'
@import '../../../styles/shadows'

.planetar-api-card
  +shadow-3()
  min-width: 400px
  min-height: 400px
  max-height: 50vh
  border-radius: 18px
  overflow: hidden
  display: flex
  flex-direction: column
  ._top
    display: flex
    justify-content: space-between
    padding: $md
    padding-top: $lg
    border-bottom: 1px solid $c-stone-dark
  ._bottom
    flex: 1
    min-height: 0 // required to force _bottom to stop at parent max-height
    display: flex
    ._tabs
      border-right: 1px solid $c-stone-dark
      overflow-y: scroll
    ._tab-panels
      flex: 1
    ._tab-panel
      padding: 0
</style>

<script>
import PInput from '../../../atoms/PInput.vue'
import PList from '../../../atoms/PList.vue'
import CategoryPanel from './atoms/CategoryPanel.vue'
import { QTabPanels, QTabPanel } from 'quasar'
import { isArray, isFullString, isString } from 'is-what'
import { kebabCase } from 'case-anything'
import { mergeAndConcat } from 'merge-anything'
import { propToPropSchema } from '../helpers/vueDocgenToEasyForms'
import { noRequiredPropExampleErrorMsg } from '../helpers/errors'
import '../types/vueDocgen.js'
import { evaluateString } from '../helpers/evaluateString'

const FIXED_CATS = {
  description: 'description',
  slots: 'slots',
  events: 'events',
  methods: 'methods',
}
const fixedCategoryNames = Object.values(FIXED_CATS)
const fixedCatToCustomTag = cat => ({
  tags: { category: [{ description: cat, title: 'category' }] },
})

function getCategoryPListItems (categorySchemaMap) {
  // fixed cats
  const fixedCategories = fixedCategoryNames
    .filter(c => isArray(categorySchemaMap[c]) && categorySchemaMap[c].length)
    .map((c, i) => ({ name: c, tag: i === 0 ? undefined : categorySchemaMap[c].length }))
  // divider
  if (fixedCategories.length) {
    fixedCategories.push({ name: 'props', isDivider: true })
  }
  // prop cats
  const propCategories = Object.keys(categorySchemaMap)
    .filter(c => !fixedCategoryNames.includes(c))
    .map(c => ({ name: c, tag: categorySchemaMap[c].length }))
  return fixedCategories.concat(propCategories)
}

/**
 * @param {string} hay
 * @param {string} needle
 * @returns {boolean}
 */
function checkIfContains (hay, needle) {
  return isString(hay) && hay.toLowerCase().includes(needle.toLowerCase())
}

function dynamicImportComponent (filePath, extension) {
  if (extension === 'vue') {
    return import(`!!@planetar/vue-simple-docgen-loader!src/${filePath.replace('.vue', '')}.vue`)
  }
  if (extension === 'jsx') {
    return import(`!!@planetar/vue-simple-docgen-loader!src/${filePath.replace('.jsx', '')}.jsx`)
  }
  if (extension === 'tsx') {
    return import(`!!@planetar/vue-simple-docgen-loader!src/${filePath.replace('.tsx', '')}.tsx`)
  }
  throw new Error('incorrect filePath. Your filepath must end in .vue, .jsx or .tsx')
}

export default {
  name: 'ApiCard',
  components: {
    PInput,
    PList,
    QTabPanels,
    QTabPanel,
    CategoryPanel,
  },
  props: {
    /**
     * Relative from the `src` folder.
     * @example 'components/atoms/MyBtn.vue'
     */
    filePath: { type: String, required: true },
    /**
     * The props object to be synced with whatever can be written in the API Card input fields
     * This object will be evaluated before emited via $emit('input', parse(value))
     */
    value: { type: Object, required: true },
  },
  created () {
    const { filePath, parseVueDocgenData } = this
    const extension = filePath.split('.').slice(-1)[0]
    dynamicImportComponent(filePath, extension)
      .then(vueDocgenData => parseVueDocgenData(vueDocgenData)) // prettier-ignore
  },
  data () {
    const { propsSeparateTab, filePath } = this
    const fileName = filePath
      .split('/')
      .slice(-1)[0]
      .replace('.vue', '')
      .replace('.jsx', '')
      .replace('.tsx', '')
    return {
      fileName,
      searchValue: '',
      activeTab: '',
      /**
       * @type {{ [category: string]: object[] }}
       */
      categorySchemaMap: {},
    }
  },
  computed: {
    propsObject: {
      get () {
        return this.value
      },
      set (newValue) {
        this.$emit('input', newValue)
      },
    },
    categorySchemaMapFiltered () {
      const { categorySchemaMap, searchValue: s } = this
      if (!s) return categorySchemaMap
      return Object.entries(categorySchemaMap).reduce((carry, [category, schema]) => {
        const searchIncludesCategory = checkIfContains(category, s)
        if (category === FIXED_CATS.description || searchIncludesCategory) {
          carry[category] = schema
          return carry
        }
        const check = ({ label, subLabel }) =>
          checkIfContains(label, s) || checkIfContains(subLabel, s)
        const schemaFiltered = schema.filter(check)
        if (schemaFiltered.length) {
          carry[category] = schemaFiltered
        }
        return carry
      }, {})
    },
    /**
     * @type {{ name: string, isDivider?: boolean }[]}
     */
    categoryPListItems () {
      const { categorySchemaMapFiltered } = this
      return getCategoryPListItems(categorySchemaMapFiltered)
    },
  },
  methods: {
    kebabCase,
    /**
     * @param {ComponentDoc} vueDocgenData
     */
    parseVueDocgenData (vueDocgenData = {}) {
      console.log(`vueDocgenData → `, vueDocgenData)
      const { categorySchemaMap, getExample, value } = this
      const modelToEmit = { ...value }
      const {
        description,
        props = [],
        methods = [],
        slots = [],
        events = [],
        tags: componentJSDocTags,
      } = vueDocgenData
      if (isFullString(description)) {
        this.$set(categorySchemaMap, FIXED_CATS.description, [{ subLabel: description }])
      }
      const fixedCats = [
        ...slots.map(s => mergeAndConcat(s, fixedCatToCustomTag(FIXED_CATS.slots))),
        ...events.map(e => mergeAndConcat(e, fixedCatToCustomTag(FIXED_CATS.events))),
        ...methods.map(m => mergeAndConcat(m, fixedCatToCustomTag(FIXED_CATS.methods))),
      ]
      ;[...props, ...fixedCats].forEach((prop /* PropDescriptor */) => {
        const schemaInfo = propToPropSchema(prop)
        const { categories, schema } = schemaInfo
        if (schema.default !== undefined) {
          modelToEmit[schema.id] = schema.default
        }
        if (prop.required && schema.default === undefined) {
          modelToEmit[schema.id] = getExample(prop)
        }
        categories.forEach(category => {
          if (!(category in categorySchemaMap)) this.$set(categorySchemaMap, category, [])
          categorySchemaMap[category].push(schema)
        })
      })
      if (!this.activeTab) this.activeTab = this.categoryPListItems[0].name
      // use top level example props for generating api-card example
      const { examples = [] } = componentJSDocTags
      if (examples.length) {
        try {
          const propsForApiCardExample = evaluateString(examples[0].content)
          Object.entries(propsForApiCardExample).forEach(([k, v]) => (modelToEmit[k] = v))
        } catch (error) {}
      }
      this.$emit('input', modelToEmit)
      this.$emit('ready')
    },
    /**
     * @param {PropDescriptor} prop
     * @returns {*}
     */
    getExample (prop) {
      const { name, tags } = prop
      try {
        const { example } = tags
        const defaultValue = example[0].description
        return defaultValue
      } catch (error) {
        console.error(noRequiredPropExampleErrorMsg)
      }
    },
  },
}
</script>
