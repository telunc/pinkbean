'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (message) {
    var start = message.createdTimestamp;
    message.channel.send('Pink Bean responded').then(function (message) {
        var diff = message.createdTimestamp - start;
        message.edit('Pink Bean responded in *' + diff / 1000 + ' seconds*');
    }).catch(function (error) {
        return console.log(error);
    });
};