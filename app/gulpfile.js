/* global require */

/*
Tasks:
	default - compile css, js, images
	css - compile scss
	dev - watcher
 */

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var livereload = require('gulp-livereload');
var imagemin = require('gulp-imagemin');

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
CSS
 */
gulp.task( 'css', function(){

	gulp.src( 'source_css/*.scss' )
		.pipe( plumber() )
		.pipe( sass( sass_config ) )
		.pipe( autoprefixer() )
		.pipe( gulp.dest( 'css' ) );

} );
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
Tasks def
 */
gulp.task( 'dev', dev_tasks );
