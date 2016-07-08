module.exports = {
	getCat : function(bot, channelID) {
		var request = require('request');
		request("http://www.random.cat/meow", function (error, response, body) {
			if (!error && response.statusCode == 200) {
				var values = body.split("\"");
				var cat = values[3];
			
				var catTest = cat.slice(0, 9) + "www." + cat.slice(9);
				catTest = catTest.replace(/\\\//g, "/");
			
				bot.sendMessage({
					to: channelID,
					message: catTest
				});
			
			}
			
			else {
				bot.sendMessage({
					to: channelID,
					message: "Error loading cat"
				})
			}
		})
	}
}