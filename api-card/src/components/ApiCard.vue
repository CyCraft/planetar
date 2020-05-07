<template>
  <div class="planetar-api-card" :id="kebabCase(fileName) + `-api`">
    <div class="_top">
      <div class="t-h4 mr-md">{{ fileName }} API</div>
      <!-- <PInput v-model="searchValue" :isSearch="true" /> -->
    </div>
    <div class="_bottom">
      <PList class="_tabs" v-model="activeTab" :items="categoryPListItems" />
      <QTabPanels class="_tab-panels" v-model="activeTab" animated vertical>
        <QTabPanel
          v-for="(schema, category) in categorySchemaMap"
          :name="category"
          :key="category"
          class="_tab-panel"
        >
          <CategoryPanel
            :schema="schema"
            :value="value"
            :mode="value ? 'edit' : 'view'"
            v-on="$listeners"
          />
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
import { isArray, isFullString } from 'is-what'
import { kebabCase } from 'case-anything'
import { propToPropSchema } from '../helpers/vueDocgenToEasyForms'
import { noRequiredPropExampleErrorMsg } from '../helpers/errors'
import '../types/vueDocgen.js'

function getCategoryPListItems (categorySchemaMap) {
  const fixedCategoryNames = ['description', 'slots', 'events', 'methods']
  // fixed cats
  const fixedCategories = fixedCategoryNames
    .filter(c => isArray(categorySchemaMap[c]) && categorySchemaMap[c].length)
    .map(c => ({ name: c }))
  // divider
  if (fixedCategories.length) {
    fixedCategories.push({ name: 'props', isDivider: true })
  }
  // prop cats
  const propCategories = Object.keys(categorySchemaMap)
    .filter(c => !fixedCategoryNames.includes(c))
    .map(c => ({ name: c }))
  return fixedCategories.concat(propCategories)
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
     * Relative from the `src` folder.
     * @example 'components/atoms/MyBtn.vue'
     */
    value: { type: Object },
  },
  created () {
    const { filePath, parseVueDocgenData } = this
    import(`!!./vue-docgen-loader!src/${filePath.replace('.vue', '')}.vue`)
      .then(vueDocgenData => parseVueDocgenData(vueDocgenData)) // prettier-ignore
  },
  data () {
    const { propsSeparateTab, filePath } = this
    const fileName = filePath
      .split('/')
      .slice(-1)[0]
      .replace('.vue', '')
    return {
      fileName,
      searchValue: '',
      activeTab: '',
      /**
       * @type {{ [category: string]: object[] }}
       */
      categorySchemaMap: {},
      /**
       * @type {{ name: string, isDivider?: boolean }[]}
       */
      categoryPListItems: [],
    }
  },
  computed: {},
  methods: {
    kebabCase,
    /**
     * @param {ComponentDoc} vueDocgenData
     */
    parseVueDocgenData (vueDocgenData = {}) {
      console.log(`vueDocgenData → `, vueDocgenData)
      const { categorySchemaMap, setExampleAsDefaultValue } = this
      const { description, props = [], methods = [], slots = [], events = [] } = vueDocgenData
      if (isFullString(description)) {
        this.$set(categorySchemaMap, 'description', [{ subLabel: description }])
      }
      props.forEach((prop) /* PropDescriptor */ => {
        if (prop.required) setExampleAsDefaultValue(prop)
        const schemaInfo = propToPropSchema(prop)
        const { categories, schema } = schemaInfo
        categories.forEach(category => {
          if (!(category in categorySchemaMap)) this.$set(categorySchemaMap, category, [])
          categorySchemaMap[category].push(schema)
        })
      })
      this.categoryPListItems = getCategoryPListItems(categorySchemaMap)
      if (!this.activeTab) this.activeTab = this.categoryPListItems[0].name
      this.$emit('ready')
    },
    /**
     * @param {PropDescriptor} prop
     */
    setExampleAsDefaultValue (prop) {
      const { name, tags } = prop
      try {
        const { example } = tags
        const defaultValue = example[0].description
        const model = { ...this.value, [name]: eval(defaultValue) }
        this.$emit('input', model)
      } catch (error) {
        console.error(noRequiredPropExampleErrorMsg)
      }
    },
  },
}
</script>
