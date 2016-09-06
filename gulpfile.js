var gulp    = require('gulp'),
    babel       = require("gulp-babel"),
    eslint      = require('gulp-eslint'),
    sourcemaps  = require('gulp-sourcemaps'),
    gutil       = require('gulp-util'),
    sass        = require('gulp-sass'),
    exec 		= require('child_process').exec,

    browserify  = require('browserify')
    babelify    = require('babelify'),
    buffer      = require('vinyl-buffer'),
    source      = require('vinyl-source-stream'),
    livereload  = require('gulp-livereload'),
    neat 		= require('node-neat').includePaths,
    del         = require('del'),
    runSequence = require('run-sequence');

// Path constants
var path = {
    BASE_DIR: './',
    SERVE_DIR: './static',
    BUILD_DIR: 'static',
    OUT: 'app.js',
    ENTRY_POINT: './src/index.jsx',
    JSX_DIR: './src/**/*.jsx',
    SCSS_DIR: './src/scss/**/*.scss',
    FONTS_DIR: ['./src/fonts/**/*.*'],
    IMG_DIR: './src/img/**/*.*',
    // JS_DIR: 'static/js/**/*.js',
    // FAVICON_DIR: './src/img/favicons/favicon.ico',
    SITE_ROOT_DIR: './src/**/*.html'
};

/*
* Delete folders and files
*/
gulp.task('delete', function() {
    return del(path.BUILD_DIR);
});

gulp.task('build', function(callback) {
    return runSequence(
        'delete',
        'site-root',
        'scss',
        'img',
        'fonts',
        'build-jsx',
        callback
    )
});

gulp.task('scss', function() {
   gulp.src(path.SCSS_DIR)
    .pipe(sass({
            includePaths: require('bourbon-neat').includePaths
        }))
    .pipe(gulp.dest(path.BUILD_DIR + '/css'))
    .pipe(livereload());
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch(path.SCSS_DIR, ['scss']);
  gulp.watch(path.JSX_DIR, ['build-jsx']);
});

// Copy the files in site-root into the build directory.
gulp.task('site-root', function() {
    return gulp.src(path.SITE_ROOT_DIR).pipe(gulp.dest(path.BUILD_DIR));
});

// Copy  fonts
gulp.task('fonts', function() {
    return gulp.src(path.FONTS_DIR)
        .pipe(gulp.dest(path.BUILD_DIR + '/fonts'));
});

// Copy img
gulp.task('img', function() {
    return gulp.src(path.IMG_DIR)
        .pipe(gulp.dest(path.BUILD_DIR + '/img'));
});

//serve
gulp.task('server', function(cb) {
    exec('node index.js', function(err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

// Default task for development
gulp.task('default', function () {
        runSequence(['build', 'watch'], 'server');
});

gulp.task('build-jsx', function(){
    return browserify({entries: path.ENTRY_POINT, transform:[babelify], extensions: ['.jsx'], debug: true,
        cache: {}, packageCache: {}, fullPaths: true})
        .bundle()
        .pipe(source(path.OUT))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(path.BUILD_DIR + "/js"));
});

gulp.task('lint', function () {
    return gulp.src(path.JSX_DIR)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

