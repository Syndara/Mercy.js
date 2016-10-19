module.exports = {
	cheap : function(bot, channelID, message, cheerio) {
		var request = require('request');
		theURL = "http://www.cheapshark.com/api/1.0/games?title=" + message + "&limit=3";
		request(theURL, function (error, response, body) {
			if (!error && response.statusCode == 200) {			
				var json = { title : "", salePrice : "", retailPrice : "", savings : "", thumb : "", steamID : ""};
				
				var title = body.substring(body.indexOf("external"), body.indexOf("external") + 100);
				title = title.substring(11, title.indexOf("thumb") - 3);
				json.title = title;
				
				if (body.indexOf("external") === -1) {
					bot.sendMessage({
						to: channelID,
						message: "Game Not Found"
					})
					
					return;
				}
				
				var salePrice = body.substring(body.indexOf("cheapest"), body.indexOf("cheapest") + 60);
				salePrice = "$" + salePrice.substring(11, salePrice.indexOf(",") - 1)
				json.salePrice = salePrice;
				
				var thumb = body.substring(body.indexOf("thumb"), body.indexOf("thumb") + 150)
				thumb = thumb.substring(8, thumb.indexOf("gameID") - 5)
				thumb = thumb.replace(/\\\//g, "/");
				json.thumb = thumb;
				
				var dealID = body.substring(body.indexOf("cheapestDealID"), body.indexOf("cheapestDealID") + 100)
				dealID = dealID.substring(17, dealID.indexOf("external") - 3)
				theURL = "http://www.cheapshark.com/api/1.0/deals?id=" + dealID;
				
				request(theURL, function (error, response, body) {
					if (!error && response.statusCode == 200) {	
						var retailPrice = body.substring(body.indexOf("retailPrice"), body.indexOf("retailPrice") + 60)
						retailPrice = "$" + retailPrice.substring(14, retailPrice.indexOf("steamRatingText") - 3)
						json.retailPrice = retailPrice;
						
						var savings = parseFloat(retailPrice.substring(1), retailPrice.length) - parseFloat(salePrice.substring(1), salePrice.length)
						savings = "$" + savings;
						json.savings = savings;
						
						var steamID = body.substring(body.indexOf("steamAppID"), body.indexOf("steamAppID") + 40)
						steamID = steamID.substring(13, steamID.indexOf("salePrice") - 3)
						steamID = "http://store.steampowered.com/app/" + steamID;
						json.steamID = steamID;
						
						bot.sendMessage({
							to: channelID,
							message: json.thumb + "\n```\nTitle: " + json.title + "\nRetail Price: " + json.retailPrice + "\nSale Price: " + 
								json.salePrice + "\nTotal Savings: " + json.savings + "\nStore Page: " + json.steamID + "```"
					})
				}
			})
			
		}
	})
	}
}