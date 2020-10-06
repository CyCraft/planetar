<template>
  <QToggle class="planetar-toggle" v-bind="propsToPass" v-on="$listeners" />
</template>

<script>
import { QToggle } from 'quasar'

export default {
  name: 'PlanetarToggle',
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
