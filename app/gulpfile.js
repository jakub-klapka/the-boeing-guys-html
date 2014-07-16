/* global require */

/*
Tasks:
	css - compile scss
	dev - watcher
 */

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var livereload = require('gulp-livereload');

var path = require('path');

var sass_config = {
	precision: 10
};
var dev_tasks = [];

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
Livereload
 */
gulp.task( 'livereload', function(){
	livereload.listen();
	gulp.watch( ['*.html', 'css/**/*', 'source_js/**/*.js'], function(evt) {
		livereload.changed( evt.path );
	} );
} );
dev_tasks.push('livereload');

/*
Dev task
 */
gulp.task( 'dev', dev_tasks );