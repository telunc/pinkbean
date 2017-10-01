const version = require('../../../package.json').version;

const help =
    `
\`\`\`css
[Pink Bean - v${version}]

@Parameters (required), [optional];

News Engine:
  !sub                    Toggle news subscription
  !news                   News help
Music Engine:
  !play        [video]    Search YouTube link and keyword
  !join                   Join voice channel
  !leave                  Leave voice channel
  !pause                  Pause current song
  !resume                 Resume current song
  !skip                   Skip current song
  !current                Display current playing song
  !queue                  Display songs in queue
  !shuffle                Shuffle songs in queue
  !clear                  Clear songs in queue
Maple Engine:
  !timer                  Toggle timer
  !avatar      [help]     Avatar help
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
General:
  !ping                   Pink Bean latency
  !prefix                 Customize prefix
\`\`\`

**Website:**
<http://www.pinkbean.xyz>

**Invite:**
<http://www.pinkbean.xyz/invite>

**Support:**
https://discord.gg/wBUKQhN`;

export default (message) => {
    if (message.channel.type !== 'dm') {
        message.channel.send('Okay, Check your Private Message!');
    }
    message.author.send(help);
};