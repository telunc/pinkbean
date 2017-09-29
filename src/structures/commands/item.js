import rp from 'request-promise';
import config from 'config';

export default async(tokens, message) => {
    let name = encodeURI(tokens.join(' '));
    let item = await rp({ uri: `${config.get('server')}/api/item/${name}`, json: true }).catch(() => {
        // console.error(`failed to load item with name ${name}`);
    });
    if (!item) return message.channel.send('', { embed: { color: 0xFF33A2, title: 'No result found!' } });

    let title = item.description && item.description.name;
    let image = `http://www.pinkbean.xyz/api/item/${name}/icon`;
    let description, category;
    let subCategory = item.typeInfo.category;
    let detailCategory = item.typeInfo.subCategory;

    if (item.metaInfo.equip) {
        description = '';
        if (item.metaInfo.equip.reqLevel) description += 'Required Level: ' + item.metaInfo.equip.reqLevel + '\n';
        if (item.metaInfo.equip.attackSpeed && item.metaInfo.equip.attackSpeed < 6) description += 'Attack Speed: Fast\n';
        if (item.metaInfo.equip.attackSpeed && item.metaInfo.equip.attackSpeed == 6) description += 'Attack Speed: Normal\n';
        if (item.metaInfo.equip.attackSpeed && item.metaInfo.equip.attackSpeed > 6) description += 'Attack Speed: Slow\n';
        if (item.metaInfo.equip.incDEX) description += 'Dex: +' + item.metaInfo.equip.incDEX + '\n';
        if (item.metaInfo.equip.incINT) description += 'Int: +' + item.metaInfo.equip.incINT + '\n';
        if (item.metaInfo.equip.incLUK) description += 'Luk: +' + item.metaInfo.equip.incLUK + '\n';
        if (item.metaInfo.equip.incSTR) description += 'Str: +' + item.metaInfo.equip.incSTR + '\n';
        if (item.metaInfo.equip.incMHP) description += 'Hp: +' + item.metaInfo.equip.incMHP + '\n';
        if (item.metaInfo.equip.incMMP) description += 'Mp: +' + item.metaInfo.equip.incMMP + '\n';
        if (item.metaInfo.equip.incPAD) description += 'Weapon Attack: +' + item.metaInfo.equip.incPAD + '\n';
        if (item.metaInfo.equip.incMAD) description += 'Magic Attack: +' + item.metaInfo.equip.incMAD + '\n';
        if (item.metaInfo.equip.incPDD) description += 'Weapon Defence: +' + item.metaInfo.equip.incPDD + '\n';
        if (item.metaInfo.equip.incMDD) description += 'Magic Defence: +' + item.metaInfo.equip.incMDD + '\n';
        if (item.metaInfo.equip.incACC) description += 'Accuracy: +' + item.metaInfo.equip.incACC + '\n';
        if (item.metaInfo.equip.incEVA) description += 'Avoidability: +' + item.metaInfo.equip.incEVA + '\n';
        if (item.metaInfo.equip.incSpeed) description += 'Speed +' + item.metaInfo.equip.incSpeed + '\n';
        if (item.metaInfo.equip.incJump) description += 'Jump +' + item.metaInfo.equip.incJump + '\n';
        if (item.metaInfo.equip.bdR) description += 'When attacking bosses, damage +' + item.metaInfo.equip.bdR + '%\n';
        if (item.metaInfo.equip.imdR) description += 'Ignore monster defense: +' + item.metaInfo.equip.imdR + '%\n';
        if (item.metaInfo.equip.tuc) description += 'Upgrades Available: ' + item.metaInfo.equip.tuc + '\n';
        if (item.metaInfo.equip.charmEXP) description += 'This item will reward ' + item.metaInfo.equip.charmEXP + ' Charm when equipped.\n';
        if (item.metaInfo.equip.tradeBlock) description += 'This item is trade blocked.\n';
        if (item.metaInfo.equip.superiorEqp) description += 'This item is a superior equip\n';
        if (item.metaInfo.equip.bossReward) description += 'This item is a boss reward\n';
    } else {
        description = item.description && item.description.description.replace(/\\r\\n/g, '\n').replace(/#c/g, '').replace(/#/g, '').replace(/\\n/g, '\n');
    }

    if (item.metaInfo.cash) {
        if (item.metaInfo.cash.cash) {
            category = 'Cash';
            description = 'Cash item';
        } else {
            category = item.typeInfo.overallCategory;
        }
    } else {
        category = item.typeInfo.overallCategory;
    }

    message.channel.send('', {
        embed: {
            title: title,
            description: description,
            color: 0xFF33A2,
            thumbnail: {
                url: image
            },
            fields: [
                { name: 'Category:', value: category },
                { name: 'Subcategory:', value: subCategory },
                { name: 'Detail Category:', value: detailCategory },
            ]
        }
    });
};