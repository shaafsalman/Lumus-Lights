/**	
 *
 * Background slide gallery
 *
 */
"use strict";

var wrapper = jQuery(".lte-slide-background");

if ( wrapper.length ) {

	wrapper.each(function(i, el) {

		if ( jQuery(el).data('images') > 0 ) {

			var x = 0,
				key = jQuery(el).data('key');

			let timeline = anime.timeline({
			    loop: true,
			});		

			for ( x = 0; x <= jQuery(el).data('images'); x++ ) {

				if ( x > 0 ) {
					
					var kid = '#' + key + '-' + x;

					timeline.add({
				        targets: kid + ' .part',
				        x: 0,
				        easing: 'easeInOutQuad',
				        delay: function(el, i, l) {

				            return 100 * Math.random() * (3 - 0) + 0;
				        },
				    }, '+=3000');
	    
				}
			}
		}
	} );
}
