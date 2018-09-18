const isProd = process.env.NODE_ENV === 'production';

const autoprefixer = require('autoprefixer-stylus');
const stylus = require('stylus');

function transform(content, id) {
  if (id.endsWith('.styl')) {
    return new Promise((resolve, reject) => {
      stylusToCss(content, id)
        .then(_ => {
          _.code = `export default ${JSON.stringify(_.code)};`;

          resolve(_);
        })
        .catch(reject);
    });
  }
}

/**
 * Renders CSS from STYL.
 */
function stylusToCss (content, filename) {
  return new Promise ((resolve, reject) => {
    const stylusOptions = {
      filename,
      compress: isProd,
    };

    if (isProd) {
      stylusOptions.use = [autoprefixer()];
    }    

    stylus.render(content, stylusOptions, (err, code) => {
      if (err) {
        return reject(err)
      }
      resolve({
        code,
        map: {
          mappings: ''
        }
      });
    });    
  });
}

const plugin = {
  name: 'stylus',
  transform,
  stylusToCss
}

module.exports = plugin;
