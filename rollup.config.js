const info = require('./package.json');

export default {
  entry: 'src/deltas.js',
  dest: 'dist/deltas.js',
  format: 'umd',
  globals: [
    'window'
  ],
  indent: true,
  useStrict: true,
  moduleName: info.name,
  banner: `/* ${info.name} v${info.version} - 2016 Jeremias Menichelli - MIT License */`
};
