<template>
  <div>
    <div class="flex items-center q-gutter-lg mb-md">
      <div>
        <div class="text-body1 mb-sm">アクティブ / Active</div>
        <EfButton :isLg="true" btnLabel="次へ / Next" />
      </div>
      <div>
        <div class="text-body1 mb-sm">非アクティブ / Inactive</div>
        <EfButton :isLg="true" :disable="true" btnLabel="次へ / Next" />
      </div>
    </div>
    <div class="text-body1 text-text-light mb-xl">
      ページ遷移を主としたメインボタン / Main button for page transition
    </div>
  </div>
</template>

<script>
/**
 * ボタン / Buttonsの例
 */
export default {}
</script>
