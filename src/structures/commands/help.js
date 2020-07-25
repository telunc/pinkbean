const version = require('../../../package.json').version;

const help =
    `
\`\`\`css
[Pink Bean - v${version}]

@Parameters (required), [optional];

MapleStory Commands:
  !sub                    Toggle news subscription
  !news                   News help
  !timer                  Toggle timer
  !rank        (name)     NA server ranking
  !rank-jw     (name)     NA job world ranking
  !rank-ja     (name)     NA job alliance ranking
  !rankeu      (name)     EU server ranking
  !rankeu-jw   (name)     EU job world ranking
  !rankeu-ja   (name)     EU job alliance ranking
  !mob         (mob)      Mob detail
  !item        (item)     Item detail
  !time                   Server time
  !daily                  Time left until daily reset
  !weekly                 Time left until weekly reset
  !invasion               Time left until Kritias invasion
General:
  !about                  About Pink Bean
  !ping                   Pink Bean latency
  !prefix                 Customize prefix
\`\`\`

**Website:**
<https://www.pinkbean.xyz>

**Donate:**
<https://www.patreon.com/PinkBean>

**Support:**
https://discord.gg/wBUKQhN`;

export default (message) => {
    if (message.channel.type !== 'dm') {
        message.channel.send('Okay, Check your Private Message!');
    }
    message.author.send(help);
};