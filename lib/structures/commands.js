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

var _news2 = require('./commands/news');

var _news3 = _interopRequireDefault(_news2);

var _time2 = require('./commands/time');

var _time3 = _interopRequireDefault(_time2);

var _daily2 = require('./commands/daily');

var _daily3 = _interopRequireDefault(_daily2);

var _weekly2 = require('./commands/weekly');

var _weekly3 = _interopRequireDefault(_weekly2);

var _invasion2 = require('./commands/invasion');

var _invasion3 = _interopRequireDefault(_invasion2);

var _maintenance2 = require('./commands/maintenance');

var _maintenance3 = _interopRequireDefault(_maintenance2);

var _twoX = require('./commands/twoX');

var _twoX2 = _interopRequireDefault(_twoX);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    'help': function help(tokens, message) {
        return (0, _help3.default)(message);
    },
    'ping': function ping(tokens, message) {
        return (0, _ping3.default)(message);
    },
    'rank': function rank(tokens, message) {
        return (0, _rank3.default)(tokens, message, 'na');
    },
    'rank-jw': function rankJw(tokens, message) {
        return (0, _rankJw2.default)(tokens, message, 'na');
    },
    'rank-ja': function rankJa(tokens, message) {
        return (0, _rankJa2.default)(tokens, message, 'na');
    },
    'rankeu': function rankeu(tokens, message) {
        return (0, _rank3.default)(tokens, message, 'eu');
    },
    'rankeu-jw': function rankeuJw(tokens, message) {
        return (0, _rankJw2.default)(tokens, message, 'eu');
    },
    'rankeu-ja': function rankeuJa(tokens, message) {
        return (0, _rankJa2.default)(tokens, message, 'eu');
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
    },
    'news': function news(tokens, message) {
        return (0, _news3.default)(tokens, message);
    },
    'time': function time(tokens, message) {
        return (0, _time3.default)(message);
    },
    'daily': function daily(tokens, message) {
        return (0, _daily3.default)(message);
    },
    'weekly': function weekly(tokens, message) {
        return (0, _weekly3.default)(message);
    },
    'invasion': function invasion(tokens, message) {
        return (0, _invasion3.default)(message);
    },
    'maintenance': function maintenance(tokens, message) {
        return (0, _maintenance3.default)(tokens, message);
    },
    '2x': function x(tokens, message) {
        return (0, _twoX2.default)(message);
    }
};