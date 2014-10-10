var mousePos 	= { xPos: 0, yPos: 0 };

var staticEl	= ".svg_elem[data-position='static']";
var parallaxEl	= ".svg_elem[data-position='parallax']";
var stageEl		= ".experiment";


var initParallax = function() {

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
				easing: 'easeOutExpo'
			});

		});	
	});
};


var initGradient = function() {

	// Desired colours
	var colours = new Array(
	  [62,35,255],
	  [60,255,60],
	  [255,35,98],
	  [45,175,230],
	  [255,0,255],
	  [255,128,0]
	);

	var step = 0;

	// colour table indices for: 
	// - current colour left
	// - next colour left
	// - current colour right
	// - next colour right
	var colourIndices = [0,1,2,3];

	// colour speed
	var gradientSpeed = 0.003;
	
	// movement speed
	var moveSpeed	= 0.003;

	function updateGradient() {

		var rad			= $(window).width() * 1.5;
		var time		= new Date().getTime();
		var centerX 	= $(window).width() * 0.5;
		var centerY 	= $(window).height() * 0.5;
		var gradX		= centerX + Math.cos(time*moveSpeed) * rad;
	  	var gradY		= centerY + Math.sin(time*moveSpeed) * rad;

		var c0_0 = colours[colourIndices[0]];
		var c0_1 = colours[colourIndices[1]];
		var c1_0 = colours[colourIndices[2]];
		var c1_1 = colours[colourIndices[3]];

		var istep = 1 - step;
		var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
		var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
		var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
		var colour1 = "#"+((r1 << 16) | (g1 << 8) | b1).toString(16);

		var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
		var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
		var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
		var colour2 = "#"+((r2 << 16) | (g2 << 8) | b2).toString(16);

		$(stageEl)
			.css({"background-image": "-webkit-radial-gradient("+gradX+"px "+gradY+"px, circle, "+colour1+","+colour2+")"})
			.css({"background-image": "-moz-radial-gradient("+gradX+"px "+gradY+"px, circle, "+colour1+","+colour2+")"});

		$(parallaxEl)
			.css({"background-image": "-webkit-radial-gradient("+gradX+"px "+gradY+"px, circle, "+colour1+","+colour2+")"})
			.css({
				"background-image": "-moz-radial-gradient("+gradX+"px "+gradY+"px, circle, "+colour1+","+colour2+")",
				"-webkit-mask-image": "url(../assets/svg/circle_mask_inverted.svg)"
			});

		$(staticEl)
			.css({"background-image":"-webkit-radial-gradient("+(gradY + 20)+"px "+(gradX + 20)+"px, circle, "+colour2+","+colour1+")"})
			.css({
				"background-image": "-moz-radial-gradient("+(gradY + 20)+"px "+(gradX + 20)+"px, circle, "+colour2+","+colour1+")",
				"-webkit-mask-image": "url(../assets/svg/circle_mask.svg)"
			});

		step += gradientSpeed;

		if ( step >= 1 ) {
			step %= 1;
			colourIndices[0] = colourIndices[1];
			colourIndices[2] = colourIndices[3];

			colourIndices[1] = ( colourIndices[1] + Math.floor( 1 + Math.random() * (colours.length - 1))) % colours.length;
			colourIndices[3] = ( colourIndices[3] + Math.floor( 1 + Math.random() * (colours.length - 1))) % colours.length;
		}
		window.requestAnimationFrame(updateGradient);
	}
	updateGradient();
};


var updateViewport = function() {

	var vp 			= $(window);
	var vpHeight	= vp.height();
	var vpWidth		= vp.width();

	$(parallaxEl).css({
		width: vpWidth * 1.025,
		height: vpHeight * 1.05
	});

	$(staticEl).css({
		width: vpWidth * 1.010,
		height: vpHeight * 1.025
	});
};