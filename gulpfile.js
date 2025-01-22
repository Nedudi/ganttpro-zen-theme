const { src, dest, series, watch } = require('gulp');
const plumber = require('gulp-plumber');
const gulpif = require('gulp-if');
const concat = require('gulp-concat');
const concatCss = require('gulp-concat-css');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');

const CSS_PATH = './src/css/';
const JS_PATH = './src/js/';

const mode = process.env.NODE_ENV;

function styles(cb) {
  return src(CSS_PATH + 'style.css')
    .pipe(plumber())
    .pipe(
      concatCss('./style.css', {
        rebaseUrls: false,
      })
    )
    .pipe(postcss([autoprefixer()]))
    .pipe(gulpif(mode === 'prod', cleanCSS()))
    .pipe(dest('./'));
}

function javascript(cb) {
  return src([JS_PATH + 'theme.js', JS_PATH + 'main.js', JS_PATH + 'navigation.js', JS_PATH + 'live-chat.js'])
    .pipe(plumber())
    .pipe(gulpif(mode === 'dev', sourcemaps.init()))
    .pipe(concat('script.js'))
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(gulpif(mode === 'dev', sourcemaps.write()))
    .pipe(gulpif(mode === 'prod', uglify()))
    .pipe(dest('./'));
}

function track(cb) {
  if (mode === 'prod') return cb();

  watch(CSS_PATH + '**/*.css').on('change', series(styles));
  watch(JS_PATH + '**/*.js').on('change', series(javascript));
}

exports.default = series(styles, javascript, track);
