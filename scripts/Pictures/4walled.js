module.exports = {
	getWP : function(theURL, bot, channelID, cheerio) {
		var request = require('request');
		request(theURL, function (error, response, body) {
			if (!error && response.statusCode == 200) {
			
				//imageStart = body.indexOf("//4walled.cc/show");
				//imageUrl = "https:" + body.substring((imageStart), (imageStart + 290))
				//resStart = imageUrl.indexOf("Resolution");
				//resText = imageUrl.substring((resStart), (resStart + 40))
				//resEnd = resText.indexOf("'")
				//resolution = resText.substring(0, resEnd)
				//imageEnd = imageUrl.indexOf("target") - 2
				//imageUrl = imageUrl.substring(0, imageEnd)
				
				console.log(body.length);
				
				if (body.length <= 4387) {
					bot.sendMessage({
						to: channelID,
						message: "No images found"
					})
					
					return;
				}
				
				var parsed = cheerio.load(body);
				
				var images = [];
				parsed('a').map(function(i, link) {
					var href = cheerio(link).attr('href')
					if (!href.match('//4walled.cc')) return
					images.push(href)
				});
				
				var random = Math.floor(Math.random() * images.length);
				while (random <= 4) {
					random = Math.floor(Math.random() * images.length);
				}
				
				var imageUrl = "http:" + images[random];
				
				
					request(imageUrl, function (error, response, body) {
						if (!error && response.statusCode == 200) {
							imageStart = body.indexOf("//4walled.cc/src");
							imageUrl = "https:" + body.substring((imageStart), (imageStart + 200))
							resStart = body.indexOf("<span id=\"info_resolution\">");
							resStart = body.substring(resStart + 1, resStart + 50);
							low = resStart.indexOf(">");
							resStart = resStart.substring(low + 1, resStart.indexOf("<"))
							resolution = "Resolution: " + resStart;
							
							console.log(resStart);
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
