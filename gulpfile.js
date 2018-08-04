const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const browsersync = require('browser-sync');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const htmlmin = require('gulp-htmlmin');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');

gulp.task('browsersync', () => {
  browsersync.init({
    server: {
      baseDir: `./src`,
    },
    notify: false,
  });
});

gulp.task('compile:sass', () => {
  return gulp.src('./src/scss/main.scss')
    .pipe(sass({
      outputStyle: 'extended',
    }).on('error', sass.logError))
    .pipe(postcss([
      autoprefixer(),
    ]))
    .pipe(rename('style.css'))
    .pipe(gulp.dest(`./src/css`))
    .pipe(browsersync.stream());
});

gulp.task('watch:sass', () => {
  return gulp.watch('./src/**/*.scss', gulp.series('compile:sass'));
});

gulp.task('watch:html', () => {
  return gulp.watch(`./src/*.html`).on('change', browsersync.reload);
});

gulp.task('minify:sass', () => {
  return gulp.src('./src/scss/main.scss')
    .pipe(sass({
      outputStyle: 'extended',
    }).on('error', sass.logError))
    .pipe(postcss([
      autoprefixer(),
      cssnano(),
    ]))
    .pipe(rename('style.css'))
    .pipe(gulp.dest('./dist/assets/css'));
});

gulp.task('minify:html', () => {
  return gulp.src('./src/index.html')
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true,
    }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('minify:js', () => {
  return gulp.src('./src/assets/js/script.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist/assets/js'));
});

gulp.task('minify:images', () => {
  return gulp.src('./src/**/*.{png,gif,jpg}')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/'));
});

gulp.task('copy:manifest', () => {
  return gulp.src('./src/manifest.json')
    .pipe(gulp.dest('./dist/'));
});

gulp.task('dev', gulp.parallel('watch:html', 'watch:sass', 'browsersync'));

gulp.task('build', gulp.series('minify:html', 'minify:sass', 'minify:js', 'minify:images', 'copy:manifest'), (done) => {
  return done();
});
