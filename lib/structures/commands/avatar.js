'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _avatar = require('../../modules/avatar');

var _avatar2 = _interopRequireDefault(_avatar);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var collectors = new Map();

exports.default = async function (tokens, message) {
    if (!tokens.length) return await avatar(message);
    var token = tokens.shift();
    if (token === 'random') return await avatarRandom(message);
    if (token === 'download') return await avatarDownload(message);
    if (token === 'add') return await avatarAdd(tokens, message);
    if (token === 'delete') return await avatarDelete(message);
    if (token === 'help') return await avatarHelp(message);
    if (token === 'design') return await avatarDesign(message);
    if (token === 'init') return await avatarInit(tokens, message);
    if (message.mentions && message.mentions.users.size) return await avatarMention(message);
};

async function avatar(message) {
    var avatar = await getAvatar(message.author.id);
    if (!avatar) return await avatarHelp(message);
    return await message.channel.send({
        files: [{ attachment: _config2.default.get('server') + '/api/avatar/' + avatar.id + '/icon', name: 'avatar.gif' }]
    }).catch(function () {
        message.channel.send('Failed to load avatar resource');
    });
}

async function avatarRandom(message) {
    var url = 'http://labs.maplestory.io/api/gms/latest/character/random?' + message.author.id + Math.random().toString(36).substring(2);
    return message.channel.send({
        file: { attachment: url, name: 'avatar.gif' }
    }).catch(function () {
        message.channel.send('Failed to load random avatar');
    });
}

async function avatarDownload(message) {
    var avatar = await getAvatar(message.author.id);
    if (!avatar) return message.channel.send('', {
        embed: {
            color: 0xFF33A2,
            title: 'You do not have an existing avatar'
        }
    });
    return message.channel.send('<' + _config2.default.get('server') + '/api/avatar/' + avatar.id + '/download>');
}

async function avatarAdd(tokens, message) {
    var avatar = await getAvatar(message.author.id);
    if (!avatar) return message.channel.send({
        embed: {
            color: 0xFF33A2,
            title: 'Initiate your avatar base with !avatar init [color]',
            description: 'Here are some available colors: \n`light`, `ashen`, `pale pink`, `tanned`, `pale`, `green`, `ghostly`, `dark`, `clay`, `mercedes`'
        }
    }).catch(function () {
        message.channel.send('Failed to load avatar resource');
    });

    var name = encodeURI(tokens.join(' '));
    var item = await (0, _requestPromise2.default)({ uri: _config2.default.get('server') + '/api/item/' + name + '/equip', json: true }).catch(function () {
        // console.error(`failed to load item with name ${name}`);
    });
    if (!item) return message.channel.send('', { embed: { color: 0xFF33A2, title: 'No result found!' } });

    await message.reply('Do you want to add this item? (yes/no)', { embed: {
            title: item.name,
            description: 'Category: ' + item.typeInfo.subCategory,
            color: 0xFF33A2,
            thumbnail: {
                url: 'http://www.pinkbean.xyz/api/item/' + name + '/icon'
            }
        } });
    var choice = await collector(message);
    if (choice !== 'yes' && choice !== 'y') return message.channel.send({ embed: { title: 'Request cancelled', color: 0xFF33A2 } });

    var selectedItems = JSON.parse(avatar.selectedItems);

    if (item.typeInfo.subCategory === 'Overall') {
        delete selectedItems['Top'];
        delete selectedItems['Bottom'];
    }

    selectedItems[item.typeInfo.subCategory] = item;

    avatar.selectedItems = JSON.stringify(selectedItems);

    await _avatar2.default.updateAvatarWithId(message.author.id, avatar);

    return await message.channel.send({
        files: [{ attachment: _config2.default.get('server') + '/api/avatar/' + message.author.id + '/icon', name: 'avatar.gif' }]
    }).catch(function () {
        message.channel.send('Failed to load avatar resource');
    });
}

