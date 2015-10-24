
var http = require('https');

exports.getMessages = function(callback)
{
	var url = "https://api.mongolab.com/api/1/databases/middleman/collections/messages?apiKey=8vQvECjRR7qHZ_s640MP0sy9W_-Vk4wn";
	var messages;
	http.get(url, function(res){
		var body = '';
		res.on('data', function(chunk){
			body += chunk;
		});
		
		res.on('end', function(){
			messages = JSON.parse(body);
			console.log("Returning " + messages.length + " messages");
			callback(messages);
		});
	}).on('error', function(e){
      console.log("Got an error: ", e);
	});
};
