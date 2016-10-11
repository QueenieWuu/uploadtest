var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');

gulp.task('style', function(){
	return gulp.src('static/style/*.css')
			.pipe(minifyCss())
			.pipe(gulp.dest('dist/bundle/'));
});

gulp.task('script', function(){
	return gulp.src('static/script/*.js')
			/*.pipe(uglify())*/
			.pipe(concat('core.js'))
			.pipe(gulp.dest('dist/bundle/'));
});