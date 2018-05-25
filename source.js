const http = require('http');
const hostname = 'leia.cs.spu.edu';
const port = 3017;

var mysql = require('mysql');

var server = mysql.createserver({
	    host: "localhost",
	    user: "cubebluemusic",
	    password: "cisumeulbebuc",
	    database: "employees"
});

server.connect(function (errorMessage) {
	    if (errorMessage) throw errorMessage;
		server.query("select * from employees limit 15", function (errorMessage, dataOutput, fields) {
		           if (errorMessage) throw errorMessage;
				   console.log("Success");
		           console.log(dataOutput);
		       });

});

const server = http.createServer((req, res) => {
	    res.statusCode = 200;
	    server.connect(function (errorMessage) {
		         server.query("select * from employees limit 15", function (errorMessage, dataOutput, fields) {
				         if (errorMessage) throw errorMessage;
				         var message = '<html>\n'+
						 '<head>\n<meta charset="utf-8">\n' +
						 '<meta title="Data page">\n'+
						 '<meta name="author" content="Nick Zamora">\n</head>\n' +
						 '<body>\n<table border = 1>\n';
				 	for (var i in dataOutput){
								message += '<tr><td>' + dataOutput[i].emp_no + '</td>' +
								'<td>' + dataOutput[i].birth_date + '</td>' +
								'<td>' + dataOutput[i].first_name + '</td>' +
								'<td>' + dataOutput[i].last_name + '</td>' +
								'<td>' + dataOutput[i].gender + '</td>' +
								'<td>' + dataOutput[i].hire_date + '</td></tr>';
							}
				 	message += '</body>\n</html>';
				 	res.setHeader('Content-type', 'text/html');
				     	res.end(message);
				     });
	    });
});


server.listen(port, hostname, () => {
	    console.log('Server running at http://${hostname}:${port}/');
});

