import rp from 'request-promise';
import config from 'config';

export default async(tokens, message) => {
    let name = tokens.shift();
    let character = await rp({ uri: `${config.get('server')}/api/rank/na/${name}/overall`, json: true }).catch(() => {
        // console.error(`failed to load character with name ${name}`);
    });
    if (!character) return message.channel.send('', { embed: { color: 0xFF33A2, title: 'No result found!' } });
    let characters = await rp({ uri: `${config.get('server')}/api/rank/na/${name}/job-alliance`, json: true }).catch(() => {
        // console.error(`failed to load character with name ${name}`);
    });
    if (!characters) return message.channel.send('', { embed: { color: 0xFF33A2, title: 'No result found!' } });
    let fields = [];
    characters.forEach((character, index) => {
        fields.push({ name: `${index+1}. ${character.name}`, value: `${character.level} (${character.exp})`, inline: true });
    });
    message.channel.send('', {
        embed: {
            title: `__**${character.job} Alliance Ranking**__`,
            description: `${character.name}'s ranking`,
            color: 0xFF33A2,
            thumbnail: {
                url: character.avatar
            },
            fields: fields,
            footer: {
                text: 'Showing up to 20 results',
            },
        }
    });
};