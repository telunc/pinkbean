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
    if (!result) return message.channel.send('No result found!');
    var content = '';
    if (result.end) content += '\nEnding in \n' + result.end + '\n';
    if (result.next) content += '\nComing up\n' + result.next + '\n';
    message.channel.send(content);
};