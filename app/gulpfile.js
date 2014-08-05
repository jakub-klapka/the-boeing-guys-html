/* global require */

/*
Tasks:
	default - compile css, js, images
	css - compile scss
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

	gulp.src( 'source_svg_sprite/*.svg' )
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

	gulp.src( 'source_css/*.scss' )
		.pipe( plumber() )
		.pipe( sass( sass_config ) )
		.pipe( autoprefixer() )
		.pipe( gulp.dest( 'css' ) );

} );
default_tasks.push( 'css' );
gulp.task( 'watch_css', function(){
	gulp.watch( 'source_css/*.scss', function( evt ){

		if( ( path.basename( evt.path ) ).charAt(0) === '_' ) {
			gulp.src( 'source_css/*.scss' )
				.pipe( plumber() )
				.pipe( sass( sass_config ) )
				.pipe( autoprefixer() )
				.pipe( gulp.dest( 'css' ) );
		} else {
			gulp.src( evt.path )
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
gulp.task( 'images', function() {
	gulp.src( 'source_images/**/*.{jpg,jpeg,gif,png,svg}', { base: 'source_images' } )
		.pipe( plumber() )
		.pipe( imagemin( imagemin_config ) )
		.pipe( gulp.dest( 'images' ) );

	gulp.src( ['source_images/**/*', '!*.{jpg,jpeg,gif,png,svg}'], { base: 'source_images' } )
		.pipe( gulp.dest( 'images' ) );
} );
default_tasks.push( 'images' );

gulp.task( 'watch_images', function() {
	gulp.watch( 'source_images/**/*', ['images'] );
} );
dev_tasks.push( 'watch_images' );


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
gulp.task( 'build', ['default'], function(){
	gulp.src([
		'css/**/*',
		'images/**/*',
		'svg_sprite/**/*',
		'source_js/**/*', //TODO: JS minify
        '*.html'
	], { base: '.' })
		.pipe( gulp.dest( '../build' ) );
} );


/*
Tasks def
 */
gulp.task( 'dev', dev_tasks );
gulp.task( 'default', default_tasks );
