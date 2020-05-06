# Component ExampleCard

[![npm](https://img.shields.io/npm/v/@planetar/example-card.svg?label=@planetar/example-card)](https://www.npmjs.com/package/@planetar/example-card)
[![npm](https://img.shields.io/npm/dt/@planetar/example-card.svg)](https://www.npmjs.com/package/@planetar/example-card)

# Component ExampleCard

> Short description of the component

# Usage

```js
import Vue from 'vue'
import Plugin from '@planetar/example-card'
import '@planetar/example-card/dist/index.css'

Vue.use(Plugin)
```

Then use as `<ExampleCard />`

**OR**:

```html
<script>
  import { ExampleCard } from '@planetar/example-card'

  export default {
    components: {
      ExampleCard
    }
  }
</script>
```

## UMD variant

Exports `window.exampleCard`.

Add the following tag(s):

```html
<head>
  <!-- at the bottom of head -->
  <link
    href="https://cdn.jsdelivr.net/npm/@planetar/example-card/dist/index.min.css"
    rel="stylesheet"
    type="text/css"
  />
</head>
<body>
  <!-- at end  bottom of body -->
  <script src="https://cdn.jsdelivr.net/npm/@planetar/example-card/dist/index.umd.min.js"></script>
</body>
```

# License

MIT (c) Luca Ban - Mesqueeb
