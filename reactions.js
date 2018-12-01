const _ = require("lodash");
const Discord = require("discord.js");
const fetch = require('node-fetch');
const ytdl = require('ytdl-core');

const errorMsg = (msg) => msg.channel.send("??? cos sie popsulo xd");

module.exports = [
    {
        regex: (/(fortnit)+/i),
        callback(msg) {
            msg.channel.send(`nie mam czasu mam korki 😂😂😂`, { tts: true });
        }
    }, {
        regex: (/(dild)+/i),
        callback(msg) {
            msg.channel.send("https://www.youtube.com/watch?v=qEyh7TThK9w");
        }
    }, {
        regex: (/(elo)+|(siema)+|(witam)+|(czesc)+|(hej)+/i),
        callback(msg) {
            msg.channel.send("no elo");
        }
    }, {
        regex: (/(huj)+|(pierd)+|(jeba)+/i),
        callback(msg) {
            msg.channel.send(_.sample([
                "kolego pchasz sie w gips",
                "znudzilo ci sie oddychanie prostym nosem?",
                "chcesz oddac litr krwi dobroczynnie?",
                "jak byles mlody to kolysanka zaczela sie palic i cie stary lopata gasil"
            ]));
        }
    }, {
        regex: (/(php)+/i),
        callback(msg) {
            msg.channel.send(`
for($i = 1; $i<=10;$i++){
    for($j = 1; $j<=10;$j++){
        echo "$i x $j = ".$i*$j;
    }
}
            `, { code: "php" });
        }
    }, {
        regex: (/(lis)+|huli huli/i),
        callback(msg) {
            fetch("https://randomfox.ca/floof/")
                .catch(() => errorMsg(msg))
                .then(res => res.json())
                .then(json => {
                    const fox = new Discord.RichEmbed().setImage(json.image);
                    msg.channel.send(fox);
                });
        }
    }, {
        regex: (/(bitcoin)+/i),
        callback(msg) {
            fetch("https://bitmarket24.pl/api/BTC_PLN/status.json")
                .catch(() => errorMsg(msg))
                .then(res => res.json())
                .then(json => {
                    msg.channel.send(`no bitcoin to tera chodzi po ${Number(json.ask)} zeta xd`);
                });
        }
    }, {
        regex: (/(keb)+/i),
        callback(msg) {
            const mieso = _.sample(["baranina wolowina", "kurczak"]);
            const sos = _.sample(["mieszany", "lagodny", "ostry"]);
            const kebab = new Discord.RichEmbed().setImage("https://cdn.extra.ie/wp-content/uploads/2018/02/19113641/Kebab-Shop-Photoshoot-696x406.jpg");

            msg.channel.send(`nie ma problemu ${msg.author}! trzymaj duza pita, ${mieso} sos ${sos} `);
            msg.channel.send(kebab);
        }
    }, {
        regex: (/(graj)+/i),
        async callback(msg) {
            const urlMatches = msg.content.match(/(?:(?:https?|ftp):\/\/)?[\w/\-?=%.]+\.[\w/\-?=%.]+/);
            if (!urlMatches) return msg.channel.send("nie dales linku do filmiku ziom");
            const videoURL = urlMatches[0];

            try {
                const channel = msg.member.voiceChannel;
                await channel.join();
                const broadcast = msg.client.createVoiceBroadcast();
                const stream = ytdl(videoURL, { filter: 'audioonly' });

                broadcast.playStream(stream);
                channel.connection.playBroadcast(broadcast);
                broadcast.on("end", () => channel.leave());
                msg.channel.send(`no to gram normalnie :)`);
            } catch (e) {
                msg.channel.send(`ee no panie... zly link albo kanal!`);
            }
        }
    },
];