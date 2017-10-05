import Guild from '../../modules/guild';

export default async(tokens, message) => {

    let isAdmin = (message.member) ? message.member.hasPermission('ADMINISTRATOR') : true;
    if (!isAdmin) return message.channel.send('', { embed: { color: 0x33A2FF, title: 'This command is for administrators only' } });

    let id = (message.guild) ? message.guild.id : message.channel.id;
    let result = await Guild.getGuildWithId(id);
    let notice_msg = (tokens.length) ? tokens.join(' ') : null;

    if (result) {
        if (result.notice_id) {
            result.notice_id = null;
            await Guild.updateGuildWithId(id, result);
            message.channel.send('', { embed: { color: 0x33A2FF, title: '**#' + message.channel.name + '** maintenance notification is unsubscribed!' } });
        } else {
            result.notice_id = message.channel.id;
            result.notice_msg = notice_msg;
            await Guild.updateGuildWithId(id, result);
            message.channel.send('', { embed: { color: 0x33A2FF, title: '**#' + message.channel.name + '** maintenance notification is subscribed!' } });
        }
    } else {
        result = { id: id, notice_id: message.channel.id, notice_msg: notice_msg };
        await Guild.setGuild(result);
        message.channel.send('', { embed: { color: 0x33A2FF, title: '**#' + message.channel.name + '** maintenance notification is subscribed!' } });
    }

};