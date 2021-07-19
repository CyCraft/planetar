<template>
  <div class="">
    <ComponentCodeBlock
      :importComponentRawFn="() => import('./components/PTabs2.vue?raw')"
      :importComponentInstanceFn="() => import('./components/PTabs2.vue')"
    />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  padding: 1rem;
}
</style>

<script lang="ts">
import { ComponentCodeBlock } from '@planetar/component-code-block'
import { defineComponent } from 'vue'
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'

export default defineComponent({
  name: 'App',
  components: {
    ComponentCodeBlock,
  },
})
</script>
