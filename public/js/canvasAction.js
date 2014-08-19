/**
 * New node file
 */


var ctx;
var canvasX;
var canvasY;


		$(document).ready(function(){
			canvasX = $('#cv').offset().left;
			canvasY = $('#cv').offset().top;
			console.log( $('#cv').offset());
			
			socket = io.connect('http://' + window.location.host);	// 소켓 설정.. window.location은 url 정보를 가지고 있음
			
			ctx = $('#cv').get(0).getContext('2d');
			$('#cv').css('background','purple');
			
			$('#cv').bind('mousedown',draw.start);
			$('#cv').bind('mousemove',draw.move);
			$('#cv').bind('mouseup',draw.end);
			$('#cbtn').bind('mouseup',draw.clear);
			
			// 색 굵기 초기화
			shape.setShape();	
			

			for(var key in color_map){
				console.log(color_map[key].value,color_map[key].name);
				$('#pen_color').append('<option value=' + color_map[key].value + '>' + color_map[key].name + '</option>');
			}
			
			
			// canvas data recieve
			socket.on('linesend_toclient', function(data){
				draw.drawfromServer(data);
			});
			
			socket.on('file_upload', function(data){
				console.log("file upload success!");
			});
			
						
			$('change').bind('change',function(e){
				
				var color = $('#pen_color option:selected').val();
				var line  = $('#sv').val();
				
				shape.setShape(color,line);
				
				console.log("change",color,line,$('#pen_color'));
			});
			
			
		});
		
		
		
		var shape = {
			color : 'white',
			line : 7,	
			
			setShape : function(color, line){
				if(color != null)
					this.color = color;
				if(line != null)
					this.line = line;
				
				ctx.strokeStyle = this.color;
				ctx.lineWidth = this.line;
			}	
		};
		
		var draw = {
				
				drawing : null,
				start : function(e){
					this.drawing = true;
					ctx.beginPath();
					console.log(canvasX,canvasY);
					console.log(e.pageX, e.pageY);
					ctx.moveTo(e.pageX - canvasX, e.pageY- canvasY);
					msg.line.send('start',e.pageX - canvasX, e.pageY-canvasY);
					
					//console.log(e.pageX,e.pageY);
				},		
				
				move : function(e){
					if(this.drawing){
						ctx.lineTo(e.pageX-canvasX, e.pageY-canvasY);
						ctx.stroke();
						msg.line.send('move',e.pageX-canvasX, e.pageY-canvasY);
					}
					//console.log(e.pageX,e.pageY);
				},
				
				end : function(e){
					
					this.drawing = false;
					msg.line.send('end');
					//console.log(e.pageX,e.pageY);
				},
				
				clear : function(e){
					ctx.clearRect(0,0,cv.width,cv.height);
					msg.line.send('clear');
				},
				
				
				
				drawfromServer : function(data){
					
					if(data.type == 'start'){
						this.drawing = true;
						ctx.beginPath();
						//ctx.moveTo(data.x, data.y);
						var newX = (window.innerWidth * data.x) / data.transWidth;
						var newY = (window.innerWidth * data.y) / data.transWidth;
						ctx.moveTo(newX, newY);
					}
					
					if(data.type == 'move'){
						var newX = (window.innerWidth * data.x) / data.transWidth;
						var newY = (window.innerWidth * data.y) / data.transWidth;
						var newline = (window.innerWidth * data.line) / data.transWidth;
						
						var color = $('#pen_color option:selected').val();
						var line = $('#sv').val();
						ctx.strokeStyle = data.color;
						
						ctx.lineWidth = newline;
						ctx.lineTo(newX, newY);
						
						//ctx.lineWidth = data.line;
						//ctx.lineTo(data.x, data.y);
						
						ctx.stroke();
						shape.setShape(color,line);
					}
					
					if(data.type == 'end'){
						
					}
					
					if(data.type == 'clear'){
						console.log('del');
						ctx.clearRect(0,0,cv.width,cv.height);
						var color = $('#pen_color option:selected').val();
						var line = $('#sv').val();
						shape.setShape(color,line);	
					}
				}
				
		};
		
		
	
		
		
		