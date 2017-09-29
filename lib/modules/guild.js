'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _redis = require('./redis');

var _redis2 = _interopRequireDefault(_redis);

var _database = require('./database');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
    function _class() {
        _classCallCheck(this, _class);
    }

    _createClass(_class, null, [{
        key: 'getGuilds',
        value: async function getGuilds() {
            var cache = await _redis2.default.getAsync('guilds');
            if (cache) return JSON.parse(cache);
            var guilds = await (0, _requestPromise2.default)({ uri: _config2.default.get('server') + '/api/guild/', json: true }).catch(function () {
                // console.error('failed to load guilds');
            });
            if (!guilds) return;
            await _redis2.default.set('guilds', JSON.stringify(guilds), 'EX', 86400);
            return guilds;
        }
    }, {
        key: 'getGuildWithId',
        value: async function getGuildWithId(id) {
            var cache = await _redis2.default.getAsync('guild-' + id);
            if (cache) return JSON.parse(cache);
            var guild = await (0, _requestPromise2.default)({ uri: _config2.default.get('server') + '/api/guild/' + id, json: true }).catch(function () {
                // console.error(`failed to load guild with id ${id}`);
            });
            if (!guild) return;
            await _redis2.default.set('guild-' + id, JSON.stringify(guild), 'EX', 86400);
            return guild;
        }
    }, {
        key: 'updateGuildWithId',
        value: async function updateGuildWithId(id, post) {
            var guild = await _database.Guild.update(post, { where: { id: id } }).catch(function (error) {
                console.error(error);
            });
            _redis2.default.del('guild-' + id);
            return guild;
        }
    }, {
        key: 'deleteGuildWithId',
        value: async function deleteGuildWithId(id) {
            var guild = await _database.Guild.destroy({ where: { id: id } }).catch(function (error) {
                console.error(error);
            });
            _redis2.default.del('guild-' + id);
            return guild;
        }
    }, {
        key: 'setGuild',
        value: async function setGuild(post) {
            return _database.Guild.create(post);
        }
    }]);

    return _class;
}();

exports.default = _class;