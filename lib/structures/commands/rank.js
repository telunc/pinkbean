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
    var name = tokens.shift();
    var character = await (0, _requestPromise2.default)({ uri: _config2.default.get('server') + '/api/rank/na/' + name + '/overall', json: true }).catch(function () {
        // console.error(`failed to load character with name ${name}`);
    });
    if (!character) return message.channel.send('', { embed: { color: 0xFF33A2, title: 'No result found!' } });
    message.channel.send('', {
        embed: {
            color: 0xFF33A2,
            thumbnail: {
                url: character.avatar
            },
            fields: [{ name: 'Name', value: character.name, inline: true }, { name: 'Job', value: character.job, inline: true }, { name: 'Level', value: character.level + ' (' + character.exp + ')', inline: true }, { name: 'Overall Rank', value: character.ranking, inline: true }, { name: 'World', value: character.world, inline: true }, { name: 'World Rank', value: character.worldRank, inline: true }, { name: 'Job Rank', value: character.jobRank, inline: true }, { name: 'Legion Rank', value: character.legion, inline: true }]
        }
    });
};