'use strict';

var _discord = require('discord.js');

var _discord2 = _interopRequireDefault(_discord);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _tokenizer = require('./modules/tokenizer');

var _tokenizer2 = _interopRequireDefault(_tokenizer);

var _socket = require('./modules/socket');

var _socket2 = _interopRequireDefault(_socket);

var _support = require('./modules/support');

var _support2 = _interopRequireDefault(_support);

var _commands = require('./structures/commands');

var _commands2 = _interopRequireDefault(_commands);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var timer = void 0;
var client = new _discord2.default.Client();
(0, _socket2.default)(client);
(0, _support2.default)(client);

client.on('ready', function () {
    watchdog();
    console.log('Logged in as ' + client.user.tag + '!');
    client.user.setPresence({ game: { name: '!help' } });
});

client.on('message', async function (message) {
    watchdog();
    if (message.author.bot) return;
    var tokens = await _tokenizer2.default.getTokens(message);
    if (!tokens) return;
    var command = tokens.shift();
    if (_commands2.default.hasOwnProperty(command)) _commands2.default[command](tokens, message, client);
});

function watchdog() {
    clearInterval(timer);
    timer = setInterval(function () {
        console.log('A shard restarted');
        process.exit();
    }, 600000); // 10 minutes
}

client.login(_config2.default.get('discord').token);