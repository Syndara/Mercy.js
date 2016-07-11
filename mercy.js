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

var Cleverbot = require('cleverbot-node');
cleverBot = new Cleverbot;

// In Debug roles will be printed to console.
var debugMode = 0

// Neccesary dependency.
var DiscordClient = require('discord.io');
var request = require('request');

// Handler
var handler = require("./handler.js");

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

// Setting constants
var userPre = "~";
var adminPre = "!";
var reminderCount = 0;
var sfw = true;

bot.on('ready', function () {
	
    console.log(bot.username + " online @ " + Date());
	
    if (debugMode === 1) {
        console.log(bot.servers[servID].roles);
    } 
	
	else {
        return;
    }
	
});

bot.on('disconnected', function () {
    console.log(bot.username + " (" + bot.id + ") disconnected!");
    process.exit(1);
});

bot.on('message', function (user, userID, channelID, message, rawEvent) {
	
	// Bot does nothing if message is sent by the bot.
	if (userID === bot.id) return;
	
	// For parsing multiple arguments.
    var messageParts = message.split(" ");
    
    // Tells septapus to make a comic of X length.
    if (messageParts[0] === userPre + "comic") {		
		handler.handleComic(bot, channelID, messageParts);
    }
	
	// Calls the cat function to get a random cat image.
	if (messageParts[0] === userPre + "cat") {
		handler.handleCat(bot, channelID);
	}
	
	// Calls the dog function to get a random dog image.
	if (messageParts[0] === userPre + "dog") {
		handler.handleDog(bot, channelID);
	}
	
	// Pastes catdog in chat.
	if (messageParts[0] === userPre + "catdog") {
		handler.handleCatDog(bot, channelID);
	}

	// Pastes current time in chat, localized.
	if (messageParts[0] === userPre + "time") {
		handler.handleTime(bot, channelID);
	}
	
	// Pastes bot info in chat.
	if (messageParts[0] === userPre + "info") {
		handler.handleInfo(bot, channelID);
	}
	
	// Pastes gay.gif in chat.
	if (messageParts[0] === userPre + "gay") {
		handler.handleGay(bot, channelID);
	}
	
	// Plays a random MLG song if used in the primary chat channel.
	if (messageParts[0] === userPre + "MLG") {
		handler.handleMLG(bot, userID, channelID);
	}

	// Fires off Cleverbot to respond to user message.
	if (message.includes("<@!183014333742186497>")) {
		handler.handleClever(bot, channelID, Cleverbot, message);
	}
	
	// Scrapes random image off of recently loaded Photobucket.
	if (message === userPre + "p") {
		handler.handlePhoto(bot, channelID);
	}
	
	// Pastes a picture from 4walled based on user input.
	if (messageParts[0] === userPre) {
		handler.handleFourWalled(messageParts, bot, channelID, sfw);
	}
	
	// Switches sfw on or off
	if (messageParts[0] === userPre + "sfw") {
		sfw = handler.handleSFW(bot, channelID, messageParts);
	}
	
	if (messageParts[0] === userPre + "photoSpam) {
		handler.handleSpam(bot, channelID);
	}
})
