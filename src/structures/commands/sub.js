import Guild from '../../modules/guild';

export default async(message) => {

    let isAdmin = (message.member) ? message.member.hasPermission('ADMINISTRATOR') : true;
    if (!isAdmin) return message.channel.send('', { embed: { color: 0x33A2FF, title: 'This command is for administrators only' } });

    let id = (message.guild) ? message.guild.id : message.channel.id;
    let result = await Guild.getGuildWithId(id);

    if (result) {
        if (result.sub_id) {
            result.sub_id = null;
            await Guild.updateGuildWithId(id, result);
            message.channel.send('', { embed: { color: 0x33A2FF, title: '**#' + message.channel.name + '** is unsubscribed!' } });
        } else {
            result.sub_id = message.channel.id;
            await Guild.updateGuildWithId(id, result);
            message.channel.send('', { embed: { color: 0x33A2FF, title: '**#' + message.channel.name + '** is subscribed!' } });
        }
    } else {
        result = { id: id, sub_id: message.channel.id };
        await Guild.setGuild(result);
        message.channel.send('', { embed: { color: 0x33A2FF, title: '**#' + message.channel.name + '** is subscribed!' } });
    }

};