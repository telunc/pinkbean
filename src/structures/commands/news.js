import rp from 'request-promise';
import config from 'config';

export default async(tokens, message) => {
    if (!tokens.length) return await help(message);
    let token = tokens.shift();
    if (token === 'event' || token === 'events') return await buildFields('events', message);
    if (token === 'sale' || token === 'sales') return await buildFields('sale', message);
    if (token === 'maint' || token === 'maintenance') return await buildEmbed('maintenance', message);
    if (token === 'update' || token === 'patch') return await buildEmbed('update', message);
    if (token === 'general') return await buildEmbed(token, message);
    if (token === 'community') return await buildEmbed(token, message);
    return await news(token, message);
};

async function help(message) {
    return message.channel.send('', {
        embed: {
            color: 0x33A2FF,
            title: 'Help: News',
            description: 'News Commands Documentation',
            fields: [
                { name: '!news', value: 'Show this message' },
                { name: '!news [index]', value: 'Choose an index from one to six\nFor example, `!news 1`' },
                { name: '!news events', value: 'Upcoming or ongoing events' },
                { name: '!news sale', value: 'Upcoming or ongoing sales' },
                { name: '!news maintenance', value: 'Maintenance alert' },
                { name: '!news update', value: 'Patch notes' },
                { name: '!news general', value: 'General information' },
                { name: '!news community', value: 'Community news' },
            ]
        }
    });
}

async function buildFields(category, message) {
    let results = await rp({ uri: `${config.get('server')}/api/news/${category}`, json: true }).catch(() => {
        // console.error(`failed to load item with name ${name}`);
    });
    if (!results) return message.channel.send('', { embed: { color: 0x33A2FF, title: 'No result found!' } });
    if (!results.length) return message.channel.send('', { embed: { color: 0x33A2FF, title: `No upcoming and ongoing ${category}!` } });
    let fields = [];
    results.forEach((post) => {
        let fromDate = new Date(Date.parse(post.fromDate));
        let toDate = new Date(Date.parse(post.toDate));
        fields.push({ name: post.title, value: 'Duration: ' + (fromDate.getMonth() + 1) + '/' + fromDate.getDate() + ' - ' + (toDate.getMonth() + 1) + '/' + toDate.getDate() + '\tRead More: [Website](' + post.link + ')' });
    });
    message.channel.send('', {
        embed: {
            color: 0x33A2FF,
            fields: fields,
        }
    });
}

async function buildEmbed(category, message) {
    let result = await rp({ uri: `${config.get('server')}/api/news/${category}`, json: true }).catch(() => {
        // console.error(`failed to load item with name ${name}`);
    });
    if (!result) return message.channel.send('', { embed: { color: 0x33A2FF, title: 'No result found!' } });
    message.channel.send('', {
        embed: {
            color: 0x33A2FF,
            title: result.title,
            description: result.description,
            thumbnail: { url: result.image },
            url: result.link
        }
    });
}

async function news(token, message) {
    if (token >= 1 && token <= 6) return buildEmbed(token, message);
    return help(message);
}