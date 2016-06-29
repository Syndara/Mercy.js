﻿
/* 
    Mercy.js
    Copyright (C) 2016 - Wesley Rhodes
    This software may be modified and distributed under the terms
    of the MIT license.  See the LICENSE file for details.
    
*/

/*
    #Version 0.01

    This bot is a very very very basic barebones implementation of what a Discord bot can do.
    I started this project to see what all the bot was capable of, and look forward to adding
    to it as frequently as I can.  I want to integrate more useful and powerful API's in the
    near future, and hopefully more functionality.

    TO DO NEXT:
        Admin functionality.
*/

// auth.json is used to store token information in token : "<Your Token>".
var AuthInfo = require("./auth.json");
// List of quotes
var quotes = require("./quotes.json");

var Cleverbot = require('cleverbot-node');
cleverBot = new Cleverbot;

// In Debug roles will be printed to console.
var debugMode = 0

// Neccesary dependency.
var DiscordClient = require('discord.io');
var request = require('request');

// Keep app awake
var http = require("http");
setInterval(function() {
    http.get("http://mercy-js.herokuapp.com/");
	console.log("pinged");
}, 5000); // every 5 minutes (300000)

// HEROKU THINGS
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

// Starting the bot with the supplied token.
var bot = new DiscordClient({
    autorun: true,
    token: process.env.TOKEN
});

// Setting command prefixes.
var userPre = "~";
var adminPre = "!";
var reminderCount = 0;

bot.on('ready', function () {
    console.log(bot.username + " online @ " + Date());
    if (debugMode === 1) {
        console.log(bot.servers[servID].roles);
    } else {
        return;
    }
});

bot.on('disconnected', function () {
    console.log(bot.username + " (" + bot.id + ") disconnected!");
    process.exit(1);
});

bot.setPresence({
    game: "Overwatch"
});

