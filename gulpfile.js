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
const rename = require("gulp-rename");
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');

/**
 * Localhost proxy server and port for php connect
 * @const {string}
 */
const hostname = 'localhost/your-project-directory';
const port = 3001;

/**
 * Development file resources
 * @const {array}
 */
const resource = {
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

/**
 * Output file names
 * @const {array}
 */
const filename = {
    css: 'app.css',
    scripts: 'app.js'
};

/**
 * Watch these file types for changes
 * @const {array}
 */
const watch = {
    html: '**/*.html',
    twig: '**/*.twig',
    php: '**/*.php',
    sass: '**/*.scss',
    scripts: '**/*.js'
};


/* =============================================================================================
   GULP -> TASKS
   ============================================================================================= */

/**
 * Compile SASS to CSS, autoprefix, minimize and reload browserSync
 * @module gulp-sass
 * @module gulp-autoprefixer
 * @module browser-sync
 */
gulp.task('build:css', () => {
    gulp.src(resource.sass)
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(rename(filename.css))
        .pipe(gulp.dest(build.css))
        .pipe(browserSync.reload({
            stream: true
        }));
});

/**
 * Concat all JavaScript files, strip comments, compile ES6 to ES5, minimize and reload browserSync
 * @module gulp-concat
 * @module gulp-babel
 * @module gulp-uglify
 * @module browser-sync
 */
gulp.task('build:scripts', () => {
    gulp.src(resource.scripts)
		.pipe(concat(filename.scripts))
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
 * Compile SASS to CSS, autoprefix, minimize and reload browserSync
 * Concat all JavaScript files, strip comments, compile ES6 to ES5, minimize and reload browserSync
 */
gulp.task('build', () => {
    // Start the gulp css and scripts tasks
    gulp.start('build:css');
    gulp.start('build:scripts');
});

/**
 * Start a development server
 * Compile SASS to CSS, autoprefix, minimize and reload browserSync
 * Concat all JavaScript files, strip comments, compile ES6 to ES5, minimize and reload browserSync
 * Watch for declared file changes and reload browserSync
 * @module gulp-connect-php7
 * @module browser-sync
 */
gulp.task('dev', () => {
    // Start a new server with browserSync
    connect.server({}, () => {
        // Proxy the localhost hostname
        browserSync({
            proxy: hostname,
            port: port
        });
    });

    // Watch for file changes and call the build css and scripts gulp tasks
    gulp.watch(watch.sass, ['build:css']);
    gulp.watch(watch.scripts, ['build:scripts']);

    // Watch for declared file changes and reload browserSync
    gulp.watch([watch.html, watch.twig, watch.php]).on('change', () => {
        // Reload browserSync
        browserSync.reload();
    });
});
