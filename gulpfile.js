/// <binding BeforeBuild='js' ProjectOpened='watch' />
var gulp = require('gulp'),
    pug = require('gulp-pug'),
    gutil = require('gulp-util'),
    minify = require('gulp-minify-css'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    order = require('gulp-order'),
    sass = require('gulp-sass'),
    entities = require('html-entities').XmlEntities,
    cssnano = require('cssnano'),
    replace = require('gulp-replace'),
    uglify = require('gulp-uglify'),
    pump = require('pump'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync'),
    watch = require('gulp-watch'),
    data = require('gulp-data'),
    fs = require("fs"),
    babel = require('gulp-babel'),
    reload = browserSync.reload;

require('es6-promise').polyfill();

const templateDistributionLocation = "./dist";

const json = function(cb){
    var json = require('./src/data/generate.js');
    fs.writeFile("./src/data/db.json", JSON.stringify(json()), 'utf8', function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
    cb();
}

const html = function (cb) {
    gulp.src([
            './src/markup/**/*.pug', 
            '!./src/markup/generators/**/*.pug',
            '!./src/markup/layouts/**/*.pug',
            '!./src/markup/components/**/*.pug'])
        .pipe(data( function(file) {
            return JSON.parse(fs.readFileSync('./src/data/db.json'))
        }))
        .pipe(pug({
            pretty: true,
            debug: false,
            compileDebug: false
        }))
        .on('error', gutil.log)
        .on('end', cb)
        .pipe(replace(entities.decode("&#65279;"), ''))
        .pipe(gulp.dest(templateDistributionLocation + '/'))
}

const image = function (cb) {
    gulp.src('./src/img/**/*.*')
        .pipe(gulp.dest(templateDistributionLocation + '/img'))
        .on('end', cb)
}

const font = function (cb) {
    gulp.src('./src/fonts/**/*.*')
        .pipe(gulp.dest(templateDistributionLocation + '/fonts'))
        .on('end', cb)
}

const jsClient = function (cb) {
    pump([
        gulp.src('./src/js/client/**/*.js'),
        sourcemaps.init(),
        babel({
            presets: ['env']
        }),
        uglify(),
        rename({ suffix: '.min' }),
        concat('all.min.js'),
        sourcemaps.write('.'),
        gulp.dest(templateDistributionLocation + '/js')
    ],
    cb
  );
}

const jsVendor = function (cb) {
    pump([
        gulp.src('./src/js/vendor/**/*.js'),
        sourcemaps.init(),
        babel({
            presets: ['env']
        }),
        uglify(),
        rename({ suffix: '.min' }),
        concat('vendor.min.js'),
        sourcemaps.write('.'),
        gulp.dest(templateDistributionLocation + '/js')
    ],
    cb
  );
}

const scss = function (cb) {

    var postcss = require('gulp-postcss');
    var autoprefixer = require('autoprefixer');

    bundle([
        './src/styles/global.scss'
    ], 'bundle.min.css');

    function bundle(source, dest) {
        gulp.src(source)
            .pipe(sourcemaps.init())
            .pipe(sass().on('error', sass.logError))
            .pipe(concat(dest))
            .pipe(postcss(
                [
                    autoprefixer({
                        browsers: ['last 5 versions'],
                        cascade: false
                    }),
                    cssnano()
                ]
            ))
            .pipe(sourcemaps.write('.'))
            .on('error', gutil.log)
            .on('end', cb)
            .pipe(gulp.dest(templateDistributionLocation + '/css'));
    }
}

const serve = function () {
    browserSync({
        notify: false,
        logPrefix: 'Wafer',
        reloadDelay: 1000,
        server: {
            baseDir: "./dist/"
        }
    });
}

gulp.task('build', gulp.series(json, gulp.series(html, scss, image, jsClient, jsVendor, font)));
gulp.task('serve', serve);