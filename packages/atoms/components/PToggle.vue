<template>
  <QToggle class="p-toggle" v-bind="propsToPass" v-on="$listeners" />
</template>

<script>
import { QToggle } from 'quasar'

export default {
  name: 'PToggle',
  components: { QToggle },
  props: {
    readonly: { type: Boolean, default: false },
  },
  computed: {
    propsToPass() {
      const { $attrs, readonly } = this
      return { disable: readonly, ...$attrs }
    },
  },
  methods: {},
}
</script>
