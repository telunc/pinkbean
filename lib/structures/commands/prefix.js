'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _guild = require('../../modules/guild');

var _guild2 = _interopRequireDefault(_guild);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = async function (tokens, message) {

    var prefix = tokens.join(' ').replace(/[{}]/g, '');
    if (!prefix) return message.channel.send('', {
        embed: {
            title: 'Help: Prefix',
            description: 'To use this command, please supply a new prefix\nFor example, `leah prefix ?`\n\nYou may also put the prefix in curly braces.\nFor example, `leah prefix {Leah }`',
            color: 0x33A2FF
        }
    });

    var isAdmin = message.member ? message.member.hasPermission('ADMINISTRATOR') : true;
    if (!isAdmin) return message.channel.send('', { embed: { color: 0x33A2FF, title: 'This command is for administrators only' } });

    var id = message.guild ? message.guild.id : message.channel.id;
    var result = await _guild2.default.getGuildWithId(id);

    if (result) {
        result.prefix = prefix;
        await _guild2.default.updateGuildWithId(id, result);
    } else {
        result = { id: id, prefix: prefix };
        await _guild2.default.setGuild(result);
    }

    if (!prefix) return message.channel.send('', { embed: { color: 0x33A2FF, title: 'Prefix has been reset' } });
    message.channel.send('', { embed: { color: 0x33A2FF, title: 'Prefix has been set to ' + prefix } });
};