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
    <div class="flex q-gutter-lg mb-md">
      <div>
        <div class="text-body1 mb-sm">アクティブ / Active</div>
        <div class="flex q-gutter-md">
          <EfButton btnLabel="ボタン / Button" />
          <EfButton type="darkgrey" btnLabel="ボタン / Button" />
          <EfButton type="onPrimary" btnLabel="選択肢を確認 / Confirm your choice" />
        </div>
      </div>
      <div>
        <div class="text-body1 mb-sm">非アクティブ / Inactive</div>
        <EfButton disable btnLabel="ボタン / Button" />
      </div>
    </div>
    <div class="text-body1 text-text-light mb-md">
      ページ内でアクションを起こすサブボタン / Sub button for taking action on a page
    </div>
  </div>
</template>

<script>
/**
 * ボタン / Buttonsの例
 */
export default {}
</script>
