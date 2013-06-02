Meteor.startup(function() {
	
	var canvas = $('canvas'),
		ctx = canvas[0].getContext('2d'),
		drawing = false,
		from;
	
	canvas.attr({
		
		width: $(window).width(),
		height: $(window).height()
		
	}).hammer().on('dragstart', function(event) {
		
		drawing = true;
		from = {x: parseInt(event.gesture.center.pageX), y: parseInt(event.gesture.center.pageY)};
		
	}).on('dragend', function() {
		
		drawing = false;
		
	}).on('drag', function(event) {
		
		if(!drawing) return;
		
		var to = {x: parseInt(event.gesture.center.pageX), y: parseInt(event.gesture.center.pageY)};
		
		drawLine(ctx, from, to);
		
		Lines.insert({from: from, to: to});
		
		from = to;
	});
	
	$('input').click(function() {
		Meteor.call('wipeClean');
	});
	
	function drawLine(ctx, from, to) {
		ctx.beginPath();
		ctx.moveTo(from.x, from.y);
		ctx.lineTo(to.x, to.y);
		ctx.closePath();
		ctx.stroke();
	}
	
	function wipe(ctx) {
		ctx.fillRect(0, 0, canvas.width(), canvas.height());
	}
	
	ctx.strokeStyle = '#ffffff';
	ctx.fillStyle = '#000000';
	
	Meteor.autorun(function() {
		
		wipe(ctx);
		
		Lines.find().forEach(function(line) {
			drawLine(ctx, line.from, line.to);
		});
	});
	
	// Stop iOS from doing the bounce thing with the screen
	document.ontouchmove = function(event){
		event.preventDefault();
	}
});
