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

gulp.task('json', function(){
    var json = require('./src/data/generate.js');
    fs.writeFile("./src/data/db.json", JSON.stringify(json()), 'utf8', function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
})

gulp.task('html', function () {
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
        .pipe(replace(entities.decode("&#65279;"), ''))
        .pipe(gulp.dest(templateDistributionLocation + '/'));
});

gulp.task('image', function () {
    gulp.src('./src/img/**/*.*')
        .pipe(gulp.dest(templateDistributionLocation + '/img'));
});

gulp.task('font', function () {
    gulp.src('./src/fonts/**/*.*')
        .pipe(gulp.dest(templateDistributionLocation + '/fonts'));
});

gulp.task('js-client', function (callback) {
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
    callback
  );
})

gulp.task('js-vendor', function (callback) {
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
    callback
  );
})

gulp.task('scss', function () {

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
            .pipe(gulp.dest(templateDistributionLocation + '/css'));
    }
})

gulp.task('serve', ['html', 'scss', 'js-client', 'js-vendor', 'font', 'image'], function () {
    browserSync({
        notify: false,
        logPrefix: 'Wafer',
        reloadDelay: 1000,
        server: {
            baseDir: "./dist/"
        }
    });

    watch_stuff();
});

gulp.task('watch', ['html', 'scss', 'js-client', 'js-vendor', 'font', 'image'], function () {
    watch_stuff();
});

gulp.task('default', ['html', 'scss', 'js-client', 'js-vendor', 'font', 'image']);

function watch_stuff(){
    watch(['./src/styles/**/*.scss'], function(){ gulp.start('scss'); reload(); });
    watch(['./src/js/**/*.js'], function(){ gulp.start('js-vendor'); gulp.start('js-client'); reload(); });
    watch(['./src/data/**/*.js'], function(){ gulp.start('json'); gulp.start('html'); reload(); });
    watch(['./src/img/**/*.*'], function(){ gulp.start('image'); reload(); });
    watch(['./src/fonts/**/*.*'], function(){ gulp.start('fonts'); reload(); });
    watch(['./src/markup/**/*.pug'], function(){ gulp.start('html'); reload(); });
}
