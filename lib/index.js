'use strict';

var _discord = require('discord.js');

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Manager = new _discord.ShardingManager('./lib/client.js', { totalShards: 1, token: _config2.default.get('discord').token });
Manager.spawn();