module.exports = {
	getPhoto : function (bot, channelID) {
		var request = require('request');
		request("http://photobucket.com/recentuploads?filter=image&page=1", function (error, response, body) {
			if (!error && response.statusCode == 200) {
			
				imageStart = body.indexOf("secureFullsize");
				imageUrl = body.substring((imageStart + 17), (imageStart + 150))
				imageEnd = imageUrl.indexOf("\"");
				imageUrl = imageUrl.substring(0,imageEnd)
				imageUrl = imageUrl.replace(/\\\//g, "/");
				
				bot.sendMessage({
					to: channelID,
					message: imageUrl
				});
			}
		})
	} 
}