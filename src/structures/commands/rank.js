import rp from 'request-promise';
import config from 'config';

export default async(tokens, message) => {
    let name = tokens.shift();
    let character = await rp({ uri: `${config.get('server')}/api/rank/na/${name}/overall`, json: true }).catch(() => {
        // console.error(`failed to load character with name ${name}`);
    });
    if (!character) return message.channel.send('', { embed: { color: 0xFF33A2, title: 'No result found!' } });
    message.channel.send('', {
        embed: {
            color: 0xFF33A2,
            thumbnail: {
                url: character.avatar
            },
            fields: [
                { name: 'Name', value: character.name, inline: true },
                { name: 'Job', value: character.job, inline: true },
                { name: 'Level', value: `${character.level} (${character.exp})`, inline: true },
                { name: 'Overall Rank', value: character.ranking, inline: true },
                { name: 'World', value: character.world, inline: true },
                { name: 'World Rank', value: character.worldRank, inline: true },
                { name: 'Job Rank', value: character.jobRank, inline: true },
                { name: 'Legion Rank', value: character.legion, inline: true }
            ]
        }
    });
};