<template>
  <h3>Basic Example</h3>
  <NCard title="Song of" style="margin-bottom: 16px">
    <NTabs type="line">
      <NTabPane name="oasis" tab="Oasis">Wonderwall</NTabPane>
      <NTabPane name="the beatles" tab="the Beatles">Hey Jude</NTabPane>
      <NTabPane name="jay chou" tab="Jay Chou">Qilixiang</NTabPane>
    </NTabs>
  </NCard>
</template>

<script lang="ts">
import { NCard, NTabs, NTabPane } from 'naive-ui'
import { defineComponent, reactive, toRefs } from 'vue'

const tabs = ['A', 'B', 'C']

export default defineComponent({
  name: 'Example',
  components: { NCard, NTabs, NTabPane },
  setup() {
    const state = reactive({
      selectedTab: tabs[1],
    })
    return {
      tabs,
      ...toRefs(state),
    }
  },
})
</script>

<style scoped>
.tab {
  padding: 10px 20px;
}
</style>
