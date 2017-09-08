var express = require('express');
var router = express.Router();
var mysql = require("mysql");

/* GET home page. */
var connection;
var handleDisconnect = function(){
	connection = mysql.createConnection({
							host:'localhost',
							user : 'root',
							password : '',
							database : 'bootcamp'
						});
		 
	connection.connect(function(err){
		if(err){
		  console.log(err);
		}else{
		  console.log("Connected as id" + connection.threadId);
		}
	});

	connection.on('error', function(err){
		console.log("DB ERROR "+err);
		if(err.code == 'PROTOCOL_CONNECTION_LOST'){
			handleDisconnect();
		}else{
			console.log('CANNOT handleDisconnect');
			throw err;
		}
	});
}

handleDisconnect();




router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', function(req, res, next){
	console.log("Logging in");
	console.log(req.body);
	// res.send('hello');
	var body = req.body;

	if(body.username && body.password){
		connection.query({
			sql : 'select username, password from users where username = ?',
			values : [body.username]
		}, function(err, r, f){
			if(err){
				res.send('ERR ' + err);
			}else{
				if(r[0]){
					if(r[0].password == body.password){
						res.send('OK');
					}else{
						res.send('ERR');
					}
				}else{
					res.send('ERR');
				}
			}
		});
	}else{
		res.send('EMPTY');
	}

});


router.post('/register', function(req, res, next){
	console.log("Registering");
	console.log(req.body);
	var body = req.body;
	if(body.username && body.password){
		connection.query({
			sql : 'insert into users values(?, ?)',
			values : [body.username, body.password]
		}, function(err, r, f){
			if(err){
				res.send('ERR ' + err);
			}else{
				res.send('OK');
			}
		});
	}else{
		res.send('EMPTY');
	}
});

module.exports = router;
