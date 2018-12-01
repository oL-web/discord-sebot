require("dotenv").config();
const Discord = require("discord.js");
const _ = require("lodash");
const reactions = require("./reactions");

const bot = new Discord.Client();
const BOT_NAME = "seba";

bot.on("message", (msg) => {
    const isBotCalled = msg.content.slice(0, 4).toLowerCase() === BOT_NAME;
    if (!isBotCalled) return;

    for (const reaction of reactions) {
        if ((reaction.regex).test(msg.content)) {
            return reaction.callback(msg);
        }
    }

    msg.channel.send(_.sample(["?", "???", "??"]));
});

bot.login(process.env.BOT_TOKEN);