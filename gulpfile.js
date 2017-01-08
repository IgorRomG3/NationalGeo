var gulp = require('gulp'),
  connect = require('gulp-connect'),
  less = require('gulp-less'),
  includer = require('gulp-htmlincluder');

gulp.task('connect', function() {
  connect.server({
    root: 'build',
    livereload: true
  });
});

gulp.task('less', function () {
  return gulp.src('dev/less/*.less')
    .pipe(less())
    .pipe(gulp.dest('build/css'))
	.pipe(connect.reload());
});

gulp.task('htmlIncluder', function() {
    gulp.src('dev/*.html')
    	.pipe(includer())
        .pipe(gulp.dest('build/'))
	    .pipe(connect.reload());
});

gulp.task('move', function () {
	gulp.src('dev/img/**/*.*')
	.pipe(gulp.dest('build/img/'))
	.pipe(connect.reload());
		
});

gulp.task('default', function () {
  gulp.start('connect', 'less', 'htmlIncluder','move'),
  gulp.watch(['./dev/less/**/*.less'], ['less']),
  gulp.watch(['./dev/**/*.html'], ['htmlIncluder']),
  gulp.watch(['./dev/img/*.*'], ['move']);
});