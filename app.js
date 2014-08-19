
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var fs = require('fs')
   , formidable = require('formidable');


var app = express();
var server = app.listen(3000);
var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket){
	//console.log('connected');
	socket.on('linesend',function(data){
		console.log(data);
		socket.broadcast.emit('linesend_toclient',data);
	});
	
	socket.on('disconnect',function(){
		console.log('user disconnected');
	});
	

	
});


// all environments
//app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);




// doc to pdf
var pro = require('child_process');
//var command = "cd ..; cd jodconverter-core-3.0-beta-4; java -jar lib/jodconverter-core-3.0-beta-4.jar alpha.odt alpha.pdf";
var command = "cd uploads; java -jar jodconverter-2.2.2/lib/jodconverter-cli-2.2.2.jar ";



function PDFchange(fin, fout){
	pro.exec(command + fin + fout, function(error, stdout, stderr){
		console.log(stdout);
		console.log(stderr);
		console.log("end");
		//ioconnected.PDFload(fin);
		
	});
}




// file upload
app.post('/upload',function(req,res){
	
	console.log("file upload..");
    console.log(req.files);
    fs.readFile(req.files.userFile.path, function (err, data) {
      // ...
    	console.log("reading...");
      var newPath = __dirname + "/uploads/" + req.files.userFile.name;
      console.log(newPath);
      
      fs.writeFile(newPath, data, function (err) {
    	  if(err){
    		  throw err;
    	  }else{
    		  console.log(req.files.userFile.name);
    		  res.redirect("back");
    		  //pro.exec("ls",function(error, stdout, stderr){
    		//		console.log(stdout);
    		//		console.log(stderr);
    		 // });
    		  PDFchange(req.files.userFile.name," test.pdf");
    		  //res.send(newPath);
    		  //io.socket.broadcast.emit('file_upload',newPath);
    		  
    	  }
      });
    });
 });


