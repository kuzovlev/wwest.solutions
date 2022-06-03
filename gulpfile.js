const { src, dest, parallel, series, watch } = require('gulp');

const sass = require('gulp-sass')(require('sass'));
const bulk = require('gulp-sass-bulk-import');
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');
const concat = require('gulp-concat');
const map = require('gulp-sourcemaps');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();

function browsersync() {
    browserSync.init({
        server: { baseDir: 'app/' },
        notify: false,
        online: true,
    })
}

function styles() {
    return src('app/sass/main.scss')
        .pipe(map.init())
        .pipe(bulk())
        .pipe(sass())
        .pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true }))
        .pipe(cleancss( { level: { 1: { specialComments: 0 } }} ))
        .pipe(map.write('../sourcemaps/'))
        .pipe(dest('app/css/'))
        .pipe(browserSync.stream())
}

function scripts() {
    return src([
        'app/js/app.js',
    ])
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(dest('app/js/'))
        .pipe(browserSync.stream())
}


function startwatch() {
    watch(['app/**/*.js', '!app/**/*.min.js'], scripts);
    watch('app/**/sass/**/*', styles);
    watch('app/**/*.html').on('change', browserSync.reload);
}

function buildcopy() {
    return src([
        'app/css/**/*.css',
        'app/js/**/*.min.js',
        'app/images/dest/**/*',
        'app/**/*.html',
    ], { base: 'app' })
        .pipe(dest('docs'))
}

exports.browsersync = browsersync;
exports.styles = styles;
exports.build = series(styles, scripts, buildcopy);
exports.default = parallel(styles, scripts, browsersync, startwatch);