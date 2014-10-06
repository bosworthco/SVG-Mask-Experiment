/*
**	SVG Mask Experiment 
**	Copyright 2014 © James Bosworth
**	https://github.com/bosworthco/SVG-Mask-Experiment
**
**	initialise.js
*/


var updateViewport = function() {

	var vp 			= $(window);
	var vpHeight	= vp.height();
	var vpWidth		= vp.width();

	var parallaxSVG = $(".js-svg-parallax");
	var staticSVG = $(".js-svg-static");

	parallaxSVG.css({
		width: vpWidth * 1.3,
		height: vpHeight * 1.1
	});

	staticSVG.css({
		width: vpWidth,
		height: vpHeight
	});

	//parallaxSVG.find(".center_img img").centerImage();
	//staticSVG.find(".center_img img").centerImage();
};


$(document).ready(function() {

	updateViewport();

	$('#js-parallax').mousemove(function(e){
		/* Work out mouse position */
		var offset = $(this).offset();
		var xPos = e.pageX - offset.left;
		var yPos = e.pageY - offset.top;

		/* Get percentage positions */
		var mouseXPercent = Math.round(xPos / $(this).width() * 100);
		var mouseYPercent = Math.round(yPos / $(this).height() * 100);

		/* Position Each Layer */
		$(this).find('.svg_elem').each(function() {
			var diffX = $('#js-parallax').width() - $(this).width();
			var diffY = $('#js-parallax').height() - $(this).height();

			var myX = diffX * (mouseXPercent / 100);
			var myY = diffY * (mouseYPercent / 100);

			var cssObj = {
				'left': myX + 'px',
				'top': myY + 'px'
			}

			$(this).animate({
				left: myX,
				top: myY
			},{
				duration: 1000,
				queue: false,
				easing: 'easeOutQuad'
			});

		});	
	});
});


$(window).on("resize orientationchange", function() {
	setTimeout(function() {
		updateViewport();
		console.log("Viewport Changed");
	}, 1000);
});