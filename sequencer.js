(function(sequencer, $, undefined){
	$(".slider").css({transition: "left 0.7s, top 0.7s, right 0.7s, bottom 0.7s, opacity 0.7s"});
	
	var time = 0;
	sequencer.reset = function(){
		time = 0;
	};
	sequencer.css = function(sel, msDelay, cssStyle, callback){
		msDelay = msDelay || 0;
		cssStyle = cssStyle || {};
		callback = callback || function(){};
		
		time += msDelay;
		setTimeout(function(){
			$(sel).css(cssStyle);
			callback();
		},time);
	};
	sequencer.slidein = function(sel, msDelay, callback){
		sequencer.css(sel, msDelay, {top:0,left:0,right:0,bottom:0,opacity:1}, callback);
	};
	sequencer.fadeout = function(sel, msDelay, callback){
		sequencer.css(sel, msDelay, {opacity:0}, callback);
	};
	
	sequencer.slideshowonce = function(sel, previ, nowi, nexti){
		var len = $(sel).length;
		$(sel).eq(previ).css({top:0,left:-30,right:30,bottom:0,opacity:0});//Hide the previous
		$(sel).eq(nowi).css({top:0,left:0,right:0,bottom:0,opacity:1});//Show the current
		$(sel).eq(nexti).css({top:0,left:30,right:-30,bottom:0,opacity:0});//Prep the next
		return nexti;
	};
	sequencer.slideshowloop = function(sel, msInterval, getNextIndex, callback){
		var nowi = 0;
		setInterval(function(){
			nexti = getNextIndex(i);
			callback(i);
			i = sequencer.slideshowonce(sel, i);
		},msInterval);
	};
})(window.sequencer = window.sequencer || {}, jQuery);
