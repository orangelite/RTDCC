/**
 * New node file
 */




var pro = require('child_process');
//var command = "cd ..; cd jodconverter-core-3.0-beta-4; java -jar lib/jodconverter-core-3.0-beta-4.jar alpha.odt alpha.pdf";
var command = "cd ..; cd jodconverter-2.2.2; java -jar lib/jodconverter-cli-2.2.2.jar";



function change(fin, fout){
	pro.exec(command + fin + fout, function(error, stdout, stderr){
		console.log(stdout);
		console.log(stderr);
		console.log("end");
	});
}





