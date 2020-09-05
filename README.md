# Planetar

A Vue framework for creating a design system styleguide with interactive component explorer 🪐

```sh
npm i planetar
```

## Meet the family

- [Magnetar](https://github.com/cycraft/magnetar) 🌟
  > A framework-agnostic syncing solution that auto-connects any DB/API with your local data store and has optimistic-UI built in
- [Blitzar](https://github.com/cycraft/blitzar) ⚡️
  > A Vue component collection for blitzing fast prototyping
- [Planetar](https://github.com/cycraft/planetar) 🪐
  > A Vue framework for creating a design system with interactive component explorer

## Add dependencies to certain packages

add a "local" dependency

```sh
lerna add @planetar/atoms --scope=@planetar/example-card
```

add an "external" dependency

```sh
lerna add snarkdown --scope=@planetar/example-card
```
