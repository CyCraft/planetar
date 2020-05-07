import { isUndefined, isFunction, isArray } from 'is-what'

// export interface PropDescriptor extends Descriptor {
// 	type?: { name: string; func?: boolean }
// 	description?: string
// 	required?: boolean
// 	defaultValue?: { value: string; func?: boolean }
// 	tags?: { [title: string]: BlockTag[] }
// 	values?: string[]
// 	name: string
// }

/**
 * @param {object} vueDocgenProp
 * @returns {{categories: string[], schema: object}} EasyForm schema blueprint
 */
export function propToPropSchema (vueDocgenProp) {
  // get the documentation I want to use from the vueDocgenProp
  const {
    description,
    type = { name: 'any' },
    defaultValue = {},
    values = [],
    tags: customTags = {},
    name: propName,
  } = vueDocgenProp
  // format the top level tags
  const types = type.name.split('|')
  function typeIs (_type) {
    return types.includes(_type) && _type.length === 1
  }
  // get the documentation I want to use from the custom tags
  const _inheritedProp = customTags.inheritedProp || [{ description: false }]
  const _examples = customTags.example || []
  const _categories = customTags.category || [{ description: 'general' }]
  // format the custom tags for usage
  const inheritedProp = _inheritedProp[0].description
  const examples = _examples.map(e => e.description)
  const categories = _categories.map(c => c.description)

  // whatever the prop is, default to an 'input' EasyField
  const events = {}
  let component = 'PInput'
  let subLabel = description
  let options,
    standout,
    disable,
    parseInput,
    parseValue,
    autogrow,
    debounce,
    span,
    emitValue,
    inputType
  let outlined = true
  let fieldClasses = []
  const _df = defaultValue.value
  let _default = _df === true || undefined
  // If it has a default, write it in the description
  if (!isUndefined(_df))
    subLabel += `\n\nDefault: \`${isFunction(_df) ? JSON.stringify(_df()) : _df}\``
  // if the prop is a Boolean, show this as a 'toggle' EasyField
  if (types.includes('boolean')) {
    component = 'PToggle'
    _default = _df === true
  }
  // if it's a Number field
  if (typeIs('number')) {
    inputType = 'number'
    parseInput = Number
  }
  // if the prop has a fixed set of possible values, show this as an 'option' EasyField
  const propHasValues = isArray(values) && values.length
  if (propHasValues) {
    component = 'PSelect'
    emitValue = true
    options = values.map(v => ({ label: v, value: v }))
  }
  // Create a special input for defining arrays and/or objects
  if (
    typeIs('array') ||
    typeIs('object') ||
    typeIs('function') ||
    (isArray(types) && ['array', 'object'].some(t => types.includes(t)) && types.length === 2)
  ) {
    // events.blur = (e, val) => console.log(stringToJs(val))
    outlined = false
    standout = true
    debounce = 500
    parseInput = stringToJs
    parseValue = JSON.stringify
    autogrow = true
  }
  if (examples.length) subLabel += `\n\nExamples: \`${examples.join('` | `')}\``
  // Don't allow editing props that accept functions.
  // todo: be able to parse functions
  if (typeIs('function')) disable = true
  // Create the EasyField schema for the prop
  const schema = {
    id: propName,
    component,
    type: inputType,
    label: propName,
    subLabel,
    inheritedProp,
    options,
    outlined,
    standout,
    disable,
    parseInput,
    parseValue,
    autogrow,
    fieldClasses,
    debounce,
    events,
    span,
    emitValue,
    // if the prop is `true` by default, set to true
    default: _default,
    // defaults
    hasMarkdown: true,
  }
  return { categories, schema }
}
