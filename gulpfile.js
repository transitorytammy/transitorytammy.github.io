// Include gulp
var gulp = require('gulp');

// Include our Plugins
var eslint = require('gulp-eslint');
var scsslint = require('gulp-scss-lint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// js lint task
gulp.task('lint', function() {
  return gulp.src(['js/*.js', '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

// scss lint task
gulp.task('scss-lint', function() {
  return gulp.src('scss/*.scss')
    .pipe(scsslint())
    .pipe(scsslint.failReporter('E'))
});

// Compile our sass
gulp.task('sass', function() {
  return gulp.src('scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('css'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
  return gulp.src('js/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('dist'))
    .pipe(rename('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

// Watch files fo changes

gulp.task('watch', function() {
    gulp.watch('js/*.js', ['lint', 'scripts']);
    gulp.watch('/scss/*.scss', ['scss-lint']);
    gulp.watch('scss/*.scss', ['sass']);
});

// Default task
gulp.task('default', ['lint', 'scss-lint', 'sass', 'scripts', 'watch']);
