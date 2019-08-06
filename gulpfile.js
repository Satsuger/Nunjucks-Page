const {parallel, task, src, dest, watch, series} = require('gulp');
const sass = require('gulp-sass');
const njk = require('gulp-nunjucks');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');        
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const del = require('del');

task('sass', () => {
  return src('./src/sass/**/*.scss')
  .pipe(sourcemaps.init())
  .pipe(sass.sync().on('error', sass.logError))
  .pipe(autoprefixer({
    cascade: false
  }))
  .pipe(cleanCSS({
    compatibility: 'ie8'
  })) 
  .pipe(concat('main.css'))
  .pipe(sourcemaps.write('./'))
  .pipe(dest('dist/css'))
  .pipe(browserSync.stream());
})

task('njk', () => {
  return src('./src/*.html')
  .pipe(njk.compile())
  .pipe(dest('dist'))
  .pipe(browserSync.stream());
})

task('clean', function() {
  return del('dist');
});

task('moveIndex', () => {
  return src('./src/index.html')
  .pipe(dest('dist'))
});

task('assets', () => {
  return src('./src/assets/**/**')
  .pipe(dest('dist'));
});

task('build', function() {
  return series('clean', 'sass', 'assets', 'moveIndex'); // ???????????????????????????????
});

task('watch', () => {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  });
  watch('./src/sass/**/*.scss', series('sass'));
  watch('./src/*.html', series('njk'));
})