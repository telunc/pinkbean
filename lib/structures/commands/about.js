'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _package = require('../../../package.json');

var _package2 = _interopRequireDefault(_package);

var _package3 = require('../../../node_modules/discord.js/package.json');

var _package4 = _interopRequireDefault(_package3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var version = _package2.default.version;
var discord_version = _package4.default.version;

exports.default = async function (message, client) {
    var reply = {
        embed: {
            description: client.user.username + ' is a project I made to give back the community. Thanks for all the love and support!',
            author: {
                name: '' + client.user.username,
                url: 'https://pinkbean.xyz/'
            },
            fields: await buildBotInfo(client),
            color: 0x33A2FF
        }
    };
    message.channel.send(reply);
};

async function buildBotInfo(client) {
    var guilds = await client.shard.fetchClientValues('guilds.size').catch(console.error);
    var users = await client.shard.fetchClientValues('users.size').catch(console.error);
    var channels = await client.shard.fetchClientValues('channels.size').catch(console.error);

    var fields = [];
    fields.push({ name: 'Version', value: version, inline: true });
    fields.push({ name: 'Made by', value: 'Andy#7394 laziness#2193', inline: true });
    fields.push({ name: 'Library', value: 'Discord.js ' + discord_version, inline: true });
    fields.push({ name: 'Guilds', value: reduceValues(guilds), inline: true });
    fields.push({ name: 'Users', value: reduceValues(users), inline: true });
    fields.push({ name: 'Channels', value: reduceValues(channels), inline: true });
    fields.push({
        name: 'Donate',
        value: '[patreon.com/PinkBean](https://www.patreon.com/PinkBean)',
        inline: true
    });
    fields.push({
        name: 'Website',
        value: '[pinkbean.xyz](https://pinkbean.xyz/)',
        inline: true
    });
    fields.push({
        name: 'Support',
        value: '[Discord Server](https://discord.gg/wBUKQhN)',
        inline: true
    });
    return fields;
}

function reduceValues(values) {
    var value = values.reduce(function (prev, val) {
        return prev + val;
    }, 0);
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}