const isProd = process.env.NODE_ENV === 'production';

const autoprefixer = require('autoprefixer-stylus');
const stylus = require('stylus');

function transform(content, id) {
  if (!id || id.endsWith('.styl')) {
    return new Promise((resolve, reject) => {
      var stylusOptions = {
        filename: id,
        compress: isProd
      };

      if (isProd) {
        stylusOptions.use = [ autoprefixer() ];
      }

      stylus.render(content, stylusOptions, (err, code) => {
        if (err) { return reject(err) }
        code = `export default ${JSON.stringify(code)};`;
        resolve({ code, map: { mappings: '' } });
      });
    });
  }
}

const plugin = {
  name: 'stylus',
  transform
}

module.exports = plugin;
