<template>
  <div class="planetar-api-component-example column flex-center">
    <template v-if="exampleComponent && apiCardReady">
      <div class="t-h6 mb-lg" @click="togglePreviewStyle">Interactive preview</div>
      <component :is="exampleComponent" v-bind="props" :style="previewStyle" />
    </template>
    <div class="t-h6 my-lg">Info card</div>
    <ApiCard
      :filePath="filePath"
      v-model="props"
      @ready="apiCardReady = true"
      style="width: 100%"
    />
  </div>
</template>

<script>
import ApiCard from './ApiCard.vue'
export default {
  name: 'ApiComponentExample',
  components: { ApiCard },
  props: {
    /**
     * Relative from the `src` folder.
     * @example 'examples/MyBtn/Example1.vue'
     */
    filePath: { type: String, required: true },
  },
  created () {
    const { filePath } = this
    import(
      /* webpackChunkName: "component" */
      /* webpackMode: "lazy-once" */
      `src/${filePath.replace('.vue', '')}.vue`
    ).then(componentExport => {
      this.exampleComponent = componentExport.default
    })
  },
  data () {
    return {
      exampleComponent: null,
      props: {},
      model: '',
      previewStyle: '',
      apiCardReady: false,
    }
  },
  methods: {
    togglePreviewStyle () {
      if (this.previewStyle === '') {
        this.previewStyle = 'width:100%'
      } else {
        this.previewStyle = ''
      }
    },
  },
}
</script>
