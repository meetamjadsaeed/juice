'use strict';

/* =============================================================================================
   GULP -> CONSTANTS
   ============================================================================================= */

/**
 * Required dependency modules
 * @const {module}
 */
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const browserSync = require('browser-sync');
const concat = require('gulp-concat');
const connect = require('gulp-connect-php7');
const gulp = require('gulp');
const sass = require('gulp-sass');
const strip = require('gulp-strip-comments');
const uglify = require('gulp-uglify');


/**
 * Localhost proxy server and port for php connect
 * @const {string}
 */
const hostname = 'localhost/your-project-directory';
const port = 3000;


/**
 * All file type resource paths
 * @const {array}
 */
const resources = {
    html: '**/*.html',
    sass: 'sass/rucksack.scss',
    scripts: 'scripts/**/*.js'
};


/**
 * Output build directories
 * @const {array}
 */
const build = {
    css: 'dist/',
    scripts: 'dist/'
};


/* =============================================================================================
   GULP -> TASKS
   ============================================================================================= */

/**
 * Compile SASS to CSS, autoprefix and minimize
 * @module gulp-sass
 * @module gulp-autoprefixer
 * @module browser-sync
 */
gulp.task('build-css', () => {
    gulp.src(resources.sass)
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest(build.css))
        .pipe(browserSync.reload({
            stream: true
        }));
});


/**
 * Concat all JavaScript files, strip comments, compile ES6 to ES5 and minimize
 * @module gulp-concat
 * @module gulp-strip-comments
 * @module gulp-babel
 * @module gulp-uglify
 * @module browser-sync
 */
gulp.task('build-scripts', () => {
    gulp.src(resources.scripts)
		.pipe(concat('rucksack.js'))
        .pipe(strip())
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest(build.scripts))
        .pipe(browserSync.reload({
            stream: true
        }));
});


/**
 * Compile SASS to CSS, autoprefix and minimize
 * Concat all JavaScript files, strip comments, compile ES6 to ES5 and minimize
 */
gulp.task('build', () => {
    // Start the gulp sass and scripts tasks
    gulp.start('build-css');
    gulp.start('build-scripts');
});


/**
 * Start a development server
 * Compile SASS to CSS, autoprefix and minimize
 * Concat all JavaScript files, strip comments, compile ES6 to ES5 and minimize
 * Watch for file changes and reload the browser
 * @module gulp-connect-php7
 * @module browser-sync
 */
gulp.task('dev', () => {
    // Start a new server with browser syncing
    connect.server({}, () => {
        // Start the browser and proxy the localhost hostname
        browserSync({
            proxy: hostname,
            port: port
        });
    });

    // Watch for file changes and call the sass/scripts gulp tasks
    gulp.watch(resources.sass, ['build-css']);
    gulp.watch(resources.scripts, ['build-scripts']);

    // Watch for file changes and reload the browser
    gulp.watch([resources.html]).on('change', () => {
        // Reload the browser
        browserSync.reload();
    });
});
