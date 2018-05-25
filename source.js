const http = require('http');
const hostname = 'leia.cs.spu.edu';
const port = 3017;

var mysql = require('mysql');

var serverConnect = mysql.createConnection({
	    host: "localhost",
	    user: "cubebluemusic",
	    password: "cisumeulbebuc",
	    database: "employees"
});

const server = http.createServer((req, res) => {
	    res.statusCode = 200;
	    serverConnect.connect(function (errorMessage) {
		         serverConnect.query("select * from employees limit 15", function (errorMessage, dataOutput, fields) {
				         if (errorMessage) throw errorMessage;
				         var message = '<html>'
					 +'<head>'
					 +'<meta charset="utf-8"> '
					 +'<meta title="Data page">'
					 +'<meta name="author" content="Nick Zamora">'
					 +'<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous">'
					 +'</head>'
					 +'<body>'
					 +'<table class="table table-striped">';
				        message += '<tr>\n';
				 	for (var f in fields){
						message += '<td>' + fields[f].name + '</td>\n';
					}
					message += '</tr>\n';
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

