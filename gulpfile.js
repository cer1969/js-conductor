/*
* Dependencias
*/
var 
	gulp = require('gulp'),
    tsc = require('gulp-typescript'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	del = require('del'),
    merge = require('merge2');

//----------------------------------------------------------------------------------------
// Typescript

var tsc_config = {
    target: 'ES5',
    module: 'commonjs',
    declarationFiles: true,
    noExternalResolve: true
}

var ts_files = [
    'src/ts/checker.ts',
    'src/ts/constants.ts',
    'src/ts/category.ts',
    'src/ts/conductor.ts',
    'src/ts/currentcalc.ts',
]

// Limpia release
gulp.task('ts-clean', function (cb) {
	del([
	    'release/*.*',
	], cb);
})

// Crea versión completa concatenada de conductor.ts
gulp.task('ts-concat', function () {
    return gulp.src(ts_files).pipe(concat('cer-conductor.ts')).pipe(gulp.dest('release/'));
})

// Concatena y crea versión compilada con tsc: js y d.ts
gulp.task('ts-compile', ['ts-concat'], function () {
    var tsCompiled = gulp.src('release/cer-conductor.ts').pipe(tsc(tsc_config));
    return merge([
        tsCompiled.dts.pipe(gulp.dest('release/')),
        tsCompiled.js.pipe(gulp.dest('release/'))
    ]);
})

// Concatena, compila y minifica
gulp.task('ts-make', ['ts-compile'], function () {
    return gulp.src('release/cer-conductor.js')
        .pipe(rename('conductor.ugly.js'))
        .pipe(uglify())
        .pipe(gulp.dest('release/'));
})

//----------------------------------------------------------------------------------------
/*
var cx_files = [
    'src/checker.js',
    'src/constants.js',
    'src/category.js',
    'src/conductor.js',
    'src/currentcalc.js',
]

gulp.task('make', function () {
    var step1 = gulp.src(cx_files).pipe(concat('cx.js'));
    
    step1.pipe(gulp.dest('dist/'));
    
    //var step2 = step1//.pipe(rename({suffix: '.min'}))
    //.pipe(uglify())
    //.pipe(gulp.dest('dist/'));
 
    //var step2 = step1.pipe(typescript({target: 'ES5', module: 'commonjs'}))
    //.pipe(gulp.dest('vconcat/out/'));
    //
    //step2.pipe(rename({suffix: '.min'}))
    //.pipe(uglify())
    //.pipe(gulp.dest('vconcat/out/'));
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
*/

//----------------------------------------------------------------------------------------

/*
gulp.task('ugly', function () {
    gulp.src('src_ts/*.ts')
    .pipe(typescript({target: 'ES5', module: 'commonjs'}))
    .pipe(uglify())
    .pipe(gulp.dest('out_ugly/'))
})
*/

/*
gulp.task('tsc', function () {
    gulp.src('src_ts/*.ts')
    .pipe(typescript({target: 'ES5', module: 'commonjs'}))
    //.pipe(uglify())
    .pipe(gulp.dest('out_js/'))
})
*/

/*
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

//----------------------------------------------------------------------------------------

gulp.task('default', function() {
	//gulp.watch('src_ts/*.ts', ["tsc"]);
	console.log("No default task");
});
*/