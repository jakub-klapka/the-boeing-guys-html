/* global jQuery, YT, tbg_yt */
( function( $ ){

	var YT_Movie = {

		init: function() {

			window.tbg_yt = this;

			this.yt_wrap = $( '#youtube_gallery' );
			this.movies = this.yt_wrap.find( '.youtube_gallery__thumbnail' );
			this.current_movie_element = this.movies.eq(0);
			this.featured_movie = this.createFeaturedMovieWrapper();
			this.playing = false;

			this.getThumbnails();

			this.loadFeaturedMovie();

			this.bindEvents();


		},

		bindEvents: function() {

			var t = this;
			this.movies.on( 'click', function( evt ){
				evt.preventDefault();
				t.movieClick( $(this) );
			} );

		},

		createFeaturedMovieWrapper: function() {

			/*
			<div class="youtube_gallery__featured_movie" data-movie-id="CwmnNoiSLzs">
				<div id="player"></div>
			</div>*/
			var current_video_id = this.get_youtube_id( this.current_movie_element.find( 'a:first' ).attr('href') ),
				featured_movie = $( '<div class="youtube_gallery__featured_movie" data-movie-id="' + current_video_id + '"></div>' );
			featured_movie.append( '<div id="player"></div>' );

			this.yt_wrap.prepend( featured_movie );

			return featured_movie;

		},

		loadFeaturedMovie: function() {
			var tag = document.createElement('script');
			tag.src = "https://www.youtube.com/iframe_api";
			var firstScriptTag = document.getElementsByTagName('script')[0];
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

			window.onYouTubeIframeAPIReady = function() {
				window.tbg_yt.player = new YT.Player( 'player' , {
					height: '526',
					width: '862',
					videoId: tbg_yt.featured_movie.data('movie-id')
//					events: {
//						'onReady': onPlayerReady,
//						'onStateChange': onPlayerStateChange
//					}
				});
			};
		},

		getThumbnails: function() {

			var t = this;
			this.movies.each( function() {

				var el = $( this ).find( 'a:first' ),
					yt_id = t.get_youtube_id( el.attr( 'href' ) ),
					image = $( '<img/>' );

				//get thumb url
				var response = $.getJSON( 'http://gdata.youtube.com/feeds/api/videos/' + yt_id + '?v=2&alt=jsonc' );
				response.done( function( data ){

					image.attr( 'src', data.data.thumbnail.hqDefault );
					el.append( image );

				} );

			} );

		},

		movieClick: function( clicked_element ) {

			if( clicked_element.is( this.current_movie_element ) ) {
				//click on playing element
				if( this.playing === false ) {
					tbg_yt.player.playVideo();
					this.playing = true;
					clicked_element.addClass( 'playing' );
				} else {
					tbg_yt.player.pauseVideo();
					this.playing = false;
					clicked_element.removeClass( 'playing' );
				}

				return;
			}

			//click on new element
			this.movies.removeClass( 'playing' );
			var new_yt_id = this.get_youtube_id( clicked_element.find('a:first').attr( 'href' ) );

			if( new_yt_id === false ) {
				return;
			}

			tbg_yt.player.loadVideoById( new_yt_id );
			this.current_movie_element = clicked_element;
			clicked_element.addClass( 'playing' );
			this.playing = true;
			this.yt_wrap.velocity( 'scroll', {
				duration: 500
			} );

		},

		get_youtube_id: function( url ) {
			var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
			var match = url.match( regExp );
			if ( match && match[7].length === 11 ) {
				return match[7];
			} else {
				return false;
			}
		}

	};


	$( document ).ready( function(){
		YT_Movie.init();
	} );

} )( jQuery );