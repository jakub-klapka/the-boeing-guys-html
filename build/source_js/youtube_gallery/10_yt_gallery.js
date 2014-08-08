/* global jQuery, YT */
( function( $ ){

	var YT_Movie = {

		init: function() {

			window.tbg_yt = this;

			this.yt_wrap = $( '#youtube_gallery' );
			this.featured_movie = this.yt_wrap.find( '.youtube_gallery__featured_movie' );

			this.loadFeaturedMovie();


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
		}

	};


	$( document ).ready( function(){
		YT_Movie.init();
	} );

} )( jQuery );