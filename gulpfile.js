'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function () {
    return gulp.src('./app/assets/styles/vlinker/gui.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./build/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./app/assets/styles/vlinker/gui.scss', ['sass']);
});
