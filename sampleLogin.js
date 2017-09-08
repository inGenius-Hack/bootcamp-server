var request = require("request");

request.post('http://localhost:3000/login',
	{
		form:{
			username : 'ankit',
			password : 'hellworld'
		}
}, function(err, res, body){
	console.log("STATUS CODE : " + body);
});