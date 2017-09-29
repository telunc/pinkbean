'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ping2 = require('./commands/ping');

var _ping3 = _interopRequireDefault(_ping2);

var _rank2 = require('./commands/rank');

var _rank3 = _interopRequireDefault(_rank2);

var _rankJw = require('./commands/rank-jw');

var _rankJw2 = _interopRequireDefault(_rankJw);

var _rankJa = require('./commands/rank-ja');

var _rankJa2 = _interopRequireDefault(_rankJa);

var _rankeu2 = require('./commands/rankeu');

var _rankeu3 = _interopRequireDefault(_rankeu2);

var _rankeuJw = require('./commands/rankeu-jw');

var _rankeuJw2 = _interopRequireDefault(_rankeuJw);

var _rankeuJa = require('./commands/rankeu-ja');

var _rankeuJa2 = _interopRequireDefault(_rankeuJa);

var _mob2 = require('./commands/mob');

var _mob3 = _interopRequireDefault(_mob2);

var _item2 = require('./commands/item');

var _item3 = _interopRequireDefault(_item2);

var _sub2 = require('./commands/sub');

var _sub3 = _interopRequireDefault(_sub2);

var _timer2 = require('./commands/timer');

var _timer3 = _interopRequireDefault(_timer2);

var _help2 = require('./commands/help');

var _help3 = _interopRequireDefault(_help2);

var _avatar2 = require('./commands/avatar');

var _avatar3 = _interopRequireDefault(_avatar2);

var _about2 = require('./commands/about');

var _about3 = _interopRequireDefault(_about2);

var _prefix2 = require('./commands/prefix');

var _prefix3 = _interopRequireDefault(_prefix2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    'help': function help(tokens, message) {
        return (0, _help3.default)(message);
    },
    'ping': function ping(tokens, message) {
        return (0, _ping3.default)(message);
    },
    'rank': function rank(tokens, message) {
        return (0, _rank3.default)(tokens, message);
    },
    'rank-jw': function rankJw(tokens, message) {
        return (0, _rankJw2.default)(tokens, message);
    },
    'rank-ja': function rankJa(tokens, message) {
        return (0, _rankJa2.default)(tokens, message);
    },
    'rankeu': function rankeu(tokens, message) {
        return (0, _rankeu3.default)(tokens, message);
    },
    'rankeu-jw': function rankeuJw(tokens, message) {
        return (0, _rankeuJw2.default)(tokens, message);
    },
    'rankeu-ja': function rankeuJa(tokens, message) {
        return (0, _rankeuJa2.default)(tokens, message);
    },
    'mob': function mob(tokens, message) {
        return (0, _mob3.default)(tokens, message);
    },
    'item': function item(tokens, message) {
        return (0, _item3.default)(tokens, message);
    },
    'sub': function sub(tokens, message) {
        return (0, _sub3.default)(message);
    },
    'timer': function timer(tokens, message) {
        return (0, _timer3.default)(message);
    },
    'avatar': function avatar(tokens, message) {
        return (0, _avatar3.default)(tokens, message);
    },
    'about': function about(tokens, message, client) {
        return (0, _about3.default)(message, client);
    },
    'prefix': function prefix(tokens, message) {
        return (0, _prefix3.default)(tokens, message);
    }

};