var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    babel = require("gulp-babel"),
    cache = require('gulp-cache'),
    image = require('gulp-image');
    // del = require('del')

gulp.task('browser-sync', function () {
  browserSync({
    server: {
      baseDir: './app'
    }
    // host: 'localhost',
    // notify: false,
    // port: 3000,
    // tunnel: true,
    // tunnel: 'my-test'
  });
});

gulp.task('html', function() {
  return gulp
    .src('./src/*.html')
    .pipe(gulp.dest('app'))
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('sass', function () {
  return gulp
    .src('./src/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./app'))
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('js', function () {
  return gulp
    .src('./src/js/*.js')
    .on('error', console.log)
    .pipe(concat('script.js'))
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('app'))
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('image', function () {
  gulp.src('./src/img/**/*')
    .pipe(image())
    .pipe(gulp.dest('./app/img'));
});

gulp.task('watch', ['browser-sync', 'html', 'sass', 'js', 'image'], function () {
  gulp.watch('./src/sass/*.scss', ['sass']);
  gulp.watch('./src/js/*.js', ['js']);
  gulp.watch('./src/*.html', ['html']);
});

gulp.task('clearcache', function () {
  return cache.clearAll()
});

gulp.task('default', ['watch'])
