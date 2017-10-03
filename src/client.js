import Discord from 'discord.js';
import config from 'config';
import tokenizer from './modules/tokenizer';
import socket from './modules/socket';
import support from './modules/support';
import analytics from './modules/analytics';
import commands from './structures/commands';

let timer;
const client = new Discord.Client();
socket(client);
support(client);

client.on('ready', () => {
    watchdog();
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setPresence({ game: { name: '!help' } });
});

client.on('message', async message => {
    watchdog();
    if (message.author.bot) return;
    let tokens = await tokenizer.getTokens(message);
    if (!tokens) return;
    let command = tokens.shift();
    if (commands.hasOwnProperty(command)) {
        analytics(command, message);
        commands[command](tokens, message, client);
    }
});

function watchdog() {
    clearInterval(timer);
    timer = setInterval(() => {
        console.log('A shard restarted');
        process.exit();
    }, 600000); // 10 minutes
}

client.login(config.get('discord').token);