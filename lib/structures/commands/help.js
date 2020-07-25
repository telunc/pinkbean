'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var version = require('../../../package.json').version;

var help = '\n```css\n[Pink Bean - v' + version + ']\n\n@Parameters (required), [optional];\n\nMapleStory Commands:\n  !sub                    Toggle news subscription\n  !news                   News help\n  !timer                  Toggle timer\n  !rank        (name)     NA server ranking\n  !rank-jw     (name)     NA job world ranking\n  !rank-ja     (name)     NA job alliance ranking\n  !rankeu      (name)     EU server ranking\n  !rankeu-jw   (name)     EU job world ranking\n  !rankeu-ja   (name)     EU job alliance ranking\n  !mob         (mob)      Mob detail\n  !item        (item)     Item detail\n  !time                   Server time\n  !daily                  Time left until daily reset\n  !weekly                 Time left until weekly reset\n  !invasion               Time left until Kritias invasion\nGeneral:\n  !about                  About Pink Bean\n  !ping                   Pink Bean latency\n  !prefix                 Customize prefix\n```\n\n**Website:**\n<https://www.pinkbean.xyz>\n\n**Donate:**\n<https://www.patreon.com/PinkBean>\n\n**Support:**\nhttps://discord.gg/wBUKQhN';

exports.default = function (message) {
    if (message.channel.type !== 'dm') {
        message.channel.send('Okay, Check your Private Message!');
    }
    message.author.send(help);
};