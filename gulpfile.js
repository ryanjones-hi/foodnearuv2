var gulp = require('gulp');

let cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');


gulp.task('minify-css', () => {
  return gulp.src('www/build/main.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist'));
});

gulp.task('minify-js', () => {
  return gulp.src('www/build/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

