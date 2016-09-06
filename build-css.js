var fs = require('fs');
var lint = require('./lint-css.js');
var log = require('npmlog');
var autoprefixer = require('autoprefixer');
var postcss = require('postcss');
var svg = require('postcss-svg');
var notifier = require('node-notifier');
var sass = require('node-sass');
var watch = require('watch');
var calc = require('postcss-calc');
var argv = require('minimist')(process.argv.slice(2), {
  alias: {
    'n': 'notify',
    'w': 'watch'
  }
});

var mainInCss = '_src/core/main.scss';
var mainOutCss = 'dist/bundle.css';

var editorInCss = '_src/core/editor.scss';
var editorOutCss = 'dist/editor.css';

function parseSass(inFile, outFile) {
  sass.render({
    file: inFile,
    includePaths: require('node-neat').includePaths,
    outFile: outFile,
    outputStyle: 'nested',
    sourceMap: true,
    sourceMapEmbed: true
  }, function buildCss(err, result) {
    if (err) {
      if (argv.n) {
        notifier.notify({
          'title': 'Sass broke :(',
          'message': err.line + ':' + err.column + ' ' + err.message
        });
      }
      log.error(err.line + ':' + err.column, err.message);
      throw new Error(err);
    }

    postcss()
      .use(autoprefixer({
        browsers: ['> 1%', 'last 2 versions', 'Firefox ESR'],
        remove: true
      }))
      .use(svg({
        paths: ['_src/images/icons']
      }))
      .use(calc())
      .process(result.css, {
        from: inFile,
        to: outFile,
        map: {inline: false}
      })
      .then(function handleResult(r) {
        fs.writeFile(outFile, r.css, function handleWriteErrors(error) {
          if (error) {
            if (argv.n) {
              notifier.notify({
                'title': 'Write error',
                'message': error
              });
            }
            log.error(false, error);
            throw error;
          }
          log.info(false, outFile + ' written successfully');
        });

        fs.writeFile(outFile + '.map', r.map, function handleWriteErrors(error) {
          if (error) {
            log.error(false, error);
            throw error;
          }
          log.info(false, outFile + '.map' + ' written successfully');
        });
      });
  });
}

parseSass(mainInCss, mainOutCss);
parseSass(editorInCss, editorOutCss);

if (argv.w) {
  watch.watchTree(
    '_src',
    {
      'ignoreDotFiles': true
    },
    function handleChanges(f) {
      if (typeof f === 'string') {
        parseSass(mainInCss, mainOutCss);
        parseSass(editorInCss, editorOutCss);
      }
    }
  );
}
