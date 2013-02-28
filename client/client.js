Meteor.startup(function() {
	
	var canvas = $('canvas'),
		ctx = canvas[0].getContext('2d'),
		drawing = false,
		from;
		
	canvas.attr({
		
		width: $(window).width(),
		height: $(window).height()
		
	}).mousedown(function(event) {
		
		drawing = true;
		from = {x: parseInt(event.pageX), y: parseInt(event.pageY)};
		
	}).mouseup(function() {
		
		drawing = false;
		
	}).mousemove(function(event) {
		
		if(!drawing) return;
		
		var to = {x: parseInt(event.pageX), y: parseInt(event.pageY)};
		
		drawLine(ctx, from, to);
		
		Lines.insert({from: from, to: to});
		
		from = to;
	});
	
	$('input').click(function() {
		Lines.remove({});
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
});