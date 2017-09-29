'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _guild = require('./guild');

var _guild2 = _interopRequireDefault(_guild);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tokenizer = function () {
    function Tokenizer() {
        _classCallCheck(this, Tokenizer);
    }

    _createClass(Tokenizer, null, [{
        key: 'getPrefix',
        value: async function getPrefix(guildId) {
            var prefix = _config2.default.get('discord').prefix;
            var guild = await _guild2.default.getGuildWithId(guildId);
            if (guild && guild.prefix) prefix = guild.prefix;
            return prefix;
        }
    }, {
        key: 'getTokens',
        value: async function getTokens(message) {
            var guildId = message.channel.id;
            if (message.guild) guildId = message.guild.id;
            var prefix = await this.getPrefix(guildId);
            if (!message.content.startsWith(prefix)) return;
            var content = message.content.slice(prefix.length);
            return content.split(' ');
        }
    }]);

    return Tokenizer;
}();

exports.default = Tokenizer;