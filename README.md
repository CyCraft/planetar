# Planetar 🪐

A framework that creates a centralised landing page of your design system ready for your apps and websites.

### Project setup

```
npm install --global lerna
```

- `lerna run`
  Run an npm script in each package that contains that script
- `lerna exec`
  Execute an arbitrary command in each package

Examples

Add a new package to `@planetar/api-card`

```
lerna add some-package --scope @planetar/api-card
```

Add a local package to `@planetar/api-card`

```
lerna add @planetar/atoms --scope @planetar/api-card
```
