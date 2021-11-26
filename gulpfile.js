//  import node framawork 
// const =  fs  require( "fs") ;
// const = path require("path" ) ;

// get info from the npm package
const pkg = require('./package.json');

// gulp
const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');

const htmlminify = require('gulp-htmlmin');
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const zip = require('gulp-zip');
const watch = require('gulp-watch');
const plumber = require('gulp-plumber');
const cron = require('node-cron');
//const sourcemaps = require('gulp-sourcemaps');
// const cssnano = require('cssnano');
// const watch = require('gulp-watch');

// const browserSync = require('browser-sync');

const currentDate = () => {
    let d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    hours = d.getHours();
    min = d.getMinutes();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year, hours, min].join('-');
}

const paths = {

    css: {
        src: './src/sass/**/*.scss',
        dest: './dist/css/'
    },

    html: {
        src: './src/**/*.html',
        dest: './dist'
    },
    archive: {
        src: './src/**',
        dest: './archive'
    }
};


const html = () => {
    return (
        gulp
        .src(paths.html.src)
        .pipe(htmlminify({ collapseWhitespace: true }))
        .pipe(gulp.dest(paths.html.dest))
    )

};
const sassToCss = () => {
    return (
        gulp
        .src(paths.css.src)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(postcss([autoprefixer({
            browsers: ['last 4 versions'],
            cascade: false
        })]))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(paths.css.dest))

    )
}

const archiver = () => {

    let archiveName = `${pkg.description}-${currentDate()}.zip`;
    console.log(archiveName);

    return (
        gulp
        .src(paths.archive.src)
        .pipe(zip(archiveName))
        .pipe(gulp.dest(paths.archive.dest))
    )

};

const stream = () => {
    return (
        watch(paths.css.src, sassToCss),
        watch(paths.html.src, html),

        cron.schedule("00 00 */1 * * * *", () => {
            console.log("Hourly ", new Date());
            archiver()
        }, {
            scheduled: true,
            timezone: "Europe/Rome"
        })
    );

};


// let liveServer = () => {
//     browserSync.init({

//         server: {
//             baseDir: "./dist"
//         },
//         port: 3000
//     });
// };

// const liveRender = gulp.parallel(watchFiles, liveServer);

// exports.liveRender = liveRender;

// // exports.test = test;
exports.archiver = archiver;
exports.html = html;
exports.sassToCss = sassToCss;
exports.stream = stream;
// exports.preview = liveServer;