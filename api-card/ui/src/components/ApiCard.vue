<template>
  <div class="api-card" :id="kebabCase(title) + `-api`">
    <div class="_top">
      <div class="t-h4 mr-md">{{ title }} API</div>
      <!-- <PInput v-model="searchValue" :isSearch="true" /> -->
    </div>
    <div class="_bottom">
      <PList class="_tabs" v-model="activeTab" :items="categoryPListItems" />
      <QTabPanels class="_tab-panels" v-model="activeTab" animated vertical>
        <QTabPanel v-for="(schema, category) in schemaPerCategory" :name="category" :key="category">
          <div>{{ category }}</div>
        </QTabPanel>
      </QTabPanels>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import '../../../../styles/colors'
@import '../../../../styles/typography'
@import '../../../../styles/margin-padding'
@import '../../../../styles/shadows'

.api-card
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
</style>

<script>
import PInput from './atoms/PInput'
import PList from './atoms/PList'
import { QTabPanels, QTabPanel } from 'quasar'
import { isArray } from 'is-what'
import { kebabCase } from 'case-anything'
import sort from 'fast-sort'
import { parse } from 'vue-docgen-api'

export default {
  name: 'ApiCard',
  components: {
    PInput,
    PList,
    QTabPanels,
    QTabPanel,
  },
  props: {
    title: { type: String, required: true },
    /**
     * Relative from the `src` folder.
     * @example 'components/atoms/MyBtn.vue'
     */
    filePath: { type: String, required: true },
    propsSchema: {
      type: Array,
      // required: true,
      default: () => [
        { category: 'events' },
        { category: 'methods' },
        { category: 'style' },
        { category: 'content' },
      ],
    },
  },
  created () {
    const { parseComponent, filePath } = this
    const doc = parse(`src/${filePath}`)
    console.log(`doc → `, doc)
    // import(
    //   /* webpackChunkName: "components" */
    //   /* webpackMode: "lazy-once" */
    //   `${filePath}`
    // ).then(componentString => {
    //   this.component = componentString.default
    // })
    import(
      /* webpackChunkName: "components-source" */
      /* webpackMode: "lazy-once" */
      `!raw-loader!src/${filePath}`
    ).then(componentString => {
      parseComponent(componentString.default)
    })
  },
  data () {
    const { propsSeparateTab } = this
    return { searchValue: '', activeTab: '', component: null, tabs: [], parts: {} }
  },
  computed: {
    /**
     * @type {{ [category: string]: any }}
     */
    schemaPerCategory () {
      const { propsSchema } = this
      const schema = !isArray(propsSchema) ? Object.values(propsSchema) : propsSchema
      const perCat = schema.reduce((carry, blueprint) => {
        const { category, inheritedProp, fieldClasses } = blueprint
        // If it's an inheritedProp, add a specific indentifier
        if (inheritedProp) {
          fieldClasses.push(inheritedProp === true ? 'inherited-prop' : 'inherited-prop-modified')
        }
        if (!category) return carry
        const categoryArray = category.split('|')
        categoryArray.forEach(c => {
          if (!carry[c]) carry[c] = { schema: [], name: c }
          blueprint.sortFieldsOnInheritedOrNot = inheritedProp
          carry[c].schema.push(blueprint)
        })
        return carry
      }, {})
      Object.entries(perCat).forEach(([catKey, { schema }]) => {
        perCat[catKey].schema = sort(schema).by([
          { desc: 'sortFieldsOnInheritedOrNot' },
          { asc: 'label' },
        ])
      })
      return perCat
    },
    /**
     * @type {{ name: string, isDivider?: boolean }[]}
     */
    categoryPListItems () {
      const { schemaPerCategory } = this
      let categoryNames = Object.keys(schemaPerCategory)
      for (const specialCategory of ['methods', 'events']) {
        const index = categoryNames.indexOf(specialCategory)
        if (index > -1) {
          categoryNames.splice(index, 1)
          categoryNames.unshift(specialCategory)
        }
      }
      const categoryNamesMap = categoryNames.map(c => ({ name: c }))
      const indexFirstNonSpecialCat = categoryNames.findIndex(
        c => !['methods', 'events'].includes(c)
      )
      if (indexFirstNonSpecialCat > 0) {
        categoryNamesMap.splice(indexFirstNonSpecialCat, 0, { name: 'props', isDivider: true })
      }
      return categoryNamesMap
    },
  },
  methods: {
    kebabCase,
    parseComponent (componentCodeString) {
      const { parseSection } = this
      const template = parseSection('template', componentCodeString)
      const script = parseSection('script', componentCodeString)
      const style = parseSection('style', componentCodeString)

      this.parts = {
        template,
        script,
        style,
      }
      this.tabs = ['template', 'script', 'style'].filter(type => this.parts[type])
    },
    parseSection (section, componentCodeString) {
      const string = `(<${section}(.*)?>[\\w\\W]*<\\/${section}>)`,
        regex = new RegExp(string, 'g'),
        parsed = regex.exec(componentCodeString) || []

      return parsed[1] || ''
    },
  },
}
</script>
