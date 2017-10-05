'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _guild = require('../../modules/guild');

var _guild2 = _interopRequireDefault(_guild);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = async function (tokens, message) {

    var isAdmin = message.member ? message.member.hasPermission('ADMINISTRATOR') : true;
    if (!isAdmin) return message.channel.send('', { embed: { color: 0x33A2FF, title: 'This command is for administrators only' } });

    var id = message.guild ? message.guild.id : message.channel.id;
    var result = await _guild2.default.getGuildWithId(id);
    var notice_msg = tokens.length ? tokens.join(' ') : null;

    if (result) {
        if (result.notice_id) {
            result.notice_id = null;
            await _guild2.default.updateGuildWithId(id, result);
            message.channel.send('', { embed: { color: 0x33A2FF, title: '**#' + message.channel.name + '** maintenance notification is unsubscribed!' } });
        } else {
            result.notice_id = message.channel.id;
            result.notice_msg = notice_msg;
            await _guild2.default.updateGuildWithId(id, result);
            message.channel.send('', { embed: { color: 0x33A2FF, title: '**#' + message.channel.name + '** maintenance notification is subscribed!' } });
        }
    } else {
        result = { id: id, notice_id: message.channel.id, notice_msg: notice_msg };
        await _guild2.default.setGuild(result);
        message.channel.send('', { embed: { color: 0x33A2FF, title: '**#' + message.channel.name + '** maintenance notification is subscribed!' } });
    }
};