# Component ApiCard

[![npm](https://img.shields.io/npm/v/@planetar/api-card.svg?label=@planetar/api-card)](https://www.npmjs.com/package/@planetar/api-card)
[![npm](https://img.shields.io/npm/dt/@planetar/api-card.svg)](https://www.npmjs.com/package/@planetar/api-card)

# Component ApiCard

> Short description of the component

# Usage

```js
import Vue from 'vue'
import Plugin from '@planetar/api-card'
import '@planetar/api-card/dist/index.css'

Vue.use(Plugin)
```

Then use as `<ApiCard />`

**OR**:

```html
<script>
  import { ApiCard } from '@planetar/api-card'

  export default {
    components: {
      ApiCard,
    },
  }
</script>
```

## UMD variant

Exports `window.apiCard`.

Add the following tag(s):

```html
<head>
  <!-- at the bottom of head -->
  <link
    href="https://cdn.jsdelivr.net/npm/@planetar/api-card/dist/index.min.css"
    rel="stylesheet"
    type="text/css"
  />
</head>
<body>
  <!-- at end  bottom of body -->
  <script src="https://cdn.jsdelivr.net/npm/@planetar/api-card/dist/index.umd.min.js"></script>
</body>
```

# License

MIT (c) Luca Ban - Mesqueeb
