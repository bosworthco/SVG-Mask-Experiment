/*
**	SVG Mask Experiment 
**	Copyright 2014 © James Bosworth
**	https://github.com/bosworthco/SVG-Mask-Experiment
**
**	initialise.js
*/



$(document).ready(function() {

   		initParallax();
		initGradient();
		updateViewport();


		$(parallaxEl).on("click touchend", function() {
			$(".svg_elem").toggleClass("zoom");

			if($(".svg_elem").hasClass("zoom")) {
				$(parallaxEl).animate({
					"-webkit-mask-size": 100+"px"
				}, 'slow', 'easeOutExpo');
				$(staticEl).animate({
					"-webkit-mask-size": 99+"px"
				}, 'slow', 'easeOutExpo');
			} else {
				$(parallaxEl).animate({
					"-webkit-mask-size": 50+"px"
				}, 'slow', 'easeOutExpo');
				$(staticEl).animate({
					"-webkit-mask-size": 49+"px"
				}, 'slow', 'easeOutExpo');
			};
		});

		
	
});

$(window).on("resize orientationchange", function() {
	setTimeout(function() {
		updateViewport();
		console.log("Viewport Changed");
	}, 1000);
});