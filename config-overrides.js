module.exports = (defaultConfig) => {
  const config = { ...defaultConfig };


  config.optimization.splitChunks = {
    ...config.optimization.splitChunks,
    cacheGroups: {
      commons: {
        test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
      }
    }
  };

  config.resolve.alias = {
    api: 'assets/api',
    assets: 'assets',
    components: 'components',
    src: 'src',
  };
  return config;
};
