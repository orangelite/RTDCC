/**
 * New node file
 */
		$(window).resize(function(){
			
			console.log('resize' , window.innerWidth);
			
			canvas.width  = window.innerWidth;
			//canvas.height = window.innerHeight;
			var color = $('#pen_color option:selected').val();
			var line = $('#sv option:selected').val();
			shape.setShape(color, line);
		});