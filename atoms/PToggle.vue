<template>
  <QToggle class="p-toggle" v-bind="propsToPass" v-on="$listeners" />
</template>

<script>
import { QToggle } from 'quasar'

export default {
  name: 'PToggle',
  components: { QToggle },
  props: {},
  computed: {
    propsToPass () {
      const { $attrs } = this
      return { ...$attrs }
    }
  },
  methods: {}
}
</script>
