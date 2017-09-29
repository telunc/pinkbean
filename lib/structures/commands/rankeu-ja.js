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
    var character = await (0, _requestPromise2.default)({ uri: _config2.default.get('server') + '/api/rank/eu/' + name + '/overall', json: true }).catch(function () {
        // console.error(`failed to load character with name ${name}`);
    });
    if (!character) return message.channel.send('', { embed: { color: 0xFF33A2, title: 'No result found!' } });
    var characters = await (0, _requestPromise2.default)({ uri: _config2.default.get('server') + '/api/rank/eu/' + name + '/job-alliance', json: true }).catch(function () {
        // console.error(`failed to load character with name ${name}`);
    });
    if (!characters) return message.channel.send('', { embed: { color: 0xFF33A2, title: 'No result found!' } });
    var fields = [];
    characters.forEach(function (character, index) {
        fields.push({ name: index + 1 + '. ' + character.name, value: character.level + ' (' + character.exp + ')', inline: true });
    });
    message.channel.send('', {
        embed: {
            title: '__**' + character.job + ' Alliance Ranking**__',
            description: character.name + '\'s ranking',
            color: 0xFF33A2,
            thumbnail: {
                url: character.avatar
            },
            fields: fields,
            footer: {
                text: 'Showing up to 20 results'
            }
        }
    });
};