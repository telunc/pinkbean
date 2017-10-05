import rp from 'request-promise';
import config from 'config';

export default async(message) => {
    let result = await rp({ uri: `${config.get('server')}/api/news/2x`, json: true }).catch(() => {
        // console.error(`failed to load character with name ${name}`);
    });
    if (!result) return message.channel.send('No result found!');
    let content = '';
    if (result.end) content += `\nEnding in \n${result.end}\n`;
    if (result.next) content += `\nComing up\n${result.next}\n`;
    message.channel.send(content);
};