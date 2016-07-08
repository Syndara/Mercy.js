module.exports = {
	getWP : function(theURL, bot, channelID) {
		var request = require('request');
		request(theURL, function (error, response, body) {
			if (!error && response.statusCode == 200) {
			
				imageStart = body.indexOf("//4walled.cc/show");
				imageUrl = "https:" + body.substring((imageStart), (imageStart + 290))
				resStart = imageUrl.indexOf("Resolution");
				resText = imageUrl.substring((resStart), (resStart + 40))
				resEnd = resText.indexOf("'")
				resolution = resText.substring(0, resEnd)
				imageEnd = imageUrl.indexOf("target") - 2
				imageUrl = imageUrl.substring(0, imageEnd)
				
					request(imageUrl, function (error, response, body) {
						if (!error && response.statusCode == 200) {
							imageStart = body.indexOf("//4walled.cc/src");
							imageUrl = "https:" + body.substring((imageStart), (imageStart + 90))
							imageEnd = imageUrl.indexOf("\"")
							imageUrl = imageUrl.substring(0, imageEnd)
							
							bot.sendMessage({
								to: channelID,
								message: imageUrl + " " + resolution
							})
							
						}
						
						else{
							bot.sendMessage({
								to: channelID,
								message: "Image not found"
							})
						}
					})
			}
		})
	}
}