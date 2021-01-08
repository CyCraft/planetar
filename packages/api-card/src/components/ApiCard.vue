<template>
  <div class="planetar-api-card" :id="kebabCase(fileName) + `-api`">
    <div class="_top">
      <div class="text-h4 mr-md">{{ fileName }} API</div>
      <PlanetarInput v-model="searchValue" :isSearch="true" :debounce="300" />
    </div>
    <div class="_bottom">
      <PlanetarList class="_tabs" v-model="activeTab" :items="categoryPlanetarListItems" />
      <QTabPanels class="_tab-panels" v-model="activeTab" animated vertical>
        <QTabPanel
          v-for="(schema, category) in categorySchemaMapFiltered"
          :name="category"
          :key="category"
          class="_tab-panel"
        >
          <CategoryPanel
            v-model="propsObject"
            :schema="schema"
            :mode="isPlainObject(value) ? 'edit' : 'view'"
          />
        </QTabPanel>
      </QTabPanels>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import 'node_modules/@planetar/styles/variables'

.planetar-api-card
  +C(background, 'white')
  min-width: 400px
  min-height: 400px
  max-height: 50vh
  border-radius: 18px
  overflow: hidden
  display: flex
  flex-direction: column
  +shadow-3()
  ._top
    min-height: fit-content // required on Safari to prevent _bottom to overtake space
    display: flex
    justify-content: space-between
    padding: $md
    padding-top: $lg
    +C(border-bottom, stone-dark, 1px solid)
  ._bottom
    min-height: 0 // required to force _bottom to stop at parent max-height
    flex: 1
    display: flex
    ._tabs
      +C(border-right, stone-dark, 1px solid)
      overflow-y: scroll
    ._tab-panels
      flex: 1
    ._tab-panel
      padding: 0
</style>

<script>
import { PlanetarInput, PlanetarList } from '@planetar/atoms'
import CategoryPanel from './atoms/CategoryPanel.vue'
import { QTabPanels, QTabPanel } from 'quasar'
import { isArray, isFullString, isString, isPlainObject } from 'is-what'
import { kebabCase } from 'case-anything'
import { mergeAndConcat } from 'merge-anything'
import { propToPropSchema } from '../helpers/vueDocgenToBlitzForm'
import { dynamicImport } from '@planetar/utils'
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
const fixedCatToCustomTag = (cat) => ({
  tags: { category: [{ description: cat, title: 'category' }] },
})

function getCategoryPlanetarListItems(categorySchemaMap) {
  // fixed cats
  const fixedCategories = fixedCategoryNames
    .filter((c) => isArray(categorySchemaMap[c]) && categorySchemaMap[c].length)
    .map((c, i) => ({ name: c, tag: i === 0 ? undefined : categorySchemaMap[c].length }))
  // divider
  if (fixedCategories.length) {
    fixedCategories.push({ name: 'props', isDivider: true })
  }
  // prop cats
  const propCategories = Object.keys(categorySchemaMap)
    .filter((c) => !fixedCategoryNames.includes(c))
    .map((c) => ({ name: c, tag: categorySchemaMap[c].length }))
  return fixedCategories.concat(propCategories)
}

/**
 * @param {string} hay
 * @param {string} needle
 * @returns {boolean}
 */
function checkIfContains(hay, needle) {
  return isString(hay) && hay.toLowerCase().includes(needle.toLowerCase())
}

export default {
  name: 'ApiCard',
  components: {
    PlanetarInput,
    PlanetarList,
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
     * If `undefined` no edit controls will be shown, and the ApiCard will just work like a static information card.
     */
    value: { type: [Object, undefined], default: undefined },
  },
  created() {
    const { filePath, parseVueDocgenData } = this
    const extension = filePath.split('.').slice(-1)[0]
    dynamicImport(filePath, extension, 'vue-docgen')
      .then(vueDocgenData => parseVueDocgenData(vueDocgenData)) // prettier-ignore
  },
  data() {
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
      get() {
        return this.value
      },
      set(newValue) {
        this.$emit('input', newValue)
      },
    },
    categorySchemaMapFiltered() {
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
    categoryPlanetarListItems() {
      const { categorySchemaMapFiltered } = this
      return getCategoryPlanetarListItems(categorySchemaMapFiltered)
    },
  },
  methods: {
    isPlainObject,
    kebabCase,
    /**
     * @param {ComponentDoc} vueDocgenData
     */
    parseVueDocgenData(vueDocgenData = {}) {
      if (process && process.env && process.env.DEV) console.log(`vueDocgenData → `, vueDocgenData)
      const { categorySchemaMap, getExample, value } = this
      const modelToEmit = { ...value }
      const {
        description,
        props = [],
        methods = [],
        slots = [],
        events = [],
        tags: componentJSDocTags = {},
      } = vueDocgenData
      if (isFullString(description)) {
        this.$set(categorySchemaMap, FIXED_CATS.description, [{ subLabel: description }])
      }
      const fixedCats = [
        ...slots.map((s) => mergeAndConcat(s, fixedCatToCustomTag(FIXED_CATS.slots))),
        ...events.map((e) => mergeAndConcat(e, fixedCatToCustomTag(FIXED_CATS.events))),
        ...methods.map((m) => mergeAndConcat(m, fixedCatToCustomTag(FIXED_CATS.methods))),
      ]
      ;[...props, ...fixedCats].forEach((prop /* PropDescriptor */, index) => {
        const schemaInfo = propToPropSchema(prop)
        const { categories, schema } = schemaInfo

        // only add to `modelToEmit` if it's an actual prop.
        const isProp = index < props.length
        if (isProp) {
          if (schema.defaultValue !== undefined) {
            modelToEmit[schema.id] = schema.defaultValue
          }
          if (schema.defaultValue === undefined) {
            modelToEmit[schema.id] = getExample(prop, prop.required)
          }
        }

        categories.forEach((category) => {
          if (!(category in categorySchemaMap)) this.$set(categorySchemaMap, category, [])
          categorySchemaMap[category].push(schema)
        })
      })
      // use top level example props for generating api-card example
      const { examples = [] } = componentJSDocTags
      if (examples.length) {
        try {
          const propsForApiCardExample = evaluateString(examples[0].content)
          Object.entries(propsForApiCardExample).forEach(([k, v]) => (modelToEmit[k] = v))
        } catch (error) {}
      }
      this.$emit('input', modelToEmit)
      this.$emit('mounted')
      this.$nextTick(() => {
        if (!this.activeTab) this.activeTab = (this.categoryPlanetarListItems[0] || {}).name || ''
      })
    },
    /**
     * @param {PropDescriptor} prop
     * @param {boolean} isRequired if not required it will not throw an error
     * @returns {*}
     */
    getExample(prop, isRequired) {
      const { name, tags } = prop
      try {
        const { example } = tags
        const defaultValue = example[0].description
        return defaultValue
      } catch (error) {
        if (!isRequired) return
        console.error(noRequiredPropExampleErrorMsg)
      }
    },
  },
}
</script>
