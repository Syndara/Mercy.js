module.exports = {
	makeComic : function(bot, channelID, messageParts) {
		bot.sendMessage({
			to: channelID,
			message: "<@127296623779774464> comic " + messageParts[1]
		})
	},
	
	listVoiceChannels : function (bot, server, userID) {
		var channels = bot.servers[server].channels;
		var i = 0;
		for (var channel in channels) {
			if (channels[channel].type === 'voice') {
				var users = Object.getOwnPropertyNames(channels[channel].members);
				
				for (var i = 0; i < users.length; i++) {
					if (userID === users[i])
						return channel;
				}
			}
		}
	},
	
	playSong : function (bot, channel, songName) {
		bot.joinVoiceChannel(channel, function() {
			bot.getAudioContext({ channel: channel, stereo: true}, function(stream) {
				stream.playAudioFile(songName);
		    		stream.once('fileEnd', function() {
						bot.leaveVoiceChannel(channel);
					});
			})
		});
	},
	
	qAndroid : function (bot, channelID, message) {
		var request = require('request');
		var google = "https://play.google.com"
		request("https://play.google.com/store/search?q=" + message + "&hl=en", function (error, response, body) {
			if (!error && response.statusCode == 200) {
				linkOne = body.indexOf("/store/apps/details?id=com");
				app = body.substring((linkOne), (linkOne + 150));
				linkEnd = app.indexOf("\"");
				app = app.substring(0,linkEnd)
				
				bot.sendMessage({
					to: channelID,
					message: google + app
				})
				
			}
		});
	}
}
