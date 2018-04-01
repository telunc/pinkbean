import rp from 'request-promise';
import Avatar from '../../modules/avatar';
import config from 'config';

let collectors = new Map();

export default async(tokens, message) => {
    if (!tokens.length) return await avatar(message);
    let token = tokens.shift();
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
    let avatar = await getAvatar(message.author.id);
    if (!avatar) return await avatarHelp(message);
    return await message.channel.send({
        files: [{ attachment: `${config.get('server')}/api/avatar/${avatar.id}/icon`, name: 'avatar.png' }]
    }).catch(() => {
        message.channel.send('Failed to load avatar resource');
    });
}

async function avatarRandom(message) {
    let url = 'http://labs.maplestory.io/api/gms/latest/character/random?' + message.author.id + (Math.random().toString(36).substring(2));
    return message.channel.send({
        file: { attachment: url, name: 'avatar.png' },
    }).catch(() => {
        message.channel.send('Failed to load random avatar');
    });
}

async function avatarDownload(message) {
    let avatar = await getAvatar(message.author.id);
    if (!avatar) return message.channel.send('', {
        embed: {
            color: 0xFF33A2,
            title: 'You do not have an existing avatar',
        }
    });
    return message.channel.send(`<${config.get('server')}/api/avatar/${avatar.id}/download>`);
}

async function avatarAdd(tokens, message) {
    let avatar = await getAvatar(message.author.id);
    if (!avatar) return message.channel.send({
        embed: {
            color: 0xFF33A2,
            title: 'Initiate your avatar base with !avatar init [color]',
            description: 'Here are some available colors: \n`light`, `ashen`, `pale pink`, `tanned`, `pale`, `green`, `ghostly`, `dark`, `clay`, `mercedes`'
        }
    }).catch(() => {
        message.channel.send('Failed to load avatar resource');
    });

    let name = encodeURI(tokens.join(' '));
    let item = await rp({ uri: `${config.get('server')}/api/item/${name}/equip`, json: true }).catch(() => {
        // console.error(`failed to load item with name ${name}`);
    });
    if (!item) return message.channel.send('', { embed: { color: 0xFF33A2, title: 'No result found!' } });

    await message.reply('Do you want to add this item? (yes/no)',{embed:{
        title: item.Name,
        description: `Category: ${item.TypeInfo.SubCategory}`,
        color: 0xFF33A2,
        thumbnail:{
            url: `http://www.pinkbean.xyz/api/item/${name}/icon`
        }
    }});
    let choice = await collector(message);
    if (choice !== 'yes' && choice !== 'y') return message.channel.send({ embed: { title: 'Request cancelled', color: 0xFF33A2 } });

    let selectedItems = JSON.parse(avatar.selectedItems);

    if (item.TypeInfo.SubCategory === 'Overall') {
        delete selectedItems['Top'];
        delete selectedItems['Bottom'];
    }

    selectedItems[item.TypeInfo.SubCategory] = item;

    avatar.selectedItems = JSON.stringify(selectedItems);

    await Avatar.updateAvatarWithId(message.author.id, avatar);

    return await message.channel.send({
        files: [{ attachment: `${config.get('server')}/api/avatar/${message.author.id}/icon`, name: 'avatar.png' }]
    }).catch(() => {
        message.channel.send('Failed to load avatar resource');
    });
}

async function avatarDelete(message) {
    let avatar = await getAvatar(message.author.id);
    if (!avatar) return message.channel.send('', {
        embed: {
            color: 0xFF33A2,
            title: 'You do not have an existing avatar',
        }
    });

    await Avatar.deleteAvatarWithId(message.author.id);

    return message.channel.send('', {
        embed: {
            color: 0xFF33A2,
            title: 'Avatar deleted',
        }
    });
}

async function avatarHelp(message) {
    return message.channel.send('', {
        embed: {
            color: 0xFF33A2,
            title: 'Avatar Creation Guide',
            description: 'A simple MapleStory simulator',
            fields: [
                { name: '!avatar', value: 'Display your avatar / show this command' },
                { name: '!avatar init (color)', value: 'Choose one of the following colors to initiate your avatar base\n`light`, `ashen`, `pale pink`, `tanned`, `pale`, `green`, `ghostly`, `dark`, `clay`, `mercedes`' },
                { name: '!avatar add (item)', value: 'Search and equip your avatar' },
                { name: '!avatar delete', value: 'Delete your avatar' },
                { name: '!avatar download', value: 'Download your avatar' },
                { name: '!avatar [@mention]', value: 'Display your mentioned buddy\'s avatar' },
                { name: '!avatar random', value: 'Display a random avatar' },
                { name: '!avatar help', value: 'Display this message' },
                { name: '!avatar design', value: 'Pink Bean: Design' }
            ]
        }
    });
}

async function avatarDesign(message) {
    message.channel.send('<http://www.pinkbean.xyz/design>');
}

async function avatarInit(tokens, message) {
    let avatar = await getAvatar(message.author.id);
    if (avatar) return message.channel.send('', {
        embed: {
            color: 0xFF33A2,
            title: 'Please delete your previous avatar before initializing a new one',
        }
    });

    let token = tokens.shift();
    let color;

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

    let body = { id: message.author.id, skin: color, selectedItems: '{}', mercEars: false };

    await Avatar.setAvatar(body);

    return await message.channel.send({
        files: [{ attachment: `${config.get('server')}/api/avatar/${message.author.id}/icon`, name: 'avatar.png' }]
    }).catch(() => {
        message.channel.send('Failed to load avatar resource');
    });
}

async function avatarMention(message) {
    let user = message.mentions.users.first();
    let member = message.channel.guild ? message.channel.guild.members.find(u => u.id === user.id) : null;
    if (!member) return;

    let avatar = await getAvatar(member.id);
    if (!avatar) return message.channel.send('', {
        embed: {
            color: 0xFF33A2,
            title: 'This user does not have an avatar',
        }
    });
    return await message.channel.send({
        files: [{ attachment: `${config.get('server')}/api/avatar/${member.id}/icon`, name: 'avatar.gif' }]
    }).catch(() => {
        message.channel.send('Failed to load avatar resource');
    });
}

async function getAvatar(id) {
    return await rp({ uri: `${config.get('server')}/api/avatar/${id}`, json: true }).catch(() => {
        // console.error(`failed to load avatar with id ${id}`);
    });
}

async function collector(message) {
    return new Promise(async(resolve) => {
        let collector = message.channel.createMessageCollector((m) => { if (m.author === message.author) return m; }, { time: 60000 });

        if (!message.member) message.member = message.author;
        collectors.set(message.member.id, { collector: collector });

        collector.on('collect', (element, collector) => {
            collector.stop();
        });

        collector.on('end', (collected) => {
            collectors.delete(message.member.id);
            if (!collected.size) {
                return resolve();
            }
            let content = collected.first().content;
            resolve(content);
        });
    });
}