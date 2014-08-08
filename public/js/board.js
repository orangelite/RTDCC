/**
 * New node file
 */


var color_map = [
                 	{'value': 'white', 'name': 'white'},
                 	{'value': 'blue', 'name': 'blue'},
                 	{'value': 'red', 'name': 'red'},
                 ];

// socket.io 전역변수
var socket;


var msg = {
	line : {
		send : function(type,x,y){
			socket.emit('linesend',{'type':type, 'x':x, 'y':y, 'color':shape.color, 'width':shape.width});
		}
	}
};
