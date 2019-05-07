# components guideline

## To make this project well structured and easy to understand and refactoring,
a component should be used across multiple containers, for example `Select` component used in both `Tour` and `Account` page can be put into this folder

([see `/containers` README](../containers/README.md) for more detail)


## To encourage reusing of a component and to prevent re-creating same component,
a component should be documented properly

### how to create document
- add `README.md` for the component demonstration. [see example](https://react-styleguidist.js.org/docs/documenting.html)
- go to `theasia/styleguide.config.js` and put component path to config __(this is temporarily, in the future you should not need to update anything here)__

for example
```js
module.exports = {
  components: [
    'src/components/Button/index.jsx',
    'src/components/Select/index.jsx',
    'src/components/Forms/Star/index.jsx',
+   'src/components/YourAwesomeComponent.jsx',
  ],
```

to run styleguidist local server
```sh
npm run doc:components
```

then go to [`http://localhost:6060`](http://localhost:6060/)
