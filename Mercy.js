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

// Starting the bot with the supplied token.
var bot = new DiscordClient({
    autorun: true,
    token: AuthInfo.token
});

// Setting command prefixes.
var userPre = "~";
var adminPre = "!";

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