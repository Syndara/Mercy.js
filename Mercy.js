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


// The block here grabs the neccesary ID's.
var servID = "<SERVER ID>"
var staffID = "<STAFF ID>"
var opID = "<OP ID>"
var safeOPID = "<SAFEOP ID>"

// auth.json is used to store token information in token : "<Your Token>".
var AuthInfo = require("./auth.json");
// List of quotes
var quotes = require("./quotes.json");

var Cleverbot = require('cleverbot-node');
cleverBot = new Cleverbot;

// Debug mode: If this is set to 1, the list of roles with their permissions and IDs will be printed to the console.
var debugMode = 0

// Neccesary dependency.
var DiscordClient = require('discord.io');

// Starting the bot with the given token.
var bot = new DiscordClient({
    autorun: true,
    token: AuthInfo.token
});

// Setting command prefixes.
var userPre = "~";
var adminPre = "!";
var maxCount = 0;

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

bot.on('message', function (user, userID, channelID, message, rawEvent) {

    // For parsing multiple arguments.
    var messageParts = message.split(" ");

    if (userID === bot.id) {
        return;
    }

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

    if (message === userPre + "Leeki") {
        bot.sendMessage({
            to: channelID,
            message: quotes.Leeki
        })
    }

    if (message === userPre + "shrug") {
        bot.sendMessage({
            to: channelID,
            message: "¯\\_(ツ)_/¯"
        });
    }
	
	if (message === userPre + "ayy") {
	    bot.sendMessage({
	        to: channelID,
	        message: quotes.ayy
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

    if (messageParts[0] === userPre) {
        // Reconstruct phrase.
        var statement = "";
        for (i = 1; i <= messageParts.length; i++) {
            if (i !== messageParts.length) {
                statement += messageParts[i] + " ";
            }
        }
        
        Cleverbot.prepare(function () {
            cleverBot.write(statement, function (response) {
                bot.sendMessage({
                    to: channelID,
                    message: response.message
                });
            });
        });
    }
});