'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _guild = require('./guild');

var _guild2 = _interopRequireDefault(_guild);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = void 0;

exports.default = function (client) {
    client.on('ready', function () {
        log = client.channels.get(_config2.default.get('discord').guildLog);
    });
    client.on('guildCreate', function (guild) {
        if (log) log.send('', { embed: buildEmbed(guild, true) });
    });
    client.on('guildDelete', function (guild) {
        if (log) log.send('', { embed: buildEmbed(guild, false) });
        _guild2.default.deleteGuild(guild.id);
    });
};

function buildEmbed(guild, isCreate) {

    var embed = {};
    var title = void 0,
        color = void 0;

    if (isCreate) {
        title = 'Guild Create';
        color = 0x00FF00;
    } else {
        title = 'Guild Delete';
        color = 0xFF0000;
    }

    embed.title = title;
    embed.color = color;
    embed.fields = [{ name: 'ID', value: guild.id, inline: true }, { name: 'Name', value: guild.name, inline: true }, { name: 'Member Count', value: guild.memberCount, inline: true }];

    return embed;
}