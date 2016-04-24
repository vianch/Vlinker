'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');

gulp.task('sass', function () {
    return gulp.src('./app/assets/styles/loader/loader.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./build/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./app/assets/styles/loader/loader.scss', ['sass']);
});

gulp.task('minify-css', function() {
    return gulp.src('./build/css/loader.css')
        .pipe(cleanCSS({debug: true}, function(details) {
            console.log(details.name + ': ' + details.stats.originalSize);
            console.log(details.name + ': ' + details.stats.minifiedSize);
        }))
        .pipe(gulp.dest('./build/css'));
});
