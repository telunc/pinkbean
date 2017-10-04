import config from 'config';
import Guild from './guild';

let log;

export default (client) => {
    client.on('ready', () => {
        log = client.channels.get(config.get('discord').guildLog);
    });
    client.on('guildCreate', (guild) => {
        if (log) log.send('', { embed: buildEmbed(guild, true) });
    });
    client.on('guildDelete', (guild) => {
        if (log) log.send('', { embed: buildEmbed(guild, false) });
        Guild.deleteGuildWithId(guild.id);
    });
};

function buildEmbed(guild, isCreate) {

    let embed = {};
    let title, color;

    if (isCreate) {
        title = 'Guild Create';
        color = 0x00FF00;
    } else {
        title = 'Guild Delete';
        color = 0xFF0000;
    }

    embed.title = title;
    embed.color = color;
    embed.fields = [
        { name: 'ID', value: guild.id, inline: true },
        { name: 'Name', value: guild.name, inline: true },
        { name: 'Member Count', value: guild.memberCount, inline: true }
    ];

    return embed;
}