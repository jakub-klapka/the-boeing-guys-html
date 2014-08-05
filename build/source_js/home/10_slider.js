/* global jQuery */
( function( $ ){

	var Slider = {

		init: function( el ) {

			this.slider = el;
			this.delay = parseInt( this.slider.data( 'slider-timeout' ), 10 ) * 1000;
			this.knob = this.slider.find( '.slider__controls__knob' );
			this.current = 1;
			this.images = false;
			this.current_image = false;
			this.count = false;
			this.interval = false;

			this.bindEvents();

		},

		bindEvents: function() {

			var t = this;
			$( window ).load( $.proxy( this.lazyLoad, this ) );
			$( window ).load( function(){
				t.interval = setInterval( $.proxy( t.moveByOne, t ), t.delay );
			} );

			this.knob.on( 'click', function(){
				clearInterval( t.interval );
				t.moveByOne();
			} );

		},

		lazyLoad: function() {

			var placeholders = this.slider.find( '.slider__image_placeholder' );
			placeholders.each( function(){
				var placeholder = $( this ),
					new_img = $( '<img/>' )
						.attr( 'src', placeholder.data( 'src' ) )
						.attr( 'alt', placeholder.data( 'alt' ) )
						.attr( 'width', placeholder.data( 'width' ) )
						.attr( 'height', placeholder.data( 'height' ) )
						.addClass( 'slider__image' );
				placeholder.after( new_img );
				placeholder.remove();
			} );

			this.images = this.slider.find( '.slider__image' );
			this.current_image = this.images.eq( 0 );
			this.count = this.images.length;


		},

		moveToImage: function( index ){

			//images fade
			this.current_image.css( 'opacity', 0 );
			this.current_image = this.images.eq( index - 1 );
			this.current_image.css( 'opacity', 1 );

			//knob turning
			this.knob.css( 'transform', 'rotate( ' + ( index - 1 ) * 45 + 'deg )' );

			//set new current
			this.current = index;

		},

		moveByOne: function() {

			var new_index;
			if( this.current === this.count ) {
				new_index = 1;
			} else {
				new_index = this.current + 1;
			}

			this.moveToImage( new_index );
		}

	};

	$( document ).ready( function(){
		$( '[data-slider]' ).each( function(){
			var instance = Object.create( Slider );
			instance.init( $( this ) );
		} );
	} );

} )( jQuery );