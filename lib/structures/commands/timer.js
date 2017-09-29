'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _guild = require('../../modules/guild');

var _guild2 = _interopRequireDefault(_guild);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = async function (message) {

    var isAdmin = message.member ? message.member.hasPermission('ADMINISTRATOR') : true;
    if (!isAdmin) return message.channel.send('', { embed: { color: 0x33A2FF, title: 'This command is for administrators only' } });

    var id = message.guild ? message.guild.id : message.channel.id;
    var result = await _guild2.default.getGuildWithId(id);

    if (result) {
        if (result.timer_id) {
            result.timer_id = null;
            await _guild2.default.updateGuildWithId(id, result);
            message.channel.send('', { embed: { color: 0x33A2FF, title: '**#' + message.channel.name + '** timer is unsubscribed!' } });
        } else {
            result.timer_id = message.channel.id;
            await _guild2.default.updateGuildWithId(id, result);
            message.channel.send('', { embed: { color: 0x33A2FF, title: '**#' + message.channel.name + '** timer is subscribed!' } });
        }
    } else {
        result = { id: id, timer_id: message.channel.id };
        await _guild2.default.setGuild(result);
        message.channel.send('', { embed: { color: 0x33A2FF, title: '**#' + message.channel.name + '** timer is subscribed!' } });
    }
};