<template>
  <QBtn :class="['ef-button', isLg ? '_lg' : '']" v-bind="propsToPass" v-on="$listeners" />
</template>

<style lang="sass">
.ef-button
  min-width: 150px
  min-height: 40px
  border-radius: 4px
  &._lg
    min-width: 280px
    min-height: 60px
  &.q-btn--rounded
    border-radius: 60px
</style>

<script>
export default {
  name: 'EfButton',
  inheritAttrs: false,
  props: {
    /**
     * @example 'Click me!'
     */
    btnLabel: { type: String, required: true },
    isLg: { type: Boolean, default: false },
    /**
     * 'onPrimary'は背景がprimary colorの場合に使う
     * @type {'primary' | 'onPrimary' | 'darkgrey'}
     */
    type: { type: String, default: 'primary' },
    disable: { type: Boolean, default: false },
  },
  computed: {
    propsToPass() {
      const { type, isLg } = this
      const buttonSize = isLg ? 'xl' : 'md'
      const isRounded = isLg
      const isElevated = isLg || type === 'onPrimary'
      return {
        ...this.$attrs,
        size: buttonSize,
        rounded: isRounded,
        color: this.buttonColor,
        unelevated: !isElevated,
        // props to pass
        label: this.btnLabel,
        disable: this.disable,
      }
    },
    buttonColor() {
      switch (this.type) {
        case 'darkgrey':
          return 'grey-dark'
        case 'onPrimary':
          return 'secondary'
        default:
          return 'primary'
      }
    },
  },
  methods: {},
}
</script>
