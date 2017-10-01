'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (message) {
    var midnight = new Date();
    midnight.setHours(24);
    midnight.setMinutes(0);
    midnight.setSeconds(0);
    midnight.setMilliseconds(0);

    var d = (midnight.getTime() - new Date().getTime()) / 1000;
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? ' hour, ' : ' hours ') : '';
    var mDisplay = m > 0 ? m + (m == 1 ? ' minute, ' : ' minutes ') : '';
    var sDisplay = s > 0 ? s + (s == 1 ? ' second' : ' seconds') : '';

    message.channel.send('Daily Reset\n' + hDisplay + mDisplay + sDisplay);
};