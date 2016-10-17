// Functions
var walled = require("./scripts/Pictures/4walled.js")
var cat = require("./scripts/Pictures/cat.js")
var photo = require("./scripts/Pictures/photoBucket.js")
var dog = require("./scripts/Pictures/dog.js")
var functions = require("./scripts/Functions/functions.js")
var spam = false;
var time;

module.exports = {
	handleFourWalled : function(messageParts, bot, channelID, sfw, cheerio) {
		var keywords = "";
		
		for (var i = 1; i < messageParts.length; i++) {
			if (messageParts.length === 1) {
				keywords = messageParts[i];
			}
			keywords += messageParts[i] + "+"
		}
		
		if (sfw) {
			var URL = "https://4walled.cc/search.php?tags=" + keywords + "&board=&width_aspect=&searchstyle=larger&sfw=0&search=search"
		}
		
		else {
			var URL = "https://4walled.cc/search.php?tags=" + keywords + "&board=&width_aspect=&searchstyle=larger&sfw=&search=search"
		}
		
		walled.getWP(URL, bot, channelID, cheerio);	
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
                    message: response.message,
		    tts: true
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
			+ "running on Heroku. You can add me using this link: https://discordapp.com/oauth2/authorize?client_id=183014313450143744&scope=bot&permissions=0"
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
	
		handleTest : function(bot, userID, channelID) {
			
		if (channelID === "209656708761518080") {
			channelID = "200095198573887489"
		}
		
		var OSongs = [
		"./Music/Other/O_Short.mp3",
		"./Music/Other/O_Long.mp3",
		"./Music/Other/O_Reverse.mp3",
		"./Music/Other/O.mp3"]
		
		var ch = functions.listVoiceChannels(bot, channelID, userID);
		var song = OSongs[Math.floor(Math.random() * OSongs.length)];
		
		functions.playSong(bot, ch, song)
	},
	
	handleYT : function(bot, userID, channelID) {
		
		if (channelID === "209656708761518080") {
			channelID = "200095198573887489"
		}
		
		var YT = [
		"./Music/Other/SwingBobby.mp3",
		"./Music/Other/Weaboo.mp3",
		"./Music/Other/WHAT.mp3"]
		
		var ch = functions.listVoiceChannels(bot, channelID, userID);
		var song = YT[Math.floor(Math.random() * YT.length)];
		
		functions.playSong(bot, ch, song)
	},
	
	handleSpam : function(bot, channelID, messageParts) {
		
		if (messageParts.length = 2) {
			time = messageParts[1] * 1000;
		}
		
		else {
			time = 20000;
		}
		
		if (!spam) {
			spam = true;
			
			spamOn = setInterval(photo.getPhoto, time, bot, "201782767841837056");
			bot.sendMessage({
				to: channelID,
				message: "Pasting a photo every " + time / 1000 + " seconds"
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
	},
	
	handleAndroid : function(bot, channelID, messageParts) {
		var message = "";
		for (var i = 1; i < messageParts.length; i++) {
			message += messageParts[i] + "%20"
		}
		
		functions.qAndroid(bot, channelID, message);
	}
}
