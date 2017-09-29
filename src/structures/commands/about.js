import project from '../../../package.json';
import discordjs from '../../../node_modules/discord.js/package.json';

const version = project.version;
const discord_version = discordjs.version;

export default async(message, client) => {
    let reply = {
        embed: {
            description: `${client.user.username} is a project I made to give back the community. Thanks for all the love and support!`,
            author: {
                name: `${client.user.username}`,
                url: 'http://pinkbean.xyz/'
            },
            fields: await buildBotInfo(client),
            color: 0x33A2FF
        }
    };
    message.channel.send(reply);
};

async function buildBotInfo(client) {
    let guilds = await client.shard.fetchClientValues('guilds.size').catch(console.error);
    let users = await client.shard.fetchClientValues('users.size').catch(console.error);
    let channels = await client.shard.fetchClientValues('channels.size').catch(console.error);

    let fields = [];
    fields.push({ name: 'Version', value: version, inline: true });
    fields.push({ name: 'Made by', value: 'Andy#7394 laziness#2193', inline: true });
    fields.push({ name: 'Library', value: `Discord.js ${discord_version}`, inline: true });
    fields.push({ name: 'Guilds', value: reduceValues(guilds), inline: true });
    fields.push({ name: 'Users', value: reduceValues(users), inline: true });
    fields.push({ name: 'Channels', value: reduceValues(channels), inline: true });
    fields.push({
        name: 'Donate',
        value: '[patreon.com/PinkBean](https://www.patreon.com/PinkBean)',
        inline: true
    });
    fields.push({
        name: 'Website',
        value: '[pinkbean.xyz](http://pinkbean.xyz/)',
        inline: true
    });
    fields.push({
        name: 'Support',
        value: '[Discord Server](https://discord.gg/wBUKQhN)',
        inline: true
    });
    return fields;
}

function reduceValues(values) {
    let value = values.reduce((prev, val) => prev + val, 0);
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}