bot.on('message', function (user, userID, channelID, message, rawEvent) {

	if (userID === bot.id) return;
	
	// For parsing multiple arguments.
    var messageParts = message.split(" ");

    // If userID is defined, define replyID.
    if (typeof userID !== 'undefined') {
        var replyID = "<@" + userID + "> "
    }

    // Simple hello back script.
    if (message === "Hi Mercy!") {
        if (typeof userID !== 'undefined') {
            console.log("I was greeted!");
            bot.sendMessage({
                to: channelID,
                message: "Hello " + replyID + "!"
            });
        }

        else {
            bot.sendMessage({
                to: channelID,
                message: "Hiya!"
            });
        }
        
    }
    
    // Set Mercy's Game
    if (message === userPre + "set") {
	bot.setPresence({
		game: "Overwatch"
	});
    }
    
    // Tells septapus to make a comic of X length
    if (messageParts[0] === userPre + "comic") {		
	bot.deleteMessage({
			channel: channelID,
			messageID: rawEvent.d.id
		});	
		
		setTimeout(makeComic, 1000, channelID, messageParts);
    }

	// Guild use only.
    if (message === userPre + "Leeki") {
        bot.sendMessage({
            to: channelID,
            message: quotes.Leeki
        })
    }

	// Pastes the shrug emote in chat.
    if (message === userPre + "shrug") {
        bot.sendMessage({
            to: channelID,
            message: "¯\\_(ツ)_/¯"
        });
    }
	
    // Array of all possible 8-ball responses.
    var eightBall = ["It is certain.",
                     "It is decidely so.",
                     "Without a doubt.",
                     "Yes, definitely.",
                     "You may rely on it.",
                     "As I see it, yes.",
                     "Most likely.",
                     "Outlook good.",
                     "Yes.",
                     "Signs point to yes.",
                     "Reply hazy, try again.",
                     "Ask again later.",
                     "Cannot predict now.",
                     "Concentrate and ask again.",
                     "Don't count on it.",
                     "My reply is no.",
                     "My sources say no.",
                     "Outlook not so good.",
                     "Very doubtful"];


    // 8-ball implementation.
    if (messageParts[0] === userPre + "8ball") {
        var response = eightBall[Math.floor(Math.random() * eightBall.length)];
        var question = "\"";

        // Reconstruct question.
        for (i = 1; i < messageParts.length; i++) {
            if (i + 1 !== messageParts.length) {
                question += messageParts[i] + " ";
            }
            
            else {
                question += messageParts[i] + "\" ";
            }
        }

        // Send formatted response.
        bot.sendMessage({
            to: channelID,
            message: replyID + "You asked: " + question + "I respond with: " + response
        });
    }

	// This function reconstructs the user's message and parses it with cleverbot-node.
    if (message.includes("<@183014333742186497>") && userID !== "@127296623779774464") {
        // Reconstruct phrase.
        statement = constructPhrase(messageParts);
		statement.replace("<@183014333742186497>", "");       
		// Send the formatted string to cleverbot-node and send the response to the channel.
        Cleverbot.prepare(function () {
            cleverBot.write(statement, function (response) {
                bot.sendMessage({
                    to: channelID,
                    message: response.message
                });
            });
        });
    }
	
	// Calls the cat function to get a random cat image.
	if (messageParts[0] === userPre + "cat") {
		var cat = getCats("http://www.random.cat/meow");
		
	}
	
	if (messageParts[0] === userPre + "remindMe") {
		statement = constructPhrase(messageParts);
		
		var time = messageParts[1];
		
		if (isFinite(time))
			setTimeout(sendReminder, time, statement, replyID);
		else
			bot.sendMessage({
				to: channelID,
				message: "Argument was not a valid number, try ~remindMe 15 Remind Me! for a 15 minute reminder."
			})
	}
	
	// Posts the current local time of the bot in chat.
	if (messageParts[0] === userPre + "time") {
		bot.sendMessage({
			to: channelID,
			message: "My local time is: " + getTime()
		})
	}
	
	if (messageParts[0] === userPre + "info") {
		bot.sendMessage({
			to: channelID,
			message: "Hello.  I am Mercy, created by Syndara#4651.  I'm an open source node-js Discord bot."  
			+ "Progress and documentation can be found for me at https://github.com/Syndara/Mercy.js.  I'm "
			+ "running on Heroku."
		})
	}
	
	if (messageParts[0] === userPre + "gay") {
		bot.sendMessage({
			to: channelID,
			message: "http://i.giphy.com/ToMjGpn0Si90OyYBtny.gif"
		});
	}
	
	if (userID === 151809530047496203) {
		for (var i = 0; i < messageParts.length; i++) {
			if (messageParts[i] === "FUCK") {
				bot.sendMessage({
					to: channelID,
					message: "Nick, please calm down."
				});
			}
		}
	}
	
	var MLGSONGS = [
		"./Music/MLG/2SAD4ME.mp3",
		"./Music/MLG/NUKE.mp3",
		"./Music/MLG/SANIC.mp3",
		"./Music/MLG/SAY.mp3",
		"./Music/MLG/TRIPLE.mp3",
		"./Music/MLG/WOMBO.mp3"]
	
	if (messageParts[0] === userPre + "MLG") {
		var ch = listVoiceChannels(channelID, userID);
		var song = MLGSONGS[Math.floor(Math.random() * MLGSONGS.length)];
		playSong(ch, song)
	}
	
	// Simple function just returns a date object at the current time.
	function getTime() {
		return new Date();
	}
	
	// This function sends an HTTP GET request to a website to return the html source.
	// I then parse this website to get the URL of a random cat image and paste it in chat.
	function getCats(theURL) {
		var request = require('request');
		request(theURL, function (error, response, body) {
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
		})
	}

    
	
	// Reconstructs the user's phrase.
	function constructPhrase(userPhrase) {
		var statement = "";
        for (i = 1; i <= userPhrase.length; i++) {
            if (i !== userPhrase.length) {
                statement += userPhrase[i] + " ";
            }
        }
		
		return statement;
	}
	
	function makeComic(channelID, messageParts) {
		bot.sendMessage({
			to: channelID,
			message: "<@127296623779774464> comic " + messageParts[1]
		})
	}
	
	function sendReminder(statement, replyID) {
		bot.sendMessage({
			to: channelID,
			message: replyID + "Reminder at" + new Date() + " " + statement
		})
	}
	
	function listVoiceChannels(server, userID) {
		var channels = bot.servers[server].channels;
		var i = 0;
		for (var channel in channels) {
			if (channels[channel].type === 'voice') {
				console.log(channel + " - " + Object.getOwnPropertyNames(channels[channel].members));
				var users = Object.getOwnPropertyNames(channels[channel].members);
				
				for (var i = 0; i < users.length; i++) {
					if (userID === users[i])
						return channel;
				}
			}
		}
	}
	
	function playSong(channel, songName) {
		bot.joinVoiceChannel(ch, function() {
			bot.getAudioContext({ channel: ch, stereo: true}, function(stream) {
			stream.playAudioFile(songName);
		    		stream.once('fileEnd', function() {
					bot.leaveVoiceChannel(ch);
		    	});
		})
	});
	}
})
