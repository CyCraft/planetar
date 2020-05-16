import * as tsx from "vue-tsx-support"
import { VNode } from "vue"
import propType from "vue-strict-prop"
import EfInput from "../../components/EfInput"

interface Events {
  onInput: (arg: any) => void
}

interface ComponentData {
  value: string
}

/**
 * This example shows a secondary coloured input.
 */
export default tsx.componentFactoryOf<Events>().create({
    props: {},
    data(): ComponentData {
        return { value: '' }
    },
    watch: {},
    computed: {},
    methods: {},
    render(): VNode {
        return <EfInput v-model={this.value} color="secondary" />
    }
})
