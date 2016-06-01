# Mercy.js
WIP bot for Discord.

Author: Wesley Rhodes

Version: v0.0.7 06/01/2016

Mercy is a very basic bot currently, but I have hopes that it'll develop into something much more over time.  I'm still getting used to the Discord.io API.  I plan to keep this bot open-source for the duration of this personal project, hopefully it'll be a learning point for others who want to get into it.  I want to keep my project as well documented as possible.  Recently I've been working on adding a lot of specific functionality for my Black Desert Online guild, so a few functions and commands are thrown in there specifically for the structure of that guild, and are not customizable yet to have any use outside of that.

Dependencies for the project can be found in my package.json file.  I'm making a lot of undocumented updates recently because progress and ideas are moving fast and rapidly and I'll have a fully well documented release when I'm ready to release version 1 of the bot.

# Commands

"Hi Mercy!" (string literal) has the bot respond to you with a mention saying "Hello @userid"

~Leeki sends a quote from quotes.json with the key Leeki (Guild use).

~shrug pastes "¯\\_(ツ)_/¯" in chat.  The extra \ character is so Discord processes the \

~ayy not working yet.  Name implies feature.

~8ball [question] asks a question into the eightball.

~ [message] with a space sends a message to cleverbot-node for the bot to respond with.

~cat pastes a random cat picture in chat from random.cat/meow

~time gets local time of the bot.

~mission reminds channel when scheduled mission is (guild use).  (Will eventually be customizable to set a certain time to count down to.

~remind starts the scheduled reminder for the guild mission (guild use).  This code is a bit sloppy right now but it'll send a reminder at 8:30PM EST then each day after that send the same message.  I DO NOT like how the code works currently, I want to find a much safer and more efficient way to handle this.
