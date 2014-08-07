/* global jQuery */
(function($){

	$( document ).ready( function(){


		//Generic images
		var anchors = $( 'a[data-lightbox]' ),
			groups = {};

		anchors.each( function() {

			var t = $( this ),
				group = t.data( 'lightbox' );

			//single image LB
			if( group === '' ) {
				createLBInstance( t );
				return;
			}

			//gallery
			if( groups.hasOwnProperty( group ) ) {
				//there is some image in there
				groups[ group ].push( t );
			} else {
				//create new cat
				groups[ group ] = [ t ];
			}

		} );

		$.each( groups, function( gal_name, elements ){
			createLBInstance( $( elements ) );
		} );


		//Preview gallery
		$( '.image_gallery' ).each( function(){
			var images = $( this ).find( '.image_link' );
			createLBInstance( images );
		} );


		function createLBInstance( elements ) {
			elements.abigimage();
		}


	} );

})(jQuery);