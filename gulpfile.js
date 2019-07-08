'use strict';

/*  ========================================================================
    GULP -> MODULES
    ========================================================================  */

/**
 * Set the required dependency modules.
 * @type {module}
 */
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const browsersync = require('browser-sync');
const concat = require('gulp-concat');
const connect = require('gulp-connect-php7');
const gulp = require('gulp');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');


/*  ========================================================================
    GULP -> SERVER
    ========================================================================  */

/**
 * Set the localhost proxy server and port.
 * @type {string}
 */
const hostname = 'juice.localhost';
const port = 3001;


/*  ========================================================================
    GULP -> FILES
    ========================================================================  */

/**
 * Set the output build directories.
 * @const {object}
 */
const destination = {
    css: 'public/css',
    scripts: 'public/scripts'
};

/**
 * Set the output file names.
 * @type {object}
 */
const filename = {
    css: 'juice.min.css',
    scripts: 'juice.min.js'
};

/**
 * Set the files to watch for changes.
 * @const {object}
 */
const files = {
    sass: 'resources/sass/**/*.scss',
    scripts: 'resources/scripts/**/*.js',
    html: '**/*.html'
};

/**
 * Set the resource files.
 * @type {object}
 */
const resource = {
    sass: [
        'resources/sass/juice.scss'
    ],
    scripts: [
        'node_modules/velocity-animate/velocity.min.js',
        'resources/scripts/**/*.js'
    ]
};


/*  ========================================================================
    GULP -> FUNCTIONS
    ========================================================================  */

/**
 * Set the css task to compile sass to css, autoprefix, minimize, rename and reload browsersync.
 * @module gulp-plumber
 * @module gulp-notify
 * @module gulp-sass
 * @module gulp-autoprefixer
 * @module gulp-rename
 * @module browser-sync
 * @return {object}  The completed gulp task.
 */
const css = () => {
    // Return the completed gulp task
    return (
        gulp.src(resource.sass)
        .pipe(plumber({
            errorHandler: notify.onError({
                title: 'Gulp CSS Task Incomplete',
                subtitle: 'Error',
                message: '<%= error.message %>'
            })
        }))
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(autoprefixer())
        .pipe(rename(filename.css))
        .pipe(gulp.dest(destination.css))
        .pipe(notify({
            title: 'Gulp CSS Task',
            message: 'Task completed.',
            sound: 'pop'
        }))
        .pipe(browsersync.reload({
            stream: true
        }))
    );
};

/**
 * Set the scripts task to concat all javascript files, strip comments, compile
 * es6 to es5, minimize and reload browsersync.
 * @module gulp-plumber
 * @module gulp-notify
 * @module gulp-babel
 * @module gulp-concat
 * @module gulp-uglify
 * @module browser-sync
 * @return {object}  The completed gulp task.
 */
const scripts = () => {
    // Return the completed gulp task
    return (
        gulp.src(resource.scripts)
            .pipe(plumber({
                errorHandler: notify.onError({
                    title: 'Gulp Scripts Task Incomplete',
                    subtitle: 'Error',
                    message: '<%= error.message %>'
                })
            }))
            .pipe(babel({
                presets: [
                    '@babel/preset-env'
                ]
            }))
            .pipe(concat(filename.scripts))
            .pipe(uglify())
            .pipe(gulp.dest(destination.scripts))
            .pipe(notify({
                title: 'Gulp Scripts Task',
                message: 'Task completed.',
                sound: 'pop'
            }))
            .pipe(browsersync.reload({
                stream: true
            }))
    );
};

/**
 * Set the observe task to watch for files.
 * @return {void}
 */
const serve = () => {
    // Start a new server
    connect.server({}, () => {
        // Proxy the hostname and port
        browsersync({
            proxy: hostname,
            port: port
        });
    });
};

/**
 * Set the watch task to watch for file changes.
 * @return {void}
 */
const watch = () => {
    // Watch for sass file changes and call the css task
    gulp.watch(files.sass, css);

    // Watch for javascript file changes and call the scripts task
    gulp.watch(files.scripts, scripts);

    // Watch for html file changes and reload browsersync
    gulp.watch(files.html).on('change', () => {
        // Reload browsersync
        browsersync.reload();
    });
};


/*  ========================================================================
    GULP -> TASKS
    ========================================================================  */

// Export tasks
exports.build = gulp.series(gulp.parallel(css, scripts));
exports.css = css;
exports.scripts = scripts;
exports.serve = gulp.series(gulp.parallel(watch, serve));
exports.watch = watch;
