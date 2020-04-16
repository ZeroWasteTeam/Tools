module.exports = {
    entry: './src/index.js',
    output: {
      //path: './dist',
      filename: 'main.js',
      libraryTarget: 'var',
      library: 'EntryPoint'
    }
  };