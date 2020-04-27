module.exports = (defaultConfig) => {
  const config = { ...defaultConfig };
  config.resolve.alias = {
    api: 'assets/api',
    assets: 'assets',
    components: 'components',
    src: 'src',
  };
  return config;
};
