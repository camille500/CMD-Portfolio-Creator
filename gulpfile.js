/* LOAD ALL DEPENDENCIES
----------------------------------------- */
const gulp = require('gulp');
const sass = require('gulp-sass');

/* TASK FOR COMPILING SASS TO CSS
----------------------------------------- */
gulp.task('sass', function() {
  return gulp.src('src/style/index.scss')
    .pipe(sass())
    .pipe(gulp.dest('public/style'))
});

/* WATCH SCSS FILES
----------------------------------------- */
gulp.task('watch', function(){
  gulp.watch('src/style/**/*.scss', ['sass']);
});
