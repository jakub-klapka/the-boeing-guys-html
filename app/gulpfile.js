/* global require */

/*
Tasks:
	default - compile css, js, images
	css - compile scss
	images - optimize images
	js - concat and uglify js
	dev - watcher
	build - run default and copy output files to build folder
 */

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var livereload = require('gulp-livereload');
var imagemin = require('gulp-imagemin');
var svg_sprite = require('gulp-svg-sprites');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var fs = require('fs');
var concat = require('gulp-concat');
var html_replace = require('gulp-html-replace');
var merge = require('merge-stream');

var path = require('path');

var sass_config = {
	precision: 10
};
var imagemin_config = {
	progressive: true
};
var dev_tasks = [];
var default_tasks = [];

/*
SVG sprites
 */
gulp.task( 'svg_sprite', function() {

	return gulp.src( 'source_svg_sprite/*.svg' )
		.pipe( imagemin() )
		.pipe( svg_sprite( {
			'cssFile': 'source_css/_svg_sprite.scss',
			'svgPath': '../%f',
			'svg': { 'sprite': 'svg_sprite/sprite.svg' },
			'preview': false,
			'templates': {
				css: require("fs").readFileSync("./svg_sprite_template.tmpl", "utf-8")
			},
			'layout': 'horizontal'
		} ) )
		.pipe( gulp.dest( '' ) );

} );


/*
CSS
 */
gulp.task( 'css', ['svg_sprite'], function(){

	return gulp.src( 'source_css/*.scss' )
		.pipe( plumber() )
		.pipe( sass( sass_config ) )
		.pipe( autoprefixer() )
		.pipe( gulp.dest( 'css' ) );

} );
default_tasks.push( 'css' );
gulp.task( 'watch_css', function(){
	gulp.watch( 'source_css/*.scss', function( evt ){

		if( ( path.basename( evt.path ) ).charAt(0) === '_' ) {
			return gulp.src( 'source_css/*.scss' )
				.pipe( plumber() )
				.pipe( sass( sass_config ) )
				.pipe( autoprefixer() )
				.pipe( gulp.dest( 'css' ) );
		} else {
			return gulp.src( evt.path )
				.pipe( plumber() )
				.pipe( sass( sass_config ) )
				.pipe( autoprefixer() )
				.pipe( gulp.dest( 'css' ) );
		}

	} );
});
dev_tasks.push('watch_css');


/*
Images
 */
gulp.task( 'unknown_images', function(){

	return gulp.src( ['source_images/**/*', '!*.{jpg,jpeg,gif,png,svg}'], { base: 'source_images' } )
		.pipe( gulp.dest( 'images' ) );

} );
gulp.task( 'images', ['unknown_images'], function() {

	return gulp.src( 'source_images/**/*.{jpg,jpeg,gif,png,svg}', { base: 'source_images' } )
		.pipe( plumber() )
		.pipe( imagemin( imagemin_config ) )
		.pipe( gulp.dest( 'images' ) );

} );
default_tasks.push( 'images' );

gulp.task( 'watch_images', function() {
	gulp.watch( 'source_images/**/*', ['images'] );
} );
dev_tasks.push( 'watch_images' );


/*
Javascript
 */
var js_dirs =  fs.readdirSync('source_js/').filter(function (file) {
		return fs.statSync('source_js/' + file).isDirectory();
	} ),
	js_tasks = [];
js_dirs.forEach( function( dirname ){

	gulp.task( 'js_' + dirname, function() {

		return gulp.src( 'source_js/' + dirname + '/*.js' )
			.pipe( concat( dirname + '.js', { newLine: ';' } ) )
			.pipe( uglify() )
			.pipe( gulp.dest( 'js' ) );

	} );
	js_tasks.push( 'js_' + dirname );

} );

gulp.task( 'js', js_tasks );
default_tasks.push( 'js' );


/*
Livereload
 */
gulp.task( 'livereload', function(){
	livereload.listen();
	gulp.watch( ['*.html', 'css/**/*', 'source_js/**/*.js', 'images/**/*'], function(evt) {
		livereload.changed( evt.path );
	} );
} );
dev_tasks.push('livereload');


/*
Build
 */
gulp.task( 'clean_build_dir', function(){
	return gulp.src( '../build', { read: false } )
		.pipe( clean( { force: true } ) );
} );

gulp.task( 'build', ['clean_build_dir', 'default'], function(){

	var copy_files = gulp.src([
		'css/**/*',
		'images/**/*',
		'svg_sprite/**/*',
		'js/**/*'
	], { base: '.' })
		.pipe( gulp.dest( '../build' ) );

	var replacements = {};
	js_dirs.forEach( function( dirname ){
		replacements[dirname] = 'js/' + dirname + '.js';
	} );
	var replace = gulp.src( '*.html' )
		.pipe( html_replace( replacements ) )
		.pipe( gulp.dest( '../build' ) );

	return merge( copy_files, replace );
} );


/*
Tasks def
 */
gulp.task( 'dev', dev_tasks );
gulp.task( 'default', default_tasks );
