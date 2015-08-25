/*
* Dependencias
*/
var 
	gulp = require('gulp'),
	//concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	//rename = require('gulp-rename'),
    typescript = require('gulp-typescript');

gulp.task('ugly', function () {
    gulp.src('src_ts/*.ts')
    .pipe(typescript({target: 'ES5', module: 'commonjs'}))
    .pipe(uglify())
    .pipe(gulp.dest('out_ugly/'))
})

gulp.task('tsc', function () {
    gulp.src('src_ts/*.ts')
    .pipe(typescript({target: 'ES5', module: 'commonjs'}))
    //.pipe(uglify())
    .pipe(gulp.dest('out_js/'))
})

gulp.task('default', function() {
	gulp.watch('src_ts/*.ts', ["tsc"]);
});
