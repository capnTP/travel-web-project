# How to create a story
- create story file for a component, see [Writing Stories](https://storybook.js.org/basics/writing-stories/)
```
stories
└── YourAwesomeComponent.jsx
```
- locate component story by go to
```
.storybook
└── config.js
```

```js
function loadStories() {
  require('../stories/Button');
  require('../stories/Card');
  require('../stories/Colors');
+ require('../stories/YourAwesomeComponent.jsx');
}
```

- run storybook server
```sh
npm run storybook
```

# Guideline

- 1 story per 1 component
- if a story contains more than 1 file, group it as a folder, for example
```
YourAwesomeComponent
├── index.jsx
├── mockData.js
└── style.less
```
