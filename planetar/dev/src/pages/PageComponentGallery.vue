<template>
  <q-page padding>
    <ComponentGallery
      :componentFilesList="
        require.context('src/components', true, /^\.\/.*(\.vue)$/).keys()
      "
    />
  </q-page>
</template>
