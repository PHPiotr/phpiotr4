var gulp = require("gulp");
var browserify = require("browserify");
var reactify = require("reactify");
var source = require("vinyl-source-stream");

gulp.task("bundle", function() {
    return browserify({
        entries: "./app/main.jsx",
        debug: true
    }).transform(reactify)
            .bundle()
            .pipe(source("main.js"))
            .pipe(gulp.dest("public/javascripts"));
});

gulp.task("default", ["bundle"], function() {
    console.log("Gulp completed...");
});