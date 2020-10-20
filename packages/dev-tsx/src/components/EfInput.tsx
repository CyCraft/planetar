import * as tsx from 'vue-tsx-support'
import { VNode } from 'vue'
import { QInput } from 'quasar'
import propType from 'vue-strict-prop'
import { isArray, isNumber } from 'is-what'

interface Events {
  onInput: (arg: any) => void
}

interface ComponentData {}

export default tsx.componentFactoryOf<Events>().create({
  name: 'EfInput',
  props: {
    outlined: propType<boolean>(Boolean).default(true),
    valueType: propType(String).optional,
    /**
     * The color of the input outline when active.
     * @type {'primary'|'secondary'}
     * @category style
     */
    color: propType(String).default('primary'),
  },
  data(): ComponentData {
    return {}
  },
  watch: {},
  computed: {
    propsForQInput(): { [key: string]: any } {
      // must make copy of original `rules` attr to avoid circular reactivity causing an endless loop
      let rules: any[] = isArray(this.$attrs.rules) ? [...this.$attrs.rules] : []
      if (this.valueType === 'number') {
        rules.push((val: string | number) => isNumber(val) || 'Must be a valid number')
      }
      return {
        ...this.$attrs,
        ...this.$props,
        rules,
      }
    },
    attrsForQInput(): { placeholder: string | undefined; [key: string]: any } {
      const { propsForQInput } = this
      return { placeholder: propsForQInput.placeholder }
    },
  },
  methods: {
    onInput(val: any) {
      if (this.valueType === 'number') val = Number(val)
      this.$emit('input', val)
    },
  },
  render(): VNode {
    const { propsForQInput, attrsForQInput, $listeners, onInput } = this
    return (
      <QInput props={propsForQInput} attrs={attrsForQInput} on={{ ...$listeners, input: onInput }}>
        <template slot="append">{this.$slots.append}</template>
      </QInput>
    )
  },
})
