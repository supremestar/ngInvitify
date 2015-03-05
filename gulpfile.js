// gulp
var gulp = require('gulp');

// plugins
var connect = require('gulp-connect');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var del = require('del');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var nodemon = require('gulp-nodemon')

// tasks
gulp.task('lint', function() {
  gulp.src(['./app/**/*.js', '!./app/bower_components/**'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('clean', function() {
    del(['./dist/*', './app/js/bundled.js'])
	,{force: true};
});

gulp.task('minify-css', function() {
  var opts = {comments:true,spare:true};
  gulp.src(['./app/**/*.css', '!./app/bower_components/**'])
    .pipe(minifyCSS(opts))
    .pipe(gulp.dest('./dist/'))
});

gulp.task('minify-js', function() {
  gulp.src(['./app/**/*.js', '!./app/bower_components/**'])
    .pipe(uglify({
      // inSourceMap:
      // outSourceMap: "app.js.map"
    }))
    .pipe(gulp.dest('./dist/'))
});

gulp.task('copy-bower-components', function () {
  gulp.src('./app/bower_components/**')
    .pipe(gulp.dest('dist/bower_components'));
});

gulp.task('copy-html-files', function () {
  gulp.src('./app/**/*.html')
    .pipe(gulp.dest('dist/'));
});

gulp.task('copy-api-files', function () {
  gulp.src('./api')
    .pipe(gulp.dest('dist/'));
});

gulp.task('copy-serverjs', function () {
  gulp.src('server.js')
    .pipe(gulp.dest('dist/'));
});

/*

gulp.task('connect', function () {
  connect.server({
    root: 'app/',
    port: 8888
  }); 
});


gulp.task('connectDist', function () {
  connect.server({
    root: 'dist/',
    port: 9999
  });
});

*/

gulp.task('connect', function () {
  nodemon({
    script: 'server.js',
    ext: 'js'
  }); 
});


gulp.task('browserify', function() {
  gulp.src(['app/js/main.js'])
  .pipe(browserify({
    insertGlobals: true,
    debug: true
  }))
  .pipe(concat('bundled.js'))
  .pipe(gulp.dest('./app/js'))
});

gulp.task('browserifyDist', function() {
  gulp.src(['app/js/main.js'])
  .pipe(browserify({
    insertGlobals: true,
    debug: true
  }))
  .pipe(concat('bundled.js'))
  .pipe(gulp.dest('./dist/js'))
});

// default task
gulp.task('default',
  ['clean', 'lint', 'browserify', 'connect']
);

// build task
gulp.task('build',
  ['lint', 'clean', 'minify-css', 'minify-js', 'browserifyDist', 'copy-html-files', 'copy-api-files', 'copy-serverjs', 'copy-bower-components']
);