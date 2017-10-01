'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (message) {
    message.channel.send('Boss Reset\n' + weekly(4) + '\n\nGuild and Dojo Reset\n' + weekly(1));
};

function weekly(weekday) {
    var date = new Date();
    date.setDate(date.getDate() + (weekday + 7 - date.getDay()) % 7);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    if (date <= new Date().getTime()) {
        date.setDate(date.getDate() + 7);
    }

    var d = (date.getTime() - new Date().getTime()) / 1000;
    var _d = Math.floor(d / 3600 / 24);
    var h = Math.floor(d / 3600) % 24;
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var _dDisplay = _d > 0 ? _d + (_d == 1 ? ' day, ' : ' days ') : '';
    var hDisplay = h > 0 ? h + (h == 1 ? ' hour, ' : ' hours ') : '';
    var mDisplay = m > 0 ? m + (m == 1 ? ' minute, ' : ' minutes ') : '';
    var sDisplay = s > 0 ? s + (s == 1 ? ' second' : ' seconds') : '';

    return _dDisplay + hDisplay + mDisplay + sDisplay;
}