/**
 * Created by ktalabattula on 1/26/16.
 */

'use strict';

// This checks if gulp is installed for this project or not
// looks for 'gulp' folder. Right now it is available in node_modules
var gulp = require('gulp');

// Sass requirement for stylesheets
var sass = require('gulp-sass');

// concatinating the compiled files
var concat = require('gulp-concat');

// inject
var inject = require('gulp-inject');

// serve
var serve = require('gulp-serve');

// When you give 'gulp <task name>' command in terminal this task will be invoked
// If no task name is specified it will execute the 'default' task
// Syntax gulp.task('<task name>',['<dependency tasks which are executed before
// executing this task>'], '<function: what needs to be done while executing this task>')

gulp.task('default', ['styles', 'scripts'], function() {
    console.log('This is default task');
});

gulp.task('styles', function(){
    // gulp.src will gather all/specific file
    // .pipe will compile sass files using gulp-sass and pipe them down
    // concat will concatinate all the compiled styles into one file
    // dest will output the 'generated file' into the specified location.
    gulp.src(
        ['./main/resources/stylesheets/styles.scss'])
        .pipe(sass(
            // If you need to include external files like bootstrap related, foundation related
            // you can specify them here so they will be compiled and added
            // and you dont have to add the include statements in index.html or any other files
            // syntax is as below:
            // [includePaths:['<path>']]  <-- in case of components installed using bower specify
            // that path instead
        ))
        .pipe(concat('app.css'))
        .pipe(gulp.dest('./www/stylesheets'));

    gulp.src(
        ['./main/index.html'])
        .pipe(gulp.dest('./www/'));

});

// in case you dont want to do a gulp command to pick up your css changes
// you can create another task called 'watch' which will update any files that
// are changed

gulp.task('watch', function(){
    // When ever there is a change in the path specified in 'watch', it will run the
    // tasks specified, in this case it is 'styles' task.
    gulp.watch('./main/resources/stylesheets/**/*.scss',['styles']);
})


/***************** Scripts **********************/
gulp.task('scripts',function(){
    //Angular
    //Dont include minified js files as you will minify the concatinated file later
    gulp.src(['./bower_components/angular/**/*.js', '!./bower_components/angular/**/*.min.js',
            './bower_components/highcharts/highcharts.src.js', './bower_components/highcharts/highstock.src.js'])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./www/scripts'));
})


/******************* Serve *********************/
gulp.task('serve',serve('www'));
