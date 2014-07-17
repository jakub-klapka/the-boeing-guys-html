/* global jQuery */
(function($){

	var Indicator = {

		init: function(el) {

			this.indicator_div = el;
			this.range = [ this.indicator_div.data('range-bottom'), this.indicator_div.data('range-top') ];
			this.window = $(window);
			this.document = $(document);

			//load value for first time
			this.setValue();

			this.bindEvents();

		},

		bindEvents: function() {

			this.window.on( 'scroll', $.proxy( this.setValue, this ) );
			this.window.on( 'resize', $.proxy( this.setValue, this ) );

		},

		setValue: function() {

			var range = this.range,
				window_height = this.window.height(),
				document_height = this.document.height(),
				scroll_position = this.window.scrollTop();

			var position_on_page_in_px = ( ( window_height / 2 ) + scroll_position ),
				range_abs = range[1] - range[0],
				value = ( 1 - ( position_on_page_in_px / document_height ) ) * range_abs + range[0];

			value = String( Math.round( value ) );

			//thousand separator
			if( value.length >= 4 ) {
				value = value.substr( 0, value.length - 3 ) + ' ' + value.substr( -3 );
			}

			this.indicator_div.text( value );

		}

	};

	$(document ).ready(function(){
		var indicators = $('#speedtape_indicator' ).add('#altimeter_indicator');
		indicators.each(function(){
			var instance = Object.create(Indicator);
			instance.init($(this));
		});
	});

})(jQuery);