import rp from 'request-promise';
import config from 'config';

export default async(message) => {
    let result = await rp({ uri: `${config.get('server')}/api/news/2x`, json: true }).catch(() => {
        // console.error(`failed to load character with name ${name}`);
    });
    if (!result) return message.channel.send('', { embed: { color: 0xFF33A2, title: 'No result found!' } });
    if (result.end) {
        message.channel.send('', {embed: {
            color: 0xFF33A2,
            title: 'The current 2x is ending in',
            description: result.end
        }});
    }
    if (result.next) {
        message.channel.send('', {embed: {
            color: 0xFF33A2,
            title: 'The next 2x is scheduled in',
            description: result.next
        }});
    }
};