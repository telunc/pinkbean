import rp from 'request-promise';
import config from 'config';

export default async(tokens, message, server) => {
    let name = tokens.shift();
    let character = await rp({ uri: `${config.get('server')}/api/rank/${server}/${name}/overall`, json: true }).catch(() => {
        // console.error(`failed to load character with name ${name}`);
    });
    if (!character) return message.channel.send('', { embed: { color: 0xFF33A2, title: 'No result found!' } });

    let fields = [];
    if (character.name) fields.push({ name: 'Name', value: character.name, inline: true });
    if (character.job) fields.push({ name: 'Job', value: character.job, inline: true });
    if (character.level && character.exp) fields.push({ name: 'Level', value: `${character.level} (${character.exp})`, inline: true });
    if (character.ranking) fields.push({ name: 'Overall Rank', value: character.ranking, inline: true });
    if (character.world) fields.push({ name: 'World', value: character.world, inline: true });
    if (character.worldRank) fields.push({ name: 'World Rank', value: character.worldRank, inline: true });
    if (character.jobRank) fields.push({ name: 'Job Rank', value: character.jobRank, inline: true });
    if (character.legion) fields.push({ name: 'Legion Rank', value: character.legion, inline: true });

    message.channel.send('', {
        embed: {
            color: 0xFF33A2,
            thumbnail: {
                url: character.avatar
            },
            fields: fields
        }
    });
};