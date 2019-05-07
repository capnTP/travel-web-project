const webpackConfig = require('./config/webpack.config.dev.js');

module.exports = {
  sections: [
    {
      name: 'Shared',
      components: [
        'src/components/Button/index.jsx',
        'src/components/Checkbox/index.jsx',
        'src/components/Select/index.jsx',
        'src/components/TextInput/index.jsx',
        'src/components/TourCard/index.jsx',
        'src/components/Forms/Star/index.jsx',
      ],
    },
    {
      name: 'Forms',
      components: ['src/components/Forms/InputGroup/index.jsx'],
    },
    {
      name: 'Container specific',
      sections: [
        {
          name: 'Discover page',
          components: ['src/containers/Discover/CategoryTypeFilter/index.jsx'],
        },
      ],
    },
  ],
  getExampleFilename(componentPath) {
    return componentPath.replace(/index.jsx?$/, 'README.md');
  },
  webpackConfig,
};
