!function(e){var t={init:function(){window.tbg_yt=this,this.yt_wrap=e("#youtube_gallery"),this.featured_movie=this.yt_wrap.find(".youtube_gallery__featured_movie"),this.loadFeaturedMovie()},loadFeaturedMovie:function(){var e=document.createElement("script");e.src="https://www.youtube.com/iframe_api";var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t),window.onYouTubeIframeAPIReady=function(){window.tbg_yt.player=new YT.Player("player",{height:"526",width:"862",videoId:tbg_yt.featured_movie.data("movie-id")})}}};e(document).ready(function(){t.init()})}(jQuery);