// Functions
var walled = require("./scripts/Pictures/4walled.js")
var cat = require("./scripts/Pictures/cat.js")
var photo = require("./scripts/Pictures/photoBucket.js")
var dog = require("./scripts/Pictures/dog.js")
var functions = require("./scripts/Functions/functions.js")

module.exports = {
	handleFourWalled : function(messageParts, bot, channelID, sfw) {
		var keywords = "";
		
		for (var i = 1; i < messageParts.length; i++) {
			if (messageParts.length === 1) {
				keywords = messageParts[i];
			}
			keywords += messageParts[i] + "+"
		}
		
		if (sfw) {
			var URL = "https://4walled.cc/search.php?tags=" + keywords + "&board=&width_aspect=&searchstyle=larger&sfw=0&search=random"
		}
		
		else {
			var URL = "https://4walled.cc/search.php?tags=" + keywords + "&board=&width_aspect=&searchstyle=larger&sfw=&search=random"
		}
		
		walled.getWP(URL, bot, channelID);	
	},
	
	handleSFW : function(bot, channelID, messageParts) {
		if (messageParts[1] === "on") {
			bot.sendMessage({
				to: channelID,
				message: "sfw ON"
			})
		}
		
		else if (messageParts[1] === "off") {
			bot.sendMessage({
				to: channelID,
				message: "sfw OFF"
			})
		}
	},
	
	handleClever : function(bot, channelID, Cleverbot, message) {
		Cleverbot.prepare(function () {
			message.replace("<@!183014333742186497>", "")
            cleverBot.write(message, function (response) {
                bot.sendMessage({
                    to: channelID,
                    message: response.message
                });
            });
        });
	},
	
	handleCat : function(bot, channelID) {
		cat.getCat(bot, channelID);
	},
	
	handlePhoto : function(bot, channelID) {
		photo.getPhoto(bot, channelID);
	},
	
	handleDog : function(bot, channelID) {
		dog.getDog(bot, channelID);
	},
	
	handleInfo : function(bot, channelID) {
		bot.sendMessage({
			to: channelID,
			message: "Hello.  I am Mercy, created by Syndara#4651.  I'm an open source node-js Discord bot."  
			+ "Progress and documentation can be found for me at https://github.com/Syndara/Mercy.js.  I'm "
			+ "running on Heroku."
		})
	},
	
	handleGay : function(bot, channelID) {
		bot.sendMessage({
			to: channelID,
			message: "http://i.giphy.com/ToMjGpn0Si90OyYBtny.gif"
		});
	},
	
	handleTime : function(bot, channelID) {
		bot.sendMessage({
			to: channelID,
			message: "My local time is: " + new Date()
		})
	},
	
	handleCatDog : function(bot, channelID) {
		bot.sendMessage({
			to: channelID,
			message: "http://vignette4.wikia.nocookie.net/chroniclesofillusion/images/6/6a/Catdog.png"
		})
	},
	
	handleComic : function(bot, channelID, messageParts) {
		bot.deleteMessage({
			channel: channelID,
			messageID: rawEvent.d.id
		});	
			
		setTimeout(functions.makeComic, 1000, bot, channelID, messageParts);
	},
	
	handleMLG : function(bot, userID, channelID) {
		
		var MLGSONGS = [
		"./Music/MLG/2SAD4ME.mp3",
		"./Music/MLG/NUKE.mp3",
		"./Music/MLG/SANIC.mp3",
		"./Music/MLG/SAY.mp3",
		"./Music/MLG/TRIPLE.mp3",
		"./Music/MLG/WOMBO.mp3"]
		
		var ch = functions.listVoiceChannels(bot, channelID, userID);
		var song = MLGSONGS[Math.floor(Math.random() * MLGSONGS.length)];
		
		functions.playSong(bot, ch, song)
	},
	
	handleSpam : function(bot, channelID) {
		if (!spam) {
			spam = true;
			
			spamOn = setInterval(photo.getPhoto, 20000, bot, "201782767841837056");
			bot.sendMessage({
				to: channelID,
				message: "Photo spam started 8D"
			});	
		}
		
		else {
			spam = false;
			
			clearInterval(spamOn);
			bot.sendMessage({
				to: channelID,
				message: "Ending the spam"
			});
		}
	}
}
