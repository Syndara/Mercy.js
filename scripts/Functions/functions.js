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
	}
}