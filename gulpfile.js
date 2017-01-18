var gulp = require("gulp");
var browserify = require("browserify");
var reactify = require("reactify");
var source = require("vinyl-source-stream");

gulp.task("main", function() {
    return browserify({
        entries: "./app/main.jsx",
        debug: true
    }).transform(reactify)
            .bundle()
            .pipe(source("main.js"))
            .pipe(gulp.dest("public/javascripts"));
});
gulp.task("planes", function() {
    return browserify({
        entries: "./app/planes.jsx",
        debug: true
    }).transform(reactify)
            .bundle()
            .pipe(source("planes.js"))
            .pipe(gulp.dest("public/javascripts"));
});

gulp.task("default", ["main", "planes"], function() {
    console.log("Gulp completed...");
});