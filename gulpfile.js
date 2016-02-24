var gulp = require('gulp');
var babelify = require('babelify');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var gulpJade = require('gulp-jade');
var jade = require('jade');

const config = {
	script : {
		main : './lib/app.js',
		watch : './lib/**/*.js',
		output : './',
		fileName : 'bundle.js'
	},
	transform : {
		extensions : {presets: ["es2015"] }
	},
	templates : {
		main : './template/index.jade',
		watch : './template/**/*.jade',
		output : './',
		fileName : 'index.html'
	}
}

gulp.task('templates', () => {
	gulp.src(config.templates.watch)
	.pipe(gulpJade({
		jade: jade,
		pretty : true
	}))
	.pipe(gulp.dest(config.templates.output))
});
gulp.task('build:js', () => {
	return browserify(config.script.main)
	.transform("babelify", config.transform.extensions)
	.bundle()
	.on('error', function (err) { console.error(err); })
	.pipe(source(config.script.fileName))
	.pipe(buffer())
	.pipe(uglify())
	.pipe(gulp.dest(config.script.output))
});
gulp.task('watch', () => {
	gulp.watch(config.script.watch, ['build:js'])
	gulp.watch(config.templates.watch, ['templates'])
});
gulp.task('build', ['build:js']);
gulp.task('default', ['watch','build']);