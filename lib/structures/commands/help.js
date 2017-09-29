'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var version = require('../../../package.json').version;

var help = '\n```css\n[Pink Bean - v' + version + ']\n\n@Parameters (required), [optional];\n\nNews Engine:\n  !sub                    Toggle news subscription\nMusic Engine:\n  !play        [video]    Search YouTube link and keyword\n  !join                   Join voice channel\n  !leave                  Leave voice channel\n  !pause                  Pause current song\n  !resume                 Resume current song\n  !skip                   Skip current song\n  !current                Display current playing song\n  !queue                  Display songs in queue\n  !shuffle                Shuffle songs in queue\n  !clear                  Clear songs in queue\nMaple Engine:\n  !timer                  Toggle timer\n  !avatar      [help]     Avatar help page\n  !rank        (name)     NA server ranking\n  !rank-jw     (name)     NA job world ranking\n  !rank-ja     (name)     NA job alliance ranking\n  !rankeu      (name)     EU server ranking\n  !rankeu-jw   (name)     EU job world ranking\n  !rankeu-ja   (name)     EU job alliance ranking\n  !mob         (mob)      Mob detail\n  !item        (item)     Item detail\nGeneral:\n  !ping                   Pink Bean latency\n  !prefix                 Customize prefix\n```\n\n**Website:**\n<http://www.pinkbean.xyz>\n\n**Invite:**\n<http://www.pinkbean.xyz/invite>\n\n**Support:**\nhttps://discord.gg/wBUKQhN';

exports.default = function (message) {
  if (message.channel.type !== 'dm') {
    message.channel.send('Okay, Check your Private Message!');
  }
  message.author.send(help);
};