module.exports = {
	getDog : function(bot, channelID) {
		var request = require('request');
		theURL = "http://random.dog"
		request(theURL, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				var values = body.split("'");
				var dog = values[3];
			
				bot.sendMessage({
					to: channelID,
					message: theURL + "/" + values[1]
				});
			
			}
		})
	}
}