'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
            var guilds = await _database.Guild.findAll().catch(function (error) {
                console.error(error);
            });
            if (!guilds) return;
            return guilds;
        }
    }, {
        key: 'getGuildWithId',
        value: async function getGuildWithId(id) {
            var cache = await _redis2.default.getAsync('guild-' + id);
            if (cache) return JSON.parse(cache);
            var guild = await _database.Guild.findOne({ where: { id: id } }).catch(function (error) {
                console.error(error);
            });
            if (!guild) return;
            guild = guild.toJSON();
            await _redis2.default.set('guild-' + id, JSON.stringify(guild), 'EX', 86400);
            return guild;
        }
    }, {
        key: 'updateGuildWithId',
        value: async function updateGuildWithId(id, post) {
            var guild = await _database.Guild.update(post, { where: { id: id } }).catch(function (error) {
                console.error(error);
            });
            await _redis2.default.delAsync('guild-' + id).catch(function (error) {
                console.error(error);
            });
            return guild;
        }
    }, {
        key: 'deleteGuildWithId',
        value: async function deleteGuildWithId(id) {
            var guild = await _database.Guild.destroy({ where: { id: id } }).catch(function (error) {
                console.error(error);
            });
            await _redis2.default.delAsync('guild-' + id).catch(function (error) {
                console.error(error);
            });
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