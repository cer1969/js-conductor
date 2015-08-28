/*
* Dependencias
*/
var 
	gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
    typescript = require('gulp-typescript'),
	del = require('del');

//----------------------------------------------------------------------------------------

var cx_files = [
    'vconcat/src/checker.ts',
    'vconcat/src/constants.ts',
    'vconcat/src/category.ts',
    'vconcat/src/conductor.ts',
    'vconcat/src/currentcalc.ts',
]

gulp.task('vc-make', function () {
    var step1 = gulp.src(cx_files).pipe(concat('cx.ts'));
    
    step1.pipe(gulp.dest('vconcat/src/'));
    
    var step2 = step1.pipe(typescript({target: 'ES5', module: 'commonjs'}))
    .pipe(gulp.dest('vconcat/out/'));
    
    step2.pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('vconcat/out/'));
})

gulp.task('vc-make-watch', function() {
	gulp.watch(cx_files, ['vc-make']);
});

gulp.task('vc-test', function () {
    gulp.src('vconcat/src/test*.ts')
    .pipe(typescript({target: 'ES5', module: 'commonjs'}))
    .pipe(gulp.dest('vconcat/out/'))
})

gulp.task('vc-test-watch', function() {
	gulp.watch('vconcat/src/test*.ts', ['vc-test']);
});

gulp.task('vc-clean', function (cb) {
	del([
	    'vconcat/src/cx.ts',
	    'vconcat/out/*.js',
	], cb);
})

gulp.task('vc-watch', function() {
	gulp.watch(cx_files, ['vc-make']);
	gulp.watch('vconcat/src/test*.ts', ['vc-test']);
});


//----------------------------------------------------------------------------------------

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

gulp.task('tsc_2', function () {
    gulp.src(['src_ts_2/checker.ts', 
              'src_ts_2/constants.ts', 
              'src_ts_2/category.ts', 
              'src_ts_2/conductor.ts', 
              'src_ts_2/currentcalc.ts']
    )
	//gulp.src('src_ts_2/*.ts')
	.pipe(concat('cx.ts'))
    .pipe(typescript({target: 'ES5', module: 'commonjs'}))
    //.pipe(uglify())
    .pipe(gulp.dest('src_ts_2/'))
})

gulp.task('tsc_3', function () {
    var test1 = gulp.src(['src_ts_2/checker.ts', 
              'src_ts_2/constants.ts', 
              'src_ts_2/category.ts', 
              'src_ts_2/conductor.ts', 
              'src_ts_2/currentcalc.ts']
    )
	.pipe(concat('cx.ts'));
    
    test1.pipe(gulp.dest('src_ts_2/'));
    
    var test2 = test1.pipe(typescript({target: 'ES5', module: 'commonjs'}))
    .pipe(gulp.dest('src_ts_2/'));
    
    //test3.pipe(typescript({target: 'ES5', module: 'commonjs'}))
    test2.pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('src_ts_2/'));
    
})

gulp.task('clean', function (cb) {
	del([
	    'out_js/*.js',
	    'out_js/test/*.js',
	    'out_ugly/*.js',
	    'out_ugly/test/*.js',
	    'src_ts_2/cx.ts',
	    'src_ts_2/cx.js',
	    'src_ts_2/cx.min.js',
	], cb);
})

//----------------------------------------------------------------------------------------

gulp.task('default', function() {
	//gulp.watch('src_ts/*.ts', ["tsc"]);
	console.log("No default task");
});