async function avatarDelete(message) {
    var avatar = await getAvatar(message.author.id);
    if (!avatar) return message.channel.send('', {
        embed: {
            color: 0xFF33A2,
            title: 'You do not have an existing avatar'
        }
    });

    await _avatar2.default.deleteAvatarWithId(message.author.id);

    return message.channel.send('', {
        embed: {
            color: 0xFF33A2,
            title: 'Avatar deleted'
        }
    });
}

async function avatarHelp(message) {
    return message.channel.send('', {
        embed: {
            color: 0xFF33A2,
            title: 'Avatar Creation Guide',
            description: 'A simple MapleStory simulator',
            fields: [{ name: '!avatar', value: 'Display your avatar / show this command' }, { name: '!avatar init (color)', value: 'Choose one of the following colors to initiate your avatar base\n`light`, `ashen`, `pale pink`, `tanned`, `pale`, `green`, `ghostly`, `dark`, `clay`, `mercedes`' }, { name: '!avatar add (item)', value: 'Search and equip your avatar' }, { name: '!avatar delete', value: 'Delete your avatar' }, { name: '!avatar download', value: 'Download your avatar' }, { name: '!avatar [@mention]', value: 'Display your mentioned buddy\'s avatar' }, { name: '!avatar random', value: 'Display a random avatar' }, { name: '!avatar help', value: 'Display this message' }, { name: '!avatar design', value: 'Pink Bean: Design' }]
        }
    });
}

async function avatarDesign(message) {
    message.channel.send('<http://www.pinkbean.xyz/design>');
}

async function avatarInit(tokens, message) {
    var avatar = await getAvatar(message.author.id);
    if (avatar) return message.channel.send('', {
        embed: {
            color: 0xFF33A2,
            title: 'Please delete your previous avatar before initializing a new one'
        }
    });

    var token = tokens.shift();
    var color = void 0;

    if (token === 'light') {
        color = 2000;
    } else if (token === 'ashen') {
        color = 2004;
    } else if (token === 'pale pink') {
        color = 2010;
    } else if (token === 'tanned') {
        color = 2001;
    } else if (token === 'pale') {
        color = 2003;
    } else if (token === 'green') {
        color = 2005;
    } else if (token === 'ghostly') {
        color = 2013;
    } else if (token === 'dark') {
        color = 2002;
    } else if (token === 'clay') {
        color = 2011;
    } else if (token === 'mercedes') {
        color = 2012;
    } else {
        color = 2000;
    }

    var body = { id: message.author.id, skin: color, selectedItems: '{}', mercEars: false };

    await _avatar2.default.setAvatar(body);

    return await message.channel.send({
        files: [{ attachment: _config2.default.get('server') + '/api/avatar/' + message.author.id + '/icon', name: 'avatar.gif' }]
    }).catch(function () {
        message.channel.send('Failed to load avatar resource');
    });
}

async function avatarMention(message) {
    var user = message.mentions.users.first();
    var member = message.channel.guild ? message.channel.guild.members.find(function (u) {
        return u.id === user.id;
    }) : null;
    if (!member) return;

    var avatar = await getAvatar(member.id);
    if (!avatar) return message.channel.send('', {
        embed: {
            color: 0xFF33A2,
            title: 'This user does not have an avatar'
        }
    });
    return await message.channel.send({
        files: [{ attachment: _config2.default.get('server') + '/api/avatar/' + member.id + '/icon', name: 'avatar.gif' }]
    }).catch(function () {
        message.channel.send('Failed to load avatar resource');
    });
}

async function getAvatar(id) {
    return await (0, _requestPromise2.default)({ uri: _config2.default.get('server') + '/api/avatar/' + id, json: true }).catch(function () {
        // console.error(`failed to load avatar with id ${id}`);
    });
}

async function collector(message) {
    return new Promise(async function (resolve) {
        var collector = message.channel.createMessageCollector(function (m) {
            if (m.author === message.author) return m;
        }, { time: 60000 });

        if (!message.member) message.member = message.author;
        collectors.set(message.member.id, { collector: collector });

        collector.on('collect', function (element, collector) {
            collector.stop();
        });

        collector.on('end', function (collected) {
            collectors.delete(message.member.id);
            if (!collected.size) {
                return resolve();
            }
            var content = collected.first().content;
            resolve(content);
        });
    });
}