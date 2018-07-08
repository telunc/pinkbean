'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = async function (tokens, message) {
    var name = encodeURI(tokens.join(' '));
    var mob = await (0, _requestPromise2.default)({ uri: _config2.default.get('server') + '/api/mob/' + name, json: true }).catch(function () {
        // console.error(`failed to load mob with name ${name}`);
    });
    if (!mob) return message.channel.send('', { embed: { color: 0xFF33A2, title: 'No result found!' } });

    var fields = [];
    fields.push({ name: 'Name', value: mob.name, inline: true });
    if (mob.meta.level) fields.push({ name: 'Level', value: mob.meta.level, inline: true });
    if (mob.meta.maxHP) fields.push({ name: 'Max HP', value: numberWithCommas(mob.meta.maxHP), inline: true });
    if (mob.meta.maxMP) fields.push({ name: 'Max MP', value: numberWithCommas(mob.meta.maxMP), inline: true });
    if (mob.meta.accuracy) fields.push({ name: 'Accuracy', value: numberWithCommas(mob.meta.accuracy), inline: true });
    if (mob.meta.evasion) fields.push({ name: 'Evasion', value: numberWithCommas(mob.meta.evasion), inline: true });
    if (mob.meta.speed) fields.push({ name: 'Speed', value: numberWithCommas(mob.meta.speed), inline: true });
    if (mob.meta.isUndead) fields.push({ name: 'Undead', value: mob.meta.isUndead, inline: true });
    if (mob.meta.exp) fields.push({ name: 'EXP', value: numberWithCommas(mob.meta.exp), inline: true });
    if (mob.meta.isBoss) fields.push({ name: 'Boss', value: mob.meta.isBoss, inline: true });
    if (mob.meta.publicReward) fields.push({ name: 'Public Reward', value: mob.meta.publicReward, inline: true });
    if (mob.meta.minimumPushDamage) fields.push({ name: 'Minimum Push Damage', value: numberWithCommas(mob.meta.minimumPushDamage), inline: true });
    if (mob.meta.physicalDamage) fields.push({ name: 'Physical Damage', value: numberWithCommas(mob.meta.physicalDamage), inline: true });
    if (mob.meta.magicDamage) fields.push({ name: 'Magic Damage', value: numberWithCommas(mob.meta.magicDamage), inline: true });
    if (mob.meta.physicalDefense) fields.push({ name: 'Physical Defense', value: numberWithCommas(mob.meta.physicalDefense), inline: true });
    if (mob.meta.magicDefense) fields.push({ name: 'Magic Defense', value: numberWithCommas(mob.meta.magicDefense), inline: true });
    if (fields.length % 3 !== 1) {
        var isBodyAttack = void 0;
        mob.meta.isBodyAttack ? isBodyAttack = 'true' : isBodyAttack = 'false';
        fields.push({ name: 'Body Attack', value: isBodyAttack, inline: true });
    }

    var embed = { color: 0xFF33A2, fields: fields };
    var url = 'https://www.pinkbean.xyz/api/mob/' + name + '/icon';
    mob.meta.isBoss ? embed.image = { url: url } : embed.thumbnail = { url: url };

    message.channel.send('', { embed: embed });
};

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}