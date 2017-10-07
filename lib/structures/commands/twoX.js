'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = async function (message) {
    var result = await (0, _requestPromise2.default)({ uri: _config2.default.get('server') + '/api/news/2x', json: true }).catch(function () {
        // console.error(`failed to load character with name ${name}`);
    });
    if (!result) return message.channel.send('', { embed: { color: 0xFF33A2, title: 'No result found!' } });
    if (result.end) {
        message.channel.send('', { embed: {
                color: 0xFF33A2,
                title: 'The current 2x is ending in',
                description: result.end
            } });
    }
    if (result.next) {
        message.channel.send('', { embed: {
                color: 0xFF33A2,
                title: 'The next 2x is scheduled in',
                description: result.next
            } });
    }
};