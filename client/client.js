Meteor.startup(function() {
	
	var canvas = $('canvas'),
		ctx = canvas[0].getContext('2d'),
		drawing = false,
		from = null;
		
	canvas.attr({
		
		width: $(window).width(),
		height: $(window).height()
		
	}).mousedown(function() {
		
		drawing = true;
		from = null;
		
	}).mouseup(function() {
		
		drawing = false;
		
	}).mousemove(function(event) {
		
		if(!drawing) return;
		
		var to = {x: parseInt(event.pageX), y: parseInt(event.pageY)};
		
		drawLine(ctx, from, to);
		
		Lines.insert({from: from, to: to});
		
		from = to;
	});
	
	function drawLine(ctx, from, to) {
		if(!from) return;
		ctx.beginPath();
		ctx.moveTo(from.x, from.y);
		ctx.lineTo(to.x, to.y);
		ctx.closePath();
		ctx.stroke();
	}
	
	function clearCanvas(ctx) {
		ctx.fillRect(0, 0, canvas.width(), canvas.height());
	}
	
	ctx.strokeStyle = '#ffffff';
	ctx.fillStyle = '#000000';
	
	clearCanvas(ctx);
	
	Meteor.autorun(function() {
		
		clearCanvas(ctx);
		
		Lines.find().fetch().forEach(function(line) {
			drawLine(ctx, line.from, line.to);
		});
	});
});