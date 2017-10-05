'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (message) {
    message.channel.send('Next Kritias Invasion\n' + invasion());
};

function invasion() {
    var now = new Date();
    var periods = [8, 10, 12, 14, 16, 18, 20, 22];
    periods = periods.map(function (period) {
        return (0, _moment2.default)({ hour: period });
    });
    var next = periods[0];

    periods.forEach(function (period, index) {
        if (period < now) {
            if (index === periods.length - 1) {
                next = periods[0].add(1, 'day');
            } else {
                next = periods[index + 1];
            }
        }
    });

    var d = (next - now) / 1000;
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? ' hour, ' : ' hours ') : '';
    var mDisplay = m > 0 ? m + (m == 1 ? ' minute, ' : ' minutes ') : '';
    var sDisplay = s > 0 ? s + (s == 1 ? ' second' : ' seconds') : '';

    return hDisplay + mDisplay + sDisplay;
}