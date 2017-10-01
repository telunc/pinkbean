'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _socket = require('socket.io-client');

var _socket2 = _interopRequireDefault(_socket);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _guild = require('./guild');

var _guild2 = _interopRequireDefault(_guild);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var socket = _socket2.default.connect(_config2.default.get('server') + ':8080');

exports.default = function (client) {

    socket.on('timer', async function (data) {
        var guilds = await _guild2.default.getGuilds();
        if (!guilds || !Array.isArray(guilds)) return;
        guilds.forEach(async function (guild) {
            var channel = client.channels.get(guild.timer_id);
            if (!channel) return;
            await bulkDelete(channel);
            channel.send('```js' + '\n[Server Time]\n' + data.time + '\n\n[Daily Reset]\n' + data.daily + '\n\n[Weekly Reset]\n' + data.weekly + '\n\n[Guild and Dojo Reset]\n' + data.guild + '\n```');
        });
    });

    socket.on('news', async function (posts) {
        var guilds = await _guild2.default.getGuilds();
        if (!guilds || !Array.isArray(guilds)) return;
        guilds.forEach(async function (guild) {
            var channel = client.channels.get(guild.sub_id);
            if (!channel) return;
            posts.forEach(function (post) {
                channel.send('', { embed: { color: 0x33A2FF, title: post.title, description: post.description, thumbnail: { url: post.image }, url: post.link } });
            });
        });
    });
};

async function bulkDelete(channel) {
    var messages = await channel.fetchMessages({ limit: 100 });
    var filteredMessages = messages.filter(function (message) {
        return message.author.id === _config2.default.get('discord').clientId;
    });
    await channel.bulkDelete(filteredMessages).catch(async function () {
        // console.error('failed to delete messages');
        if (filteredMessages.first()) await filteredMessages.first().delete().catch(function () {
            console.error('failed to delete message');
        });
    });
}