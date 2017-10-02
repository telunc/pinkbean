import rp from 'request-promise';
import config from 'config';

export default async(tokens, message, server) => {
    let name = tokens.shift();
    let character = await rp({ uri: `${config.get('server')}/api/rank/${server}/${name}/overall`, json: true }).catch(() => {
        // console.error(`failed to load character with name ${name}`);
    });
    if (!character) return message.channel.send('', { embed: { color: 0xFF33A2, title: 'No result found!' } });
    let characters = await rp({ uri: `${config.get('server')}/api/rank/${server}/${name}/job-world`, json: true }).catch(() => {
        // console.error(`failed to load character with name ${name}`);
    });
    if (!characters) return message.channel.send('', { embed: { color: 0xFF33A2, title: 'No result found!' } });
    let fields = [];
    characters.forEach((character, index) => {
        fields.push({ name: `${index+1}. ${character.name}`, value: `${character.level} (${character.exp})`, inline: true });
    });
    message.channel.send('', {
        embed: {
            title: `__**${character.job} World Ranking**__`,
            description: `${character.name}'s ranking in ${character.world}`,
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