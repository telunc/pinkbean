import io from 'socket.io-client';
import config from 'config';
import Guild from './guild';

var socket = io.connect(`${config.get('server')}:8080`);

export default (client) => {

    socket.on('timer', async(data) => {
        let guilds = await Guild.getGuilds();
        if (!guilds || !Array.isArray(guilds)) return;
        guilds.forEach(async(guild) => {
            let channel = client.channels.get(guild.timer_id);
            if (!channel) return;
            await bulkDelete(channel);
            channel.send(
                '```js' +
                '\n[Server Time]\n' + data.time +
                '\n\n[Daily Reset]\n' + data.daily +
                '\n\n[Weekly Reset]\n' + data.weekly +
                '\n\n[Guild and Dojo Reset]\n' + data.guild +
                '\n```'
            );
        });
    });

    socket.on('news', async(posts) => {
        let guilds = await Guild.getGuilds();
        if (!guilds || !Array.isArray(guilds)) return;
        guilds.forEach(async(guild) => {
            let channel = client.channels.get(guild.sub_id);
            if (!channel) return;
            posts.forEach((post) => {
                channel.send('', { embed: { color: 0x33A2FF, title: post.title, description: post.description, thumbnail: { url: post.image }, url: post.link } });
            });
        });
    });

};

async function bulkDelete(channel) {
    let messages = await channel.fetchMessages({ limit: 100 });
    let filteredMessages = messages.filter((message) => {
        return message.author.id === config.get('discord').clientId;
    });
    await channel.bulkDelete(filteredMessages).catch(async() => {
        // console.error('failed to delete messages');
        if (filteredMessages.first()) await filteredMessages.first().delete().catch(() => {
            console.error('failed to delete message');
        });
    });
}