import Guild from '../../modules/guild';

export default async(message) => {

    let isAdmin = (message.member) ? message.member.hasPermission('ADMINISTRATOR') : true;
    if (!isAdmin) return message.channel.send('', { embed: { color: 0x33A2FF, title: 'This command is for administrators only' } });

    let id = (message.guild) ? message.guild.id : message.channel.id;
    let result = await Guild.getGuildWithId(id);

    if (result) {
        if (result.timer_id) {
            result.timer_id = null;
            await Guild.updateGuildWithId(id, result);
            message.channel.send('', { embed: { color: 0x33A2FF, title: '**#' + message.channel.name + '** timer is unsubscribed!' } });
        } else {
            result.timer_id = message.channel.id;
            await Guild.updateGuildWithId(id, result);
            message.channel.send('', { embed: { color: 0x33A2FF, title: '**#' + message.channel.name + '** timer is subscribed!' } });
        }
    } else {
        result = { id: id, timer_id: message.channel.id };
        await Guild.setGuild(result);
        message.channel.send('', { embed: { color: 0x33A2FF, title: '**#' + message.channel.name + '** timer is subscribed!' } });
    }

};