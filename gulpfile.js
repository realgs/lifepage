const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const browsersync = require('browser-sync');

gulp.task('browsersync', () => {
  browsersync.init({
    server: {
      baseDir: './docs',
    },
    notify: false,
  });
});

gulp.task('scss', () => {
  return gulp.src('./src/scss/main.scss')
    .pipe(sass({
      outputStyle: 'nested',
    }).on('error', sass.logError))
    .pipe(rename('style.css'))
    .pipe(gulp.dest('./docs/css'))
    .pipe(browsersync.stream());
});

gulp.task('watch:scss', () => {
  gulp.watch('./src/**/*.scss', gulp.series('scss'));
});

gulp.task('watch:html', () => {
  gulp.watch("./docs/*.html").on('change', browsersync.reload);
});

gulp.task('dev', gulp.parallel('watch:html', 'watch:scss', 'browsersync'));
