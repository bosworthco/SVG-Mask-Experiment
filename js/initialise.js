/*
**	SVG Mask Experiment 
**	Copyright 2014 © James Bosworth
**	https://github.com/bosworthco/SVG-Mask-Experiment
**
**	initialise.js
*/

var mousePos = { xPos: 0, yPos: 0 };

$(document).on("mousemove", function(e) {
    //mousePos.xPos = e.pageX;
    //mousePos.yPos = e.pageY;
    //console.log(mousePos.xPos, mousePos.yPos);
});


$(document).ready(function() {

	$('#js-parallax').on("mousemove", function(e){
		/* Work out mouse position */
		var offset = $(this).offset();
		mousePos.xPos = e.pageX - offset.left;
		mousePos.yPos = e.pageY - offset.top;

		/* Get percentage positions */
		var mouseXPercent = Math.round(mousePos.xPos / $(this).width() * 100);
		var mouseYPercent = Math.round(mousePos.yPos / $(this).height() * 100);

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
				duration: 'slow',
				queue: false,
				easing: 'easeOutQuad'
			});

		});	
	});

	var colors = new Array(
	  [62,35,255],
	  [60,255,60],
	  [255,35,98],
	  [45,175,230],
	  [255,0,255],
	  [255,128,0]);

	var step = 0;
	//color table indices for: 
	// current color left
	// next color left
	// current color right
	// next color right
	var colorIndices = [0,1,2,3];

	//transition speed
	var gradientSpeed = 0.002;

	function updateGradient() {

		//console.log("Gradient Updated");

		var c0_0 = colors[colorIndices[0]];
		var c0_1 = colors[colorIndices[1]];
		var c1_0 = colors[colorIndices[2]];
		var c1_1 = colors[colorIndices[3]];

		var istep = 1 - step;
		var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
		var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
		var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
		var color1 = "#"+((r1 << 16) | (g1 << 8) | b1).toString(16);

		var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
		var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
		var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
		var color2 = "#"+((r2 << 16) | (g2 << 8) | b2).toString(16);

		$(".experiment, .svg_elem[data-position='parallax']").css({
			backgroundImage: "-webkit-radial-gradient("+mousePos.xPos+"px "+mousePos.yPos+"px, "+color1+","+color2+")"
		}).css({
			backgroundImage: "-moz-radial-gradient("+mousePos.xPos+"px "+mousePos.yPos+"px, "+color1+","+color2+")"
		});

		$(".svg_elem[data-position='parallax']").css({
			"-webkit-mask-image": "url(../assets/svg/circle_mask_inverted.svg)",
			"-webkit-mask-size": 50+"px"
		});

		$(".svg_elem[data-position='static']").css({
			"-webkit-mask-image": "url(../assets/svg/circle_mask.svg)",
			"-webkit-mask-size": 49+"px"
		});

		step += gradientSpeed;
		if ( step >= 1 ) {
			step %= 1;
			colorIndices[0] = colorIndices[1];
			colorIndices[2] = colorIndices[3];

			//pick two new target color indices
			//do not pick the same as the current one
			colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
			colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
		}
	}

	updateViewport();
	setInterval(updateGradient,10);
});


var updateViewport = function() {

	var vp 			= $(window);
	var vpHeight	= vp.height();
	var vpWidth		= vp.width();

	var parallaxSVG = $(".js-svg-parallax");
	var staticSVG = $(".js-svg-static");

	parallaxSVG.css({
		width: vpWidth * 1.025,
		height: vpHeight * 1.05
	});

	staticSVG.css({
		width: vpWidth,
		height: vpHeight
	});
};


$(window).on("resize orientationchange", function() {
	setTimeout(function() {
		updateViewport();
		console.log("Viewport Changed");
	}, 1000);
});