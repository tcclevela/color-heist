// Include Gulp
var gulp = require('gulp');
var mainBowerFiles = require('gulp-main-bower-files');
var uglify = require("gulp-uglify")
var filter = require("gulp-filter")
var concat = require("gulp-concat")
var merge = require('merge-stream');
// Define default destination folder
var dest = 'dist/';
var jsFiles = "src/color-heist.js"

gulp.task('default', function(){

    var bowerComponents = gulp.src('./bower.json')
        .pipe(mainBowerFiles())
    var source = gulp.src("./src/color-heist.js")
    	
    return merge(source, bowerComponents)
    	.pipe(uglify())
    	.pipe(concat("color-heist-min.js"))
    	.pipe(gulp.dest(dest))


});
